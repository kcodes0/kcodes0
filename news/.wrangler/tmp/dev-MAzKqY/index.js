var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-YEIEGt/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/bundle-YEIEGt/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// src/templates/styles.ts
var baseStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: #141312;
    color: #d5d0c8;
    min-height: 100vh;
    line-height: 1.6;
  }

  ::selection {
    background: #a8c8e8;
    color: #141312;
  }

  a {
    color: #d5d0c8;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  a:hover {
    color: #a8c8e8;
  }

  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
    z-index: 1;
  }

  /* Typography for blog content */
  .prose {
    color: #8a8680;
    font-size: 1.05rem;
    line-height: 1.8;
  }

  .prose h1, .prose h2, .prose h3, .prose h4 {
    color: #d5d0c8;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: 2.5rem 0 1rem;
    line-height: 1.2;
  }

  .prose h1 { font-size: 2rem; }
  .prose h2 { font-size: 1.4rem; }
  .prose h3 { font-size: 1.1rem; }

  .prose p {
    margin-bottom: 1.5rem;
  }

  .prose a {
    color: #a8c8e8;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: #3a3835;
  }

  .prose a:hover {
    text-decoration-color: #a8c8e8;
  }

  .prose code {
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
    background: #1e1d1b;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    color: #a8c8e8;
  }

  .prose pre {
    background: #1e1d1b;
    border: 1px solid #2a2825;
    border-radius: 0;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .prose pre code {
    background: none;
    padding: 0;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #d5d0c8;
  }

  .prose blockquote {
    border-left: 3px solid #a8c8e8;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #6a6660;
  }

  .prose ul, .prose ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  .prose li {
    margin-bottom: 0.5rem;
  }

  .prose img {
    max-width: 100%;
    margin: 1.5rem 0;
  }

  .prose hr {
    border: none;
    border-top: 1px solid #2a2825;
    margin: 2rem 0;
  }

  .prose strong {
    color: #d5d0c8;
    font-weight: 700;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .btn-primary {
    background: #a8c8e8;
    color: #141312;
  }

  .btn-primary:hover {
    background: #d5d0c8;
    color: #141312;
  }

  .btn-ghost {
    background: transparent;
    color: #6a6660;
    border: 1px solid #2a2825;
  }

  .btn-ghost:hover {
    border-color: #a8c8e8;
    color: #a8c8e8;
  }

  .btn-danger {
    background: transparent;
    color: #c44;
    border: 1px solid rgba(204, 68, 68, 0.3);
  }

  .btn-danger:hover {
    background: rgba(204, 68, 68, 0.1);
    border-color: #c44;
  }

  /* Form elements */
  input, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #1e1d1b;
    border: 1px solid #2a2825;
    border-radius: 0;
    color: #d5d0c8;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    transition: border-color 0.15s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #a8c8e8;
  }

  textarea {
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
    resize: vertical;
    min-height: 300px;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #5a5650;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in {
    animation: fadeIn 0.4s ease forwards;
  }

  .delay-1 { animation-delay: 0.1s; opacity: 0; }
  .delay-2 { animation-delay: 0.2s; opacity: 0; }
  .delay-3 { animation-delay: 0.3s; opacity: 0; }
`;
var themeScript = `
  <script>
    (function() {
      // Force dark theme always
      document.documentElement.setAttribute('data-theme', 'dark');
    })();
  <\/script>
`;
var baseHead = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>K</text></svg>">
  ${themeScript}
  <style>${baseStyles}</style>
`;

// src/templates/diagrams.ts
var diagramStyles = `
  /* Diagram container styles */
  .diagram-container {
    margin: 1.5rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid #2a2825;
    border-radius: 8px;
    overflow-x: auto;
  }

  .diagram-container.mermaid-diagram {
    text-align: center;
  }

  .diagram-container.mermaid-diagram svg {
    max-width: 100%;
    height: auto;
  }

  .diagram-container.chart-diagram {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .diagram-container.chart-diagram canvas {
    max-width: 100%;
  }

  .diagram-container.ascii-diagram {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.4;
    white-space: pre;
    overflow-x: auto;
  }

  .diagram-error {
    color: #c44;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85rem;
    padding: 1rem;
    background: rgba(204, 68, 68, 0.1);
    border-radius: 4px;
  }

  .mermaid-diagram {
    --mermaid-bg: transparent;
  }

  .mermaid-diagram text {
    fill: #d5d0c8 !important;
  }
`;
var diagramScripts = `
  <!-- Mermaid.js for diagrams -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
  <!-- Chart.js for data visualizations -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4"><\/script>
`;
var diagramInitScript = `
  <script>
    (function() {
      // Initialize Mermaid with theme support
      function initMermaid() {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#a8c8e8',
            primaryTextColor: '#d5d0c8',
            primaryBorderColor: '#2a2825',
            lineColor: '#5a5650',
            secondaryColor: '#2a2825',
            tertiaryColor: '#1e1d1b',
            background: '#141312',
            mainBkg: '#1e1d1b',
            nodeBorder: '#a8c8e8',
            clusterBkg: '#1e1d1b',
            titleColor: '#d5d0c8',
            edgeLabelBackground: '#1e1d1b'
          },
          flowchart: { curve: 'basis', padding: 20 },
          sequence: { actorMargin: 50, messageMargin: 40 },
          gantt: { leftPadding: 75, gridLineStartPadding: 35 }
        });
      }

      // Render all Mermaid diagrams
      async function renderMermaidDiagrams() {
        const diagrams = document.querySelectorAll('.mermaid-source');
        for (const el of diagrams) {
          const container = el.closest('.diagram-container');
          const code = el.textContent;
          try {
            const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
            const { svg } = await mermaid.render(id, code);
            container.innerHTML = svg;
            container.classList.add('mermaid-rendered');
          } catch (err) {
            container.innerHTML = '<div class="diagram-error">Diagram error: ' + err.message + '</div>';
            console.error('Mermaid error:', err);
          }
        }
      }

      // Render all Chart.js diagrams
      function renderChartDiagrams() {
        const charts = document.querySelectorAll('.chart-source');
        charts.forEach(el => {
          const container = el.closest('.diagram-container');
          const code = el.textContent;
          try {
            const config = JSON.parse(code);
            const textColor = '#d5d0c8';
            const gridColor = 'rgba(213, 208, 200, 0.1)';

            // Site accent color palette for chart data
            const accentPalette = ['#a8c8e8', '#8ab0d0', '#6a98b8', '#d5d0c8', '#8a8680', '#5a5650'];

            // Apply theme colors to config
            if (!config.options) config.options = {};
            if (!config.options.plugins) config.options.plugins = {};
            if (!config.options.plugins.legend) config.options.plugins.legend = {};
            config.options.plugins.legend.labels = { color: textColor };

            // Apply accent colors to datasets if no colors specified
            if (config.data && config.data.datasets) {
              config.data.datasets.forEach((dataset, i) => {
                const color = accentPalette[i % accentPalette.length];
                if (!dataset.backgroundColor) {
                  dataset.backgroundColor = config.type === 'line'
                    ? color + '33' : color;
                }
                if (!dataset.borderColor) {
                  dataset.borderColor = color;
                }
                if (config.type === 'line' && dataset.borderWidth === undefined) {
                  dataset.borderWidth = 2;
                }
              });
            }

            if (!config.options.scales) config.options.scales = {};
            ['x', 'y'].forEach(axis => {
              if (!config.options.scales[axis]) config.options.scales[axis] = {};
              config.options.scales[axis].ticks = { color: textColor };
              config.options.scales[axis].grid = { color: gridColor };
            });

            // Create canvas and render chart
            const canvas = document.createElement('canvas');
            container.innerHTML = '';
            container.appendChild(canvas);
            new Chart(canvas.getContext('2d'), config);
            container.classList.add('chart-rendered');
          } catch (err) {
            container.innerHTML = '<div class="diagram-error">Chart error: ' + err.message + '</div>';
            console.error('Chart.js error:', err);
          }
        });
      }

      // Main render function
      window.renderDiagrams = async function() {
        if (typeof mermaid !== 'undefined') {
          initMermaid();
          await renderMermaidDiagrams();
        }
        if (typeof Chart !== 'undefined') {
          renderChartDiagrams();
        }
      };

      // Re-render on theme change
      const originalToggle = document.getElementById('theme-toggle');
      if (originalToggle) {
        originalToggle.addEventListener('click', () => {
          setTimeout(() => {
            // Re-initialize and re-render diagrams with new theme
            window.renderDiagrams();
          }, 700);
        });
      }

      // Initial render when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.renderDiagrams);
      } else {
        window.renderDiagrams();
      }
    })();
  <\/script>
`;
var DIAGRAM_TYPES = {
  // Mermaid diagram types
  mermaid: [
    "mermaid",
    "flowchart",
    "sequenceDiagram",
    "classDiagram",
    "stateDiagram",
    "erDiagram",
    "gantt",
    "pie",
    "journey",
    "gitGraph",
    "mindmap",
    "timeline",
    "quadrantChart",
    "sankey",
    "xychart"
  ],
  // Chart.js types
  chart: ["chart", "barchart", "linechart", "piechart", "doughnut", "radar", "polar"],
  // ASCII art
  ascii: ["ascii", "diagram", "art"]
};
function transformDiagramBlock(lang, code) {
  const langLower = lang.toLowerCase();
  if (DIAGRAM_TYPES.mermaid.includes(langLower)) {
    const mermaidCode = langLower === "mermaid" ? code : code;
    return `<div class="diagram-container mermaid-diagram"><div class="mermaid-source" style="display:none;">${escapeHtml(mermaidCode)}</div><div class="diagram-loading">Loading diagram...</div></div>`;
  }
  if (DIAGRAM_TYPES.chart.includes(langLower)) {
    return `<div class="diagram-container chart-diagram"><div class="chart-source" style="display:none;">${escapeHtml(code)}</div><div class="diagram-loading">Loading chart...</div></div>`;
  }
  if (DIAGRAM_TYPES.ascii.includes(langLower)) {
    return `<div class="diagram-container ascii-diagram">${escapeHtml(code)}</div>`;
  }
  return null;
}
__name(transformDiagramBlock, "transformDiagramBlock");
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml, "escapeHtml");

