import { useState, useEffect } from 'react';
import { useGithubRepos } from './useGithubRepos';

export default function Page1Brutalist() {
  const { repos, loading } = useGithubRepos();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f2ed',
      color: '#2a2825',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .brut-card {
          transition: all 0.15s ease;
          cursor: pointer;
        }
        .brut-card:hover {
          background: #2a2825 !important;
          color: #f5f2ed !important;
        }
        .brut-card:hover .brut-lang {
          border-color: #f5f2ed !important;
          color: #f5f2ed !important;
        }
        .brut-card:hover .brut-desc {
          color: #a09d96 !important;
        }
        .brut-nav a {
          transition: all 0.1s;
        }
        .brut-nav a:hover {
          background: #2a2825 !important;
          color: #f5f2ed !important;
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${scrollPct * 100}%`,
        background: '#2a2825', zIndex: 100,
        transition: 'width 0.1s',
      }} />

      {/* Hero */}
      <section style={{
        padding: '8rem 2rem 4rem',
        borderBottom: '2px solid #2a2825',
      }}>
        <h1 style={{
          fontSize: 'clamp(6rem, 20vw, 15rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.06em',
          margin: 0,
          textTransform: 'uppercase',
          color: '#2a2825',
        }}>
          KO<br/>NA
        </h1>
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
          fontSize: '0.8rem',
          fontWeight: 400,
          color: '#8a8780',
        }}>
          <span>Developer</span>
          <span>/</span>
          <span>Builder</span>
          <span>/</span>
          <span>Shipper</span>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #2a2825',
      }}>
        {[
          { label: 'REPOS', value: repos.length },
          { label: 'LANGUAGES', value: [...new Set(repos.map(r => r.language).filter(Boolean))].length },
          { label: 'STARS', value: repos.reduce((a, r) => a + r.stargazers_count, 0) },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1,
            padding: '1.5rem 2rem',
            borderRight: i < 2 ? '2px solid #2a2825' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1 }}>
              {loading ? '--' : stat.value}
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#a09d96', marginTop: '0.3rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Repos - raw list */}
      {loading ? (
        <div style={{ padding: '4rem 2rem', fontSize: '1.5rem', fontWeight: 900 }}>
          LOADING...
        </div>
      ) : (
        <div>
          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-card"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '1.2rem 2rem',
                borderBottom: '1px solid #d4d0c8',
                textDecoration: 'none',
                color: '#2a2825',
              }}
            >
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 400,
                color: '#a09d96',
                minWidth: '2rem',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                flex: 1,
              }}>
                {repo.name}
              </span>
              {repo.language && (
                <span className="brut-lang" style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  border: '1px solid #2a2825',
                  padding: '0.2rem 0.5rem',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s',
                }}>
                  {repo.language}
                </span>
              )}
              <span className="brut-desc" style={{
                fontSize: '0.75rem',
                color: '#8a8780',
                maxWidth: '250px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}>
                {repo.description || ''}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '2px solid #2a2825',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#a09d96' }}>
          &copy; {new Date().getFullYear()} KONA
        </span>
        <span style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
          K.
        </span>
      </footer>

      {/* Nav */}
      <nav className="brut-nav" style={{
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 0, zIndex: 20,
        border: '2px solid #2a2825',
        background: '#f5f2ed',
      }}>
        <a href="/" style={{
          color: '#2a2825', textDecoration: 'none', fontSize: '0.7rem', fontWeight: 700,
          padding: '0.4rem 0.7rem', borderRight: '1px solid #2a2825',
        }}>HOME</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 1 ? '#f5f2ed' : '#2a2825',
            textDecoration: 'none', fontSize: '0.7rem', fontWeight: 700,
            padding: '0.4rem 0.7rem',
            borderRight: n < 7 ? '1px solid #2a2825' : 'none',
            background: n === 1 ? '#2a2825' : 'transparent',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
