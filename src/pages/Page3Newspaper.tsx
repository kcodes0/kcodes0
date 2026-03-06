import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Concrete & Stencil — raw concrete texture, spray paint marks,
// stencil-cut type, urban photography aesthetic
export default function Page3Stencil() {
  const { repos, loading } = useGithubRepos();
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (repos.length === 0) return;
    // Stagger reveals
    repos.forEach((repo, i) => {
      setTimeout(() => {
        setRevealed(prev => new Set([...prev, repo.name]));
      }, 200 + i * 80);
    });
  }, [repos]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2c2a27',
      color: '#d8d4cc',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .sten-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .sten-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sten-card:hover {
          transform: translateX(8px);
          border-left-color: #e85d3a !important;
        }
        .sten-card:hover .sten-name { color: #e85d3a; }
        .sten-nav a:hover { color: #e85d3a !important; }
        @keyframes sprayIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .sten-visible { animation: sprayIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      <div className="sten-page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Hero */}
          <section style={{
            padding: '8rem 0 6rem',
            position: 'relative',
          }}>
            {/* Spray paint drip accent */}
            <div style={{
              position: 'absolute',
              top: '4rem', left: '-1rem',
              width: '3px',
              height: '120px',
              background: 'linear-gradient(to bottom, #e85d3a, transparent)',
              opacity: 0.6,
            }} />

            <img
              src="/images/kona.png"
              alt="Kona"
              style={{
                width: 'min(50vw, 280px)',
                filter: 'grayscale(0.3) contrast(1.1) drop-shadow(0 0 40px rgba(232,93,58,0.08))',
                marginBottom: '2rem',
              }}
            />

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'baseline',
              flexWrap: 'wrap',
            }}>
              {['developer', 'builder', 'creative'].map((word, i) => (
                <span key={word} style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: i === 2 ? '#e85d3a' : '#6a665e',
                }}>
                  {word}
                </span>
              ))}
            </div>
          </section>

          {/* Divider with spray effect */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, #e85d3a33, #d8d4cc15, transparent)',
            marginBottom: '3rem',
          }} />

          {/* Work list */}
          <section style={{ paddingBottom: '6rem' }}>
            <div style={{
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#6a665e',
              marginBottom: '2rem',
            }}>
              Projects &mdash; {repos.length}
            </div>

            {loading ? (
              <div style={{ color: '#6a665e', fontStyle: 'italic' }}>loading...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {repos.map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sten-card ${revealed.has(repo.name) ? 'sten-visible' : ''}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '1.2rem 0 1.2rem 1.2rem',
                      borderLeft: '3px solid transparent',
                      borderBottom: '1px solid rgba(216,212,204,0.06)',
                      opacity: revealed.has(repo.name) ? undefined : 0,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
                          <span style={{
                            fontSize: '0.65rem',
                            color: '#4a4840',
                            fontVariantNumeric: 'tabular-nums',
                          }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="sten-name" style={{
                            fontSize: '1.3rem',
                            fontWeight: 600,
                            margin: 0,
                            transition: 'color 0.25s',
                          }}>
                            {repo.name}
                          </h3>
                        </div>
                        {repo.description && (
                          <p style={{
                            fontSize: '0.8rem',
                            color: '#6a665e',
                            marginTop: '0.3rem',
                            lineHeight: 1.5,
                            marginLeft: '2.4rem',
                          }}>
                            {repo.description}
                          </p>
                        )}
                      </div>
                      {repo.language && (
                        <span style={{
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          color: '#4a4840',
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}>
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer style={{
            padding: '2rem 0',
            borderTop: '1px solid rgba(216,212,204,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.6rem', color: '#4a4840', letterSpacing: '0.15em' }}>
              &copy; {new Date().getFullYear()}
            </span>
            <span style={{ fontSize: '0.6rem', color: '#4a4840' }}>
              KONA
            </span>
          </footer>
        </div>
      </div>

      {/* Nav */}
      <nav className="sten-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(44,42,39,0.95)', backdropFilter: 'blur(12px)',
        padding: '0.5rem 1rem',
        border: '1px solid rgba(216,212,204,0.06)',
      }}>
        <a href="/" style={{ color: '#6a665e', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 3 ? '#e85d3a' : '#6a665e',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
