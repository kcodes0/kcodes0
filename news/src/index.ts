import { renderHome, renderArticle, renderTagPage, renderSearch, renderContact, render404 } from './templates/public';
import { renderAdmin, renderEditor, renderNewArticle, renderContacts } from './templates/admin';
import { marked } from 'marked';
import { transformDiagramBlock } from './templates/diagrams';

export interface Env {
  DB: D1Database;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: number;
  featured: number;
  created_at: string;
  updated_at: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: number;
  created_at: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

// Configure marked with custom renderer for diagram support
marked.use({
  renderer: {
    code(code: string, infostring: string | undefined, _escaped: boolean): string | false {
      if (infostring) {
        const diagramHtml = transformDiagramBlock(infostring, code);
        if (diagramHtml) {
          return diagramHtml;
        }
      }
      return false;
    }
  }
});

async function parseMarkdown(content: string): Promise<string> {
  return await marked(content);
}

// Helper to get tags for a set of articles
async function getArticleTags(db: D1Database, articleIds: string[]): Promise<Record<string, Tag[]>> {
  const result: Record<string, Tag[]> = {};
  if (articleIds.length === 0) return result;

  const placeholders = articleIds.map(() => '?').join(',');
  const rows = await db.prepare(
    `SELECT at.article_id, t.id, t.name, t.slug
     FROM article_tags at
     JOIN tags t ON t.id = at.tag_id
     WHERE at.article_id IN (${placeholders})
     ORDER BY t.name`
  ).bind(...articleIds).all<{ article_id: string; id: string; name: string; slug: string }>();

  for (const row of rows.results || []) {
    if (!result[row.article_id]) result[row.article_id] = [];
    result[row.article_id].push({ id: row.id, name: row.name, slug: row.slug });
  }
  return result;
}

// Helper to sync tags for an article
async function syncArticleTags(db: D1Database, articleId: string, tagNames: string[]): Promise<void> {
  // Remove existing tag links
  await db.prepare('DELETE FROM article_tags WHERE article_id = ?').bind(articleId).run();

  for (const name of tagNames) {
    const trimmed = name.trim();
    if (!trimmed) continue;

    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Upsert tag
    let tag = await db.prepare('SELECT id FROM tags WHERE slug = ?').bind(slug).first<{ id: string }>();
    if (!tag) {
      const tagId = generateId();
      await db.prepare('INSERT INTO tags (id, name, slug) VALUES (?, ?, ?)').bind(tagId, trimmed, slug).run();
      tag = { id: tagId };
    }

    // Link
    await db.prepare('INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)').bind(articleId, tag.id).run();
  }
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // ============================================
    // PUBLIC ROUTES
    // ============================================

    // Home
    if (path === '/' || path === '') {
      const articles = await env.DB.prepare(
        'SELECT id, title, slug, excerpt, featured, created_at FROM articles WHERE published = 1 ORDER BY created_at DESC'
      ).all<Article>();

      const tags = await env.DB.prepare('SELECT id, name, slug FROM tags ORDER BY name').all<Tag>();

      const articleIds = (articles.results || []).map(a => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);

      const featured = (articles.results || []).find(a => a.featured) || null;

      return html(renderHome(articles.results || [], tags.results || [], featured, articleTags));
    }

    // Article view - /a/:slug
    if (path.startsWith('/a/')) {
      const slug = path.slice(3);
      const article = await env.DB.prepare(
        'SELECT * FROM articles WHERE slug = ? AND published = 1'
      ).bind(slug).first<Article>();

      if (!article) return html(render404(), 404);

      const htmlContent = await parseMarkdown(article.content);

      // Get tags for this article
      const tagsResult = await env.DB.prepare(
        `SELECT t.id, t.name, t.slug FROM tags t
         JOIN article_tags at ON t.id = at.tag_id
         WHERE at.article_id = ?`
      ).bind(article.id).all<Tag>();
      const tags = tagsResult.results || [];

      // Follower count
      const countResult = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM followers WHERE article_id = ?'
      ).bind(article.id).first<{ count: number }>();
      const followerCount = countResult?.count || 0;

      // Related articles (share at least one tag)
      let relatedArticles: Article[] = [];
      if (tags.length > 0) {
        const tagIds = tags.map(t => t.id);
        const tagPlaceholders = tagIds.map(() => '?').join(',');
        const relatedResult = await env.DB.prepare(
          `SELECT DISTINCT a.id, a.title, a.slug, a.created_at
           FROM articles a
           JOIN article_tags at ON a.id = at.article_id
           WHERE at.tag_id IN (${tagPlaceholders})
             AND a.id != ?
             AND a.published = 1
           ORDER BY a.created_at DESC
           LIMIT 5`
        ).bind(...tagIds, article.id).all<Article>();
        relatedArticles = relatedResult.results || [];
      }

      return html(renderArticle(article, htmlContent, tags, followerCount, relatedArticles));
    }

