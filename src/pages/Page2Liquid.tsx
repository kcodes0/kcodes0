import { useState, useEffect, useRef } from 'react';
import { useGithubRepos } from './useGithubRepos';

// Gallery Wall — museum exhibition feel, huge whitespace, serif,
// horizontal scroll gallery, like walking through a show
export default function Page2Gallery() {
  const { repos, loading } = useGithubRepos();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const handle = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', handle, { passive: false });
    return () => el.removeEventListener('wheel', handle);
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const handle = () => {
      const cardWidth = el.scrollWidth / Math.max(repos.length, 1);
      setActiveIdx(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener('scroll', handle);
    return () => el.removeEventListener('scroll', handle);
  }, [repos]);

  const colors = ['#c8b8a0', '#a0b0a8', '#b0a0b8', '#a8b0c0', '#b8a890', '#a0a8b0', '#b0b8a0'];

  return (
    <div style={{
      height: '100vh',
      background: '#faf8f5',
      color: '#1a1a18',
      fontFamily: '"Playfair Display", Georgia, serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        .gal-card {
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }
        .gal-card:hover { transform: translateY(-8px); }
        .gal-card:hover .gal-swatch { transform: scale(1.05); }
        .gal-card:hover .gal-title { letter-spacing: 0.02em; }
        .gal-nav a { transition: color 0.2s; }
        .gal-nav a:hover { color: #1a1a18 !important; }
        .gal-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top bar */}
      <header style={{
        padding: '2rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0 }}>Kona</h1>
          <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem', color: '#999', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
            Selected Works
          </p>
        </div>
        <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem', color: '#bbb' }}>
          {activeIdx + 1} / {repos.length || '--'}
        </div>
      </header>

      {/* Horizontal gallery */}
      <div
        ref={galleryRef}
        className="gal-scroll"
        style={{
          flex: 1,
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          gap: '3rem',
          padding: '0 3rem 4rem',
          alignItems: 'center',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {loading ? (
          <div style={{ fontStyle: 'italic', color: '#bbb', width: '100%', textAlign: 'center' }}>
            Curating...
          </div>
        ) : repos.map((repo, i) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="gal-card"
            style={{
              width: 'min(420px, 75vw)',
              textDecoration: 'none',
              color: 'inherit',
              scrollSnapAlign: 'center',
            }}
          >
            {/* Color swatch — acts as the "artwork" */}
            <div className="gal-swatch" style={{
              width: '100%',
              height: '280px',
              background: colors[i % colors.length],
              marginBottom: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              {/* Repo initial as abstract mark */}
              <span style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                fontSize: '10rem',
                fontWeight: 600,
                opacity: 0.12,
                lineHeight: 1,
                color: '#1a1a18',
              }}>
                {repo.name.charAt(0).toUpperCase()}
              </span>
              {/* Thin line accent */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                width: '40px',
                height: '2px',
                background: 'rgba(26,26,24,0.2)',
              }} />
            </div>

            {/* Label */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <h3 className="gal-title" style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'letter-spacing 0.3s ease',
              }}>
                {repo.name}
              </h3>
              {repo.language && (
                <span style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '0.6rem',
                  color: '#bbb',
                }}>
                  {repo.language}
                </span>
              )}
            </div>
            {repo.description && (
              <p style={{
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: '#888',
                lineHeight: 1.6,
              }}>
                {repo.description}
              </p>
            )}
          </a>
        ))}

        {/* End spacer */}
        <div style={{ flexShrink: 0, width: '3rem' }} />
      </div>

      {/* Scroll indicator dots */}
      <div style={{
        display: 'flex',
        gap: '6px',
        justifyContent: 'center',
        padding: '0 0 2rem',
      }}>
        {repos.slice(0, 12).map((_, i) => (
          <div key={i} style={{
            width: activeIdx === i ? '20px' : '4px',
            height: '4px',
            borderRadius: '2px',
            background: activeIdx === i ? '#1a1a18' : '#d4d0c8',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Nav */}
      <nav className="gal-nav" style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '1rem', zIndex: 20,
        background: '#faf8f5ee', padding: '0.5rem 1rem',
        fontFamily: '"Space Grotesk", sans-serif',
      }}>
        <a href="/" style={{ color: '#bbb', textDecoration: 'none', fontSize: '0.7rem' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 2 ? '#1a1a18' : '#bbb',
            textDecoration: 'none', fontSize: '0.7rem',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
