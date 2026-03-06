import { useState, useEffect, useRef } from 'react';
import { useGithubRepos, type Repo } from './useGithubRepos';

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#00ff41',
    fontFamily: '"IBM Plex Mono", "Courier New", monospace',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  scanlines: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 10,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
  },
  crt: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 11,
    boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,255,65,0.03)',
    borderRadius: '8px',
  },
  header: {
    borderBottom: '1px solid #00ff4133',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
  },
  prompt: {
    color: '#00ff41',
    opacity: 0.6,
    fontSize: '0.75rem',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    textShadow: '0 0 10px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.1)',
    margin: '0.5rem 0',
  },
  bio: {
    color: '#00ff41',
    opacity: 0.5,
    fontSize: '0.85rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '1px',
  },
  repo: {
    padding: '1.2rem',
    border: '1px solid #00ff4118',
    background: '#0d0d0d',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  repoName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '0.3rem',
  },
  repoDesc: {
    fontSize: '0.8rem',
    color: '#00ff4188',
    lineHeight: 1.5,
    marginBottom: '0.5rem',
  },
  repoMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.7rem',
    color: '#00ff4155',
  },
  blink: {
    display: 'inline-block',
    width: '8px',
    height: '16px',
    background: '#00ff41',
    marginLeft: '4px',
    verticalAlign: 'middle',
  },
  loading: {
    fontSize: '0.9rem',
    color: '#00ff4188',
  },
  nav: {
    position: 'fixed',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 20,
    background: '#0a0a0aee',
    padding: '0.5rem 1rem',
    border: '1px solid #00ff4122',
  },
  navLink: {
    color: '#00ff4188',
    textDecoration: 'none',
    fontSize: '0.7rem',
    fontFamily: '"IBM Plex Mono", monospace',
    padding: '0.2rem 0.5rem',
  },
};

function TypeWriter({ text, speed = 30, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{displayed}</>;
}

export default function Page1Terminal() {
  const { repos, loading } = useGithubRepos();
  const [booted, setBooted] = useState(false);
  const [showRepos, setShowRepos] = useState(false);
  const [blinkOn, setBlinkOn] = useState(true);
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setBlinkOn(b => !b), 530);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={S.page}>
      <div style={S.scanlines} />
      <div style={S.crt} />
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
          75% { opacity: 0.97; }
        }
        .terminal-page { animation: flicker 0.15s infinite; }
        .repo-row:hover { background: #00ff4108 !important; border-color: #00ff4140 !important; }
        .repo-row:hover .repo-name-text { text-shadow: 0 0 8px rgba(0,255,65,0.5); }
      `}</style>

      <div className="terminal-page">
        <header style={S.header}>
          <div style={S.prompt}>
            {booted ? (
              <TypeWriter text="kona@dev ~ $ cat profile.txt" speed={25} onDone={() => setShowRepos(true)} />
            ) : (
              'booting...'
            )}
          </div>
          {showRepos && (
            <>
              <h1 style={S.title}>KONA</h1>
              <div style={S.bio}>
                <TypeWriter text="> creative developer. builds things that ship." speed={20} />
              </div>
            </>
          )}
        </header>

        {showRepos && (
          <>
            <div style={{ ...S.prompt, marginBottom: '1rem' }}>
              <TypeWriter text="$ gh repo list konacodes --json name,description,language" speed={15} />
              <span style={{ ...S.blink, opacity: blinkOn ? 1 : 0 }} />
            </div>

            {loading ? (
              <div style={S.loading}>
                fetching repos<span style={{ ...S.blink, opacity: blinkOn ? 1 : 0 }} />
              </div>
            ) : (
              <div style={S.grid}>
                {repos.map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-row"
                    style={{
                      ...S.repo,
                      animationDelay: `${i * 0.05}s`,
                      opacity: 0,
                      animation: `fadeIn 0.3s ease ${i * 0.05}s forwards`,
                    }}
                    onMouseEnter={() => setHoveredRepo(repo.name)}
                    onMouseLeave={() => setHoveredRepo(null)}
                  >
                    <div className="repo-name-text" style={S.repoName}>
                      <span style={{ color: '#00ff4155' }}>~/</span>{repo.name}
                    </div>
                    {repo.description && (
                      <div style={S.repoDesc}>{repo.description}</div>
                    )}
                    <div style={S.repoMeta}>
                      {repo.language && <span>[{repo.language}]</span>}
                      {repo.stargazers_count > 0 && <span>*{repo.stargazers_count}</span>}
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav style={S.nav}>
        <a href="/" style={S.navLink}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{ ...S.navLink, color: n === 1 ? '#00ff41' : '#00ff4188' }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
