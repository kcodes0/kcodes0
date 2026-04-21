import { useEffect, useState, createContext, useContext, useCallback } from "react";
import "./index.css";
import FunHome from "./pages/FunHome";

// ============================================
// Theme Context
// ============================================
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e: React.MouseEvent) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
    }
    return 'dark';
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [splashOrigin, setSplashOrigin] = useState({ x: 0, y: 0 });
  const [pendingTheme, setPendingTheme] = useState<Theme | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    if (isAnimating) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setSplashOrigin({ x, y });
    setPendingTheme(theme === 'light' ? 'dark' : 'light');
    setIsAnimating(true);
  }, [theme, isAnimating]);

  // Handle animation completion
  useEffect(() => {
    if (isAnimating && pendingTheme) {
      const timer = setTimeout(() => {
        setTheme(pendingTheme);
        setPendingTheme(null);

        // Small delay before removing animation state
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 600); // Match CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating, pendingTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
      {/* Splash overlay for theme transition */}
      {isAnimating && pendingTheme && (
        <div
          className={`theme-splash theme-splash-${pendingTheme}`}
          style={{
            '--splash-x': `${splashOrigin.x}px`,
            '--splash-y': `${splashOrigin.y}px`,
          } as React.CSSProperties}
        />
      )}
    </ThemeContext.Provider>
  );
}

// ============================================
// Theme Toggle Button
// ============================================
function ThemeToggle() {
  const { theme, toggleTheme, isAnimating } = useTheme();

  return (
    <button
      className={`theme-toggle ${isAnimating ? 'animating' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      disabled={isAnimating}
    >
      <span className="theme-toggle-icon">
        {theme === 'light' ? (
          // Moon icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </span>
    </button>
  );
}


// ============================================
// Now Page
// ============================================
const NOW_SECTIONS = [
  {
    title: 'Working on',
    items: [
      'Building out this portfolio site',
      'Duck Lang — a programming language where you say "quack"',
      'Various Cloudflare Workers experiments',
    ],
  },
  {
    title: 'Watching',
    items: [
      'Rewatching old films for the catalog',
      'Whatever catches my eye on Letterboxd',
    ],
  },
  {
    title: 'Listening to',
    items: [
      'A lot of ambient and electronic stuff',
      'Podcast backlog that never shrinks',
    ],
  },
  {
    title: 'Reading',
    items: [
      'Technical docs, always',
      'History books when I get the chance',
    ],
  },
];

function NowPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#141312',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .now-back:hover { color: #a8c8e8 !important; }
        .now-link:hover { color: #d5d0c8 !important; }
      `}</style>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>
        <a href="/" className="now-back" style={{
          display: 'inline-block', fontSize: '0.75rem', color: '#6a6660',
          textDecoration: 'none', marginBottom: '2rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', transition: 'color 0.15s',
        }}>← Back</a>

        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          N<span style={{ color: '#a8c8e8' }}>OW</span>
        </h1>
        <p style={{
          fontSize: '0.75rem', color: '#6a6660', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          What I'm up to these days
        </p>
        <time style={{
          fontSize: '0.65rem', color: '#4a4640', letterSpacing: '0.1em',
          textTransform: 'uppercase', fontStyle: 'italic',
        }}>
          Last updated: January 2025
        </time>

        <div style={{ marginTop: '3rem' }}>
          {NOW_SECTIONS.map((section) => (
            <div key={section.title} style={{
              border: '1px solid #2a2825', padding: '1.25rem 1.5rem',
              marginBottom: '1rem',
            }}>
              <h2 style={{
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#a8c8e8', fontWeight: 700, marginBottom: '1rem',
                paddingBottom: '0.5rem', borderBottom: '1px solid #2a2825',
              }}>
                {section.title}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.items.map((item) => (
                  <li key={item} style={{
                    fontSize: '0.9rem', color: '#b5b0a8', lineHeight: 1.8,
                    paddingLeft: '0.75rem', position: 'relative',
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#4a4640' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.75rem', color: '#4a4640', textAlign: 'center',
          marginTop: '3rem', fontStyle: 'italic',
        }}>
          This is a{' '}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer"
            className="now-link" style={{ color: '#a8c8e8', textDecoration: 'underline',
            textUnderlineOffset: '2px', transition: 'color 0.15s' }}>
            /now page
          </a>. You should make one too.
        </p>
      </div>

      <footer style={{
        maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem',
        borderTop: '2px solid #2a2825', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a4640' }}>
          &copy; {new Date().getFullYear()} KONA
        </span>
        <span style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
          K<span style={{ color: '#a8c8e8' }}>.</span>
        </span>
      </footer>
    </div>
  );
}

// ============================================
// Uses Page
// ============================================
function UsesPage() {
  const { theme } = useTheme();
  const categories = [
    {
      title: 'Editor & Terminal',
      items: [
        { name: 'VS Code', note: 'with vim keybindings' },
        { name: 'Cursor', note: 'for AI-assisted coding' },
        { name: 'iTerm2', note: 'with tmux' },
        { name: 'zsh', note: 'with oh-my-zsh' },
      ]
    },
    {
      title: 'Dev Tools',
      items: [
        { name: 'Bun', note: 'faster than Node, no regrets' },
        { name: 'Git', note: 'obviously' },
        { name: 'GitHub', note: 'for everything' },
        { name: 'Cloudflare', note: 'Workers, D1, Pages' },
      ]
    },
    {
      title: 'Languages',
      items: [
        { name: 'TypeScript', note: 'daily driver' },
        { name: 'Rust', note: 'for fun and systems stuff' },
        { name: 'Python', note: 'when I need it' },
      ]
    },
    {
      title: 'Apps',
      items: [
        { name: 'Arc', note: 'browser of choice' },
        { name: 'Raycast', note: 'replaced Spotlight entirely' },
        { name: 'Discord', note: 'always open' },
        { name: 'Notion', note: 'for notes and planning' },
      ]
    },
    {
      title: 'Hardware',
      items: [
        { name: 'MacBook Pro', note: 'M-series' },
        { name: 'Mechanical keyboard', note: 'clicky sounds are essential' },
      ]
    },
  ];

  return (
    <div className="page">
      <ThemeToggle />

      <header className="subpage-header">
        <a href="/" className="back-link">← Back</a>
        <h1 className="subpage-title">Uses</h1>
        <p className="subpage-subtitle">Tools, software, and setup</p>
      </header>

      <main className="uses-content">
        {categories.map((category) => (
          <section key={category.title} className="uses-section">
            <h2 className="uses-heading">{category.title}</h2>
            <ul className="uses-list">
              {category.items.map((item) => (
                <li key={item.name} className="uses-item">
                  <span className="uses-name">{item.name}</span>
                  {item.note && <span className="uses-note">— {item.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="uses-note-footer">
          Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">uses.tech</a>
        </p>
      </main>

      <footer className="footer">
        <div className="footer-rule" />
        <p className="footer-text">
          <span className="footer-year">{new Date().getFullYear()}</span>
          <span className="footer-divider">·</span>
          <span>Made with questionable sleep habits</span>
        </p>
      </footer>
    </div>
  );
}

// ============================================
// Labs Page
// ============================================
const LABS_PROJECTS = [
  {
    id: 'duck',
    title: 'Duck Lang',
    description: 'A programming language where you have to say "quack" or the goose won\'t run your code. The goose has opinions and rates your code from 1-10.',
    tech: ['Rust'],
    href: 'https://github.com/kcodes0/duck-lang',
    status: 'active' as const,
  },
  {
    id: 'null',
    title: 'null',
    description: 'An experiment built entirely by Claude. It worked until it didn\'t. We don\'t talk about what happened at the very end.',
    tech: ['TypeScript', 'Claude'],
    href: 'https://github.com/kcodes0/null',
    status: 'archived' as const,
  },
  {
    id: 'blog-cms',
    title: 'Blog CMS',
    description: 'Markdown-first content management running on Cloudflare Workers + D1. Fast, minimal, no bloat.',
    tech: ['Cloudflare Workers', 'D1'],
    href: 'https://blog.kcodes.me',
    status: 'active' as const,
  },
  {
    id: 'this-site',
    title: 'This Site',
    description: 'The portfolio site you\'re looking at right now. Brutalist meets neocities.',
    tech: ['React', 'Vite', 'Vibes'],
    href: 'https://github.com/kcodes0/konacodes',
    status: 'active' as const,
  },
];

function LabsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#141312',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .labs-back:hover { color: #a8c8e8 !important; }
        .labs-card {
          display: block;
          border: 1px solid #2a2825;
          padding: 1.5rem;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.2s ease;
        }
        .labs-card:hover {
          border-color: #3a3835;
          background: #1a1917;
        }
        .labs-card:hover .labs-card-title {
          color: #a8c8e8;
        }
        @media (max-width: 768px) {
          .labs-grid-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <a href="/" className="labs-back" style={{
          display: 'inline-block', fontSize: '0.75rem', color: '#6a6660',
          textDecoration: 'none', marginBottom: '2rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', transition: 'color 0.15s',
        }}>← Back</a>

        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          LA<span style={{ color: '#a8c8e8' }}>BS</span>
        </h1>
        <p style={{
          fontSize: '0.75rem', color: '#6a6660', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '3rem',
        }}>
          Projects, experiments, and happy accidents
        </p>

        <div className="labs-grid-inner" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1rem',
        }}>
          {LABS_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="labs-card"
            >
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                <h2 className="labs-card-title" style={{
                  fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '-0.01em', transition: 'color 0.15s',
                }}>
                  {project.title}
                </h2>
                {project.status === 'archived' && (
                  <span style={{
                    fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#6a6660', border: '1px solid #3a3835', padding: '0.1rem 0.4rem',
                  }}>
                    Archived
                  </span>
                )}
              </div>
              <p style={{
                fontSize: '0.85rem', color: '#8a8680', lineHeight: 1.6,
                marginBottom: '1rem',
              }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#6a6660', border: '1px solid #3a3835', padding: '0.15rem 0.4rem',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      <footer style={{
        maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem',
        borderTop: '2px solid #2a2825', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a4640' }}>
          &copy; {new Date().getFullYear()} KONA
        </span>
        <span style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
          K<span style={{ color: '#a8c8e8' }}>.</span>
        </span>
      </footer>
    </div>
  );
}

// ============================================
// Router
// ============================================
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        const internalRoutes = ['/', '/labs', '/now', '/uses'];
        if (internalRoutes.includes(url.pathname)) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname);
          setPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return path;
}

// ============================================
// Main App
// ============================================
export function App() {
  const path = useRoute();

  if (path === '/labs') return <LabsPage />;
  if (path === '/now') return <NowPage />;

  if (path === '/uses') {
    return (
      <ThemeProvider>
        <UsesPage />
      </ThemeProvider>
    );
  }

  return <FunHome />;
}

export default App;