    // Tag page - /tag/:slug
    if (path.startsWith('/tag/')) {
      const tagSlug = path.slice(5);
      const tag = await env.DB.prepare('SELECT * FROM tags WHERE slug = ?').bind(tagSlug).first<Tag>();

      if (!tag) return html(render404(), 404);

      const articles = await env.DB.prepare(
        `SELECT a.id, a.title, a.slug, a.excerpt, a.created_at
         FROM articles a
         JOIN article_tags at ON a.id = at.article_id
         WHERE at.tag_id = ? AND a.published = 1
         ORDER BY a.created_at DESC`
      ).bind(tag.id).all<Article>();

      const articleIds = (articles.results || []).map(a => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);

      return html(renderTagPage(tag, articles.results || [], articleTags));
    }

    // Search - /search?q=...
    if (path === '/search') {
      const query = url.searchParams.get('q') || '';
      let articles: Article[] = [];
      let articleTags: Record<string, Tag[]> = {};

      if (query.trim()) {
        const like = `%${query}%`;
        const result = await env.DB.prepare(
          `SELECT id, title, slug, excerpt, created_at FROM articles
           WHERE published = 1 AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)
           ORDER BY created_at DESC
           LIMIT 50`
        ).bind(like, like, like).all<Article>();
        articles = result.results || [];

        const articleIds = articles.map(a => a.id);
        articleTags = await getArticleTags(env.DB, articleIds);
      }

      return html(renderSearch(query, articles, articleTags));
    }

    // Contact page
    if (path === '/contact') {
      const success = url.searchParams.get('success') === '1';
      return html(renderContact(success));
    }

    // ============================================
    // PUBLIC API
    // ============================================