// src/templates/public.ts
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
__name(formatDate, "formatDate");
function escapeHtml2(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml2, "escapeHtml");
var publicStyles = `
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

  /* Follow section */
  .follow-section {
    padding: 2rem 0;
    border-top: 2px solid #2a2825;
    border-bottom: 2px solid #2a2825;
    margin-bottom: 3rem;
  }

  .follow-section h3 {
    font-size: 0.8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d5d0c8;
    margin-bottom: 0.5rem;
  }

  .follow-section .follow-count {
    font-size: 0.7rem;
    color: #5a5650;
    margin-bottom: 1rem;
  }

  .follow-form {
    display: flex;
    gap: 0;
  }

  .follow-form input {
    flex: 1;
    padding: 0.6rem 1rem;
    background: #1e1d1b;
    border: 1px solid #2a2825;
    border-right: none;
    color: #d5d0c8;
    font-size: 0.85rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .follow-form input:focus {
    outline: none;
    border-color: #a8c8e8;
  }

  .follow-form button {
    padding: 0.6rem 1.5rem;
    background: #a8c8e8;
    color: #141312;
    border: 1px solid #a8c8e8;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    transition: background 0.15s ease;
  }

  .follow-form button:hover {
    background: #d5d0c8;
    border-color: #d5d0c8;
  }

  .follow-success {
    font-size: 0.8rem;
    color: #4ade80;
    display: none;
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
function renderHome(articles, tags, featured, articleTags) {
  const tagBar = tags.length > 0 ? `<div class="tag-bar animate-in delay-1">${tags.map(
    (t) => `<a href="/tag/${t.slug}" class="tag-badge">${escapeHtml2(t.name)}</a>`
  ).join("")}</div>` : "";
  const featuredHero = featured ? `<a href="/a/${featured.slug}" class="featured-hero animate-in delay-1">
        <div class="featured-label">FEATURED</div>
        <h2>${escapeHtml2(featured.title)}</h2>
        ${featured.excerpt ? `<p class="featured-excerpt">${escapeHtml2(featured.excerpt)}</p>` : ""}
        <div class="featured-meta">
          <span class="article-date">${formatDate(featured.created_at)}</span>
          ${(articleTags[featured.id] || []).map(
    (t) => `<a href="/tag/${t.slug}" class="tag-badge-sm">${escapeHtml2(t.name)}</a>`
  ).join("")}
        </div>
      </a>` : "";
  const nonFeatured = articles.filter((a) => !featured || a.id !== featured.id);
  const articlesList = nonFeatured.length > 0 ? nonFeatured.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.15 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, "0")}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml2(article.title)}</div>
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(
    (t) => `<span class="tag-badge-sm">${escapeHtml2(t.name)}</span>`
  ).join("")}
              </div>
            ` : ""}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join("") : !featured ? `
        <div class="empty-state animate-in delay-1">
          <p>NOTHING HERE YET</p>
          <span>check back soon</span>
        </div>
      ` : "";
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>NEWS \u2014 KONA</title>
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
        <span class="footer-left">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}
