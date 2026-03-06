import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Exhibition Poster — Swiss design meets street poster,
// bold geometric, large type hierarchy, asymmetric grid,
// like a gallery exhibition announcement
export default function Page7Exhibition() {
  const { repos, loading } = useGithubRepos();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111110',
      color: '#e8e4dc',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        .exh-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .exh-card:hover {
          background: #1a1918 !important;
        }
        .exh-card:hover .exh-accent {
          width: 100% !important;
        }
        .exh-card:hover .exh-name {
          transform: translateX(4px);
        }
        .exh-nav a:hover { color: #e8e4dc !important; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expandLine {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header — exhibition poster style */}
        <header style={{
          padding: '4rem 0 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2rem',
          alignItems: 'start',
        }}>
          <div>
            {/* Giant type */}
            <h1 style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.05em',
              margin: 0,
            }}>
              KO
              <br />
              <span style={{ color: '#c8503c' }}>NA</span>
            </h1>
          </div>
          <div style={{
            textAlign: 'right',
            paddingTop: '0.5rem',
          }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', marginBottom: '0.3rem' }}>
              {time}
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555' }}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Subtitle bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          borderTop: '1px solid #222',
          borderBottom: '1px solid #222',
          margin: '2rem 0 3rem',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#666', textTransform: 'uppercase' }}>
            Developer &bull; Creative &bull; Builder
          </span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#444' }}>
            {repos.length} WORKS
          </span>
        </div>

        {/* Two-column layout: feature left, list right */}
        {loading ? (
          <div style={{ padding: '4rem 0', color: '#444' }}>Loading...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3rem',
            paddingBottom: '4rem',
          }}>
            {/* Left — featured projects */}
            <div>
              {repos.slice(0, 4).map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exh-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '2rem 1.5rem',
                    borderBottom: '1px solid #1a1918',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `slideIn 0.4s ease ${i * 0.1}s backwards`,
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  {/* Accent bar */}
                  <div className="exh-accent" style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    height: '2px',
                    width: hoverIdx === i ? '100%' : '0%',
                    background: '#c8503c',
                    transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }} />

                  <div style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    color: '#444',
                    marginBottom: '0.6rem',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <h3 className="exh-name" style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 600,
                    margin: '0 0 0.5rem',
                    transition: 'transform 0.3s ease',
                  }}>
                    {repo.name}
                  </h3>

                  {repo.description && (
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#777',
                      lineHeight: 1.6,
                      maxWidth: '400px',
                    }}>
                      {repo.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
                    {repo.language && (
                      <span style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        color: '#555',
                        textTransform: 'uppercase',
                      }}>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontSize: '0.55rem', color: '#444' }}>
                        {repo.stargazers_count} stars
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Right — compact list */}
            <div style={{ paddingTop: '0.5rem' }}>
              <div style={{
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                color: '#555',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #222',
              }}>
                Archive
              </div>
              {repos.slice(4).map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    textDecoration: 'none',
                    color: '#888',
                    padding: '0.7rem 0',
                    borderBottom: '1px solid #1a1918',
                    fontSize: '0.8rem',
                    transition: 'color 0.2s',
                    animation: `slideIn 0.3s ease ${0.3 + i * 0.04}s backwards`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8e4dc')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                  <span style={{ fontWeight: 500 }}>{repo.name}</span>
                  <span style={{ fontSize: '0.6rem', color: '#444' }}>
                    {repo.language || ''}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer — geometric accent */}
        <footer style={{
          padding: '3rem 0',
          borderTop: '1px solid #222',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#444' }}>
            &copy; {new Date().getFullYear()} KONA
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', background: '#c8503c' }} />
            <div style={{ width: '8px', height: '8px', background: '#e8e4dc', opacity: 0.1 }} />
            <div style={{ width: '8px', height: '8px', background: '#e8e4dc', opacity: 0.05 }} />
          </div>
        </footer>
      </div>

      {/* Nav */}
      <nav className="exh-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(17,17,16,0.95)', backdropFilter: 'blur(12px)',
        padding: '0.5rem 1rem',
        border: '1px solid #222',
      }}>
        <a href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 7 ? '#c8503c' : '#555',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
