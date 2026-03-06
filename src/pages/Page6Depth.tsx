import { useState, useEffect } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Ink & Brush — east-meets-west calligraphy, brush stroke energy,
// paper texture, balanced zen + raw expression
export default function Page6Ink() {
  const { repos, loading } = useGithubRepos();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7f3ec',
      color: '#1c1b18',
      fontFamily: '"Noto Serif", Georgia, serif',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        .ink-page::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @keyframes brushStroke {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ink-item {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ink-item:hover {
          padding-left: 1.8rem !important;
        }
        .ink-item:hover .ink-name { color: #8a2c1a; }
        .ink-item:hover .ink-stroke {
          width: 100% !important;
          opacity: 0.06 !important;
        }
        .ink-nav a:hover { color: #8a2c1a !important; }
      `}</style>

      <div className="ink-page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 2rem' }}>

          {/* Hero — brush stroke reveal */}
          <section style={{
            padding: '10rem 0 6rem',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}>
            {/* Brush stroke accent line */}
            <div style={{
              width: '120px',
              height: '3px',
              background: '#1c1b18',
              margin: '0 auto 2rem',
              borderRadius: '2px',
              animation: visible ? 'brushStroke 0.8s ease 0.3s backwards' : 'none',
            }} />

            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: '0 0 1rem',
            }}>
              Kona
            </h1>

            <p style={{
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: '#8a8580',
              fontWeight: 300,
              animation: visible ? 'fadeIn 1s ease 0.8s backwards' : 'none',
            }}>
              building with intention
            </p>

            {/* Bottom stroke */}
            <div style={{
              width: '60px',
              height: '2px',
              background: '#8a2c1a',
              margin: '2rem auto 0',
              opacity: 0.4,
              borderRadius: '2px',
              animation: visible ? 'brushStroke 0.6s ease 1.2s backwards' : 'none',
            }} />
          </section>

          {/* Works */}
          <section style={{ paddingBottom: '6rem' }}>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#b0aaa0',
              marginBottom: '2.5rem',
              textAlign: 'center',
            }}>
              Works
            </div>

            {loading ? (
              <div style={{
                textAlign: 'center',
                fontStyle: 'italic',
                color: '#b0aaa0',
              }}>
                ...
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {repos.map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-item"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '1.3rem 0 1.3rem 1rem',
                      borderBottom: '1px solid rgba(28,27,24,0.06)',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `fadeIn 0.4s ease ${0.2 + i * 0.05}s backwards`,
                    }}
                  >
                    {/* Brush stroke hover bg */}
                    <div className="ink-stroke" style={{
                      position: 'absolute',
                      left: 0, top: '50%',
                      transform: 'translateY(-50%)',
                      width: '0%',
                      height: '70%',
                      background: '#8a2c1a',
                      opacity: 0,
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      borderRadius: '2px',
                      zIndex: 0,
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '1rem',
                      }}>
                        <h3 className="ink-name" style={{
                          fontSize: '1.15rem',
                          fontWeight: 400,
                          margin: 0,
                          transition: 'color 0.3s',
                        }}>
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <span style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '0.6rem',
                            color: '#b0aaa0',
                            flexShrink: 0,
                          }}>
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p style={{
                          fontSize: '0.8rem',
                          fontStyle: 'italic',
                          color: '#8a8580',
                          fontWeight: 300,
                          marginTop: '0.3rem',
                          lineHeight: 1.6,
                        }}>
                          {repo.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer style={{
            padding: '3rem 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(28,27,24,0.06)',
          }}>
            <div style={{
              fontSize: '0.65rem',
              fontFamily: '"Space Grotesk", sans-serif',
              color: '#b0aaa0',
              letterSpacing: '0.15em',
            }}>
              &copy; {new Date().getFullYear()} &mdash; KONA
            </div>
          </footer>
        </div>
      </div>

      {/* Nav */}
      <nav className="ink-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '1rem', zIndex: 20,
        background: '#f7f3ecee', padding: '0.5rem 1rem',
        fontFamily: '"Space Grotesk", sans-serif',
      }}>
        <a href="/" style={{ color: '#b0aaa0', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 6 ? '#8a2c1a' : '#b0aaa0',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
