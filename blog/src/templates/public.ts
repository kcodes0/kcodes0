import { baseHead } from './styles';
import { diagramStyles, diagramScripts, diagramInitScript } from './diagrams';

interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string | null;
  published?: number;
  created_at: string;
  updated_at?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function renderHome(posts: Post[]): string {
  const postsList = posts.length > 0
    ? posts.map((post, i) => `
        <a href="/p/${post.slug}" class="post-card animate-in" style="animation-delay: ${0.1 + i * 0.1}s">
          <span class="post-idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="post-title">${post.title}</span>
          <span class="post-date">${formatDate(post.created_at)}</span>
        </a>
      `).join('')
    : `
        <div class="empty-state animate-in delay-1">
          <p>NOTHING HERE YET</p>
          <span>check back soon</span>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>BLOG — KONA</title>
      <meta name="description" content="thoughts and things by kona">
      <style>
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

        .posts {
          display: flex;
          flex-direction: column;
        }

        .post-card {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid #1e1d1b;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.15s ease;
        }

        .post-card:hover {
          background: #1e1d1b;
        }

        .post-card:hover .post-title {
          color: #f0ece4;
        }

        .post-card:hover .post-idx {
          color: #a8c8e8;
        }

        .post-idx {
          font-size: 0.7rem;
          font-weight: 400;
          color: #4a4640;
          min-width: 2rem;
          font-variant-numeric: tabular-nums;
          transition: color 0.15s;
        }

        .post-title {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          flex: 1;
          transition: color 0.15s;
        }

        .post-date {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          border: 1px solid #3a3835;
          padding: 0.2rem 0.5rem;
          text-transform: uppercase;
          color: #6a6660;
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
      </style>
    </head>
    <body>
      <a href="https://kcodes.me" class="back-link animate-in">← KCODES.ME</a>

      <header class="header animate-in">
        <h1>BL<br/><span>OG</span></h1>
        <p>thoughts, projects, and random things</p>
      </header>

      <main class="posts">
        ${postsList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${new Date().getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}

export function renderPost(post: Post, htmlContent: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${post.title} — KONA</title>
      <meta name="description" content="${post.excerpt || post.title}">
      ${diagramScripts}
      <style>${diagramStyles}</style>
      <style>
        .back-link {
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

        .back-link:hover {
          color: #a8c8e8;
        }

        .post-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #2a2825;
        }

        .post-header time {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4a4640;
          display: inline-block;
          border: 1px solid #3a3835;
          padding: 0.2rem 0.5rem;
          margin-bottom: 1.5rem;
        }

        .post-header h1 {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #d5d0c8;
          margin-bottom: 1rem;
        }

        .post-header .excerpt {
          font-size: 1rem;
          color: #5a5650;
          font-style: normal;
        }

        .post-content {
          padding-bottom: 4rem;
        }

        .footer {
          padding: 3rem 0;
          border-top: 2px solid #2a2825;
        }

        .footer a {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4a4640;
        }

        .footer a:hover {
          color: #a8c8e8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="back-link animate-in">← BACK TO BLOG</a>

        <article>
          <header class="post-header animate-in delay-1">
            <time>${formatDate(post.created_at)}</time>
            <h1>${post.title}</h1>
            ${post.excerpt ? `<p class="excerpt">${post.excerpt}</p>` : ''}
          </header>

          <div class="post-content prose animate-in delay-2">
            ${htmlContent}
          </div>
        </article>

        <footer class="footer animate-in delay-3">
          <a href="/">← MORE POSTS</a>
        </footer>
      </div>
      ${diagramInitScript}
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
      <title>404 — KONA</title>
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
        <a href="/" class="btn btn-ghost animate-in delay-2">BACK TO BLOG</a>
      </div>
    </body>
    </html>
  `;
}

export function renderNotFound(): string {
  return render404();
}