__name(renderHome, "renderHome");
function renderArticle(article, htmlContent, tags, followerCount, relatedArticles) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${escapeHtml2(article.title)} \u2014 KONA NEWS</title>
      <meta name="description" content="${escapeHtml2(article.excerpt || article.title)}">
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
            <h1>${escapeHtml2(article.title)}</h1>
            ${article.excerpt ? `<p class="excerpt">${escapeHtml2(article.excerpt)}</p>` : ""}
            ${tags.length > 0 ? `
              <div class="article-header-tags">
                ${tags.map(
    (t) => `<a href="/tag/${t.slug}" class="tag-badge">${escapeHtml2(t.name)}</a>`
  ).join("")}
              </div>
            ` : ""}
          </header>

          <div class="article-content prose animate-in delay-2">
            ${htmlContent}
          </div>
        </article>

        <div class="follow-section animate-in delay-2">
          <h3>FOLLOW THIS STORY</h3>
          <p class="follow-count">${followerCount} following</p>
          <div id="follow-form-wrapper">
            <form class="follow-form" id="follow-form" onsubmit="return followStory(event)">
              <input type="email" id="follow-email" placeholder="your email" required>
              <button type="submit">FOLLOW</button>
            </form>
          </div>
          <p class="follow-success" id="follow-success">You're now following this story.</p>
        </div>

        ${relatedArticles.length > 0 ? `
          <div class="related-section animate-in delay-3">
            <h3>RELATED ARTICLES</h3>
            <div class="related-list">
              ${relatedArticles.map((r) => `
                <a href="/a/${r.slug}" class="related-item">
                  <span class="related-title">${escapeHtml2(r.title)}</span>
                  <span class="related-date">${formatDate(r.created_at)}</span>
                </a>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <footer class="article-footer animate-in delay-3">
          <a href="/">&larr; MORE ARTICLES</a>
        </footer>
      </div>

      <script>
        async function followStory(e) {
          e.preventDefault();
          const email = document.getElementById('follow-email').value;
          try {
            const res = await fetch('/api/follow', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, article_id: '${article.id}' })
            });
            const data = await res.json();
            if (data.success) {
              document.getElementById('follow-form-wrapper').style.display = 'none';
              document.getElementById('follow-success').style.display = 'block';
            }
          } catch (err) {
            console.error('Follow error:', err);
          }
          return false;
        }
      <\/script>
      ${diagramInitScript}
    </body>
    </html>
  `;
}
__name(renderArticle, "renderArticle");
function renderTagPage(tag2, articles, articleTags) {
  const articlesList = articles.length > 0 ? articles.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.1 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, "0")}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml2(article.title)}</div>
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(
    (t) => `<span class="tag-badge-sm${t.id === tag2.id ? " active" : ""}">${escapeHtml2(t.name)}</span>`
  ).join("")}
              </div>
            ` : ""}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join("") : `
        <div class="empty-state animate-in delay-1">
          <p>NO ARTICLES</p>
          <span>nothing tagged with "${escapeHtml2(tag2.name)}" yet</span>
        </div>
      `;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${escapeHtml2(tag2.name)} \u2014 KONA NEWS</title>
      <style>${publicStyles}</style>
    </head>
    <body>
      <a href="/" class="back-link animate-in">&larr; ALL NEWS</a>

      <header class="tag-page-header animate-in">
        <h1><span>#</span>${escapeHtml2(tag2.name)}</h1>
        <p>${articles.length} article${articles.length !== 1 ? "s" : ""}</p>
      </header>

      <main class="articles">
        ${articlesList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}
