import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

export default function Page6Depth() {
  const { repos, loading } = useGithubRepos();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const rotX = (mouse.y - 0.5) * 8;
  const rotY = (mouse.x - 0.5) * -8;

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: '#0c0c14',
      color: '#e0e0e8',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      perspective: '1200px',
      overflow: 'hidden',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes orbitSlow {
          from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        .depth-card {
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
        }
        .depth-card:hover {
          transform: translateZ(40px) scale(1.05) !important;
          box-shadow: 0 25px 80px rgba(80,120,255,0.15), 0 0 0 1px rgba(80,120,255,0.2) !important;
          z-index: 10 !important;
        }
        .depth-card:hover .dc-name { color: #7090ff; }
        .depth-nav a:hover { color: #7090ff !important; }
      `}</style>

      {/* Orbiting particles */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 0 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: ['#7090ff', '#ff7090', '#70ff90'][i],
            opacity: 0.4,
            animation: `orbitSlow ${20 + i * 8}s linear infinite`,
            animationDelay: `${i * -7}s`,
          }} />
        ))}
      </div>

      {/* Ambient light plane */}
      <div style={{
        position: 'fixed',
        top: `${mouse.y * 100}%`, left: `${mouse.x * 100}%`,
        width: '600px', height: '600px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(80,120,255,0.06) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
        transition: 'top 2s ease, left 2s ease',
      }} />

      {/* Content with 3D tilt */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1100px', margin: '0 auto', padding: '0 2rem',
        transformStyle: 'preserve-3d',
      }}>
        {/* Hero */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}>
          <div style={{
            transform: `rotateX(${rotX * 0.5}deg) rotateY(${rotY * 0.5}deg) translateZ(30px)`,
            transition: 'transform 0.8s ease',
            transformStyle: 'preserve-3d',
          }}>
            <img
              src="/images/kona.png"
              alt="Kona"
              style={{
                width: 'min(45vw, 260px)',
                filter: 'drop-shadow(0 20px 40px rgba(80,120,255,0.15))',
                transform: 'translateZ(60px)',
                marginBottom: '1rem',
              }}
            />
          </div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: '#a0a8c0',
            transform: `rotateX(${rotX * 0.3}deg) rotateY(${rotY * 0.3}deg) translateZ(10px)`,
            transition: 'transform 1s ease',
          }}>
            KONA
          </h1>
          <p style={{
            fontSize: '0.85rem',
            color: '#606880',
            marginTop: '0.5rem',
            fontWeight: 300,
            transform: `rotateX(${rotX * 0.2}deg) rotateY(${rotY * 0.2}deg)`,
            transition: 'transform 1.2s ease',
          }}>
            building in depth
          </p>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '3rem',
            width: '1px', height: '40px',
            background: 'linear-gradient(transparent, #7090ff44)',
            animation: 'shimmer 2s ease-in-out infinite',
          }} />
        </section>

        {/* 3D Card Grid */}
        <section style={{
          paddingBottom: '10rem',
          transformStyle: 'preserve-3d',
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#606880' }}>loading...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              transformStyle: 'preserve-3d',
            }}>
              {repos.map((repo, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const z = (Math.sin(i * 0.8) * 15);
                const cardRotX = rotX * (0.1 + col * 0.05);
                const cardRotY = rotY * (0.1 + row * 0.05);

                return (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="depth-card"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '2rem',
                      background: 'rgba(16,16,28,0.8)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '12px',
                      transform: `rotateX(${cardRotX}deg) rotateY(${cardRotY}deg) translateZ(${z}px)`,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="dc-name" style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      transition: 'color 0.3s',
                    }}>
                      {repo.name}
                    </div>
                    {repo.description && (
                      <p style={{ fontSize: '0.8rem', color: '#606880', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                        {repo.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {repo.language && (
                        <span style={{
                          fontSize: '0.65rem',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(80,120,255,0.08)',
                          borderRadius: '4px',
                          color: '#7090ff',
                        }}>
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span style={{ fontSize: '0.65rem', color: '#404860' }}>
                          {repo.stargazers_count} stars
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Nav */}
      <nav className="depth-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: 'rgba(12,12,20,0.9)', backdropFilter: 'blur(20px)',
        padding: '0.5rem 1.2rem', borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a href="/" style={{ color: '#606880', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 6 ? '#7090ff' : '#606880',
            textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
