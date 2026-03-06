import { useState, useEffect } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Darkroom — film photography aesthetic, contact sheet grid,
// red safelight glow, film strip borders, analog warmth
export default function Page4Darkroom() {
  const { repos, loading } = useGithubRepos();
  const [lightOn, setLightOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLightOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0b09',
      color: '#c8bfb0',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes safelight {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dk-frame {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }
        .dk-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          border: 1px solid rgba(200,80,60,0);
          transition: border-color 0.35s;
          pointer-events: none;
        }
        .dk-frame:hover {
          background: rgba(200,80,60,0.04) !important;
          transform: scale(1.01);
        }
        .dk-frame:hover::before {
          border-color: rgba(200,80,60,0.3);
        }
        .dk-frame:hover .dk-repo-name { color: #c8503c; }
        .dk-frame:hover .dk-number { color: #c8503c; }
        .dk-nav a:hover { color: #c8503c !important; }
      `}</style>

      {/* Safelight ambient glow */}
      <div style={{
        position: 'fixed',
        top: '-20%', right: '-10%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(ellipse, rgba(200,80,60,0.06) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'safelight 8s ease-in-out infinite',
        opacity: lightOn ? 1 : 0,
        transition: 'opacity 2s ease',
      }} />

      {/* Film strip border — left */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: '28px',
        background: '#0d0b09',
        zIndex: 10,
        borderRight: '1px solid #1a1816',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
        padding: '0 6px',
      }}>
        {Array(20).fill(0).map((_, i) => (
          <div key={i} style={{
            width: '14px', height: '10px',
            border: '1px solid #2a2520',
            borderRadius: '1px',
          }} />
        ))}
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem 0 3.5rem',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header */}
        <header style={{
          padding: '6rem 0 4rem',
          opacity: lightOn ? 1 : 0,
          transition: 'opacity 1.5s ease 0.5s',
        }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.6rem',
            color: '#4a4540',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>
            ROLL 001 &mdash; KONA
          </div>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Kona
          </h1>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            color: '#5a554e',
            marginTop: '0.8rem',
          }}>
            developer &bull; creative &bull; maker
          </p>
        </header>

        {/* Contact sheet — exposure info bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #1a1816',
          borderBottom: '1px solid #1a1816',
          padding: '0.6rem 0',
          marginBottom: '2rem',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: '#4a4540',
          letterSpacing: '0.1em',
        }}>
          <span>PROJECTS: {repos.length}</span>
          <span>{new Date().toISOString().split('T')[0]}</span>
          <span>KODAK TRI-X 400</span>
        </div>

        {/* Contact sheet grid */}
        {loading ? (
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', color: '#4a4540',
            padding: '2rem 0',
          }}>
            developing...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1px',
            background: '#1a1816',
            border: '1px solid #1a1816',
            marginBottom: '4rem',
          }}>
            {repos.map((repo, i) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="dk-frame"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '1.5rem',
                  background: '#0d0b09',
                  animation: `fadeUp 0.4s ease ${i * 0.06}s backwards`,
                }}
              >
                {/* Frame number */}
                <div className="dk-number" style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.55rem',
                  color: '#3a3530',
                  marginBottom: '0.8rem',
                  transition: 'color 0.3s',
                }}>
                  {String(i + 1).padStart(2, '0')}A
                </div>

                <h3 className="dk-repo-name" style={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  margin: '0 0 0.4rem',
                  transition: 'color 0.3s',
                }}>
                  {repo.name}
                </h3>

                {repo.description && (
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#5a554e',
                    lineHeight: 1.5,
                    marginBottom: '0.6rem',
                  }}>
                    {repo.description}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {repo.language && (
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      color: '#4a4540',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.5rem',
                      color: '#3a3530',
                    }}>
                      {repo.stargazers_count}*
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer style={{
          padding: '2rem 0 3rem',
          borderTop: '1px solid #1a1816',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          color: '#3a3530',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>&copy; {new Date().getFullYear()} KONA</span>
          <span>END OF ROLL</span>
        </footer>
      </div>

      {/* Nav */}
      <nav className="dk-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(13,11,9,0.95)', backdropFilter: 'blur(12px)',
        padding: '0.5rem 1rem',
        border: '1px solid #1a1816',
        fontFamily: '"Space Mono", monospace',
      }}>
        <a href="/" style={{ color: '#4a4540', textDecoration: 'none', fontSize: '0.65rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 4 ? '#c8503c' : '#4a4540',
            textDecoration: 'none', fontSize: '0.65rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