__name(renderTagPage, "renderTagPage");
function renderSearch(query, articles, articleTags) {
  const articlesList = articles.length > 0 ? articles.map((article, i) => `
        <a href="/a/${article.slug}" class="article-card animate-in" style="animation-delay: ${0.1 + i * 0.08}s">
          <span class="article-idx">${String(i + 1).padStart(2, "0")}</span>
          <div class="article-body">
            <div class="article-title">${escapeHtml2(article.title)}</div>
            ${article.excerpt ? `<p style="font-size: 0.8rem; color: #5a5650; margin-top: 0.3rem;">${escapeHtml2(article.excerpt)}</p>` : ""}
            ${(articleTags[article.id] || []).length > 0 ? `
              <div class="article-tags">
                ${(articleTags[article.id] || []).map(
    (t) => `<span class="tag-badge-sm">${escapeHtml2(t.name)}</span>`
  ).join("")}
              </div>
            ` : ""}
          </div>
          <span class="article-date">${formatDate(article.created_at)}</span>
        </a>
      `).join("") : `
        <div class="empty-state animate-in delay-1">
          <p>NO RESULTS</p>
          <span>nothing matched "${escapeHtml2(query)}"</span>
        </div>
      `;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>Search: ${escapeHtml2(query)} \u2014 KONA NEWS</title>
      <style>${publicStyles}</style>
    </head>
    <body>
      <a href="/" class="back-link animate-in">&larr; ALL NEWS</a>

      <div class="search-bar animate-in">
        <form action="/search" method="GET">
          <input type="text" name="q" placeholder="search articles..." value="${escapeHtml2(query)}" autocomplete="off">
          <button type="submit">SEARCH</button>
        </form>
      </div>

      <div class="search-header animate-in delay-1">
        <h1>RESULTS FOR <span>"${escapeHtml2(query)}"</span></h1>
        <p>${articles.length} article${articles.length !== 1 ? "s" : ""} found</p>
      </div>

      <main class="articles">
        ${articlesList}
      </main>

      <footer class="footer animate-in delay-3">
        <span class="footer-left">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} KONA</span>
        <span class="footer-right">K<span>.</span></span>
      </footer>
    </body>
    </html>
  `;
}
__name(renderSearch, "renderSearch");
function renderContact(success = false) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>CONTACT \u2014 KONA NEWS</title>
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
      <\/script>
    </body>
    </html>
  `;
}
__name(renderContact, "renderContact");
function render404() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>404 \u2014 KONA NEWS</title>
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
__name(render404, "render404");

