import { useState, useEffect, useMemo } from 'react';
import { useGithubRepos } from './useGithubRepos';

interface Ad {
  text: string;
  sub?: string;
  cta?: string;
  link?: string;
}

const ADS: Ad[] = [
  { text: 'TIRED OF WORKING?', sub: 'Try being a congressman.', link: 'https://news.kcodes.me' },
  { text: 'YOUR REPRESENTATIVE HATES THIS ONE TRICK', sub: '(voting)', link: 'https://news.kcodes.me' },
  { text: 'HOT SINGLES IN YOUR AREA', sub: "They're all running for office.", link: 'https://news.kcodes.me' },
  { text: 'DOWNLOAD MORE RAM', sub: "It won't help with Congress." },
  { text: 'FILIBUSTER-PROOF YOUR CODE.', sub: 'Use TypeScript.' },
  { text: 'IS YOUR CODE AS BLOATED AS THE FEDERAL BUDGET?', sub: 'Try Bun.', cta: 'OPTIMIZE NOW' },
  { text: 'LOBBYIST SPECIAL:', sub: 'Buy one politician, get one free.', link: 'https://news.kcodes.me' },
  { text: 'BREAKING:', sub: 'Local developer ships code. World unchanged.' },
  { text: 'CONGRESS:', sub: "535 people who can't merge a PR.", link: 'https://news.kcodes.me' },
  { text: 'PREMIUM AIR\u2122', sub: 'Now with 20% more oxygen. Subscribe for $9.99/mo.' },
  { text: 'THIS AD WAS HANDCRAFTED.', sub: 'Not by AI. Okay, maybe a little.' },
  { text: 'VOTE FOR NOBODY.', sub: "They've never let you down.", link: 'https://news.kcodes.me' },
  { text: 'YOUR DATA IS SAFE WITH US.', sub: "We're too lazy to steal it." },
  { text: 'BROUGHT TO YOU BY:', sub: 'Your tax dollars (probably).', link: 'https://news.kcodes.me' },
  { text: 'BREAKING NEWS:', sub: 'Politician keeps promise. Experts baffled.', link: 'https://news.kcodes.me' },
  { text: 'GIT BLAME:', sub: 'The only accountability tool that works in government.' },
  { text: 'HAVE YOU TRIED TURNING CONGRESS OFF AND ON AGAIN?', link: 'https://news.kcodes.me' },
  { text: 'FREE HEALTHCARE*', sub: '*for members of Congress only.', link: 'https://news.kcodes.me' },
  { text: 'NEW STUDY:', sub: 'Reading terms of service is longer than most bills Congress passes.', link: 'https://news.kcodes.me' },
  { text: '404: GOVERNMENT ACCOUNTABILITY NOT FOUND', link: 'https://news.kcodes.me' },
  { text: 'npm install good-governance', sub: 'ERR! package not found.' },
  { text: 'RUST:', sub: 'Making you feel dumb since 2015.' },
  { text: 'ALERT:', sub: "You've been randomly selected to pay taxes. Oh wait, that's everyone.", link: 'https://news.kcodes.me' },
  { text: 'BIPARTISAN AGREEMENT:', sub: 'Both sides agree they deserve a raise.', link: 'https://news.kcodes.me' },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Labs', href: '/labs' },
  { name: 'Photos', href: '/photos' },
  { name: 'Now', href: '/now' },
  { name: 'Uses', href: '/uses' },
  { name: 'Blog', href: 'https://blog.kcodes.me', external: true },
  { name: 'GitHub', href: 'https://github.com/kcodes0', external: true },
];

