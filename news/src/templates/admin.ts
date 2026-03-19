import { baseHead } from './styles';
import { diagramStyles, diagramScripts, diagramInitScript } from './diagrams';

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

const adminStyles = `
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 1px solid #2a2825;
    margin-bottom: 2rem;
  }

  .admin-header h1 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .admin-header h1 span {
    color: #a8c8e8;
  }

  .admin-nav {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .admin-nav-link {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #5a5650;
    text-decoration: none;
    transition: color 0.15s ease;
    position: relative;
  }

  .admin-nav-link:hover {
    color: #a8c8e8;
  }

  .admin-nav-link .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 0.55rem;
    font-weight: 700;
    background: #c44;
    color: #fff;
    border-radius: 8px;
    margin-left: 0.3rem;
    vertical-align: top;
  }

  .articles-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    margin: 0 -1.25rem;
    border-radius: 8px;
    transition: background 0.2s ease;
  }

  .article-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .article-info {
    flex: 1;
    min-width: 0;
  }

  .article-info h3 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .article-info h3 a {
    color: #d5d0c8;
  }

  .article-info h3 a:hover {
    color: #a8c8e8;
  }

  .article-meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: #5a5650;
    font-family: 'SF Mono', 'Fira Code', monospace;
    align-items: center;
    flex-wrap: wrap;
  }

  .article-meta .status {
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .article-meta .status.published {
    background: rgba(74, 222, 128, 0.1);
    color: #4ade80;
  }

  .article-meta .status.draft {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .article-meta .status.featured {
    background: rgba(168, 200, 232, 0.1);
    color: #a8c8e8;
  }

  .article-meta .tag-badge-admin {
    display: inline-flex;
    align-items: center;
    padding: 0.1rem 0.4rem;
    font-size: 0.55rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6a6660;
    border: 1px solid #2a2825;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .article-actions {
    display: flex;
    gap: 0.5rem;
  }

  .article-actions a, .article-actions button {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #5a5650;
  }

  .empty-state p {
    margin-bottom: 1.5rem;
  }

  /* Editor styles — full-screen layout */
  .editor-container {
    padding: 0;
    max-width: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 2px solid #2a2825;
    flex-shrink: 0;
  }

  .editor-header h1 {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .editor-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .editor-meta {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid #1e1d1b;
    flex-shrink: 0;
    align-items: end;
    flex-wrap: wrap;
  }

  .form-group {
    margin-bottom: 0;
    flex: 1;
  }

  .form-group.slug-group {
    max-width: 280px;
  }

  .form-group.excerpt-group {
    flex: 2;
  }

  .form-group.tags-group {
    flex: 2;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 0.3rem;
  }

  .checkbox-group input[type="checkbox"] {
    width: auto;
    accent-color: #a8c8e8;
  }

  .checkbox-group label {
    margin: 0;
    color: #d5d0c8;
    cursor: pointer;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .editor-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .editor-pane {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .editor-pane:first-child {
    border-right: 1px solid #2a2825;
  }

  .editor-pane h3 {
    font-size: 0.65rem;
    font-weight: 400;
    color: #4a4640;
    padding: 0.6rem 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    border-bottom: 1px solid #1e1d1b;
    flex-shrink: 0;
  }

  .editor-pane textarea {
    flex: 1;
    min-height: 0;
    resize: none;
    border: none;
    border-radius: 0;
    padding: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.7;
    background: #141312;
    tab-size: 2;
  }

  .editor-pane textarea:focus {
    outline: none;
    border: none;
  }

  .preview-pane {
    background: #141312;
    border: none;
    border-radius: 0;
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  .preview-pane.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2a2825;
    font-style: italic;
    font-size: 0.9rem;
  }

  /* Markdown toolbar */
  .md-toolbar {
    display: flex;
    gap: 2px;
    padding: 0.4rem 1.5rem;
    border-bottom: 1px solid #1e1d1b;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .md-toolbar button {
    background: none;
    border: 1px solid transparent;
    color: #5a5650;
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    cursor: pointer;
    transition: all 0.1s ease;
    border-radius: 3px;
  }

  .md-toolbar button:hover {
    color: #a8c8e8;
    border-color: #2a2825;
    background: #1e1d1b;
  }

  .md-toolbar .sep {
    width: 1px;
    background: #1e1d1b;
    margin: 0.2rem 0.4rem;
  }

  /* Word count bar */
  .editor-status {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 2rem;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: #4a4640;
    border-top: 1px solid #1e1d1b;
    flex-shrink: 0;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  /* Contacts page */
  .contact-item {
    padding: 1.5rem;
    margin: 0 -1.5rem;
    border-bottom: 1px solid #1e1d1b;
    transition: background 0.2s ease;
  }

  .contact-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .contact-item.unread {
    border-left: 3px solid #a8c8e8;
    padding-left: calc(1.5rem - 3px);
  }

  .contact-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .contact-sender {
    font-size: 1rem;
    font-weight: 700;
    color: #d5d0c8;
  }

  .contact-sender .contact-email {
    font-weight: 400;
    font-size: 0.8rem;
    color: #5a5650;
    margin-left: 0.5rem;
  }

  .contact-subject {
    font-size: 0.9rem;
    color: #8a8680;
    margin-bottom: 0.5rem;
  }

  .contact-body {
    font-size: 0.85rem;
    color: #6a6660;
    line-height: 1.6;
    white-space: pre-wrap;
    max-height: 120px;
    overflow: hidden;
  }

  .contact-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
  }

  .contact-date {
    font-size: 0.7rem;
    color: #4a4640;
    letter-spacing: 0.1em;
  }

  .contact-actions {
    display: flex;
    gap: 0.5rem;
  }

  .contact-actions button {
    padding: 0.4rem 0.7rem;
    font-size: 0.7rem;
  }

  /* Tag input styles */
  .tag-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.5rem 0.75rem;
    background: #1e1d1b;
    border: 1px solid #2a2825;
    min-height: 38px;
    align-items: center;
    cursor: text;
    transition: border-color 0.15s ease;
  }

  .tag-input-wrapper:focus-within {
    border-color: #a8c8e8;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.15rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #a8c8e8;
    border: 1px solid rgba(168, 200, 232, 0.3);
    background: rgba(168, 200, 232, 0.05);
  }

  .tag-chip .tag-remove {
    cursor: pointer;
    opacity: 0.6;
    font-size: 0.8rem;
    line-height: 1;
  }

  .tag-chip .tag-remove:hover {
    opacity: 1;
  }

  .tag-input-field {
    border: none !important;
    background: none !important;
    padding: 0 !important;
    font-size: 0.8rem !important;
    color: #d5d0c8 !important;
    min-width: 80px;
    flex: 1;
    outline: none !important;
  }

  @media (max-width: 768px) {
    .editor-main {
      grid-template-columns: 1fr;
    }

    .editor-pane:first-child {
      border-right: none;
      border-bottom: 1px solid #2a2825;
    }

    .editor-meta {
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-group.slug-group,
    .form-group.tags-group {
      max-width: none;
    }
  }
`;