// src/templates/admin.ts
function formatDate2(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
__name(formatDate2, "formatDate");
function escapeHtml3(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml3, "escapeHtml");
var adminStyles = `
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

  /* Editor styles \u2014 full-screen layout */
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
function renderAdmin(articles, articleTags, unreadContacts) {
  const articlesList = articles.length > 0 ? articles.map((article, i) => `
        <div class="article-item animate-in" style="animation-delay: ${0.1 + i * 0.05}s">
          <div class="article-info">
            <h3><a href="/e/${article.id}">${escapeHtml3(article.title)}</a></h3>
            <div class="article-meta">
              <span>/a/${escapeHtml3(article.slug)}</span>
              <span>${formatDate2(article.created_at)}</span>
              <span class="status ${article.published ? "published" : "draft"}">${article.published ? "live" : "draft"}</span>
              ${article.featured ? '<span class="status featured">featured</span>' : ""}
              ${(articleTags[article.id] || []).map(
    (t) => `<span class="tag-badge-admin">${escapeHtml3(t.name)}</span>`
  ).join("")}
            </div>
          </div>
          <div class="article-actions">
            <a href="/e/${article.id}" class="btn btn-ghost">edit</a>
            ${article.published ? `<a href="/a/${article.slug}" class="btn btn-ghost" target="_blank">view</a>` : ""}
          </div>
        </div>
      `).join("") : `
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
      <title>admin \u2014 kona_/news</title>
      <style>${adminStyles}</style>
    </head>
    <body>
      <div class="container">
        <header class="admin-header animate-in">
          <h1><span>kona_</span>/news</h1>
          <div class="admin-nav">
            <a href="/admin/contacts" class="admin-nav-link">
              contacts${unreadContacts > 0 ? `<span class="badge">${unreadContacts}</span>` : ""}
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
__name(renderAdmin, "renderAdmin");
function renderNewArticle(allTags) {
  return renderEditorPage({
    id: "",
    title: "",
    slug: "",
    content: "",
    excerpt: null,
    published: 0,
    featured: 0,
    created_at: "",
    updated_at: ""
  }, [], allTags, true);
}
__name(renderNewArticle, "renderNewArticle");
function renderEditor(article, tags, allTags) {
  return renderEditorPage(article, tags, allTags, false);
}
__name(renderEditor, "renderEditor");
function renderEditorPage(article, currentTags, allTags, isNew) {
  const existingTagsJson = JSON.stringify(currentTags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })));
  const allTagsJson = JSON.stringify(allTags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })));
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>${isNew ? "new article" : `edit: ${escapeHtml3(article.title)}`} \u2014 kona_/news</title>
      <style>${adminStyles}</style>
      <style>${diagramStyles}</style>
      ${diagramScripts}
    </head>
    <body style="overflow: hidden;">
      <div class="editor-container">
        <header class="editor-header">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="/admin" style="color: #4a4640; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;">&larr; BACK</a>
            <h1>${isNew ? "NEW ARTICLE" : "EDIT ARTICLE"}</h1>
          </div>
          <div class="editor-actions">
            ${!isNew ? `<button type="button" class="btn btn-danger" onclick="deleteArticle()">DELETE</button>` : ""}
            <div class="checkbox-group">
              <input type="checkbox" id="featured" name="featured" ${article.featured ? "checked" : ""}>
              <label for="featured">FEATURED</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="published" name="published" ${article.published ? "checked" : ""}>
              <label for="published">PUBLISH</label>
            </div>
            <button type="button" class="btn btn-primary" onclick="saveArticle()">SAVE</button>
          </div>
        </header>

        <form id="article-form" style="display: contents;">
          <div class="editor-meta">
            <div class="form-group">
              <label for="title">TITLE</label>
              <input type="text" id="title" name="title" value="${escapeHtml3(article.title)}" placeholder="Article title" required style="font-size: 1.1rem; font-weight: 700;">
            </div>
            <div class="form-group slug-group">
              <label for="slug">SLUG</label>
              <input type="text" id="slug" name="slug" value="${escapeHtml3(article.slug)}" placeholder="url-slug" required style="font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.85rem;">
            </div>
            <div class="form-group excerpt-group">
              <label for="excerpt">EXCERPT</label>
              <input type="text" id="excerpt" name="excerpt" value="${escapeHtml3(article.excerpt || "")}" placeholder="Brief description">
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
              <textarea id="content" name="content" placeholder="Write your article in markdown..." spellcheck="false">${escapeHtml3(article.content)}</textarea>
            </div>
            <div class="editor-pane">
              <h3>PREVIEW</h3>
              <div id="preview" class="preview-pane prose ${article.content ? "" : "empty"}">
                ${article.content ? "" : "preview will appear here..."}
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
      <\/script>
      ${diagramInitScript}
    </body>
    </html>
  `;
}
__name(renderEditorPage, "renderEditorPage");
function renderContacts(contacts) {
  const contactsList = contacts.length > 0 ? contacts.map((contact, i) => `
        <div class="contact-item ${contact.read ? "" : "unread"} animate-in" style="animation-delay: ${0.1 + i * 0.05}s" id="contact-${contact.id}">
          <div class="contact-header-row">
            <span class="contact-sender">
              ${escapeHtml3(contact.name)}
              <span class="contact-email">${escapeHtml3(contact.email)}</span>
            </span>
          </div>
          <div class="contact-subject">${escapeHtml3(contact.subject)}</div>
          <div class="contact-body">${escapeHtml3(contact.message)}</div>
          <div class="contact-footer-row">
            <span class="contact-date">${formatDate2(contact.created_at)}</span>
            <div class="contact-actions">
              ${!contact.read ? `<button class="btn btn-ghost" onclick="markRead('${contact.id}')">MARK READ</button>` : ""}
              <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">DELETE</button>
            </div>
          </div>
        </div>
      `).join("") : `
        <div class="empty-state">
          <p>no messages yet</p>
        </div>
      `;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${baseHead}
      <title>contacts \u2014 kona_/news</title>
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
      <\/script>
    </body>
    </html>
  `;
}
__name(renderContacts, "renderContacts");

