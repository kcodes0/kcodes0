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
      background: '#141312',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .brut-card {
          transition: all 0.15s ease;
          cursor: pointer;
        }
        .brut-card:hover {
          background: #1e1d1b !important;
        }
        .brut-card:hover .brut-lang {
          border-color: #a8c8e8 !important;
          color: #a8c8e8 !important;
        }
        .brut-card:hover .brut-desc {
          color: #8a8680 !important;
        }
        .brut-card:hover .brut-idx {
          color: #a8c8e8 !important;
        }
        .brut-card:hover .brut-name {
          color: #f0ece4 !important;
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${scrollPct * 100}%`,
        background: '#a8c8e8', zIndex: 100,
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
          color: '#d5d0c8',
        }}>
          KO<br/><span style={{ color: '#a8c8e8' }}>NA</span>
        </h1>
        <a href="https://blog.kcodes.me" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          marginTop: '2rem',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#a8c8e8',
          textDecoration: 'none',
          transition: 'color 0.15s',
        }}>Blog</a>
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
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a4640', marginTop: '0.3rem' }}>
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
                borderBottom: '1px solid #1e1d1b',
                textDecoration: 'none',
                color: '#d5d0c8',
              }}
            >
              <span className="brut-idx" style={{
                fontSize: '0.7rem',
                fontWeight: 400,
                color: '#4a4640',
                minWidth: '2rem',
                fontVariantNumeric: 'tabular-nums',
                transition: 'color 0.15s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="brut-name" style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                flex: 1,
                transition: 'color 0.15s',
              }}>
                {repo.name}
              </span>
              {repo.language && (
                <span className="brut-lang" style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  border: '1px solid #3a3835',
                  padding: '0.2rem 0.5rem',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s',
                  color: '#6a6660',
                }}>
                  {repo.language}
                </span>
              )}
              <span className="brut-desc" style={{
                fontSize: '0.75rem',
                color: '#5a5650',
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
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#4a4640' }}>
          &copy; {new Date().getFullYear()} KONA
        </span>
        <span style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
          K<span style={{ color: '#a8c8e8' }}>.</span>
        </span>
      </footer>

    </div>
  );
}
