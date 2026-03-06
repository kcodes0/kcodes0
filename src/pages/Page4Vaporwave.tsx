import { useState, useEffect } from 'react';
import { useGithubRepos } from './useGithubRepos';

export default function Page4Vaporwave() {
  const { repos, loading } = useGithubRepos();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setTime(t => t + 1), 50);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d001a 0%, #1a0033 30%, #330044 50%, #ff6b9d 75%, #ffa07a 90%, #ffcc66 100%)',
      color: '#fff',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes gridScroll {
          from { transform: perspective(400px) rotateX(60deg) translateY(0); }
          to { transform: perspective(400px) rotateX(60deg) translateY(50px); }
        }
        @keyframes glitch1 {
          0%, 100% { clip-path: inset(0 0 95% 0); transform: translateX(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translateX(3px); }
          60% { clip-path: inset(40% 0 40% 0); transform: translateX(-1px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translateX(2px); }
        }
        @keyframes neonPulse {
          0%, 100% { text-shadow: 0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 40px #ff6b9d, 0 0 80px #ff6b9d; }
          50% { text-shadow: 0 0 5px #ff6b9d, 0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 40px #ff6b9d; }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vw-card {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid rgba(255,107,157,0.15);
        }
        .vw-card:hover {
          transform: translateY(-6px) !important;
          border-color: #ff6b9d;
          box-shadow: 0 0 20px rgba(255,107,157,0.3), 0 0 60px rgba(255,107,157,0.1), inset 0 0 20px rgba(255,107,157,0.05);
        }
        .vw-card:hover .vw-repo-name { color: #ff6b9d; }
        .vw-nav a:hover { color: #ff6b9d !important; }
      `}</style>

      {/* Perspective grid floor */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: '-50%', right: '-50%',
        height: '50vh',
        overflow: 'hidden',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,107,157,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,157,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 2s linear infinite',
          transformOrigin: 'center top',
        }} />
      </div>

      {/* Sun circle */}
      <div style={{
        position: 'fixed',
        bottom: '25vh', left: '50%', transform: 'translateX(-50%)',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(180deg, #ffcc66 0%, #ff6b9d 50%, #cc44aa 100%)',
        boxShadow: '0 0 80px rgba(255,107,157,0.4), 0 0 200px rgba(255,107,157,0.1)',
        zIndex: 0,
        // Horizontal stripes
        WebkitMaskImage: 'repeating-linear-gradient(0deg, #000 0px, #000 8px, transparent 8px, transparent 12px)',
        maskImage: 'repeating-linear-gradient(0deg, #000 0px, #000 8px, transparent 8px, transparent 12px)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Hero */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{ position: 'relative' }}>
            <h1 style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              animation: 'neonPulse 3s ease-in-out infinite',
              color: '#fff',
            }}>
              KONA
            </h1>
            {/* Glitch layer */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#00ffff',
              animation: 'glitch1 3s steps(1) infinite',
              opacity: 0.3,
            }}>
              KONA
            </div>
          </div>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
            marginTop: '1rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            creative developer
          </p>

          {/* Decorative Japanese text */}
          <div style={{
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: 'rgba(255,107,157,0.3)',
            letterSpacing: '0.5em',
          }}>
            {/* just atmosphere */}
            &#x30AF;&#x30EA;&#x30A8;&#x30A4;&#x30C6;&#x30A3;&#x30D6;
          </div>
        </section>

        {/* Repos */}
        <section style={{ paddingBottom: '10rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '3rem',
          }}>
            Projects
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,107,157,0.5)' }}>loading...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {repos.map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vw-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '1.5rem',
                    background: 'rgba(26,0,51,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                    animation: `floatUp 0.5s ease ${i * 0.08}s backwards`,
                  }}
                >
                  <div className="vw-repo-name" style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    transition: 'color 0.3s',
                  }}>
                    {repo.name}
                  </div>
                  {repo.description && (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {repo.language && (
                      <span style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.5rem',
                        border: '1px solid rgba(255,107,157,0.2)',
                        borderRadius: '2px',
                        color: '#ff6b9d',
                      }}>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)' }}>
                        {repo.stargazers_count} stars
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Nav */}
      <nav className="vw-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(13,0,26,0.85)', backdropFilter: 'blur(20px)',
        padding: '0.5rem 1.2rem', borderRadius: '4px',
        border: '1px solid rgba(255,107,157,0.15)',
      }}>
        <a href="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 4 ? '#ff6b9d' : 'rgba(255,255,255,0.3)',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
