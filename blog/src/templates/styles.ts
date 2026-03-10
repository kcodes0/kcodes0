// Shared styles matching kcodes.me brutalist dark theme
export const baseStyles = `
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

export const themeScript = `
  <script>
    (function() {
      // Force dark theme always
      document.documentElement.setAttribute('data-theme', 'dark');
    })();
  </script>
`;

export const themeToggleHTML = '';

export const baseHead = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>K</text></svg>">
  ${themeScript}
  <style>${baseStyles}</style>
`;
