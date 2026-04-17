import { useEffect, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  CornerFlourish,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
} from './_shared';

/**
 * /2 — Rosace
 * A gothic rose window reveals the fursona behind leaded stained glass.
 *  Stacked composition: stone wall → leaded rose window → sona silhouette
 *  → light rays → gold leading trace → title plate
 */

const JEWEL_PALETTE = ['#8a1222', '#1a3a6e', '#2c6b3a', '#4a1e5e', '#b8751f', '#0d3a4a'];

export default function E2Rosace() {
  const [mounted, setMounted] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const segments = 12;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #14110e 0%, #1d1914 40%, #0c0a08 100%)',
        color: '#e6dfc9',
        fontFamily: '"EB Garamond", Georgia, serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=UnifrakturCook:wght@700&family=Cinzel:wght@400;600&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #0c0a08; }

        .stone-wall {
          background:
            radial-gradient(circle at 20% 30%, rgba(0,0,0,0.4), transparent 60%),
            radial-gradient(circle at 70% 80%, rgba(0,0,0,0.35), transparent 60%),
            repeating-linear-gradient(45deg, rgba(48,42,34,0.18) 0 2px, transparent 2px 36px),
            repeating-linear-gradient(-45deg, rgba(48,42,34,0.14) 0 2px, transparent 2px 36px),
            linear-gradient(135deg, #1d1914, #14110e);
        }
        .ray {
          transform-origin: 50% 50%;
          animation: rayRot 60s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.5;
        }
        @keyframes rayRot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .glass-segment { transition: filter 0.4s ease, opacity 0.4s ease; }
        .glass-segment:hover { filter: brightness(1.5) saturate(1.2); }

        .rose-draw path, .rose-draw line, .rose-draw circle {
          stroke-dasharray: var(--len, 500);
          stroke-dashoffset: var(--len, 500);
          animation: drawStroke 2.4s 0.4s cubic-bezier(0.7,0,0.3,1) forwards;
        }
        .rose-draw { filter: drop-shadow(0 0 4px rgba(216,172,76,0.8)); }

        .panel {
          position: relative;
          padding: 1.8rem 1.6rem;
          background: linear-gradient(180deg, rgba(30,26,20,0.85), rgba(14,12,10,0.95));
          border: 1px solid #3a3226;
          transition: all 0.3s ease;
        }
        .panel:hover {
          border-color: #d8ac4c;
          transform: translateY(-2px);
        }
        .panel::before, .panel::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          border: 1px solid #d8ac4c;
        }
        .panel::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .panel::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        @media (prefers-reduced-motion: reduce) {
          .ray, .rose-draw path, .rose-draw line, .rose-draw circle { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>

      <div className="stone-wall" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <header style={{ position: 'relative', zIndex: 6, padding: '1.5rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#d8ac4c' }}>ACT · II</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#8a8275', textTransform: 'uppercase', marginTop: 4 }}>
            Rosace — a window of kept colors
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={2} color="#8a8275" accent="#d8ac4c" />
        </div>
      </header>

      <section style={{ position: 'relative', zIndex: 2, height: 'min(120vh, 960px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <svg className="ray" aria-hidden viewBox="-400 -400 800 800" style={{ position: 'absolute', width: 'min(140vmin, 1200px)', height: 'min(140vmin, 1200px)' }}>
          <defs>
            <radialGradient id="rayG" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#f0d080" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f0d080" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * 360;
            return <polygon key={i} points="-8,-20 8,-20 3,-380 -3,-380" fill="url(#rayG)" transform={`rotate(${a})`} />;
          })}
        </svg>

        <div style={{ position: 'relative', width: 'min(88vmin, 720px)', height: 'min(88vmin, 720px)', display: 'grid', placeItems: 'center', opacity: mounted ? 1 : 0, transition: 'opacity 2s ease' }}>
          <svg aria-hidden viewBox="0 0 720 720" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
            <defs>
              <radialGradient id="stoneG" cx="0.5" cy="0.5" r="0.5">
                <stop offset="70%" stopColor="#1a1712" stopOpacity="0" />
                <stop offset="86%" stopColor="#1a1712" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0a0907" stopOpacity="1" />
              </radialGradient>
            </defs>
            <circle cx="360" cy="360" r="360" fill="url(#stoneG)" />
          </svg>

          <img
            src={SONA_BLACK}
            alt="Kona behind the glass"
            style={{ position: 'absolute', width: '58%', height: '58%', objectFit: 'contain', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, filter: 'invert(1) brightness(0.9) saturate(0) contrast(1.4) drop-shadow(0 0 30px rgba(255,220,140,0.5))', opacity: 0.85 }}
          />

          <svg viewBox="-360 -360 720 720" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} className="rose-draw">
            <defs>
              {JEWEL_PALETTE.map((c, i) => (
                <radialGradient key={i} id={`jewel-${i}`} cx="0.5" cy="0.5" r="0.55">
                  <stop offset="0%" stopColor={c} stopOpacity="0.15" />
                  <stop offset="60%" stopColor={c} stopOpacity="0.62" />
                  <stop offset="100%" stopColor={c} stopOpacity="0.9" />
                </radialGradient>
              ))}
            </defs>
            {Array.from({ length: segments }).map((_, i) => {
              const a0 = (i / segments) * 360;
              const a1 = ((i + 1) / segments) * 360;
              const r0 = 130;
              const r1 = 320;
              const [x0a, y0a] = polar(a0, r0);
              const [x1a, y1a] = polar(a0, r1);
              const [x0b, y0b] = polar(a1, r0);
              const [x1b, y1b] = polar(a1, r1);
              const pathD = `M${x0a} ${y0a} L${x1a} ${y1a} A ${r1} ${r1} 0 0 1 ${x1b} ${y1b} L${x0b} ${y0b} A ${r0} ${r0} 0 0 0 ${x0a} ${y0a} Z`;
              return (
                <path
                  key={i}
                  d={pathD}
                  fill={`url(#jewel-${i % JEWEL_PALETTE.length})`}
                  stroke="#d8ac4c"
                  strokeWidth="2"
                  className="glass-segment"
                  style={{ ['--len' as any]: 800, mixBlendMode: 'screen' }}
                  onMouseEnter={() => setHoveredPanel(i)}
                  onMouseLeave={() => setHoveredPanel(null)}
                />
              );
            })}
            {Array.from({ length: segments }).map((_, i) => {
              const a0 = (i / segments) * 360 + 360 / segments / 2;
              const [cx, cy] = polar(a0, 95);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill={JEWEL_PALETTE[(i + 3) % JEWEL_PALETTE.length]}
                  opacity="0.7"
                  stroke="#d8ac4c"
                  strokeWidth="1.2"
                  style={{ ['--len' as any]: 90, mixBlendMode: 'screen' }}
                />
              );
            })}
            <circle cx="0" cy="0" r="60" fill="none" stroke="#d8ac4c" strokeWidth="2.5" style={{ ['--len' as any]: 380 }} />
            <circle cx="0" cy="0" r="40" fill="#f0d080" opacity="0.22" stroke="#d8ac4c" strokeWidth="1.5" style={{ ['--len' as any]: 250 }} />
            {[0, 90, 180, 270].map((a) => (
              <path
                key={a}
                d="M0 -22 Q 14 -14 0 0 Q -14 -14 0 -22 Z"
                fill="#d8ac4c"
                stroke="#1a1712"
                strokeWidth="1"
                transform={`rotate(${a})`}
                style={{ ['--len' as any]: 80 }}
              />
            ))}
            <circle cx="0" cy="0" r="320" fill="none" stroke="#d8ac4c" strokeWidth="4" style={{ ['--len' as any]: 2020 }} />
            <circle cx="0" cy="0" r="330" fill="none" stroke="#d8ac4c" strokeWidth="1" strokeOpacity="0.5" style={{ ['--len' as any]: 2080 }} />
          </svg>
        </div>

        <div style={{ position: 'absolute', top: 90, left: 24, color: '#d8ac4c', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={0} />
        </div>
        <div style={{ position: 'absolute', top: 90, right: 24, color: '#d8ac4c', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={90} />
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 3, textAlign: 'center', marginTop: '-5rem', paddingBottom: '4rem' }}>
        <h1 style={{ fontFamily: '"UnifrakturCook", "Cinzel", serif', fontSize: 'clamp(3rem, 9vw, 6.6rem)', color: '#f0d080', margin: 0, textShadow: '0 0 30px rgba(216,172,76,0.6), 0 6px 0 #0c0a08', letterSpacing: '0.02em' }}>
          Rosace
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.4rem' }}>
          <OrnateDivider width={360} color="#7a6838" />
        </div>
        <p style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '1rem', color: '#a89c7e', letterSpacing: '0.08em', margin: '0.6rem auto 0', maxWidth: 560, padding: '0 1rem' }}>
          hover the glass — it remembers what light passed through it
          {hoveredPanel !== null && (
            <span style={{ display: 'block', color: '#d8ac4c', marginTop: '0.4rem', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              &mdash; pane {String(hoveredPanel + 1).padStart(2, '0')} of 12 &mdash;
            </span>
          )}
        </p>
      </section>

      <section style={{ position: 'relative', zIndex: 3, maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
          {VIRTUES.map((v, i) => (
            <article key={v.title} className="panel">
              <div style={{ position: 'absolute', top: -14, left: 14, color: JEWEL_PALETTE[i % JEWEL_PALETTE.length] }}>
                <CornerFlourish size={48} rotate={0} />
              </div>
              <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#d8ac4c', marginBottom: '0.5rem' }}>
                {`PANE · ${String(i + 1).padStart(2, '0')}`}
              </div>
              <h3 style={{ fontFamily: '"UnifrakturCook", "EB Garamond", serif', fontSize: '1.8rem', margin: '0.2rem 0 0.6rem', color: '#f0d080', fontWeight: 400 }}>
                {v.title}
              </h3>
              <div style={{ height: 2, background: `linear-gradient(90deg, ${JEWEL_PALETTE[i % JEWEL_PALETTE.length]}, transparent)`, margin: '0 0 0.9rem' }} />
              <p style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '0.98rem', lineHeight: 1.7, color: '#c8c0a8', margin: 0 }}>
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '2.5rem 2rem 3.5rem', color: '#4a4333', fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        <img src={SONA_WHITE} alt="" aria-hidden style={{ width: 40, opacity: 0.22, margin: '0 auto 0.6rem', display: 'block' }} />
        lux per vitrum · kcodes mmxxvi
      </footer>
    </div>
  );
}

function polar(deg: number, r: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [Math.cos(rad) * r, Math.sin(rad) * r];
}

const VIRTUES = [
  { title: 'Patience', body: 'I am slow on purpose. Bugs untangle best when you stop tugging. The goose knows this — it only quacks on the thirty-second try.' },
  { title: 'Candor', body: 'I write code the way I write letters — plainly, and with the understanding that somebody will read it at an inconvenient hour.' },
  { title: 'Reverence', body: 'For the old. For the quiet. For the programs that run for ten years on someone else\'s machine because you wrote them right the first time.' },
  { title: 'Mischief', body: 'A portfolio without a single joke is a library with no windows. Something must occasionally catch fire, quietly.' },
  { title: 'Craft', body: 'Ship it raw — but only after carving it smooth. Rough edges on purpose are a different thing than rough edges by accident.' },
  { title: 'Kinship', body: 'Every project has collaborators: teammates, tools, the wolf in the icon. Half of making good things is remembering you are not alone at the desk.' },
];
