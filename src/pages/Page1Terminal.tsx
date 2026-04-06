import { useState, useEffect } from 'react';
import { useGithubRepos } from './useGithubRepos';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Labs', href: '/labs' },
  { name: 'Photos', href: '/photos' },
  { name: 'Now', href: '/now' },
  { name: 'Uses', href: '/uses' },
  { name: 'Blog', href: 'https://blog.kcodes.me', external: true },
  { name: 'GitHub', href: 'https://github.com/kcodes0', external: true },
];

const PROJECTS = [
  {
    name: 'Duck Lang',
    desc: 'A programming language where you say "quack" to compile. The goose has opinions.',
    tech: 'Rust',
    href: 'https://github.com/kcodes0/duck-lang',
  },
  {
    name: 'Blog CMS',
    desc: 'Markdown-first content management on Cloudflare Workers + D1. Fast, minimal, no bloat.',
    tech: 'CF Workers',
    href: 'https://blog.kcodes.me',
  },
  {
    name: 'LIKWID',
    desc: 'ASCII art fluid simulation effect.',
    tech: 'TypeScript',
    href: 'https://github.com/kcodes0/likwid',
  },
];

export default function Page1Brutalist() {
  const { repos, loading } = useGithubRepos();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const langCount = [...new Set(repos.map(r => r.language).filter(Boolean))].length;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#141312',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .neo-panel {
          border: 1px solid #2a2825;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
          transition: border-color 0.2s ease;
        }
        .neo-panel:hover {
          border-color: #3a3835;
        }
        .neo-header {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8c8e8;
          font-weight: 700;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #2a2825;
        }
        .neo-nav-link {
          display: block;
          padding: 0.35rem 0;
          color: #d5d0c8;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .neo-nav-link:hover {
          color: #a8c8e8;
        }
        .neo-project {
          display: block;
          padding: 0.75rem 0;
          border-bottom: 1px solid #1e1d1b;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.15s ease;
        }
        .neo-project:last-of-type {
          border-bottom: none;
        }
        .neo-project:hover {
          padding-left: 0.5rem;
        }
        .neo-project:hover .neo-project-name {
          color: #a8c8e8;
        }
        .neo-repo {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.8rem 0.5rem;
          border-bottom: 1px solid #1e1d1b;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.15s ease;
        }
        .neo-repo:hover {
          background: #1e1d1b;
        }
        .neo-repo:hover .neo-repo-name {
          color: #f0ece4;
        }
        .neo-repo:hover .neo-repo-idx {
          color: #a8c8e8;
        }
        .neo-repo:hover .neo-repo-lang {
          border-color: #a8c8e8;
          color: #a8c8e8;
        }
        .neo-stat {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.8rem;
        }
        .neo-layout {
          display: flex;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .neo-main {
          flex: 1;
          min-width: 0;
        }
        .neo-sidebar {
          width: 260px;
          flex-shrink: 0;
          position: sticky;
          top: 1rem;
          align-self: flex-start;
        }
        .neo-viewall {
          display: inline-block;
          margin-top: 0.75rem;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a8c8e8;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .neo-viewall:hover {
          color: #d5d0c8;
        }
        @media (max-width: 768px) {
          .neo-layout {
            flex-direction: column;
            padding: 0 1rem;
          }
          .neo-sidebar {
            width: 100%;
            order: -1;
          }
          .neo-header-banner {
            padding: 3rem 1rem 1.5rem !important;
          }
          .neo-header-title {
            font-size: clamp(4rem, 15vw, 8rem) !important;
          }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${scrollPct * 100}%`,
        background: '#a8c8e8', zIndex: 100,
        transition: 'width 0.1s',
      }} />

      {/* Header banner */}
      <header className="neo-header-banner" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem',
        borderBottom: '2px solid #2a2825',
        marginBottom: '1.5rem',
      }}>
        <h1 className="neo-header-title" style={{
          fontSize: 'clamp(5rem, 18vw, 10rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.06em',
          margin: 0,
          textTransform: 'uppercase',
          color: '#d5d0c8',
        }}>
          KO<span style={{ color: '#a8c8e8' }}>NA</span>
        </h1>
      </header>

      {/* Two-column layout */}
      <div className="neo-layout">
        {/* Main content */}
        <main className="neo-main">
          {/* Welcome */}
          <div className="neo-panel">
            <h2 className="neo-header">Welcome</h2>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: '#b5b0a8',
              marginBottom: '1rem',
            }}>
              This is my corner of the internet. I'm a self-taught developer who codes
              random things when I feel like it. Film nerd, music head, history geek.
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: '#a8c8e8',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}>
              Ship it raw. Done {'>'} perfect.
            </p>
          </div>

          {/* Projects */}
          <div className="neo-panel">
            <h2 className="neo-header">Projects</h2>
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-project"
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span className="neo-project-name" style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.15s',
                  }}>
                    {project.name}
                  </span>
                  <span style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    border: '1px solid #3a3835',
                    padding: '0.15rem 0.4rem',
                    textTransform: 'uppercase',
                    color: '#6a6660',
                  }}>
                    {project.tech}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#6a6660',
                  marginTop: '0.25rem',
                }}>
                  {project.desc}
                </p>
              </a>
            ))}
            <a href="/labs" className="neo-viewall">View all projects →</a>
          </div>

          {/* Repos */}
          <div className="neo-panel">
            <h2 className="neo-header">Repos</h2>
            {loading ? (
              <div style={{ fontSize: '0.85rem', fontWeight: 700, padding: '1rem 0' }}>
                LOADING...
              </div>
            ) : (
              <div>
                {repos.slice(0, 15).map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-repo"
                  >
                    <span className="neo-repo-idx" style={{
                      fontSize: '0.65rem',
                      color: '#4a4640',
                      minWidth: '1.5rem',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'color 0.15s',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="neo-repo-name" style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      flex: 1,
                      transition: 'color 0.15s',
                    }}>
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span className="neo-repo-lang" style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        border: '1px solid #3a3835',
                        padding: '0.15rem 0.4rem',
                        textTransform: 'uppercase',
                        color: '#6a6660',
                        transition: 'all 0.15s',
                      }}>
                        {repo.language}
                      </span>
                    )}
                  </a>
                ))}
                {repos.length > 15 && (
                  <a
                    href="https://github.com/kcodes0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-viewall"
                  >
                    View all {repos.length} repos →
                  </a>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="neo-sidebar">
          {/* Navigation */}
          <div className="neo-panel">
            <h3 className="neo-header">Links</h3>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="neo-nav-link"
              >
                <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
                {link.name}
                {link.external && (
                  <span style={{ fontSize: '0.65rem', color: '#4a4640', marginLeft: '0.35rem' }}>↗</span>
                )}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="neo-panel">
            <h3 className="neo-header">Stats</h3>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Repos</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : repos.length}
              </span>
            </div>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Languages</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : langCount}
              </span>
            </div>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Stars</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : totalStars}
              </span>
            </div>
          </div>

          {/* Currently working on */}
          <div className="neo-panel">
            <h3 className="neo-header">Now</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Building out this site',
                'Duck Lang',
                'CF Workers experiments',
              ].map((item) => (
                <li key={item} style={{
                  fontSize: '0.8rem',
                  color: '#8a8680',
                  lineHeight: 1.8,
                  paddingLeft: '0.75rem',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#4a4640',
                  }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/now" className="neo-viewall" style={{ fontSize: '0.65rem' }}>
              Full /now page →
            </a>
          </div>

          {/* Connect */}
          <div className="neo-panel">
            <h3 className="neo-header">Connect</h3>
            <a
              href="https://github.com/kcodes0"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-nav-link"
              style={{ fontSize: '0.8rem' }}
            >
              <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
              GitHub
            </a>
            <a
              href="https://blog.kcodes.me"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-nav-link"
              style={{ fontSize: '0.8rem' }}
            >
              <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
              Blog
            </a>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '3rem 2rem',
        borderTop: '2px solid #2a2825',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