export function renderAdmin(articles: Article[], articleTags: Record<string, Tag[]>, unreadContacts: number): string {
  const articlesList = articles.length > 0
    ? articles.map((article, i) => `
        <div class="article-item animate-in" style="animation-delay: ${0.1 + i * 0.05}s">
          <div class="article-info">
            <h3><a href="/e/${article.id}">${escapeHtml(article.title)}</a></h3>
            <div class="article-meta">
              <span>/a/${escapeHtml(article.slug)}</span>
              <span>${formatDate(article.created_at)}</span>
              <span class="status ${article.published ? 'published' : 'draft'}">${article.published ? 'live' : 'draft'}</span>
              ${article.featured ? '<span class="status featured">featured</span>' : ''}
              ${(articleTags[article.id] || []).map(t =>
                `<span class="tag-badge-admin">${escapeHtml(t.name)}</span>`
              ).join('')}
            </div>
          </div>
          <div class="article-actions">
            <a href="/e/${article.id}" class="btn btn-ghost">edit</a>
            ${article.published ? `<a href="/a/${article.slug}" class="btn btn-ghost" target="_blank">view</a>` : ''}
          </div>
        </div>
      `).join('')
    : `
        <div class="empty-state">
          <p>no articles yet</p>
          <a href="/admin/new" class="btn btn-primary">write your first article</a>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>admin — kona_/news</title>
      <style>${adminStyles}</style>
    </head>
    <body>
      <div class="container">
        <header class="admin-header animate-in">
          <h1><span>kona_</span>/news</h1>
          <div class="admin-nav">
            <a href="/admin/contacts" class="admin-nav-link">
              contacts${unreadContacts > 0 ? `<span class="badge">${unreadContacts}</span>` : ''}
            </a>
            <a href="/admin/new" class="btn btn-primary">new article</a>
          </div>
        </header>

        <main class="articles-list">
          ${articlesList}
        </main>
      </div>
    </body>
    </html>
  `;
}