    // Follow a story
    if (path === '/api/follow' && request.method === 'POST') {
      try {
        const body = await request.json() as { email: string; article_id: string };
        const { email, article_id } = body;
        if (!email || !article_id) return json({ success: false, error: 'Missing fields' }, 400);

        const id = generateId();
        await env.DB.prepare(
          'INSERT OR IGNORE INTO followers (id, email, article_id) VALUES (?, ?, ?)'
        ).bind(id, email, article_id).run();

        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Contact form submission
    if (path === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json() as { name: string; email: string; subject: string; message: string };
        const { name, email, subject, message } = body;
        if (!name || !email || !subject || !message) return json({ success: false, error: 'Missing fields' }, 400);

        const id = generateId();
        await env.DB.prepare(
          'INSERT INTO contacts (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)'
        ).bind(id, name, email, subject, message).run();

        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // ============================================
    // ADMIN ROUTES (protected by Cloudflare Access)
    // ============================================

    // Admin dashboard
    if (path === '/admin' || path === '/admin/') {
      const articles = await env.DB.prepare(
        'SELECT id, title, slug, published, featured, created_at, updated_at FROM articles ORDER BY created_at DESC'
      ).all<Article>();

      const articleIds = (articles.results || []).map(a => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);

      const unreadResult = await env.DB.prepare('SELECT COUNT(*) as count FROM contacts WHERE read = 0').first<{ count: number }>();
      const unreadContacts = unreadResult?.count || 0;

      return html(renderAdmin(articles.results || [], articleTags, unreadContacts));
    }

    // New article page
    if (path === '/admin/new') {
      const allTags = await env.DB.prepare('SELECT id, name, slug FROM tags ORDER BY name').all<Tag>();
      return html(renderNewArticle(allTags.results || []));
    }

    // Edit article - /e/:id
    if (path.startsWith('/e/')) {
      const id = path.slice(3);
      const article = await env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first<Article>();

      if (!article) return html(render404(), 404);

      const tagsResult = await env.DB.prepare(
        `SELECT t.id, t.name, t.slug FROM tags t
         JOIN article_tags at ON t.id = at.tag_id
         WHERE at.article_id = ?`
      ).bind(id).all<Tag>();

      const allTags = await env.DB.prepare('SELECT id, name, slug FROM tags ORDER BY name').all<Tag>();

      return html(renderEditor(article, tagsResult.results || [], allTags.results || []));
    }

    // Admin contacts
    if (path === '/admin/contacts') {
      const contacts = await env.DB.prepare(
        'SELECT * FROM contacts ORDER BY read ASC, created_at DESC'
      ).all<Contact>();

      return html(renderContacts(contacts.results || []));
    }

    // ============================================
    // ADMIN API
    // ============================================

    // List articles (filter with ?published=0 for drafts)
    if (path === '/api/articles' && request.method === 'GET') {
      const publishedParam = url.searchParams.get('published');
      let articles;
      if (publishedParam !== null) {
        articles = await env.DB.prepare(
          'SELECT id, title, slug, excerpt, published, featured, created_at, updated_at FROM articles WHERE published = ? ORDER BY created_at DESC'
        ).bind(parseInt(publishedParam)).all<Article>();
      } else {
        articles = await env.DB.prepare(
          'SELECT id, title, slug, excerpt, published, featured, created_at, updated_at FROM articles ORDER BY created_at DESC'
        ).all<Article>();
      }
      const articleIds = (articles.results || []).map(a => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);
      return json({ articles: articles.results || [], tags: articleTags });
    }

    // Get single article
    if (path.startsWith('/api/articles/') && request.method === 'GET') {
      const id = path.slice(14);
      const article = await env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first<Article>();
      if (!article) return json({ error: 'Not found' }, 404);
      const tagsResult = await env.DB.prepare(
        'SELECT t.id, t.name, t.slug FROM tags t JOIN article_tags at ON t.id = at.tag_id WHERE at.article_id = ?'
      ).bind(id).all<Tag>();
      return json({ article, tags: tagsResult.results || [] });
    }

    // List tags
    if (path === '/api/tags' && request.method === 'GET') {
      const tags = await env.DB.prepare('SELECT id, name, slug FROM tags ORDER BY name').all<Tag>();
      return json({ tags: tags.results || [] });
    }

    // Create article
    if (path === '/api/articles' && request.method === 'POST') {
      try {
        const body = await request.json() as {
          title: string; slug: string; content: string;
          excerpt?: string; published?: boolean; featured?: boolean; tags?: string[];
        };
        const id = generateId();
        const { title, slug, content, excerpt, published, featured, tags } = body;

        await env.DB.prepare(
          'INSERT INTO articles (id, title, slug, content, excerpt, published, featured) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, title, slug, content, excerpt || null, published ? 1 : 0, featured ? 1 : 0).run();

        if (tags && tags.length > 0) {
          await syncArticleTags(env.DB, id, tags);
        }

        return json({ success: true, id, slug });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Update article
    if (path.startsWith('/api/articles/') && request.method === 'PUT') {
      try {
        const id = path.slice(14);
        const body = await request.json() as {
          title: string; slug: string; content: string;
          excerpt?: string; published?: boolean; featured?: boolean; tags?: string[];
        };
        const { title, slug, content, excerpt, published, featured, tags } = body;

        await env.DB.prepare(
          `UPDATE articles SET title = ?, slug = ?, content = ?, excerpt = ?, published = ?, featured = ?, updated_at = datetime('now') WHERE id = ?`
        ).bind(title, slug, content, excerpt || null, published ? 1 : 0, featured ? 1 : 0, id).run();

        if (tags) {
          await syncArticleTags(env.DB, id, tags);
        }

        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Delete article
    if (path.startsWith('/api/articles/') && request.method === 'DELETE') {
      try {
        const id = path.slice(14);
        await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Preview markdown
    if (path === '/api/preview' && request.method === 'POST') {
      try {
        const body = await request.json() as { content: string };
        const htmlContent = await parseMarkdown(body.content);
        return json({ html: htmlContent });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Delete contact
    if (path.match(/^\/api\/contacts\/[^/]+$/) && request.method === 'DELETE') {
      try {
        const id = path.slice(14);
        await env.DB.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // Mark contact as read
    if (path.match(/^\/api\/contacts\/[^/]+\/read$/) && request.method === 'PUT') {
      try {
        const id = path.slice(14, -5); // Remove /api/contacts/ and /read
        await env.DB.prepare('UPDATE contacts SET read = 1 WHERE id = ?').bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }

    // 404
    return html(render404(), 404);
  },
};
