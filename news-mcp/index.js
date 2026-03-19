#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_URL = process.env.NEWS_API_URL;
const CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID;
const CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET;

if (!API_URL) {
  console.error("NEWS_API_URL environment variable is required");
  process.exit(1);
}

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (CLIENT_ID && CLIENT_SECRET) {
    headers["CF-Access-Client-Id"] = CLIENT_ID;
    headers["CF-Access-Client-Secret"] = CLIENT_SECRET;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  return res.json();
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const server = new McpServer({
  name: "kona-news",
  version: "1.0.0",
});

// --- Draft an article ---
server.tool(
  "draft_article",
  "Create a new draft news article. Saved as unpublished for review.",
  {
    title: z.string().describe("Article headline"),
    content: z.string().describe("Full article body in Markdown"),
    excerpt: z.string().optional().describe("Short description shown in previews"),
    tags: z.array(z.string()).optional().describe("Tags to categorize the article"),
  },
  async ({ title, content, excerpt, tags }) => {
    const result = await api("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title,
        slug: slugify(title),
        content,
        excerpt: excerpt || null,
        published: false,
        featured: false,
        tags: tags || [],
      }),
    });

    return {
      content: [
        {
          type: "text",
          text: result.success
            ? `Draft created: "${title}"\nID: ${result.id}\nReview & publish: ${API_URL}/e/${result.id}`
            : `Error: ${result.error}`,
        },
      ],
    };
  }
);

// --- List drafts ---
server.tool(
  "list_drafts",
  "List all unpublished draft articles",
  {},
  async () => {
    const result = await api("/api/articles?published=0");
    const articles = result.articles || [];

    if (articles.length === 0) {
      return { content: [{ type: "text", text: "No drafts found." }] };
    }

    const list = articles
      .map(
        (a) =>
          `- [${a.id}] "${a.title}" (${a.created_at})\n  Review: ${API_URL}/e/${a.id}`
      )
      .join("\n");

    return {
      content: [
        { type: "text", text: `${articles.length} draft(s):\n\n${list}` },
      ],
    };
  }
);

// --- Update a draft ---
server.tool(
  "update_draft",
  "Update an existing draft article's title, content, excerpt, or tags",
  {
    id: z.string().describe("Article ID to update"),
    title: z.string().optional().describe("New title"),
    content: z.string().optional().describe("New Markdown content"),
    excerpt: z.string().optional().describe("New excerpt"),
    tags: z.array(z.string()).optional().describe("New tags (replaces existing)"),
  },
  async ({ id, title, content, excerpt, tags }) => {
    // Fetch current state
    const current = await api(`/api/articles/${id}`);
    if (current.error) {
      return {
        content: [{ type: "text", text: `Error: ${current.error}` }],
      };
    }

    const article = current.article;
    const currentTags = (current.tags || []).map((t) => t.name);

    const result = await api(`/api/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title || article.title,
        slug: title ? slugify(title) : article.slug,
        content: content || article.content,
        excerpt: excerpt !== undefined ? excerpt : article.excerpt,
        published: !!article.published,
        featured: !!article.featured,
        tags: tags || currentTags,
      }),
    });

    return {
      content: [
        {
          type: "text",
          text: result.success
            ? `Updated "${title || article.title}"\nReview: ${API_URL}/e/${id}`
            : `Error: ${result.error}`,
        },
      ],
    };
  }
);

// --- List tags ---
server.tool(
  "list_tags",
  "List all available tags in the news section",
  {},
  async () => {
    const result = await api("/api/tags");
    const tags = result.tags || [];

    if (tags.length === 0) {
      return { content: [{ type: "text", text: "No tags yet." }] };
    }

    return {
      content: [{ type: "text", text: `Tags: ${tags.map((t) => t.name).join(", ")}` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
