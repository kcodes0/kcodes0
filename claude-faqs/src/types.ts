export interface FAQEntry {
  id: string;
  slug: string;
  category: string;
  subcategory: string;
  question: string;
  answer: string;
  answer_status: "answered" | "temp" | "stub";
  source_file: string;
  github_url: string;
  tags: string[];
}

export interface FAQData {
  version: string;
  generated_at: string;
  entry_count: number;
  entries: FAQEntry[];
  slugs: Record<string, number>;
  categories: string[];
}

export interface DiscordEmbed {
  title: string;
  description: string;
  url: string;
  color: number;
  fields: Array<{ name: string; value: string; inline: boolean }>;
  footer: { text: string };
}

export interface Env {
  RATE_LIMITS: KVNamespace;
  FAQ_API_KEYS: KVNamespace;
}

export interface ApiKeyData {
  name: string;
  tier: "standard" | "premium";
}

export interface RateLimitData {
  count: number;
  resetAt: number;
}