// node_modules/marked/lib/marked.esm.js
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
__name(_getDefaults, "_getDefaults");
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
__name(changeDefaults, "changeDefaults");
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = /* @__PURE__ */ __name((ch) => escapeReplacements[ch], "getEscapeReplacement");
function escape$1(html3, encode) {
  if (encode) {
    if (escapeTest.test(html3)) {
      return html3.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html3)) {
      return html3.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html3;
}
__name(escape$1, "escape$1");
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html3) {
  return html3.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
__name(unescape, "unescape");
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  let source = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
__name(edit, "edit");
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
__name(cleanUrl, "cleanUrl");
var noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
__name(splitCells, "splitCells");
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
__name(rtrim, "rtrim");
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
__name(findClosingBracket, "findClosingBracket");
function outputLink(cap, link2, raw, lexer2) {
  const href = link2.href;
  const title = link2.title ? escape$1(link2.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape$1(text)
  };
}
__name(outputLink, "outputLink");
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
__name(indentCodeCompensation, "indentCodeCompensation");
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let text = cap[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
      text = rtrim(text.replace(/^ *>[ \t]?/gm, ""), "\n");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      list2.items[list2.items.length - 1].raw = raw.trimEnd();
      list2.items[list2.items.length - 1].text = itemContents.trimEnd();
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!/[:|]/.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
    const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (/^ *-+: *$/.test(align)) {
        item.align.push("right");
      } else if (/^ *:-+: *$/.test(align)) {
        item.align.push("center");
      } else if (/^ *:-+ *$/.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (const header of headers) {
      item.header.push({
        text: header,
        tokens: this.lexer.inline(header)
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell)
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$1(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$1(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = escape$1(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = cap[0];
      } else {
        text = escape$1(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
__name(_Tokenizer, "_Tokenizer");
var newline = /^(?: *(?:\n|$))+/;
var blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = "\\p{P}\\p{S}";
var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  escape: edit(escape).replace("])", "~|])").getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var _Lexer = class {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new _Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
__name(_Lexer, "_Lexer");
var _Renderer = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/^\S*/)?.[0];
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html3, block2) {
    return html3;
  }
  heading(text, level, raw) {
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text, task, checked) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag2 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(text) {
    return text;
  }
};
__name(_Renderer, "_Renderer");
var _TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
__name(_TextRenderer, "_TextRenderer");
var _Parser = class {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new _Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j = 0; j < tableToken.header.length; j++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j = 0; j < tableToken.rows.length; j++) {
            const row = tableToken.rows[j];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j = 0; j < listToken.items.length; j++) {
            const item = listToken.items[j];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox + " "
                  });
                }
              } else {
                itemBody += checkbox + " ";
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
__name(_Parser, "_Parser");
var _Hooks = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html3) {
    return html3;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
};
__name(_Hooks, "_Hooks");
__publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
  parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  #parseMarkdown(lexer2, parser2) {
    return (src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      if (this.defaults.async === true && origOpt.async === false) {
        if (!opt.silent) {
          console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
        }
        opt.async = true;
      }
      const throwError = this.#onError(!!opt.silent, !!opt.async);
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
      }
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html3) => opt.hooks ? opt.hooks.postprocess(html3) : html3).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html3 = parser2(tokens, opt);
        if (opt.hooks) {
          html3 = opt.hooks.postprocess(html3);
        }
        return html3;
      } catch (e) {
        return throwError(e);
      }
    };
  }
  #onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
