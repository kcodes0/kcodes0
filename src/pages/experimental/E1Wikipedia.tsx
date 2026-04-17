import { useEffect, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  CornerFlourish,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
  useMouseParallax,
} from './_shared';

/**
 * /1 — Lunaria
 * A moonlit gothic portrait. Stacked composition:
 *   [moon halo]  →  [black-line sona]  →  [animated filigree frame]  →  [title overlay]
 */
export default function E1Lunaria() {
  const mp = useMouseParallax(14);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // drifting embers — reduced motion aware
  const embers = Array.from({ length: 24 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 12,
    drift: (Math.random() - 0.5) * 80,
    size: 1 + Math.random() * 2.2,
    dur: 10 + Math.random() * 10,
  }));

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 50% 30%, #1a1d2e 0%, #0a0b12 45%, #050509 100%)',
        color: '#e8e2d1',
        fontFamily: '"Cormorant Garamond", "Cormorant", Georgia, serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;1,400&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #050509; }
        ::selection { background: #c9a66b; color: #0a0b12; }

        .e1-title-letter {
          display: inline-block;
          opacity: 0;
          animation: fadeUp 1.4s var(--delay, 0s) cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .e1-trace path {
          stroke-dasharray: var(--len, 2000);
          stroke-dashoffset: var(--len, 2000);
          animation: drawStroke 3.2s 0.4s cubic-bezier(0.7,0,0.3,1) forwards;
        }
        .e1-halo {
          animation: shimmer 6s ease-in-out infinite;
        }
        .e1-star {
          animation: shimmer 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .e1-title-letter, .e1-trace path { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
          .e1-halo, .e1-star { animation: none !important; }
        }
      `}</style>

      {/* Starfield */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="e1-star"
            style={{
              position: 'absolute',
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 1 + (i % 3),
              height: 1 + (i % 3),
              background: '#e8e2d1',
              borderRadius: '50%',
              opacity: 0.2 + (i % 5) * 0.08,
              animationDelay: `${i * 0.17}s`,
            }}
          />
        ))}
      </div>

      {/* Embers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {embers.map((e, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: -20,
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c9a66b, #c9a66b00)',
              animation: `embers ${e.dur}s ${e.delay}s linear infinite`,
              ['--drift' as any]: `${e.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Masthead */}
      <header
        style={{
          position: 'relative',
          zIndex: 6,
          padding: '1.5rem 2.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: '0.7rem',
              letterSpacing: '0.6em',
              color: '#c9a66b',
              marginBottom: '0.35rem',
            }}
          >
            ACT · I
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#8a8275', textTransform: 'uppercase' }}>
            Lunaria — a portrait in moonlight
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={1} color="#8a8275" accent="#c9a66b" />
        </div>
      </header>

      {/* Main stacked hero */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}
      >
        {/* Moon halo (back) */}
        <div
          className="e1-halo"
          aria-hidden
          style={{
            position: 'absolute',
            width: 'min(80vmin, 720px)',
            height: 'min(80vmin, 720px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 45% 42%, rgba(232,226,209,0.22) 0%, rgba(168,200,232,0.10) 30%, rgba(10,11,18,0) 65%)',
            transform: `translate(${mp.x * 0.6}px, ${mp.y * 0.6}px)`,
            filter: 'blur(2px)',
          }}
        />
        {/* Moon disc */}
        <svg
          aria-hidden
          width="420"
          height="420"
          viewBox="0 0 420 420"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${mp.x * 0.35}px), calc(-50% + ${mp.y * 0.35}px))`,
            filter: 'drop-shadow(0 0 60px rgba(232,226,209,0.25))',
          }}
        >
          <defs>
            <radialGradient id="moonGrad" cx="0.42" cy="0.38" r="0.7">
              <stop offset="0%" stopColor="#f0ead8" />
              <stop offset="55%" stopColor="#c6c0ad" />
              <stop offset="100%" stopColor="#3a3a44" />
            </radialGradient>
            <pattern id="moonTex" patternUnits="userSpaceOnUse" width="14" height="14">
              <circle cx="3" cy="3" r="0.9" fill="#0a0b12" opacity="0.18" />
              <circle cx="11" cy="8" r="0.6" fill="#0a0b12" opacity="0.14" />
              <circle cx="7" cy="12" r="1.1" fill="#0a0b12" opacity="0.10" />
            </pattern>
          </defs>
          <circle cx="210" cy="210" r="200" fill="url(#moonGrad)" />
          <circle cx="210" cy="210" r="200" fill="url(#moonTex)" />
          <circle cx="210" cy="210" r="200" fill="none" stroke="#c9a66b" strokeWidth="1" strokeOpacity="0.35" />
        </svg>

        {/* Fursona portrait (middle layer) */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            transform: `translate(${mp.x * -0.2}px, ${mp.y * -0.2}px)`,
            width: 'min(70vmin, 560px)',
            aspectRatio: '1 / 1',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <img
            src={SONA_BLACK}
            alt="Kona — fursona portrait"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter:
                'invert(1) brightness(1.05) drop-shadow(0 0 12px rgba(232,226,209,0.35)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1.6s ease 0.3s',
            }}
          />
        </div>

        {/* Animated filigree frame — overlay (top layer) */}
        <svg
          aria-hidden
          viewBox="0 0 800 800"
          className="e1-trace"
          style={{
            position: 'absolute',
            width: 'min(84vmin, 760px)',
            height: 'min(84vmin, 760px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 8px rgba(201,166,107,0.5))',
          }}
          stroke="#c9a66b"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        >
          {/* outer diamond */}
          <path style={{ ['--len' as any]: 2400 }} d="M400 40 L760 400 L400 760 L40 400 Z" opacity="0.95" />
          {/* inner circle */}
          <path style={{ ['--len' as any]: 2100 }} d="M400 60 A 340 340 0 1 0 400.01 60" opacity="0.6" />
          {/* arcs top */}
          <path
            style={{ ['--len' as any]: 1400 }}
            d="M180 180 Q 400 -20 620 180"
            opacity="0.8"
          />
          <path
            style={{ ['--len' as any]: 1400 }}
            d="M180 620 Q 400 820 620 620"
            opacity="0.8"
          />
          <path
            style={{ ['--len' as any]: 1400 }}
            d="M180 180 Q -20 400 180 620"
            opacity="0.8"
          />
          <path
            style={{ ['--len' as any]: 1400 }}
            d="M620 180 Q 820 400 620 620"
            opacity="0.8"
          />
          {/* center ornaments at compass points */}
          <circle cx="400" cy="40" r="5" fill="#c9a66b" />
          <circle cx="400" cy="760" r="5" fill="#c9a66b" />
          <circle cx="40" cy="400" r="5" fill="#c9a66b" />
          <circle cx="760" cy="400" r="5" fill="#c9a66b" />
          {/* crossed rose at bottom */}
          <path
            style={{ ['--len' as any]: 600 }}
            d="M380 740 Q 400 710 420 740 Q 400 770 380 740 Z"
            opacity="0.85"
          />
          <path
            style={{ ['--len' as any]: 800 }}
            d="M360 720 L 440 720"
            opacity="0.6"
          />
          {/* crescent at top */}
          <path
            style={{ ['--len' as any]: 600 }}
            d="M380 56 Q 400 20 420 56 Q 408 42 400 42 Q 392 42 380 56 Z"
            fill="#c9a66b"
            fillOpacity="0.9"
            stroke="none"
          />
          {/* tick marks */}
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const r1 = 346;
            const r2 = 352;
            const x1 = 400 + Math.cos(a) * r1;
            const y1 = 400 + Math.sin(a) * r1;
            const x2 = 400 + Math.cos(a) * r2;
            const y2 = 400 + Math.sin(a) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.5" style={{ ['--len' as any]: 10 }} />;
          })}
        </svg>

        {/* Title — stacked on top */}
        <div
          style={{
            position: 'absolute',
            bottom: '3.2rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              letterSpacing: '0.18em',
              fontWeight: 500,
              color: '#e8e2d1',
              margin: 0,
              textShadow: '0 0 40px rgba(0,0,0,0.9)',
            }}
          >
            {'LUNARIA'.split('').map((l, i) => (
              <span
                key={i}
                className="e1-title-letter"
                style={{ ['--delay' as any]: `${0.6 + i * 0.08}s` }}
              >
                {l}
              </span>
            ))}
          </h1>
          <div style={{ marginTop: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <OrnateDivider width={380} color="#c9a66b" />
          </div>
          <p
            style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: '#a89c7e',
              letterSpacing: '0.1em',
              margin: '0.4rem 0 0',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1.5s ease 2.2s',
            }}
          >
            &mdash; kona, a creature of the quiet hours &mdash;
          </p>
        </div>

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 80, left: 24, color: '#c9a66b', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={0} />
        </div>
        <div style={{ position: 'absolute', top: 80, right: 24, color: '#c9a66b', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={90} />
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 24, color: '#c9a66b', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={270} />
        </div>
        <div style={{ position: 'absolute', bottom: 24, right: 24, color: '#c9a66b', opacity: 0.85 }}>
          <CornerFlourish size={110} rotate={180} />
        </div>
      </section>

      {/* Below-the-fold passage */}
      <section
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 780,
          margin: '0 auto',
          padding: '6rem 2rem 4rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            color: '#c9a66b',
            marginBottom: '1.6rem',
          }}
        >
          ⁂&nbsp;&nbsp;AN INVOCATION&nbsp;&nbsp;⁂
        </div>
        <p
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
            lineHeight: 1.75,
            color: '#d4ccb5',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          This is not a résumé. These are seven rooms in a small nocturnal castle —
          each one a different light, a different tempo, a different way of looking at
          <span style={{ color: '#c9a66b', fontStyle: 'normal' }}> the same wolf</span>.
          Wander. The doors are not locked.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
          <OrnateDivider width={260} color="#4a4333" />
        </div>

        {/* Stacked card preview of the other rooms */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
            textAlign: 'left',
          }}
        >
          {[
            { n: 'II', t: 'Rosace', d: 'stained glass', p: '/2' },
            { n: 'III', t: 'Ōkami', d: 'the shrine', p: '/3' },
            { n: 'IV', t: 'Nocturne', d: 'the castle', p: '/4' },
            { n: 'V', t: 'Grimoire', d: 'illuminated', p: '/5' },
            { n: 'VI', t: 'Sanguine', d: 'blood moon', p: '/6' },
            { n: 'VII', t: 'Ending', d: 'the credits', p: '/7' },
          ].map((c) => (
            <a
              key={c.p}
              href={c.p}
              style={{
                position: 'relative',
                display: 'block',
                padding: '1.1rem 1rem 1.2rem',
                border: '1px solid #2a2a35',
                textDecoration: 'none',
                color: '#d4ccb5',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(180deg, rgba(201,166,107,0.02), rgba(0,0,0,0))',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLElement;
                t.style.borderColor = '#c9a66b';
                t.style.background = 'linear-gradient(180deg, rgba(201,166,107,0.08), rgba(0,0,0,0))';
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLElement;
                t.style.borderColor = '#2a2a35';
                t.style.background = 'linear-gradient(180deg, rgba(201,166,107,0.02), rgba(0,0,0,0))';
              }}
            >
              {/* stacked corner flourish */}
              <div style={{ position: 'absolute', top: -8, right: -8, color: '#c9a66b', opacity: 0.7 }}>
                <CornerFlourish size={36} rotate={90} />
              </div>
              <div
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.4em',
                  color: '#c9a66b',
                }}
              >
                {c.n}
              </div>
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  marginTop: '0.2rem',
                  letterSpacing: '0.02em',
                }}
              >
                {c.t}
              </div>
              <div
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '0.82rem',
                  color: '#8a8275',
                  fontStyle: 'italic',
                  marginTop: '0.2rem',
                }}
              >
                {c.d}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Foot */}
      <footer
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '2.5rem 2rem 3.5rem',
          color: '#4a4333',
          fontFamily: '"EB Garamond", serif',
          fontStyle: 'italic',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
        }}
      >
        {/* tiny white sona as a watermark stamp */}
        <img
          src={SONA_WHITE}
          alt=""
          aria-hidden
          style={{
            width: 44,
            opacity: 0.25,
            margin: '0 auto 0.6rem',
            display: 'block',
          }}
        />
        kcodes · mmxxvi
      </footer>
    </div>
  );
}
