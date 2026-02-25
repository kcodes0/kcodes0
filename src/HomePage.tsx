import { useEffect, useState, useRef } from 'react';
import './homepage.css';

const works = [
  { name: 'DUCK LANG', desc: 'Quack or the goose gets you.', href: 'https://github.com/konacodes/duck-lang', rot: '-2.2deg' },
  { name: 'BLOG', desc: 'Where the words go.', href: 'https://blog.kcodes.me', rot: '1.4deg' },
  { name: 'FILMS', desc: 'Everything watched.', href: 'https://films.kcodes.me', rot: '-0.8deg' },
  { name: 'LIKWID', desc: 'Fluid as ASCII art.', href: 'https://github.com/konacodes/likwid', rot: '2.1deg' },
  { name: 'NULL', desc: 'AI built it. Then it broke.', href: 'https://github.com/konacodes/null', rot: '-1.6deg' },
];

const links = [
  { name: 'BLOG', href: 'https://blog.kcodes.me' },
  { name: 'FILMS', href: 'https://films.kcodes.me' },
  { name: 'GITHUB', href: 'https://github.com/konacodes' },
  { name: 'DISCORD', href: 'https://discord.com/users/1151230208783945818' },
  { name: 'EMAIL', href: 'mailto:hello@kcodes.me' },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

export function HomePage() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 100); return () => clearTimeout(t); }, []);

  const note = useReveal();
  const work = useReveal(0.05);
  const phil = useReveal();
  const links_ = useReveal();

  return (
    <div className="sa-page">
      <div className="sa-grain" aria-hidden="true" />
      <div className="sa-vig" aria-hidden="true" />

      {/* HERO — just the art */}
      <section className="sa-hero">
        <div className={`sa-glow ${on ? 'on' : ''}`} />
        <img
          src="/images/kona.png"
          alt="KONA — graffiti wolf"
          className={`sa-art ${on ? 'on' : ''}`}
          draggable={false}
        />
        <p className={`sa-sub ${on ? 'on' : ''}`}>makes things</p>
        <div className={`sa-cue ${on ? 'on' : ''}`}>
          <div className="sa-cue-line" />
        </div>
      </section>

      {/* NOTE — small personal scrawl */}
      <section ref={note.ref} className={`sa-note ${note.vis ? 'on' : ''}`}>
        <p className="sa-note-main">
          Self-taught. I make things and <span className="sa-mark">break things</span>.
        </p>
        <p className="sa-note-aside">film nerd &mdash; music lover &mdash; history geek</p>
      </section>

      {/* WORK */}
      <section ref={work.ref} className={`sa-work ${work.vis ? 'on' : ''}`}>
        <h2 className="sa-label">WORK</h2>
        <div className="sa-grid">
          {works.map((w, i) => (
            <a
              key={w.name}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-card"
              style={{ '--i': i, '--rot': w.rot } as React.CSSProperties}
            >
              <h3 className="sa-card-name">{w.name}</h3>
              <p className="sa-card-desc">{w.desc}</p>
              <div className="sa-peel" />
            </a>
          ))}
        </div>
      </section>

      {/* SPRAY — philosophy */}
      <section ref={phil.ref} className={`sa-phil ${phil.vis ? 'on' : ''}`}>
        <blockquote className="sa-spray">
          "Ship it <span className="sa-neon">raw</span>.<br />
          Done &gt; perfect."
        </blockquote>
      </section>

      {/* LINKS */}
      <section ref={links_.ref} className={`sa-links ${links_.vis ? 'on' : ''}`}>
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