__name(Marked, "Marked");
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
__name(marked, "marked");
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// src/index.ts
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}
__name(generateId, "generateId");
marked.use({
  renderer: {
    code(code, infostring, _escaped) {
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
async function parseMarkdown(content) {
  return await marked(content);
}
__name(parseMarkdown, "parseMarkdown");
async function getArticleTags(db, articleIds) {
  const result = {};
  if (articleIds.length === 0)
    return result;
  const placeholders = articleIds.map(() => "?").join(",");
  const rows = await db.prepare(
    `SELECT at.article_id, t.id, t.name, t.slug
     FROM article_tags at
     JOIN tags t ON t.id = at.tag_id
     WHERE at.article_id IN (${placeholders})
     ORDER BY t.name`
  ).bind(...articleIds).all();
  for (const row of rows.results || []) {
    if (!result[row.article_id])
      result[row.article_id] = [];
    result[row.article_id].push({ id: row.id, name: row.name, slug: row.slug });
  }
  return result;
}
__name(getArticleTags, "getArticleTags");
async function syncArticleTags(db, articleId, tagNames) {
  await db.prepare("DELETE FROM article_tags WHERE article_id = ?").bind(articleId).run();
  for (const name of tagNames) {
    const trimmed = name.trim();
    if (!trimmed)
      continue;
    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let tag2 = await db.prepare("SELECT id FROM tags WHERE slug = ?").bind(slug).first();
    if (!tag2) {
      const tagId = generateId();
      await db.prepare("INSERT INTO tags (id, name, slug) VALUES (?, ?, ?)").bind(tagId, trimmed, slug).run();
      tag2 = { id: tagId };
    }
    await db.prepare("INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)").bind(articleId, tag2.id).run();
  }
}
__name(syncArticleTags, "syncArticleTags");
function html2(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(html2, "html");
function json(data, status = 200) {
  return Response.json(data, { status });
}
__name(json, "json");
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/" || path === "") {
      const articles = await env.DB.prepare(
        "SELECT id, title, slug, excerpt, featured, created_at FROM articles WHERE published = 1 ORDER BY created_at DESC"
      ).all();
      const tags = await env.DB.prepare("SELECT id, name, slug FROM tags ORDER BY name").all();
      const articleIds = (articles.results || []).map((a) => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);
      const featured = (articles.results || []).find((a) => a.featured) || null;
      return html2(renderHome(articles.results || [], tags.results || [], featured, articleTags));
    }
    if (path.startsWith("/a/")) {
      const slug = path.slice(3);
      const article = await env.DB.prepare(
        "SELECT * FROM articles WHERE slug = ? AND published = 1"
      ).bind(slug).first();
      if (!article)
        return html2(render404(), 404);
      const htmlContent = await parseMarkdown(article.content);
      const tagsResult = await env.DB.prepare(
        `SELECT t.id, t.name, t.slug FROM tags t
         JOIN article_tags at ON t.id = at.tag_id
         WHERE at.article_id = ?`
      ).bind(article.id).all();
      const tags = tagsResult.results || [];
      const countResult = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM followers WHERE article_id = ?"
      ).bind(article.id).first();
      const followerCount = countResult?.count || 0;
      let relatedArticles = [];
      if (tags.length > 0) {
        const tagIds = tags.map((t) => t.id);
        const tagPlaceholders = tagIds.map(() => "?").join(",");
        const relatedResult = await env.DB.prepare(
          `SELECT DISTINCT a.id, a.title, a.slug, a.created_at
           FROM articles a
           JOIN article_tags at ON a.id = at.article_id
           WHERE at.tag_id IN (${tagPlaceholders})
             AND a.id != ?
             AND a.published = 1
           ORDER BY a.created_at DESC
           LIMIT 5`
        ).bind(...tagIds, article.id).all();
        relatedArticles = relatedResult.results || [];
      }
      return html2(renderArticle(article, htmlContent, tags, followerCount, relatedArticles));
    }
    if (path.startsWith("/tag/")) {
      const tagSlug = path.slice(5);
      const tag2 = await env.DB.prepare("SELECT * FROM tags WHERE slug = ?").bind(tagSlug).first();
      if (!tag2)
        return html2(render404(), 404);
      const articles = await env.DB.prepare(
        `SELECT a.id, a.title, a.slug, a.excerpt, a.created_at
         FROM articles a
         JOIN article_tags at ON a.id = at.article_id
         WHERE at.tag_id = ? AND a.published = 1
         ORDER BY a.created_at DESC`
      ).bind(tag2.id).all();
      const articleIds = (articles.results || []).map((a) => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);
      return html2(renderTagPage(tag2, articles.results || [], articleTags));
    }
    if (path === "/search") {
      const query = url.searchParams.get("q") || "";
      let articles = [];
      let articleTags = {};
      if (query.trim()) {
        const like = `%${query}%`;
        const result = await env.DB.prepare(
          `SELECT id, title, slug, excerpt, created_at FROM articles
           WHERE published = 1 AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)
           ORDER BY created_at DESC
           LIMIT 50`
        ).bind(like, like, like).all();
        articles = result.results || [];
        const articleIds = articles.map((a) => a.id);
        articleTags = await getArticleTags(env.DB, articleIds);
      }
      return html2(renderSearch(query, articles, articleTags));
    }
    if (path === "/contact") {
      const success = url.searchParams.get("success") === "1";
      return html2(renderContact(success));
    }
    if (path === "/api/follow" && request.method === "POST") {
      try {
        const body = await request.json();
        const { email, article_id } = body;
        if (!email || !article_id)
          return json({ success: false, error: "Missing fields" }, 400);
        const id = generateId();
        await env.DB.prepare(
          "INSERT OR IGNORE INTO followers (id, email, article_id) VALUES (?, ?, ?)"
        ).bind(id, email, article_id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path === "/api/contact" && request.method === "POST") {
      try {
        const body = await request.json();
        const { name, email, subject, message } = body;
        if (!name || !email || !subject || !message)
          return json({ success: false, error: "Missing fields" }, 400);
        const id = generateId();
        await env.DB.prepare(
          "INSERT INTO contacts (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)"
        ).bind(id, name, email, subject, message).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path === "/admin" || path === "/admin/") {
      const articles = await env.DB.prepare(
        "SELECT id, title, slug, published, featured, created_at, updated_at FROM articles ORDER BY created_at DESC"
      ).all();
      const articleIds = (articles.results || []).map((a) => a.id);
      const articleTags = await getArticleTags(env.DB, articleIds);
      const unreadResult = await env.DB.prepare("SELECT COUNT(*) as count FROM contacts WHERE read = 0").first();
      const unreadContacts = unreadResult?.count || 0;
      return html2(renderAdmin(articles.results || [], articleTags, unreadContacts));
    }
    if (path === "/admin/new") {
      const allTags = await env.DB.prepare("SELECT id, name, slug FROM tags ORDER BY name").all();
      return html2(renderNewArticle(allTags.results || []));
    }
    if (path.startsWith("/e/")) {
      const id = path.slice(3);
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article)
        return html2(render404(), 404);
      const tagsResult = await env.DB.prepare(
        `SELECT t.id, t.name, t.slug FROM tags t
         JOIN article_tags at ON t.id = at.tag_id
         WHERE at.article_id = ?`
      ).bind(id).all();
      const allTags = await env.DB.prepare("SELECT id, name, slug FROM tags ORDER BY name").all();
      return html2(renderEditor(article, tagsResult.results || [], allTags.results || []));
    }
    if (path === "/admin/contacts") {
      const contacts = await env.DB.prepare(
        "SELECT * FROM contacts ORDER BY read ASC, created_at DESC"
      ).all();
      return html2(renderContacts(contacts.results || []));
    }
    if (path === "/api/articles" && request.method === "POST") {
      try {
        const body = await request.json();
        const id = generateId();
        const { title, slug, content, excerpt, published, featured, tags } = body;
        await env.DB.prepare(
          "INSERT INTO articles (id, title, slug, content, excerpt, published, featured) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(id, title, slug, content, excerpt || null, published ? 1 : 0, featured ? 1 : 0).run();
        if (tags && tags.length > 0) {
          await syncArticleTags(env.DB, id, tags);
        }
        return json({ success: true, id, slug });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path.startsWith("/api/articles/") && request.method === "PUT") {
      try {
        const id = path.slice(14);
        const body = await request.json();
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
    if (path.startsWith("/api/articles/") && request.method === "DELETE") {
      try {
        const id = path.slice(14);
        await env.DB.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path === "/api/preview" && request.method === "POST") {
      try {
        const body = await request.json();
        const htmlContent = await parseMarkdown(body.content);
        return json({ html: htmlContent });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path.match(/^\/api\/contacts\/[^/]+$/) && request.method === "DELETE") {
      try {
        const id = path.slice(14);
        await env.DB.prepare("DELETE FROM contacts WHERE id = ?").bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    if (path.match(/^\/api\/contacts\/[^/]+\/read$/) && request.method === "PUT") {
      try {
        const id = path.slice(14, -5);
        await env.DB.prepare("UPDATE contacts SET read = 1 WHERE id = ?").bind(id).run();
        return json({ success: true });
      } catch (error) {
        return json({ success: false, error: String(error) }, 400);
      }
    }
    return html2(render404(), 404);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-YEIEGt/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-YEIEGt/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
