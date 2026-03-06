import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

export default function Page2Liquid() {
  const { repos, loading } = useGithubRepos();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: '#050510',
      color: '#e8e0f0',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes blob1 {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 50% 70% 60%; }
          75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
        }
        @keyframes blob2 {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          33% { border-radius: 70% 30% 50% 60% / 30% 70% 40% 60%; }
          66% { border-radius: 30% 60% 40% 70% / 60% 40% 60% 30%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .liquid-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .liquid-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: rgba(150,120,255,0.3);
          box-shadow: 0 20px 60px rgba(100,60,200,0.2), 0 0 0 1px rgba(150,120,255,0.1);
        }
        .liquid-card:hover .lc-title { color: #b8a0ff; }
        .liquid-nav a:hover { color: #b8a0ff !important; }
      `}</style>

      {/* Reactive blobs */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          width: '60vw', height: '60vw',
          maxWidth: '700px', maxHeight: '700px',
          top: `${15 + mouse.y * 10}%`,
          left: `${-5 + mouse.x * 15}%`,
          background: 'radial-gradient(ellipse, rgba(100,50,200,0.15) 0%, rgba(50,20,120,0.05) 60%, transparent 80%)',
          filter: 'blur(60px)',
          animation: 'blob1 20s ease-in-out infinite',
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 20}px)`,
          transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
        <div style={{
          position: 'absolute',
          width: '50vw', height: '50vw',
          maxWidth: '600px', maxHeight: '600px',
          bottom: `${10 + mouse.y * 8}%`,
          right: `${-10 + mouse.x * 12}%`,
          background: 'radial-gradient(ellipse, rgba(40,100,200,0.12) 0%, rgba(20,50,150,0.04) 60%, transparent 80%)',
          filter: 'blur(50px)',
          animation: 'blob2 25s ease-in-out infinite',
          transform: `translate(${-mouse.x * 25}px, ${-mouse.y * 15}px)`,
          transition: 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
        <div style={{
          position: 'absolute',
          width: '35vw', height: '35vw',
          maxWidth: '400px', maxHeight: '400px',
          top: '50%', left: '50%',
          background: 'radial-gradient(ellipse, rgba(180,80,200,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'blob1 18s ease-in-out 5s infinite reverse',
          transform: `translate(calc(-50% + ${mouse.x * 40 - 20}px), calc(-50% + ${mouse.y * 30 - 15}px))`,
          transition: 'transform 2s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Hero */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          <img
            src="/images/kona.png"
            alt="Kona"
            style={{
              width: 'min(50vw, 280px)',
              filter: 'drop-shadow(0 0 40px rgba(150,120,255,0.2))',
              animation: 'float 6s ease-in-out infinite',
              transform: `rotate(${(mouse.x - 0.5) * 5}deg)`,
              transition: 'transform 1s ease',
            }}
          />
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 300,
            color: '#a090c0',
            maxWidth: '400px',
            lineHeight: 1.7,
          }}>
            creative developer
          </p>
        </section>

        {/* Repos */}
        <section style={{ paddingBottom: '8rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#c0b0e0',
          }}>
            projects
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', color: '#a090c088' }}>
              <div style={{
                width: '40px', height: '40px', margin: '0 auto',
                border: '2px solid rgba(150,120,255,0.1)',
                borderTopColor: '#b8a0ff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {repos.map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    animation: `float ${5 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                >
                  <div className="lc-title" style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    transition: 'color 0.3s ease',
                  }}>
                    {repo.name}
                  </div>
                  {repo.description && (
                    <p style={{ fontSize: '0.85rem', color: '#a090c0', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {repo.language && (
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        background: 'rgba(150,120,255,0.1)',
                        borderRadius: '999px',
                        color: '#b8a0ff',
                      }}>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontSize: '0.7rem', color: '#a090c066' }}>
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
      <nav className="liquid-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(10,10,30,0.8)', backdropFilter: 'blur(20px)',
        padding: '0.6rem 1.2rem', borderRadius: '999px',
        border: '1px solid rgba(150,120,255,0.1)',
      }}>
        <a href="/" style={{ color: '#a090c088', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 2 ? '#b8a0ff' : '#a090c088',
            textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