const PROJECTS = [
  {
    name: 'Duck Lang',
    desc: 'A programming language where you say "quack" to compile. The goose has opinions.',
    tech: 'Rust',
    href: 'https://github.com/kcodes0/duck-lang',
  },
  {
    name: 'Blog CMS',
    desc: 'Markdown-first content management on Cloudflare Workers + D1. Fast, minimal, no bloat.',
    tech: 'CF Workers',
    href: 'https://blog.kcodes.me',
  },
  {
    name: 'LIKWID',
    desc: 'ASCII art fluid simulation effect.',
    tech: 'TypeScript',
    href: 'https://github.com/kcodes0/likwid',
  },
];

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

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const langCount = [...new Set(repos.map(r => r.language).filter(Boolean))].length;

  const sidebarAds = useMemo(() => pickRandom(ADS, 3), []);
  const bannerAd = useMemo(() => pickRandom(ADS.filter(a => a.sub), 1)[0], []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#141312',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .neo-panel {
          border: 1px solid #2a2825;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
          transition: border-color 0.2s ease;
        }
        .neo-panel:hover {
          border-color: #3a3835;
        }
        .neo-header {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8c8e8;
          font-weight: 700;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #2a2825;
        }
        .neo-nav-link {
          display: block;
          padding: 0.35rem 0;
          color: #d5d0c8;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .neo-nav-link:hover {
          color: #a8c8e8;
        }
        .neo-project {
          display: block;
          padding: 0.75rem 0;
          border-bottom: 1px solid #1e1d1b;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.15s ease;
        }
        .neo-project:last-of-type {
          border-bottom: none;
        }
        .neo-project:hover {
          padding-left: 0.5rem;
        }
        .neo-project:hover .neo-project-name {
          color: #a8c8e8;
        }
        .neo-repo {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.8rem 0.5rem;
          border-bottom: 1px solid #1e1d1b;
          text-decoration: none;
          color: #d5d0c8;
          transition: all 0.15s ease;
        }
        .neo-repo:hover {
          background: #1e1d1b;
        }
        .neo-repo:hover .neo-repo-name {
          color: #f0ece4;
        }
        .neo-repo:hover .neo-repo-idx {
          color: #a8c8e8;
        }
        .neo-repo:hover .neo-repo-lang {
          border-color: #a8c8e8;
          color: #a8c8e8;
        }
        .neo-stat {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.8rem;
        }
        .neo-layout {
          display: flex;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .neo-main {
          flex: 1;
          min-width: 0;
        }
        .neo-sidebar {
          width: 260px;
          flex-shrink: 0;
        }
        .neo-viewall {
          display: inline-block;
          margin-top: 0.75rem;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a8c8e8;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .neo-viewall:hover {
          color: #d5d0c8;
        }
        .neo-ad {
          border: 1px dashed #2a2825;
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
          position: relative;
          transition: border-color 0.2s ease;
        }
        .neo-ad:hover {
          border-color: #3a3835;
        }
        .neo-ad-label {
          position: absolute;
          top: 0.4rem;
          right: 0.5rem;
          font-size: 0.45rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3a3835;
        }
        .neo-ad-text {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8a8680;
          line-height: 1.4;
        }
        .neo-ad-sub {
          font-size: 0.7rem;
          color: #5a5650;
          margin-top: 0.2rem;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
        }
        .neo-ad-cta {
          display: inline-block;
          margin-top: 0.5rem;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a8c8e8;
          text-decoration: none;
          transition: color 0.15s;
        }
        a.neo-ad:hover .neo-ad-text {
          color: #b5b0a8;
        }
        a.neo-ad:hover .neo-ad-cta {
          color: #d5d0c8;
        }
        .neo-ad-banner {
          border: 1px dashed #2a2825;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
          position: relative;
          transition: border-color 0.2s ease;
        }
        .neo-ad-banner:hover {
          border-color: #3a3835;
        }
        @media (max-width: 768px) {
          .neo-layout {
            flex-direction: column;
            padding: 0 1rem;
          }
          .neo-sidebar {
            width: 100%;
            order: -1;
          }
          .neo-header-banner {
            padding: 3rem 1rem 1.5rem !important;
          }
          .neo-header-title {
            font-size: clamp(4rem, 15vw, 8rem) !important;
          }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${scrollPct * 100}%`,
        background: '#a8c8e8', zIndex: 100,
        transition: 'width 0.1s',
      }} />

      {/* Header banner */}
      <header className="neo-header-banner" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem',
        borderBottom: '2px solid #2a2825',
        marginBottom: '1.5rem',
      }}>
        <h1 className="neo-header-title" style={{
          fontSize: 'clamp(5rem, 18vw, 10rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.06em',
          margin: 0,
          textTransform: 'uppercase',
          color: '#d5d0c8',
        }}>
          KO<span style={{ color: '#a8c8e8' }}>NA</span>
        </h1>
      </header>

      {/* Two-column layout */}
      <div className="neo-layout">
        {/* Main content */}
        <main className="neo-main">
          {/* Welcome */}
          <div className="neo-panel">
            <h2 className="neo-header">Welcome</h2>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: '#b5b0a8',
              marginBottom: '1rem',
            }}>
              This is my corner of the internet. I'm a self-taught developer who codes
              random things when I feel like it. Film nerd, music head, history geek.
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: '#a8c8e8',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}>
              Ship it raw. Done {'>'} perfect.
            </p>
          </div>

          {/* Banner ad */}
          {bannerAd && (
            bannerAd.link ? (
              <a href={bannerAd.link} target="_blank" rel="noopener noreferrer" className="neo-ad-banner" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <span className="neo-ad-label">AD</span>
                <span className="neo-ad-text">{bannerAd.text}</span>
                {bannerAd.sub && <p className="neo-ad-sub">{bannerAd.sub}</p>}
              </a>
            ) : (
              <div className="neo-ad-banner">
                <span className="neo-ad-label">AD</span>
                <span className="neo-ad-text">{bannerAd.text}</span>
                {bannerAd.sub && <p className="neo-ad-sub">{bannerAd.sub}</p>}
              </div>
            )
          )}

          {/* Projects */}
          <div className="neo-panel">
            <h2 className="neo-header">Projects</h2>
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-project"
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span className="neo-project-name" style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.15s',
                  }}>
                    {project.name}
                  </span>
                  <span style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    border: '1px solid #3a3835',
                    padding: '0.15rem 0.4rem',
                    textTransform: 'uppercase',
                    color: '#6a6660',
                  }}>
                    {project.tech}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#6a6660',
                  marginTop: '0.25rem',
                }}>
                  {project.desc}
                </p>
              </a>
            ))}
            <a href="/labs" className="neo-viewall">View all projects →</a>
          </div>

          {/* Repos */}
          <div className="neo-panel">
            <h2 className="neo-header">Repos</h2>
            {loading ? (
              <div style={{ fontSize: '0.85rem', fontWeight: 700, padding: '1rem 0' }}>
                LOADING...
              </div>
            ) : (
              <div>
                {repos.slice(0, 15).map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-repo"
                  >
                    <span className="neo-repo-idx" style={{
                      fontSize: '0.65rem',
                      color: '#4a4640',
                      minWidth: '1.5rem',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'color 0.15s',
                      alignSelf: 'flex-start',
                      paddingTop: '0.15rem',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="neo-repo-name" style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.15s',
                        display: 'block',
                      }}>
                        {repo.name}
                      </span>
                      {repo.description && (
                        <span className="neo-repo-desc" style={{
                          fontSize: '0.75rem',
                          color: '#5a5650',
                          display: 'block',
                          marginTop: '0.2rem',
                          lineHeight: 1.4,
                          transition: 'color 0.15s',
                        }}>
                          {repo.description}
                        </span>
                      )}
                    </div>
                    {repo.language && (
                      <span className="neo-repo-lang" style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        border: '1px solid #3a3835',
                        padding: '0.15rem 0.4rem',
                        textTransform: 'uppercase',
                        color: '#6a6660',
                        transition: 'all 0.15s',
                        alignSelf: 'flex-start',
                        marginTop: '0.15rem',
                      }}>
                        {repo.language}
                      </span>
                    )}
                  </a>
                ))}
                {repos.length > 15 && (
                  <a
                    href="https://github.com/kcodes0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-viewall"
                  >
                    View all {repos.length} repos →
                  </a>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="neo-sidebar">
          {/* Navigation */}
          <div className="neo-panel">
            <h3 className="neo-header">Links</h3>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="neo-nav-link"
              >
                <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
                {link.name}
                {link.external && (
                  <span style={{ fontSize: '0.65rem', color: '#4a4640', marginLeft: '0.35rem' }}>↗</span>
                )}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="neo-panel">
            <h3 className="neo-header">Stats</h3>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Repos</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : repos.length}
              </span>
            </div>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Languages</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : langCount}
              </span>
            </div>
            <div className="neo-stat">
              <span style={{ color: '#6a6660' }}>Stars</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '--' : totalStars}
              </span>
            </div>
          </div>

          {/* Ad 1 */}
          {sidebarAds[0] && (sidebarAds[0].link ? (
            <a href={sidebarAds[0].link} target="_blank" rel="noopener noreferrer" className="neo-ad" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[0].text}</div>
              {sidebarAds[0].sub && <p className="neo-ad-sub">{sidebarAds[0].sub}</p>}
            </a>
          ) : (
            <div className="neo-ad">
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[0].text}</div>
              {sidebarAds[0].sub && <p className="neo-ad-sub">{sidebarAds[0].sub}</p>}
            </div>
          ))}

          {/* Currently working on */}
          <div className="neo-panel">
            <h3 className="neo-header">Now</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Building out this site',
                'Duck Lang',
                'CF Workers experiments',
              ].map((item) => (
                <li key={item} style={{
                  fontSize: '0.8rem',
                  color: '#8a8680',
                  lineHeight: 1.8,
                  paddingLeft: '0.75rem',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#4a4640',
                  }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/now" className="neo-viewall" style={{ fontSize: '0.65rem' }}>
              Full /now page →
            </a>
          </div>

          {/* Ad 2 */}
          {sidebarAds[1] && (sidebarAds[1].link ? (
            <a href={sidebarAds[1].link} target="_blank" rel="noopener noreferrer" className="neo-ad" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[1].text}</div>
              {sidebarAds[1].sub && <p className="neo-ad-sub">{sidebarAds[1].sub}</p>}
              {sidebarAds[1].cta && <span className="neo-ad-cta">{sidebarAds[1].cta} →</span>}
            </a>
          ) : (
            <div className="neo-ad">
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[1].text}</div>
              {sidebarAds[1].sub && <p className="neo-ad-sub">{sidebarAds[1].sub}</p>}
              {sidebarAds[1].cta && <span className="neo-ad-cta">{sidebarAds[1].cta} →</span>}
            </div>
          ))}

          {/* Connect */}
          <div className="neo-panel">
            <h3 className="neo-header">Connect</h3>
            <a
              href="https://github.com/kcodes0"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-nav-link"
              style={{ fontSize: '0.8rem' }}
            >
              <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
              GitHub
            </a>
            <a
              href="https://blog.kcodes.me"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-nav-link"
              style={{ fontSize: '0.8rem' }}
            >
              <span style={{ color: '#4a4640', marginRight: '0.5rem' }}>·</span>
              Blog
            </a>
          </div>

          {/* Ad 3 */}
          {sidebarAds[2] && (sidebarAds[2].link ? (
            <a href={sidebarAds[2].link} target="_blank" rel="noopener noreferrer" className="neo-ad" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[2].text}</div>
              {sidebarAds[2].sub && <p className="neo-ad-sub">{sidebarAds[2].sub}</p>}
              {sidebarAds[2].cta && <span className="neo-ad-cta">{sidebarAds[2].cta} →</span>}
            </a>
          ) : (
            <div className="neo-ad">
              <span className="neo-ad-label">AD</span>
              <div className="neo-ad-text">{sidebarAds[2].text}</div>
              {sidebarAds[2].sub && <p className="neo-ad-sub">{sidebarAds[2].sub}</p>}
              {sidebarAds[2].cta && <span className="neo-ad-cta">{sidebarAds[2].cta} →</span>}
            </div>
          ))}
        </aside>
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '3rem 2rem',
        borderTop: '2px solid #2a2825',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a4640' }}>
          &copy; {new Date().getFullYear()} KONA
        </span>
        <span style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
          K<span style={{ color: '#a8c8e8' }}>.</span>
        </span>
      </footer>
    </div>
  );
}
