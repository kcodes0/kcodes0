import { useEffect, useState, useRef } from 'react';
import './homepage.css';

const projects = [
  { name: 'DUCK LANG', desc: 'Say "quack" or the goose won\'t run your code.', href: 'https://github.com/konacodes/duck-lang', tag: 'RUST', rot: '-2.2deg' },
  { name: 'BLOG CMS', desc: 'Markdown-first. Cloudflare Workers + D1.', href: 'https://blog.kcodes.me', tag: 'WORKERS', rot: '1.4deg' },
  { name: 'FILMS CMS', desc: 'Tracking everything watched.', href: 'https://films.kcodes.me', tag: 'WORKERS', rot: '-0.8deg' },
  { name: 'LIKWID', desc: 'Real-time fluid simulations as ASCII art in your terminal.', href: 'https://github.com/konacodes/likwid', tag: 'RUST', rot: '2.1deg' },
  { name: 'NULL', desc: 'Built by Claude. It worked until it didn\'t.', href: 'https://github.com/konacodes/null', tag: 'AI', rot: '-1.6deg' },
];

const links = [
  { name: 'BLOG', href: 'https://blog.kcodes.me' },
  { name: 'FILMS', href: 'https://films.kcodes.me' },
  { name: 'GITHUB', href: 'https://github.com/konacodes' },
  { name: 'DISCORD', href: 'https://discord.com/users/1151230208783945818' },
  { name: 'EMAIL', href: 'mailto:hello@kcodes.me' },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function HomePage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(t);
  }, []);

  const about = useReveal();
  const phil = useReveal();
  const builds = useReveal(0.08);
  const connect = useReveal();

  return (
    <div className="sa-page">
      <div className="sa-grain" aria-hidden="true" />
      <div className="sa-vignette" aria-hidden="true" />

      {/* ===== HERO ===== */}
      <section className="sa-hero">
        <div className={`sa-glow ${entered ? 'on' : ''}`} />
        <img
          src="/images/kona.png"
          alt="KONA — graffiti wolf"
          className={`sa-art ${entered ? 'on' : ''}`}
          draggable={false}
        />
        <div className={`sa-tagline ${entered ? 'on' : ''}`}>
          {['I', 'BUILD', 'THINGS', 'FOR', 'THE WEB'].map((word, i) => (
            <span
              key={word}
              className={`sa-word${i === 4 ? ' sa-word--neon' : ''}`}
              style={{ '--d': `${0.75 + i * 0.13}s` } as React.CSSProperties}
            >
              {word}
            </span>
          ))}
        </div>
        <div className={`sa-cue ${entered ? 'on' : ''}`}>
          <span>SCROLL</span>
          <div className="sa-cue-line" />
        </div>
      </section>

      {/* Paint drips */}
      <div className={`sa-drips ${entered ? 'on' : ''}`} aria-hidden="true">
        <div className="sa-drip" style={{ left: '22%', height: '90px', '--dd': '1.6s' } as React.CSSProperties} />
        <div className="sa-drip" style={{ left: '68%', height: '130px', '--dd': '1.9s' } as React.CSSProperties} />
        <div className="sa-drip" style={{ left: '42%', height: '60px', '--dd': '2.2s' } as React.CSSProperties} />
      </div>

      {/* ===== ABOUT — wheat-paste poster ===== */}
      <section ref={about.ref} className={`sa-about ${about.visible ? 'on' : ''}`}>
        <div className="sa-poster">
          <div className="sa-tape sa-tape--tl" />
          <div className="sa-tape sa-tape--tr" />
          <h2 className="sa-poster-title">ABOUT</h2>
          <p className="sa-poster-body">
            Self-taught developer who learned by{' '}
            <span className="sa-mark">breaking things</span>.{' '}
            <span className="sa-struck">formally educated</span>{' '}
            <span className="sa-scrawl">nah, self-taught</span>
          </p>
          <p className="sa-poster-sub">Film nerd. Music lover. History enthusiast.</p>
        </div>
      </section>

      {/* ===== PHILOSOPHY — spray paint ===== */}
      <section ref={phil.ref} className={`sa-phil ${phil.visible ? 'on' : ''}`}>
        <blockquote className="sa-spray">
          "Ship it <span className="sa-neon-word">raw</span>.<br />
          Done &gt; perfect."
        </blockquote>
      </section>

      {/* ===== BUILDS — sticker cards ===== */}
      <section ref={builds.ref} className={`sa-builds ${builds.visible ? 'on' : ''}`}>
        <h2 className="sa-label">BUILDS</h2>
        <div className="sa-stickers">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-sticker"
              style={{ '--i': i, '--rot': p.rot } as React.CSSProperties}
            >
              <span className="sa-chip">{p.tag}</span>
              <h3 className="sa-sticker-name">{p.name}</h3>
              <p className="sa-sticker-desc">{p.desc}</p>
              <div className="sa-peel" />
            </a>
          ))}
        </div>
      </section>

      {/* ===== CONNECT ===== */}
      <section ref={connect.ref} className={`sa-connect ${connect.visible ? 'on' : ''}`}>
        <div className="sa-tags">
          {links.map((l, i) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-tag"
              style={{ '--i': i } as React.CSSProperties}
            >
              {l.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="sa-footer">
        {new Date().getFullYear()} &bull; painted with questionable sleep habits
      </footer>
    </div>
  );
}