export function renderNewArticle(allTags: Tag[]): string {
  return renderEditorPage({
    id: '',
    title: '',
    slug: '',
    content: '',
    excerpt: null,
    published: 0,
    featured: 0,
    created_at: '',
    updated_at: ''
  }, [], allTags, true);
}

export function renderEditor(article: Article, tags: Tag[], allTags: Tag[]): string {
  return renderEditorPage(article, tags, allTags, false);
}

function renderEditorPage(article: Article, currentTags: Tag[], allTags: Tag[], isNew: boolean): string {
  const existingTagsJson = JSON.stringify(currentTags.map(t => ({ id: t.id, name: t.name, slug: t.slug })));
  const allTagsJson = JSON.stringify(allTags.map(t => ({ id: t.id, name: t.name, slug: t.slug })));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${isNew ? 'new article' : `edit: ${escapeHtml(article.title)}`} — kona_/news</title>
      <style>${adminStyles}</style>
      <style>${diagramStyles}</style>
      ${diagramScripts}
    </head>
    <body style="overflow: hidden;">
      <div class="editor-container">
        <header class="editor-header">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="/admin" style="color: #4a4640; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;">&larr; BACK</a>
            <h1>${isNew ? 'NEW ARTICLE' : 'EDIT ARTICLE'}</h1>
          </div>
          <div class="editor-actions">
            ${!isNew ? `<button type="button" class="btn btn-danger" onclick="deleteArticle()">DELETE</button>` : ''}
            <div class="checkbox-group">
              <input type="checkbox" id="featured" name="featured" ${article.featured ? 'checked' : ''}>
              <label for="featured">FEATURED</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="published" name="published" ${article.published ? 'checked' : ''}>
              <label for="published">PUBLISH</label>
            </div>
            <button type="button" class="btn btn-primary" onclick="saveArticle()">SAVE</button>
          </div>
        </header>

        <form id="article-form" style="display: contents;">
          <div class="editor-meta">
            <div class="form-group">
              <label for="title">TITLE</label>
              <input type="text" id="title" name="title" value="${escapeHtml(article.title)}" placeholder="Article title" required style="font-size: 1.1rem; font-weight: 700;">
            </div>
            <div class="form-group slug-group">
              <label for="slug">SLUG</label>
              <input type="text" id="slug" name="slug" value="${escapeHtml(article.slug)}" placeholder="url-slug" required style="font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.85rem;">
            </div>
            <div class="form-group excerpt-group">
              <label for="excerpt">EXCERPT</label>
              <input type="text" id="excerpt" name="excerpt" value="${escapeHtml(article.excerpt || '')}" placeholder="Brief description">
            </div>
            <div class="form-group tags-group">
              <label>TAGS</label>
              <div class="tag-input-wrapper" id="tag-input-wrapper" onclick="document.getElementById('tag-input').focus()">
                <input type="text" class="tag-input-field" id="tag-input" placeholder="add tags..." autocomplete="off">
              </div>
            </div>
          </div>

          <div class="editor-main">
            <div class="editor-pane">
              <h3>MARKDOWN</h3>
              <div class="md-toolbar">
                <button type="button" onclick="insertMd('**','**')" title="Bold">B</button>
                <button type="button" onclick="insertMd('*','*')" title="Italic"><em>I</em></button>
                <button type="button" onclick="insertMd('~~','~~')" title="Strikethrough"><s>S</s></button>
                <div class="sep"></div>
                <button type="button" onclick="insertMd('# ','')" title="Heading 1">H1</button>
                <button type="button" onclick="insertMd('## ','')" title="Heading 2">H2</button>
                <button type="button" onclick="insertMd('### ','')" title="Heading 3">H3</button>
                <div class="sep"></div>
                <button type="button" onclick="insertMd('[','](url)')" title="Link">[]</button>
                <button type="button" onclick="insertMd('![','](url)')" title="Image">img</button>
                <button type="button" onclick="insertMd('\`','\`')" title="Inline code">\`\`</button>
                <button type="button" onclick="insertBlock('\`\`\`\\n','\\n\`\`\`')" title="Code block">\`\`\`</button>
                <div class="sep"></div>
                <button type="button" onclick="insertMd('> ','')" title="Quote">&gt;</button>
                <button type="button" onclick="insertMd('- ','')" title="List">&mdash;</button>
                <button type="button" onclick="insertMd('---\\n','')" title="Horizontal rule">hr</button>
              </div>
              <textarea id="content" name="content" placeholder="Write your article in markdown..." spellcheck="false">${escapeHtml(article.content)}</textarea>
            </div>
            <div class="editor-pane">
              <h3>PREVIEW</h3>
              <div id="preview" class="preview-pane prose ${article.content ? '' : 'empty'}">
                ${article.content ? '' : 'preview will appear here...'}
              </div>
            </div>
          </div>
        </form>

        <div class="editor-status">
          <span id="word-count">0 words</span>
          <span id="char-count">0 chars</span>
          <span>Ctrl+S to save</span>
        </div>
      </div>

      <script>
        const isNew = ${isNew};
        const articleId = '${article.id}';
        const textarea = document.getElementById('content');
        let previewTimeout;

        // --- Tags ---
        let currentTags = ${existingTagsJson};
        const allKnownTags = ${allTagsJson};

        function renderTags() {
          const wrapper = document.getElementById('tag-input-wrapper');
          const input = document.getElementById('tag-input');
          // Remove existing chips
          wrapper.querySelectorAll('.tag-chip').forEach(el => el.remove());
          // Add chips before input
          currentTags.forEach((tag, idx) => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.innerHTML = tag.name + ' <span class="tag-remove" onclick="removeTag(' + idx + ')">&times;</span>';
            wrapper.insertBefore(chip, input);
          });
        }

        function removeTag(idx) {
          currentTags.splice(idx, 1);
          renderTags();
        }

        document.getElementById('tag-input').addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = this.value.trim().replace(/,/g, '');
            if (val && !currentTags.find(t => t.name.toLowerCase() === val.toLowerCase())) {
              const existing = allKnownTags.find(t => t.name.toLowerCase() === val.toLowerCase());
              if (existing) {
                currentTags.push(existing);
              } else {
                currentTags.push({ id: '', name: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') });
              }
              this.value = '';
              renderTags();
            }
          }
          if (e.key === 'Backspace' && !this.value && currentTags.length > 0) {
            currentTags.pop();
            renderTags();
          }
        });

        renderTags();

        // --- Word / char count ---
        function updateCounts() {
          const text = textarea.value;
          const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
          document.getElementById('word-count').textContent = words + ' word' + (words !== 1 ? 's' : '');
          document.getElementById('char-count').textContent = text.length + ' chars';
        }
        updateCounts();

        // --- Markdown toolbar helpers ---
        function insertMd(before, after) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const selected = textarea.value.substring(start, end);
          const replacement = before + (selected || 'text') + after;
          textarea.setRangeText(replacement, start, end, 'select');
          textarea.focus();
          triggerPreview();
        }

        function insertBlock(before, after) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const selected = textarea.value.substring(start, end);
          const replacement = before.replace(/\\\\n/g, '\\n') + (selected || '') + after.replace(/\\\\n/g, '\\n');
          textarea.setRangeText(replacement, start, end, 'select');
          textarea.focus();
          triggerPreview();
        }

        // --- Tab key support ---
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            textarea.setRangeText('  ', start, start, 'end');
            triggerPreview();
          }
        });

        // --- Ctrl+S / Cmd+S to save ---
        document.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveArticle();
          }
        });

        // --- Auto-generate slug from title ---
        document.getElementById('title').addEventListener('input', (e) => {
          if (isNew || !document.getElementById('slug').dataset.manual) {
            const slug = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            document.getElementById('slug').value = slug;
          }
        });

        document.getElementById('slug').addEventListener('input', () => {
          document.getElementById('slug').dataset.manual = '1';
        });

        // --- Live preview ---
        function triggerPreview() {
          clearTimeout(previewTimeout);
          updateCounts();
          previewTimeout = setTimeout(() => updatePreview(textarea.value), 300);
        }

        textarea.addEventListener('input', triggerPreview);

        async function updatePreview(content) {
          const preview = document.getElementById('preview');
          if (!content.trim()) {
            preview.innerHTML = 'preview will appear here...';
            preview.classList.add('empty');
            return;
          }

          try {
            const res = await fetch('/api/preview', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content })
            });
            const data = await res.json();
            preview.innerHTML = data.html;
            preview.classList.remove('empty');
            if (typeof window.renderDiagrams === 'function') {
              await window.renderDiagrams();
            }
          } catch (err) {
            console.error('Preview error:', err);
          }
        }

        // --- Save ---
        async function saveArticle() {
          const data = {
            title: document.getElementById('title').value,
            slug: document.getElementById('slug').value,
            content: textarea.value,
            excerpt: document.getElementById('excerpt').value || null,
            published: document.getElementById('published').checked,
            featured: document.getElementById('featured').checked,
            tags: currentTags.map(t => t.name)
          };

          if (!data.title || !data.slug || !data.content) {
            return;
          }

          try {
            const url = isNew ? '/api/articles' : '/api/articles/' + articleId;
            const method = isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
              window.location.href = '/admin';
            }
          } catch (err) {
            console.error('Save error:', err);
          }
        }

        // --- Delete ---
        async function deleteArticle() {
          if (!confirm('Delete this article?')) return;

          try {
            const res = await fetch('/api/articles/' + articleId, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
              window.location.href = '/admin';
            }
          } catch (err) {
            console.error('Delete error:', err);
          }
        }

        // --- Initial preview ---
        if (textarea.value) {
          updatePreview(textarea.value);
        }
      </script>
      ${diagramInitScript}
    </body>
    </html>
  `;
}

