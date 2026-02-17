import type { Env, FAQEntry, DiscordEmbed, RateLimitData, ApiKeyData } from "./types";
import { FAQ_DATA } from "./data";
import { searchEntries } from "./search";

const DISCORD_COLOR = 0x7855FA;

function toDiscordEmbed(entry: FAQEntry): DiscordEmbed {
  const description = entry.answer.length > 4096
    ? entry.answer.slice(0, 4093) + "..."
    : entry.answer || "_No answer available yet — this FAQ entry needs a response._";

  return {
    title: entry.question,
    description,
    url: entry.github_url,
    color: DISCORD_COLOR,
    fields: [
      {
        name: "Category",
        value: entry.subcategory !== entry.category
          ? `${entry.category} > ${entry.subcategory}`
          : entry.category,
        inline: true,
      },
      {
        name: "Status",
        value: entry.answer_status === "answered" ? "Answered"
             : entry.answer_status === "temp" ? "Temp Answer"
             : "Needs Answer",
        inline: true,
      },
      {
        name: "Source",
        value: `[View on GitHub](${entry.github_url})`,
        inline: true,
      },
    ],
    footer: { text: "Claude Community FAQ | api.kcodes.me" },
  };
}

function jsonResponse(data: object, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function handleCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function getClientIP(request: Request): string {
  return request.headers.get("cf-connecting-ip") ||
         request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         "unknown";
}

async function checkRateLimit(
  kv: KVNamespace,
  key: string,
  limits: { perMinute: number; perDay: number }
): Promise<{ allowed: boolean; retryAfter?: number; remaining?: { minute: number; day: number } }> {
  const now = Date.now();
  const minuteKey = `rl:faq:min:${key}`;
  const dayKey = `rl:faq:day:${key}`;

  const minuteData = await kv.get<RateLimitData>(minuteKey, "json");
  let minuteCount = 0;
  if (minuteData && minuteData.resetAt > now) {
    minuteCount = minuteData.count;
    if (minuteCount >= limits.perMinute) {
      return { allowed: false, retryAfter: Math.ceil((minuteData.resetAt - now) / 1000) };
    }
  }

  const dayData = await kv.get<RateLimitData>(dayKey, "json");
  let dayCount = 0;
  if (dayData && dayData.resetAt > now) {
    dayCount = dayData.count;
    if (dayCount >= limits.perDay) {
      return { allowed: false, retryAfter: Math.ceil((dayData.resetAt - now) / 1000) };
    }
  }

  const newMinute: RateLimitData = {
    count: minuteCount + 1,
    resetAt: minuteData && minuteData.resetAt > now ? minuteData.resetAt : now + 60_000,
  };
  const newDay: RateLimitData = {
    count: dayCount + 1,
    resetAt: dayData && dayData.resetAt > now ? dayData.resetAt : now + 86_400_000,
  };

  await Promise.all([
    kv.put(minuteKey, JSON.stringify(newMinute), { expirationTtl: 70 }),
    kv.put(dayKey, JSON.stringify(newDay), { expirationTtl: 86410 }),
  ]);

  return {
    allowed: true,
    remaining: {
      minute: limits.perMinute - newMinute.count,
      day: limits.perDay - newDay.count,
    },
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return handleCors(new Response(null, { status: 204 }));
    }

    if (request.method !== "GET") {
      return handleCors(jsonResponse({ error: "Method not allowed. Use GET." }, 405));
    }

    // Strip the /claude-faqs prefix if present (route pattern includes it)
    const subPath = path.startsWith("/claude-faqs/v1")
      ? path.slice("/claude-faqs/v1".length)
      : path.startsWith("/v1")
        ? path.slice("/v1".length)
        : path;
    const format = url.searchParams.get("format");

    // ── Auth ──
    const authHeader = request.headers.get("authorization");
    const apiKey = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : url.searchParams.get("apikey");

    let keyName = "anonymous";
    let rateLimits = { perMinute: 5, perDay: 50 };

    if (apiKey) {
      const keyData = await env.FAQ_API_KEYS.get<ApiKeyData>(apiKey, "json");
      if (!keyData) {
        return handleCors(jsonResponse({
          error: "Unauthorized",
          message: "Invalid API key. Contact the admin for access.",
        }, 401));
      }
      keyName = keyData.name;
      rateLimits = keyData.tier === "premium"
        ? { perMinute: 100, perDay: 10000 }
        : { perMinute: 30, perDay: 1000 };
    }

    // ── Rate Limit ──
    const rateLimitKey = apiKey || getClientIP(request);
    const rateCheck = await checkRateLimit(env.RATE_LIMITS, rateLimitKey, rateLimits);

    if (!rateCheck.allowed) {
      const resp = jsonResponse({
        error: "Rate limit exceeded",
        message: "Too many requests. Please try again later.",
        retryAfter: rateCheck.retryAfter,
        limits: rateLimits,
      }, 429);
      const headers = new Headers(resp.headers);
      headers.set("Retry-After", String(rateCheck.retryAfter));
      return handleCors(new Response(resp.body, { status: 429, headers }));
    }

    // Helper to attach rate limit headers
    function withRateHeaders(resp: Response): Response {
      const headers = new Headers(resp.headers);
      headers.set("X-RateLimit-Remaining-Minute", String(rateCheck.remaining?.minute));
      headers.set("X-RateLimit-Remaining-Day", String(rateCheck.remaining?.day));
      headers.set("X-Authenticated-As", keyName);
      return handleCors(new Response(resp.body, { status: resp.status, headers }));
    }

    // ── Routes ──

    // API info
    if (subPath === "" || subPath === "/") {
      return withRateHeaders(jsonResponse({
        name: "Claude FAQ API",
        version: FAQ_DATA.version,
        generated_at: FAQ_DATA.generated_at,
        entry_count: FAQ_DATA.entry_count,
        categories: FAQ_DATA.categories,
        endpoints: {
          "GET /claude-faqs/v1/{slug}": "Get FAQ entry by slug",
          "GET /claude-faqs/v1/{slug}?format=discord": "Get FAQ entry as Discord embed JSON",
          "GET /claude-faqs/v1/search?q={query}": "Search FAQ entries (top 5)",
          "GET /claude-faqs/v1/search?q={query}&limit=10": "Search with custom limit (max 20)",
          "GET /claude-faqs/v1/categories": "List all categories with subcategories",
          "GET /claude-faqs/v1/entries": "List all entries",
          "GET /claude-faqs/v1/entries?category={name}": "Filter entries by category",
          "GET /claude-faqs/v1/entries?status=answered": "Filter by status (answered|temp|stub)",
          "GET /claude-faqs/v1/slugs": "List all available slugs",
        },
        auth: {
          description: "Optional API key for higher rate limits",
          usage: "Authorization: Bearer <key> or ?apikey=<key>",
          tiers: {
            public: "5/min, 50/day",
            standard: "30/min, 1000/day",
            premium: "100/min, 10000/day",
          },
        },
      }));
    }

    // Search
    if (subPath === "/search") {
      const query = url.searchParams.get("q");
      if (!query) {
        return withRateHeaders(jsonResponse({
          error: "Missing query parameter",
          usage: "GET /claude-faqs/v1/search?q=your+search+terms",
        }, 400));
      }

      const limit = Math.min(parseInt(url.searchParams.get("limit") || "5") || 5, 20);
      const results = searchEntries(FAQ_DATA.entries, query, limit);

      if (format === "discord") {
        return withRateHeaders(jsonResponse({
          query,
          count: results.length,
          results: results.map(toDiscordEmbed),
        }));
      }

      return withRateHeaders(jsonResponse({
        query,
        count: results.length,
        results: results.map(e => ({
          slug: e.slug,
          question: e.question,
          answer_preview: e.answer.slice(0, 200) + (e.answer.length > 200 ? "..." : ""),
          category: e.category,
          subcategory: e.subcategory,
          answer_status: e.answer_status,
          github_url: e.github_url,
        })),
      }));
    }

    // Categories
    if (subPath === "/categories") {
      const categorized = FAQ_DATA.categories.map(cat => {
        const entries = FAQ_DATA.entries.filter(e => e.category === cat);
        const subcategories = [...new Set(entries.map(e => e.subcategory))];
        return {
          name: cat,
          entry_count: entries.length,
          subcategories,
        };
      });

      return withRateHeaders(jsonResponse({
        count: FAQ_DATA.categories.length,
        categories: categorized,
      }));
    }

    // Entries list
    if (subPath === "/entries") {
      let entries = FAQ_DATA.entries;
      const category = url.searchParams.get("category")?.toLowerCase();
      const status = url.searchParams.get("status") as "answered" | "temp" | "stub" | null;

      if (category) {
        entries = entries.filter(e =>
          e.category.toLowerCase().includes(category) ||
          e.subcategory.toLowerCase().includes(category)
        );
      }

      if (status && ["answered", "temp", "stub"].includes(status)) {
        entries = entries.filter(e => e.answer_status === status);
      }

      return withRateHeaders(jsonResponse({
        count: entries.length,
        entries: entries.map(e => ({
          slug: e.slug,
          question: e.question,
          category: e.category,
          subcategory: e.subcategory,
          answer_status: e.answer_status,
        })),
      }));
    }

    // Slug list
    if (subPath === "/slugs") {
      return withRateHeaders(jsonResponse({
        count: FAQ_DATA.entry_count,
        slugs: Object.keys(FAQ_DATA.slugs),
      }));
    }

    // ── Slug lookup (catch-all) ──
    const slug = subPath.replace(/^\//, "");
    if (!slug || slug.includes("/")) {
      return withRateHeaders(jsonResponse({
        error: "Not Found",
        message: `Unknown endpoint: ${path}`,
      }, 404));
    }

    const entryIndex = FAQ_DATA.slugs[slug];
    if (entryIndex === undefined) {
      const results = searchEntries(FAQ_DATA.entries, slug.replace(/-/g, " "), 3);
      return withRateHeaders(jsonResponse({
        error: "FAQ entry not found",
        slug,
        did_you_mean: results.map(e => ({
          slug: e.slug,
          question: e.question,
        })),
      }, 404));
    }

    const entry = FAQ_DATA.entries[entryIndex];

    if (format === "discord") {
      return withRateHeaders(jsonResponse(toDiscordEmbed(entry)));
    }

    return withRateHeaders(jsonResponse(entry));
  },
};
