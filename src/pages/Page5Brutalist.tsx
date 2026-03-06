import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Zine Collage — cut-and-paste DIY, overlapping elements,
// mixed fonts, tape strips, torn paper energy, scrapbook chaos
export default function Page5Zine() {
  const { repos, loading } = useGithubRepos();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tapeColors = ['#d4c9a0', '#c4b890', '#e0d5b5', '#ccc0a0', '#d8cca8'];
  const rotations = [-3, 2.5, -1.5, 3, -2, 1.8, -2.8, 2, -1, 3.2, -2.5, 1.5];
  const bgTints = [
    '#f0ece0', '#eae8e0', '#f2ede2', '#e8e6de',
    '#efe9dd', '#ece6da', '#f1ebe0', '#e9e5dc',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e4ddd0',
      color: '#1a1a18',
      fontFamily: 'system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@400;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      <style>{`
        .zine-page::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-15px) rotate(var(--rot, 0deg)) scale(0.95); }
          to { opacity: 1; transform: translateY(0) rotate(var(--rot, 0deg)) scale(1); }
        }
        .zine-piece {
          animation: dropIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        .zine-card {
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .zine-card:hover {
          transform: rotate(0deg) scale(1.04) translateY(-4px) !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important;
          z-index: 10 !important;
        }
        .zine-nav a:hover { color: #1a1a18 !important; text-decoration: underline; }
      `}</style>

      <div className="zine-page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

          {/* Hero — collage header */}
          <section style={{
            padding: '5rem 0 3rem',
            position: 'relative',
          }}>
            {/* Tape strip accent */}
            <div style={{
              position: 'absolute',
              top: '3.5rem', left: '0',
              width: '80px', height: '18px',
              background: tapeColors[0],
              opacity: 0.7,
              transform: 'rotate(-5deg)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
              <img
                src="/images/kona.png"
                alt="Kona"
                style={{
                  width: 'min(30vw, 160px)',
                  transform: 'rotate(-3deg)',
                  filter: 'contrast(1.1)',
                  border: '3px solid #fff',
                  boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
                }}
              />
              <div style={{ marginLeft: '1rem' }}>
                <h1 style={{
                  fontFamily: '"Permanent Marker", cursive',
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  lineHeight: 1,
                  margin: 0,
                  transform: 'rotate(-1deg)',
                }}>
                  KONA
                </h1>
                <p style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '1.2rem',
                  color: '#666',
                  transform: 'rotate(1deg)',
                  marginTop: '0.3rem',
                }}>
                  makes things &amp; breaks things
                </p>
              </div>
            </div>

            {/* Torn edge */}
            <div style={{
              height: '4px',
              marginTop: '2rem',
              background: 'repeating-linear-gradient(90deg, #1a1a18 0px, #1a1a18 4px, transparent 4px, transparent 8px)',
              opacity: 0.15,
            }} />
          </section>

          {/* Scattered label */}
          <div className="zine-piece" style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '1.5rem',
            '--rot': '0deg',
          } as React.CSSProperties}>
            PROJECTS ({repos.length})
          </div>

          {/* Zine grid — intentionally messy */}
          {loading ? (
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '1.5rem',
              color: '#999',
              textAlign: 'center',
              padding: '3rem 0',
            }}>
              cutting &amp; pasting...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.2rem',
              paddingBottom: '4rem',
            }}>
              {repos.map((repo, i) => {
                const rot = rotations[i % rotations.length];
                const bg = bgTints[i % bgTints.length];
                const isWide = i % 5 === 0;
                const useSerif = i % 3 === 0;
                const useMono = i % 4 === 1;

                return (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zine-card zine-piece"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: '#1a1a18',
                      padding: '1.3rem 1.4rem',
                      background: bg,
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '2px 3px 8px rgba(0,0,0,0.08)',
                      transform: `rotate(${rot}deg)`,
                      animationDelay: `${i * 0.06}s`,
                      position: 'relative',
                      '--rot': `${rot}deg`,
                      gridColumn: isWide ? 'span 2' : 'span 1',
                    } as React.CSSProperties}
                  >
                    {/* Random tape strip on some cards */}
                    {i % 3 === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '20%',
                        width: '50px', height: '16px',
                        background: tapeColors[i % tapeColors.length],
                        opacity: 0.6,
                        transform: `rotate(${-rot * 0.5}deg)`,
                      }} />
                    )}

                    <h3 style={{
                      fontFamily: useSerif
                        ? '"Playfair Display", serif'
                        : useMono
                          ? '"Permanent Marker", cursive'
                          : '"Space Grotesk", sans-serif',
                      fontSize: useSerif ? '1.3rem' : useMono ? '1.1rem' : '1rem',
                      fontWeight: useSerif ? 700 : useMono ? 400 : 600,
                      margin: '0 0 0.3rem',
                      textTransform: useMono ? 'uppercase' : 'none',
                    }}>
                      {repo.name}
                    </h3>

                    {repo.description && (
                      <p style={{
                        fontFamily: i % 2 === 0 ? '"Caveat", cursive' : '"Space Grotesk", sans-serif',
                        fontSize: i % 2 === 0 ? '0.95rem' : '0.75rem',
                        color: '#666',
                        lineHeight: 1.5,
                        marginBottom: '0.5rem',
                      }}>
                        {repo.description}
                      </p>
                    )}

                    {repo.language && (
                      <span style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#aaa',
                        borderBottom: '1px solid #ccc',
                        paddingBottom: '1px',
                      }}>
                        {repo.language}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          )}

          {/* Footer — stamped */}
          <footer style={{
            padding: '2rem 0 3rem',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '0.8rem',
              color: '#c0392b',
              border: '2px solid #c0392b',
              padding: '0.3rem 1rem',
              transform: 'rotate(-3deg)',
              opacity: 0.5,
            }}>
              &copy; {new Date().getFullYear()} KONA
            </div>
          </footer>
        </div>
      </div>

      {/* Nav */}
      <nav className="zine-nav" style={{
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: '#e4ddd0ee', padding: '0.5rem 1rem',
        border: '1px solid rgba(0,0,0,0.08)',
        fontFamily: '"Space Grotesk", sans-serif',
      }}>
        <a href="/" style={{ color: '#999', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 5 ? '#1a1a18' : '#999',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