export function renderContacts(contacts: Contact[]): string {
  const contactsList = contacts.length > 0
    ? contacts.map((contact, i) => `
        <div class="contact-item ${contact.read ? '' : 'unread'} animate-in" style="animation-delay: ${0.1 + i * 0.05}s" id="contact-${contact.id}">
          <div class="contact-header-row">
            <span class="contact-sender">
              ${escapeHtml(contact.name)}
              <span class="contact-email">${escapeHtml(contact.email)}</span>
            </span>
          </div>
          <div class="contact-subject">${escapeHtml(contact.subject)}</div>
          <div class="contact-body">${escapeHtml(contact.message)}</div>
          <div class="contact-footer-row">
            <span class="contact-date">${formatDate(contact.created_at)}</span>
            <div class="contact-actions">
              ${!contact.read ? `<button class="btn btn-ghost" onclick="markRead('${contact.id}')">MARK READ</button>` : ''}
              <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">DELETE</button>
            </div>
          </div>
        </div>
      `).join('')
    : `
        <div class="empty-state">
          <p>no messages yet</p>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>contacts — kona_/news</title>
      <style>${adminStyles}</style>
    </head>
    <body>
      <div class="container">
        <header class="admin-header animate-in">
          <h1><span>kona_</span>/contacts</h1>
          <a href="/admin" class="btn btn-ghost">&larr; DASHBOARD</a>
        </header>

        <main>
          ${contactsList}
        </main>
      </div>

      <script>
        async function markRead(id) {
          try {
            const res = await fetch('/api/contacts/' + id + '/read', { method: 'PUT' });
            const data = await res.json();
            if (data.success) {
              const el = document.getElementById('contact-' + id);
              el.classList.remove('unread');
              el.querySelector('.btn.btn-ghost')?.remove();
            }
          } catch (err) {
            console.error('Error:', err);
          }
        }

        async function deleteContact(id) {
          if (!confirm('Delete this message?')) return;
          try {
            const res = await fetch('/api/contacts/' + id, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
              document.getElementById('contact-' + id).remove();
            }
          } catch (err) {
            console.error('Error:', err);
          }
        }
      </script>
    </body>
    </html>
  `;
}
