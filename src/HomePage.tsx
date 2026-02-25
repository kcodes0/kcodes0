import { useEffect, useState, useRef } from 'react';
import './homepage.css';

const works = [
  { name: 'DUCK LANG', desc: 'Quack or the goose gets you.', href: 'https://github.com/konacodes/duck-lang', rot: '-2.5deg' },
  { name: 'BLOG', desc: 'Where the words go.', href: 'https://blog.kcodes.me', rot: '1.8deg' },
  { name: 'FILMS', desc: 'Everything watched.', href: 'https://films.kcodes.me', rot: '-1.2deg' },
  { name: 'LIKWID', desc: 'Fluid as ASCII art.', href: 'https://github.com/konacodes/likwid', rot: '2.3deg' },
  { name: 'NULL', desc: 'AI built it. Then it broke.', href: 'https://github.com/konacodes/null', rot: '-1.8deg' },
];

const links = [
  { name: 'BLOG', href: 'https://blog.kcodes.me' },
  { name: 'FILMS', href: 'https://films.kcodes.me' },
  { name: 'GITHUB', href: 'https://github.com/konacodes' },
  { name: 'DISCORD', href: 'https://discord.com/users/1151230208783945818' },
  { name: 'EMAIL', href: 'mailto:hello@kcodes.me' },
];

function Piece({ children, className = '', style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`sa-p ${className}${on ? ' on' : ''}`} style={style}>
      {children}
    </div>
  );
}

export function HomePage() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 80); return () => clearTimeout(t); }, []);

  const positions = ['sa-l1', 'sa-r1', 'sa-l2', 'sa-r2', 'sa-l3'];

  return (
    <div className="sa-page">
      <div className="sa-grain" aria-hidden="true" />
      <div className="sa-vig" aria-hidden="true" />

      {/* HERO */}
      <section className="sa-hero">
        <div className={`sa-glow ${go ? 'on' : ''}`} />
        <img
          src="/images/kona.png"
          alt="KONA"
          className={`sa-art ${go ? 'on' : ''}`}
          draggable={false}
        />
        <p className={`sa-sub ${go ? 'on' : ''}`}>makes things</p>
      </section>

      {/* THE WALL */}
      <div className="sa-wall">
        {/* Personal scrawl */}
        <Piece className="sa-note">
          self-taught. film nerd. music head. history geek.
        </Piece>

        {/* Work pieces + quote interleaved */}
        {works.map((w, i) => (
          <div key={w.name}>
            {i === 2 && (
              <Piece className="sa-quote">
                <span>"Ship it </span>
                <span className="sa-neon">raw</span>
                <span>. Done &gt; perfect."</span>
              </Piece>
            )}
            <Piece
              className={`sa-card ${positions[i]}`}
              style={{ '--rot': w.rot } as React.CSSProperties}
            >
              <a href={w.href} target="_blank" rel="noopener noreferrer">
                <h3 className="sa-card-name">{w.name}</h3>
                <p className="sa-card-desc">{w.desc}</p>
              </a>
            </Piece>
          </div>
        ))}

        {/* Tags */}
        <Piece className="sa-tags-wrap">
          {links.map((l, i) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-tag"
              style={{ '--r': `${[-3, 1.5, -1, 2.5, -2][i]}deg` } as React.CSSProperties}
            >
              {l.name}
            </a>
          ))}
        </Piece>
      </div>

      <footer className="sa-footer">
        {new Date().getFullYear()} &bull; painted with questionable sleep habits
      </footer>
    </div>
  );
}
