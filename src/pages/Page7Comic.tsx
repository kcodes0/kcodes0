import { useState } from 'react';
import { useGithubRepos } from './useGithubRepos';

const COLORS = ['#ff3366', '#ffcc00', '#00ccff', '#ff6600', '#66ff33', '#cc33ff', '#ff3366'];
const POWS = ['BAM!', 'POW!', 'ZAP!', 'WHAM!', 'BOOM!', 'CRACK!', 'SNAP!'];

export default function Page7Comic() {
  const { repos, loading } = useGithubRepos();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fffde8',
      color: '#1a1a1a',
      fontFamily: '"Bangers", "Comic Sans MS", cursive, sans-serif',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&display=swap" rel="stylesheet" />

      <style>{`
        .comic-panel {
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .comic-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #00000012 1px, transparent 1px);
          background-size: 4px 4px;
          pointer-events: none;
          z-index: 1;
        }
        .comic-panel:hover {
          transform: scale(1.03) rotate(-0.5deg) !important;
          z-index: 10 !important;
          box-shadow: 8px 8px 0 #000 !important;
        }
        .comic-pow {
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }
        .comic-panel:hover .comic-pow {
          opacity: 1;
          transform: scale(1) rotate(-12deg);
        }
        .comic-nav a:hover {
          background: #000 !important;
          color: #ffcc00 !important;
        }
        @keyframes shake {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -1px); }
        }
        .comic-hero:hover { animation: shake 0.3s ease; }
      `}</style>

      {/* Halftone overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'radial-gradient(circle, #00000008 1px, transparent 1px)',
        backgroundSize: '3px 3px',
        pointerEvents: 'none', zIndex: 50,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Hero Panel */}
        <section className="comic-hero" style={{
          margin: '2rem 0',
          border: '4px solid #000',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #ffcc00 0%, #ff6600 100%)',
          padding: '4rem 2rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '6px 6px 0 #000',
        }}>
          {/* Speed lines */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden',
            background: `repeating-conic-gradient(transparent 0deg, transparent 8deg, rgba(0,0,0,0.03) 8deg, rgba(0,0,0,0.03) 10deg)`,
          }} />

          <img
            src="/images/kona.png"
            alt="Kona"
            style={{
              width: 'min(40vw, 220px)',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(4px 4px 0 #000)',
            }}
          />

          <div style={{
            position: 'relative', zIndex: 2,
            marginTop: '1rem',
          }}>
            <p style={{
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '1.2rem',
              color: '#1a1a1a',
              background: '#fff',
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              border: '3px solid #000',
              borderRadius: '20px',
              position: 'relative',
            }}>
              creative developer &amp; code shipper!
              {/* Speech bubble tail */}
              <span style={{
                position: 'absolute',
                top: '-12px', left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '12px solid #000',
              }} />
              <span style={{
                position: 'absolute',
                top: '-8px', left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '10px solid #fff',
              }} />
            </p>
          </div>
        </section>

        {/* Issue header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.5rem 0 1rem',
          borderBottom: '3px solid #000',
          marginBottom: '1.5rem',
        }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>ISSUE #{repos.length}</span>
          <span style={{ fontSize: '1.5rem' }}>PROJECTS</span>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>{new Date().getFullYear()}</span>
        </div>

        {/* Comic Grid */}
        {loading ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            fontSize: '2rem', fontFamily: '"Bangers", cursive',
          }}>
            LOADING...
            <div style={{ fontSize: '4rem', animation: 'shake 0.5s infinite' }}>!</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            paddingBottom: '6rem',
          }}>
            {repos.map((repo, i) => {
              const color = COLORS[i % COLORS.length];
              const pow = POWS[i % POWS.length];

              return (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-panel"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    border: '3px solid #000',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    background: '#fff',
                    boxShadow: '4px 4px 0 #000',
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.5 + (i % 3) * 0.3)}deg)`,
                  }}
                  onMouseEnter={() => setActivePanel(repo.name)}
                  onMouseLeave={() => setActivePanel(null)}
                >
                  {/* POW badge */}
                  <div className="comic-pow" style={{
                    position: 'absolute',
                    top: '-10px', right: '-5px',
                    background: color,
                    color: '#fff',
                    fontFamily: '"Bangers", cursive',
                    fontSize: '1.1rem',
                    padding: '0.3rem 0.8rem',
                    border: '2px solid #000',
                    zIndex: 5,
                    textShadow: '1px 1px 0 #000',
                  }}>
                    {pow}
                  </div>

                  <div style={{
                    fontFamily: '"Bangers", cursive',
                    fontSize: '1.5rem',
                    letterSpacing: '0.05em',
                    marginBottom: '0.3rem',
                    position: 'relative',
                    zIndex: 2,
                    textTransform: 'uppercase',
                  }}>
                    {repo.name}
                  </div>

                  {repo.description && (
                    <p style={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontSize: '0.8rem',
                      color: '#555',
                      lineHeight: 1.5,
                      marginBottom: '0.6rem',
                      position: 'relative',
                      zIndex: 2,
                    }}>
                      {repo.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                    {repo.language && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: '"Bangers", cursive',
                        padding: '0.15rem 0.5rem',
                        background: color,
                        color: '#fff',
                        border: '2px solid #000',
                        letterSpacing: '0.05em',
                      }}>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: '"Bangers", cursive',
                        padding: '0.15rem 0.5rem',
                        border: '2px solid #000',
                        letterSpacing: '0.05em',
                      }}>
                        {repo.stargazers_count} STARS
                      </span>
                    )}
                  </div>

                  {/* Diagonal color stripe */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, right: 0,
                    width: '60px', height: '60px',
                    background: `linear-gradient(225deg, ${color}33 50%, transparent 50%)`,
                    zIndex: 0,
                  }} />
                </a>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer style={{
          borderTop: '3px solid #000',
          padding: '1.5rem 0',
          textAlign: 'center',
          fontFamily: '"Permanent Marker", cursive',
          fontSize: '0.9rem',
          color: '#666',
        }}>
          &copy; {new Date().getFullYear()} KONA &mdash; TO BE CONTINUED...
        </footer>
      </div>

      {/* Nav */}
      <nav className="comic-nav" style={{
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 0, zIndex: 60,
        border: '3px solid #000',
        background: '#ffcc00',
        boxShadow: '3px 3px 0 #000',
      }}>
        <a href="/" style={{
          color: '#000', textDecoration: 'none', fontSize: '0.7rem',
          fontFamily: '"Bangers", cursive',
          padding: '0.4rem 0.7rem', borderRight: '2px solid #000',
          transition: 'all 0.1s',
        }}>HOME</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: '#000', textDecoration: 'none', fontSize: '0.7rem',
            fontFamily: '"Bangers", cursive',
            padding: '0.4rem 0.7rem',
            borderRight: n < 7 ? '2px solid #000' : 'none',
            background: n === 7 ? '#000' : 'transparent',
            color: n === 7 ? '#ffcc00' : '#000',
            transition: 'all 0.1s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
