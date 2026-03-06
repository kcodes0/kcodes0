import { useGithubRepos } from './useGithubRepos';

export default function Page3Newspaper() {
  const { repos, loading } = useGithubRepos();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f0e8',
      color: '#1a1a18',
      fontFamily: '"Playfair Display", Georgia, serif',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />

      <style>{`
        .np-card { transition: all 0.3s ease; }
        .np-card:hover { background: #eae5d8 !important; }
        .np-card:hover .np-headline { text-decoration: underline; text-decoration-thickness: 2px; }
        .np-nav a:hover { color: #8b0000 !important; }
        @media (max-width: 768px) {
          .np-columns { column-count: 1 !important; }
          .np-masthead-title { font-size: 3rem !important; }
          .np-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Masthead */}
        <header style={{
          textAlign: 'center',
          padding: '2rem 0 0.5rem',
          borderBottom: '3px double #1a1a18',
        }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#666', marginBottom: '0.5rem' }}>
            Est. 2024 &bull; Free &bull; {today}
          </div>
          <h1 className="np-masthead-title" style={{
            fontFamily: '"UnifrakturMaguntia", "Playfair Display", serif',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1,
            margin: '0.3rem 0',
            letterSpacing: '0.02em',
          }}>
            The Kona Dispatch
          </h1>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', paddingBottom: '0.5rem' }}>
            All the code that's fit to ship
          </div>
        </header>

        {/* Sub-header bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '2rem',
          padding: '0.6rem 0', borderBottom: '1px solid #ccc',
          fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          {['Open Source', 'Experiments', 'Tools', 'Archives'].map(s => (
            <span key={s} style={{ color: '#555' }}>{s}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', fontStyle: 'italic', color: '#888' }}>
            Fetching the latest edition...
          </div>
        ) : (
          <>
            {/* Lead Story */}
            {repos[0] && (
              <a
                href={repos[0].html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <section style={{
                  padding: '2.5rem 0',
                  borderBottom: '1px solid #ccc',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8b0000', marginBottom: '0.5rem' }}>
                    Breaking
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    maxWidth: '700px',
                    margin: '0 auto 1rem',
                  }}>
                    {repos[0].name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </h2>
                  <p style={{
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#555',
                    maxWidth: '500px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                  }}>
                    {repos[0].description || 'A project by Kona, freshly shipped.'}
                  </p>
                  {repos[0].language && (
                    <div style={{ marginTop: '0.8rem', fontSize: '0.7rem', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Written in {repos[0].language}
                    </div>
                  )}
                </section>
              </a>
            )}

            {/* Two-column hero */}
            <div className="np-hero-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid #ccc',
            }}>
              {repos.slice(1, 3).map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="np-card"
                  style={{
                    textDecoration: 'none', color: 'inherit',
                    padding: '2rem',
                    borderRight: i === 0 ? '1px solid #ccc' : 'none',
                  }}
                >
                  <h3 className="np-headline" style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: '0.5rem',
                  }}>
                    {repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </h3>
                  <p style={{
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: '0.85rem',
                    color: '#666',
                    lineHeight: 1.7,
                  }}>
                    {repo.description || 'Another fine addition to the archive.'}
                  </p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.65rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {repo.language || 'Unknown'} &bull; Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                </a>
              ))}
            </div>

            {/* Multi-column body */}
            <div className="np-columns" style={{
              columnCount: 3,
              columnGap: '2rem',
              columnRule: '1px solid #ddd',
              padding: '2rem 0 4rem',
            }}>
              {repos.slice(3).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="np-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    breakInside: 'avoid',
                    marginBottom: '1.5rem',
                    padding: '0.8rem 0',
                    borderBottom: '1px solid #e0ddd5',
                  }}
                >
                  <h4 className="np-headline" style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: '0.3rem',
                  }}>
                    {repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </h4>
                  <p style={{
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: '0.8rem',
                    color: '#666',
                    lineHeight: 1.6,
                  }}>
                    {repo.description || 'No description provided.'}
                  </p>
                  {repo.language && (
                    <span style={{ fontSize: '0.6rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {repo.language}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Classifieds footer */}
            <footer style={{
              borderTop: '3px double #1a1a18',
              padding: '1.5rem 0',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.7rem', color: '#888', fontStyle: 'italic' }}>
                &copy; {new Date().getFullYear()} The Kona Dispatch &mdash; Printed with caffeine and bad decisions
              </p>
            </footer>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="np-nav" style={{
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.8rem', zIndex: 20,
        background: '#f4f0e8ee', padding: '0.5rem 1rem',
        border: '1px solid #ccc', fontFamily: 'system-ui, sans-serif',
      }}>
        <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s' }}>home</a>
        {[1,2,3,4,5,6,7].map(n => (
          <a key={n} href={`/${n}`} style={{
            color: n === 3 ? '#8b0000' : '#888',
            textDecoration: 'none', fontSize: '0.7rem', transition: 'color 0.2s',
          }}>{n}</a>
        ))}
      </nav>
    </div>
  );
}
