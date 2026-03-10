import { baseHead } from './styles';
import { diagramStyles, diagramScripts, diagramInitScript } from './diagrams';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
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

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .post-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    margin: 0 -1.25rem;
    border-radius: 8px;
    transition: background 0.2s ease;
  }

  .post-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .post-info {
    flex: 1;
    min-width: 0;
  }

  .post-info h3 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-info h3 a {
    color: #d5d0c8;
  }

  .post-info h3 a:hover {
    color: #a8c8e8;
  }

  .post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: #5a5650;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  .post-meta .status {
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .post-meta .status.published {
    background: rgba(74, 222, 128, 0.1);
    color: #4ade80;
  }

  .post-meta .status.draft {
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
  }

  .post-actions {
    display: flex;
    gap: 0.5rem;
  }

  .post-actions a, .post-actions button {
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
  }

  .editor-meta {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid #1e1d1b;
    flex-shrink: 0;
    align-items: end;
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

  .form-row {
    display: flex;
    gap: 1rem;
  }

  .form-group.full {
    grid-column: 1 / -1;
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

    .form-group.slug-group {
      max-width: none;
    }
  }
`;

export function renderAdmin(posts: Post[]): string {
  const postsList = posts.length > 0
    ? posts.map((post, i) => `
        <div class="post-item animate-in" style="animation-delay: ${0.1 + i * 0.05}s">
          <div class="post-info">
            <h3><a href="/e/${post.id}">${post.title}</a></h3>
            <div class="post-meta">
              <span>/p/${post.slug}</span>
              <span>${formatDate(post.created_at)}</span>
              <span class="status ${post.published ? 'published' : 'draft'}">${post.published ? 'live' : 'draft'}</span>
            </div>
          </div>
          <div class="post-actions">
            <a href="/e/${post.id}" class="btn btn-ghost">edit</a>
            ${post.published ? `<a href="/p/${post.slug}" class="btn btn-ghost" target="_blank">view</a>` : ''}
          </div>
        </div>
      `).join('')
    : `
        <div class="empty-state">
          <p>no posts yet</p>
          <a href="/admin/new" class="btn btn-primary">write your first post</a>
        </div>
      `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>admin — kona_/blog</title>
      <style>${adminStyles}</style>
    </head>
    <body>
      <div class="container">
        <header class="admin-header animate-in">
          <h1><span>kona_</span>/admin</h1>
          <a href="/admin/new" class="btn btn-primary">new post</a>
        </header>

        <main class="posts-list">
          ${postsList}
        </main>
      </div>
    </body>
    </html>
  `;
}

export function renderNewPost(): string {
  return renderEditorPage({
    id: '',
    title: '',
    slug: '',
    content: '',
    excerpt: null,
    published: 0,
    created_at: '',
    updated_at: ''
  }, true);
}

export function renderEditor(post: Post): string {
  return renderEditorPage(post, false);
}

function renderEditorPage(post: Post, isNew: boolean): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${isNew ? 'new post' : `edit: ${post.title}`} — kona_/blog</title>
      <style>${adminStyles}</style>
      <style>${diagramStyles}</style>
      ${diagramScripts}
    </head>
    <body style="overflow: hidden;">
      <div class="editor-container">
        <header class="editor-header">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="/admin" style="color: #4a4640; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;">← BACK</a>
            <h1>${isNew ? 'NEW POST' : 'EDIT POST'}</h1>
          </div>
          <div class="editor-actions">
            ${!isNew ? `<button type="button" class="btn btn-danger" onclick="deletePost()">DELETE</button>` : ''}
            <div class="checkbox-group">
              <input type="checkbox" id="published" name="published" ${post.published ? 'checked' : ''}>
              <label for="published">PUBLISH</label>
            </div>
            <button type="button" class="btn btn-primary" onclick="savePost()">
              ${isNew ? 'SAVE' : 'SAVE'}
            </button>
          </div>
        </header>

        <form id="post-form" style="display: contents;">
          <div class="editor-meta">
            <div class="form-group">
              <label for="title">TITLE</label>
              <input type="text" id="title" name="title" value="${escapeHtml(post.title)}" placeholder="Post title" required style="font-size: 1.1rem; font-weight: 700;">
            </div>
            <div class="form-group slug-group">
              <label for="slug">SLUG</label>
              <input type="text" id="slug" name="slug" value="${escapeHtml(post.slug)}" placeholder="url-slug" required style="font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.85rem;">
            </div>
            <div class="form-group excerpt-group">
              <label for="excerpt">EXCERPT</label>
              <input type="text" id="excerpt" name="excerpt" value="${escapeHtml(post.excerpt || '')}" placeholder="Brief description for previews">
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
                <button type="button" onclick="insertMd('- ','')" title="List">—</button>
                <button type="button" onclick="insertMd('---\\n','')" title="Horizontal rule">hr</button>
              </div>
              <textarea id="content" name="content" placeholder="Write your post in markdown..." spellcheck="false">${escapeHtml(post.content)}</textarea>
            </div>
            <div class="editor-pane">
              <h3>PREVIEW</h3>
              <div id="preview" class="preview-pane prose ${post.content ? '' : 'empty'}">
                ${post.content ? '' : 'preview will appear here...'}
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
        const postId = '${post.id}';
        const textarea = document.getElementById('content');
        let previewTimeout;

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
            savePost();
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

        // Mark slug as manually edited
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
        async function savePost() {
          const data = {
            title: document.getElementById('title').value,
            slug: document.getElementById('slug').value,
            content: textarea.value,
            excerpt: document.getElementById('excerpt').value || null,
            published: document.getElementById('published').checked
          };

          if (!data.title || !data.slug || !data.content) {
            return;
          }

          try {
            const url = isNew ? '/api/posts' : '/api/posts/' + postId;
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
        async function deletePost() {
          if (!confirm('Delete this post?')) return;

          try {
            const res = await fetch('/api/posts/' + postId, { method: 'DELETE' });
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
