import { baseHead } from './styles';
import { diagramStyles, diagramScripts, diagramInitScript } from './diagrams';

interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string | null;
  published?: number;
  featured?: number;
  created_at: string;
  updated_at?: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const publicStyles = `
  .header {
    padding: 8rem 2rem 4rem;
    border-bottom: 2px solid #2a2825;
  }

  .header h1 {
    font-size: clamp(6rem, 20vw, 15rem);
    font-weight: 900;
    line-height: 0.85;
    letter-spacing: -0.06em;
    text-transform: uppercase;
    color: #d5d0c8;
  }

  .header h1 span {
    color: #a8c8e8;
  }

  .header p {
    margin-top: 2rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: #5a5650;
  }

  .back-link {
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 10;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4640;
    transition: color 0.15s ease;
  }

  .back-link:hover {
    color: #a8c8e8;
  }

  /* Search bar */
  .search-bar {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #1e1d1b;
  }

  .search-bar form {
    display: flex;
    gap: 0;
  }

  .search-bar input {
    flex: 1;
    padding: 0.75rem 1rem;
    background: #1e1d1b;
    border: 1px solid #2a2825;
    border-right: none;
    color: #d5d0c8;
    font-size: 0.9rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .search-bar input:focus {
    outline: none;
    border-color: #a8c8e8;
  }

  .search-bar input::placeholder {
    color: #4a4640;
  }

  .search-bar button {
    padding: 0.75rem 1.5rem;
    background: #a8c8e8;
    color: #141312;
    border: 1px solid #a8c8e8;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    transition: background 0.15s ease;
  }

  .search-bar button:hover {
    background: #d5d0c8;
    border-color: #d5d0c8;
  }

  /* Tag bar */
  .tag-bar {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid #1e1d1b;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tag-bar::-webkit-scrollbar {
    display: none;
  }

  .tag-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0.75rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8a8680;
    border: 1px solid #2a2825;
    white-space: nowrap;
    transition: all 0.15s ease;
    text-decoration: none;
  }

  .tag-badge:hover, .tag-badge.active {
    color: #a8c8e8;
    border-color: #a8c8e8;
    background: rgba(168, 200, 232, 0.05);
  }

  .tag-badge-sm {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.5rem;
    font-size: 0.55rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6a6660;
    border: 1px solid #2a2825;
    white-space: nowrap;
    transition: all 0.15s ease;
    text-decoration: none;
  }

  .tag-badge-sm:hover {
    color: #a8c8e8;
    border-color: #a8c8e8;
  }

  /* Featured hero */
  .featured-hero {
    padding: 3rem 2rem;
    border-bottom: 2px solid #2a2825;
    display: block;
    text-decoration: none;
    color: #d5d0c8;
    transition: background 0.15s ease;
  }

  .featured-hero:hover {
    background: #1e1d1b;
  }

  .featured-label {
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #a8c8e8;
    margin-bottom: 1rem;
  }

  .featured-hero h2 {
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 1rem;
  }

  .featured-hero .featured-excerpt {
    font-size: 0.9rem;
    color: #6a6660;
    max-width: 600px;
    line-height: 1.6;
  }

  .featured-hero .featured-meta {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    align-items: center;
  }

  /* Articles list */
  .articles {
    display: flex;
    flex-direction: column;
  }

  .article-card {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 1.2rem 2rem;
    border-bottom: 1px solid #1e1d1b;
    text-decoration: none;
    color: #d5d0c8;
    transition: all 0.15s ease;
  }

  .article-card:hover {
    background: #1e1d1b;
  }

  .article-card:hover .article-title {
    color: #f0ece4;
  }

  .article-card:hover .article-idx {
    color: #a8c8e8;
  }

  .article-idx {
    font-size: 0.7rem;
    font-weight: 400;
    color: #4a4640;
    min-width: 2rem;
    font-variant-numeric: tabular-nums;
    transition: color 0.15s;
  }

  .article-body {
    flex: 1;
    min-width: 0;
  }

  .article-title {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    transition: color 0.15s;
  }

  .article-tags {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.4rem;
    flex-wrap: wrap;
  }

  .article-date {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    border: 1px solid #3a3835;
    padding: 0.2rem 0.5rem;
    text-transform: uppercase;
    color: #6a6660;
    white-space: nowrap;
  }

  .empty-state {
    text-align: center;
    padding: 6rem 2rem;
  }

  .empty-state p {
    font-size: 2rem;
    font-weight: 900;
    color: #2a2825;
    margin-bottom: 0.5rem;
  }

  .empty-state span {
    color: #4a4640;
    font-size: 0.8rem;
  }

  .footer {
    padding: 3rem 2rem;
    border-top: 2px solid #2a2825;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-left {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: #4a4640;
  }

  .footer-right {
    font-size: 5rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .footer-right span {
    color: #a8c8e8;
  }

  /* Article single view */
  .article-back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4640;
    transition: color 0.15s ease;
    padding: 2rem 0;
  }

  .article-back-link:hover {
    color: #a8c8e8;
  }

  .article-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #2a2825;
  }

  .article-header time {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4640;
    display: inline-block;
    border: 1px solid #3a3835;
    padding: 0.2rem 0.5rem;
    margin-bottom: 1.5rem;
  }

  .article-header h1 {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: #d5d0c8;
    margin-bottom: 1rem;
  }

  .article-header .excerpt {
    font-size: 1rem;
    color: #5a5650;
    font-style: normal;
  }

  .article-header-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .article-content {
    padding-bottom: 4rem;
  }

  /* Related articles */
  .related-section {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }

  .related-section h3 {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #4a4640;
    margin-bottom: 1rem;
  }

  .related-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .related-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid #1e1d1b;
    text-decoration: none;
    color: #d5d0c8;
    transition: all 0.15s ease;
  }

  .related-item:hover {
    border-color: #2a2825;
    background: #1e1d1b;
  }

  .related-item .related-title {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    flex: 1;
  }

  .related-item .related-date {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: #4a4640;
  }

  /* Tag page header */
  .tag-page-header {
    padding: 4rem 2rem 2rem;
    border-bottom: 2px solid #2a2825;
  }

  .tag-page-header h1 {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: #d5d0c8;
  }

  .tag-page-header h1 span {
    color: #a8c8e8;
  }

  .tag-page-header p {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #5a5650;
  }

  /* Search results */
  .search-header {
    padding: 3rem 2rem 2rem;
    border-bottom: 2px solid #2a2825;
  }

  .search-header h1 {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #d5d0c8;
  }

  .search-header h1 span {
    color: #a8c8e8;
  }

  .search-header p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #5a5650;
  }

  /* Contact page */
  .contact-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .contact-header {
    padding: 4rem 0 2rem;
    border-bottom: 2px solid #2a2825;
    margin-bottom: 2rem;
  }

  .contact-header h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: #d5d0c8;
  }

  .contact-header p {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #5a5650;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-form label {
    display: block;
    margin-bottom: 0.5rem;
    color: #5a5650;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #1e1d1b;
    border: 1px solid #2a2825;
    color: #d5d0c8;
    font-size: 0.95rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .contact-form textarea {
    min-height: 180px;
    resize: vertical;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: #a8c8e8;
  }

  .contact-success {
    padding: 3rem 0;
    text-align: center;
  }

  .contact-success h2 {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #4ade80;
    margin-bottom: 1rem;
  }

  .contact-success p {
    font-size: 0.85rem;
    color: #5a5650;
  }

  .article-footer {
    padding: 3rem 0;
    border-top: 2px solid #2a2825;
  }

  .article-footer a {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4640;
  }

  .article-footer a:hover {
    color: #a8c8e8;
  }
`;

export function renderHome(articles: Article[], tags: Tag[], featured: Article | null, articleTags: Record<string, Tag[]>): string {
  const tagBar = tags.length > 0
    ? `<div class="tag-bar animate-in delay-1">${tags.map(t =>
        `<a href="/tag/${t.slug}" class="tag-badge">${escapeHtml(t.name)}</a>`
      ).join('')}</div>`
    : '';

  const featuredHero = featured
    ? `<a href="/a/${featured.slug}" class="featured-hero animate-in delay-1">
        <div class="featured-label">FEATURED</div>
        <h2>${escapeHtml(featured.title)}</h2>
        ${featured.excerpt ? `<p class="featured-excerpt">${escapeHtml(featured.excerpt)}</p>` : ''}
        <div class="featured-meta">
          <span class="article-date">${formatDate(featured.created_at)}</span>
          ${(articleTags[featured.id] || []).map(t =>
            `<a href="/tag/${t.slug}" class="tag-badge-sm">${escapeHtml(t.name)}</a>`
          ).join('')}
        </div>
      </a>`
    : '';

  const nonFeatured = articles.filter(a => !featured || a.id !== featured.id);
  const articlesList = nonFeatured.length > 0
    ? nonFeatured.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.15 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, '0')}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml(article.title)}</div>
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(t =>
                  `<span class="tag-badge-sm">${escapeHtml(t.name)}</span>`
                ).join('')}
              </div>
            ` : ''}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join('')
    : (!featured ? `
        <div class="empty-state animate-in delay-1">
          <p>NOTHING HERE YET</p>
          <span>check back soon</span>
        </div>
      ` : '');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>NEWS — KONA</title>
      <meta name="description" content="opinionated takes on what's happening">
      <style>${publicStyles}</style>
    </head>
    <body>
      <a href="https://kcodes.me" class="back-link animate-in">&larr; KCODES.ME</a>

      <header class="header animate-in">
        <h1>NE<br/><span>WS</span></h1>
        <p>opinionated takes on what's happening</p>
      </header>

      <div class="search-bar animate-in delay-1">
        <form action="/search" method="GET">
          <input type="text" name="q" placeholder="search articles..." autocomplete="off">
          <button type="submit">SEARCH</button>
        </form>
      </div>

      ${tagBar}
      ${featuredHero}

      <main class="articles">
        ${articlesList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${new Date().getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}

export function renderArticle(article: Article, htmlContent: string, tags: Tag[], relatedArticles: Article[]): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${escapeHtml(article.title)} — KONA NEWS</title>
      <meta name="description" content="${escapeHtml(article.excerpt || article.title)}">
      ${diagramScripts}
      <style>${diagramStyles}</style>
      <style>${publicStyles}</style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="article-back-link animate-in">&larr; BACK TO NEWS</a>

        <article>
          <header class="article-header animate-in delay-1">
            <time>${formatDate(article.created_at)}</time>
            <h1>${escapeHtml(article.title)}</h1>
            ${article.excerpt ? `<p class="excerpt">${escapeHtml(article.excerpt)}</p>` : ''}
            ${tags.length > 0 ? `
              <div class="article-header-tags">
                ${tags.map(t =>
                  `<a href="/tag/${t.slug}" class="tag-badge">${escapeHtml(t.name)}</a>`
                ).join('')}
              </div>
            ` : ''}
          </header>

          <div class="article-content prose animate-in delay-2">
            ${htmlContent}
          </div>
        </article>

        ${relatedArticles.length > 0 ? `
          <div class="related-section animate-in delay-3">
            <h3>RELATED ARTICLES</h3>
            <div class="related-list">
              ${relatedArticles.map(r => `
                <a href="/a/${r.slug}" class="related-item">
                  <span class="related-title">${escapeHtml(r.title)}</span>
                  <span class="related-date">${formatDate(r.created_at)}</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <footer class="article-footer animate-in delay-3">
          <a href="/">&larr; MORE ARTICLES</a>
        </footer>
      </div>

      ${diagramInitScript}
    </body>
    </html>
  `;
}

export function renderTagPage(tag: Tag, articles: Article[], articleTags: Record<string, Tag[]>): string {
  const articlesList = articles.length > 0
    ? articles.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.1 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, '0')}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml(article.title)}</div>
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(t =>
                  `<span class="tag-badge-sm${t.id === tag.id ? ' active' : ''}">${escapeHtml(t.name)}</span>`
                ).join('')}
              </div>
            ` : ''}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join('')
    : `
        <div class="empty-state animate-in delay-1">
          <p>NO ARTICLES</p>
          <span>nothing tagged with "${escapeHtml(tag.name)}" yet</span>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${escapeHtml(tag.name)} — KONA NEWS</title>
      <style>${publicStyles}</style>
    </head>
    <body>
      <a href="/" class="back-link animate-in">&larr; ALL NEWS</a>

      <header class="tag-page-header animate-in">
        <h1><span>#</span>${escapeHtml(tag.name)}</h1>
        <p>${articles.length} article${articles.length !== 1 ? 's' : ''}</p>
      </header>

      <main class="articles">
        ${articlesList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${new Date().getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}

export function renderSearch(query: string, articles: Article[], articleTags: Record<string, Tag[]>): string {
  const articlesList = articles.length > 0
    ? articles.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.1 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, '0')}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml(article.title)}</div>
            ${article.excerpt ? `<p style="font-size: 0.8rem; color: #5a5650; margin-top: 0.3rem;">${escapeHtml(article.excerpt)}</p>` : ''}
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(t =>
                  `<span class="tag-badge-sm">${escapeHtml(t.name)}</span>`
                ).join('')}
              </div>
            ` : ''}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join('')
    : `
        <div class="empty-state animate-in delay-1">
          <p>NO RESULTS</p>
          <span>nothing matched "${escapeHtml(query)}"</span>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>Search: ${escapeHtml(query)} — KONA NEWS</title>
      <style>${publicStyles}</style>
    </head>
    <body>
      <a href="/" class="back-link animate-in">&larr; ALL NEWS</a>

      <div class="search-bar animate-in">
        <form action="/search" method="GET">
          <input type="text" name="q" placeholder="search articles..." value="${escapeHtml(query)}" autocomplete="off">
          <button type="submit">SEARCH</button>
        </form>
      </div>

      <div class="search-header animate-in delay-1">
        <h1>RESULTS FOR <span>"${escapeHtml(query)}"</span></h1>
        <p>${articles.length} article${articles.length !== 1 ? 's' : ''} found</p>
      </div>

      <main class="articles">
        ${articlesList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${new Date().getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}

export function renderContact(success: boolean = false): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>CONTACT — KONA NEWS</title>
      <style>${publicStyles}</style>
    </head>
    <body>
      <div class="contact-container">
        <a href="/" class="article-back-link animate-in">&larr; BACK TO NEWS</a>

        <header class="contact-header animate-in">
          <h1>CONTACT</h1>
          <p>got a tip or want to reach out? drop a message.</p>
        </header>

        ${success ? `
          <div class="contact-success animate-in delay-1">
            <h2>SENT</h2>
            <p>your message has been received. thanks for reaching out.</p>
            <a href="/" class="btn btn-ghost" style="margin-top: 2rem;">BACK TO NEWS</a>
          </div>
        ` : `
          <form class="contact-form animate-in delay-1" id="contact-form" onsubmit="return submitContact(event)">
            <div>
              <label for="contact-name">NAME</label>
              <input type="text" id="contact-name" name="name" placeholder="your name" required>
            </div>
            <div>
              <label for="contact-email">EMAIL</label>
              <input type="email" id="contact-email" name="email" placeholder="your email" required>
            </div>
            <div>
              <label for="contact-subject">SUBJECT</label>
              <input type="text" id="contact-subject" name="subject" placeholder="what's this about?" required>
            </div>
            <div>
              <label for="contact-message">MESSAGE</label>
              <textarea id="contact-message" name="message" placeholder="your message..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="align-self: flex-start;">SEND MESSAGE</button>
          </form>
        `}
      </div>

      <script>
        async function submitContact(e) {
          e.preventDefault();
          const data = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
          };
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
              window.location.href = '/contact?success=1';
            }
          } catch (err) {
            console.error('Contact error:', err);
          }
          return false;
        }
      </script>
    </body>
    </html>
  `;
}

export function render404(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>404 — KONA NEWS</title>
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }

        h1 {
          font-size: clamp(6rem, 20vw, 12rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          color: #2a2825;
          line-height: 1;
        }

        p {
          color: #4a4640;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="animate-in">404</h1>
        <p class="animate-in delay-1">couldn't find that one</p>
        <a href="/" class="btn btn-ghost animate-in delay-2">BACK TO NEWS</a>
      </div>
    </body>
    </html>
  `;
}
