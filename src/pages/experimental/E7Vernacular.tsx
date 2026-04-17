import { useEffect, useRef, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
} from './_shared';

/**
 * /7 — Ending
 * Anime end-credits vibe meets spinning-vinyl ritual. Warm sepia palette.
 * Stacked composition: grainy 35mm sepia bg → slowly-spinning vinyl
 * (wolf as label) → lower-third captions → rolling credits column.
 * Cinematic, intentionally quiet and wistful — the wolf takes a bow.
 */

type Cred = { role: string; who: string };

const CREDITS_GROUPS: Array<{ head: string; rows: Cred[] }> = [
  {
    head: 'Cast',
    rows: [
      { role: 'the wolf', who: 'kona' },
      { role: 'the programmer', who: 'kcodes' },
      { role: 'the goose', who: 'a misunderstood creature' },
      { role: 'the cursor', who: 'itself' },
    ],
  },
  {
    head: 'Crew',
    rows: [
      { role: 'written & directed by', who: 'jason' },
      { role: 'art direction', who: 'late-night instinct' },
      { role: 'typography', who: 'eb garamond · cinzel · noto serif jp · vt323' },
      { role: 'music (in my head)', who: 'lofi loops, ghibli soundtracks, castlevania symphony of the night' },
      { role: 'co-pilot', who: 'claude, opus 4.7' },
    ],
  },
  {
    head: 'Thanks',
    rows: [
      { role: 'for the encouragement', who: 'everyone who left a note' },
      { role: 'for the late-night reviews', who: 'the inside of my head' },
      { role: 'for the bugs', who: 'the bugs' },
      { role: 'for the patience', who: 'anyone who waited for me to ship this' },
    ],
  },
  {
    head: 'Influences',
    rows: [
      { role: 'castlevania — symphony of the night', who: 'ayami kojima, michiru yamane' },
      { role: 'the works of studio ghibli', who: 'always, quietly' },
      { role: 'medieval illumination', who: 'various anonymous scribes' },
      { role: 'kojima yoshio — shippori mincho', who: 'a beautiful wabun typeface' },
      { role: 'nownownow.com', who: 'for the /now idea' },
    ],
  },
  {
    head: 'Inspiration',
    rows: [
      { role: 'the moon', who: 'when it\'s full' },
      { role: 'my desk at 2am', who: 'the one lamp on' },
      { role: 'whoever is reading this', who: 'really — thank you' },
    ],
  },
  {
    head: 'Colophon',
    rows: [
      { role: 'built with', who: 'react · bun · vite' },
      { role: 'hosted on', who: 'cloudflare' },
      { role: 'shipped', who: 'when it was good enough' },
      { role: 'printed', who: 'mmxxvi' },
    ],
  },
];

export default function E7Ending() {
  const [rolling, setRolling] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 timeline
  const rollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rollRef.current) return;
    const el = rollRef.current;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (rolling) {
        el.scrollTop += dt * 0.035; // slow scroll
        if (el.scrollTop >= total) el.scrollTop = 0;
        setProgress(el.scrollTop / total);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rolling]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, #2a1c12 0%, #1a110a 55%, #0a0604 100%)',
        color: '#f0e2c8',
        fontFamily: '"IM Fell English", "EB Garamond", serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #0a0604; }
        ::selection { background: #d97a3f; color: #1a110a; }

        .grain {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(217,122,63,0.04), transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(217,122,63,0.06), transparent 40%),
            repeating-radial-gradient(circle at 30% 70%, rgba(255,240,200,0.015) 0 1px, transparent 1px 3px);
        }
        .film-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 30;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.7  0 0 0 0.24 0'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>");
          mix-blend-mode: overlay;
          opacity: 0.35;
        }
        .scratches::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(90deg, transparent 48%, rgba(255,230,190,0.08) 49%, transparent 50%),
            linear-gradient(91deg, transparent 70%, rgba(255,230,190,0.05) 71%, transparent 72%);
          opacity: 0.5;
          mix-blend-mode: screen;
        }

        .vinyl {
          animation: slowSpin 26s linear infinite;
        }
        .vinyl-slow {
          animation: slowSpin 46s linear infinite reverse;
          opacity: 0.5;
        }

        .credits-list {
          height: 100%;
          overflow: hidden;
          mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .credits-list::-webkit-scrollbar { display: none; }

        .letter-roll span {
          display: inline-block;
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .vinyl, .vinyl-slow { animation: none !important; }
        }
      `}</style>

      <div className="grain" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div className="film-grain" />

      {/* Masthead */}
      <header style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#d97a3f', fontWeight: 600 }}>
            FINAL · ACT · VII
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#8a7660', textTransform: 'uppercase', marginTop: 4 }}>
            Ending — the credits roll
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={7} color="#8a7660" accent="#d97a3f" />
        </div>
      </header>

      {/* Main grid: vinyl + credits roll */}
      <section
        className="scratches"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '2rem auto 0',
          padding: '2rem 2rem 0',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          minHeight: 640,
        }}
      >
        {/* Vinyl (left) */}
        <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
          {/* record sleeve shadow */}
          <div
            style={{
              position: 'absolute',
              width: 'min(64vmin, 520px)',
              height: 'min(64vmin, 520px)',
              borderRadius: '50%',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 10px 20px rgba(0,0,0,0.4)',
            }}
          />
          {/* Outer turntable ring */}
          <svg
            aria-hidden
            viewBox="0 0 520 520"
            style={{
              position: 'absolute',
              width: 'min(66vmin, 540px)',
              height: 'min(66vmin, 540px)',
              filter: 'drop-shadow(0 0 30px rgba(217,122,63,0.3))',
            }}
          >
            <defs>
              <radialGradient id="turntable" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#3a2a1a" />
                <stop offset="100%" stopColor="#12090a" />
              </radialGradient>
            </defs>
            <circle cx="260" cy="260" r="258" fill="url(#turntable)" />
          </svg>

          {/* Spinning grooved disc */}
          <div
            className="vinyl"
            style={{
              position: 'relative',
              width: 'min(60vmin, 480px)',
              height: 'min(60vmin, 480px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 30%, #1a1208 0%, #0a0604 60%, #1a1208 62%, #0a0604 100%)',
            }}
          >
            {/* grooves */}
            <svg aria-hidden viewBox="0 0 480 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              {Array.from({ length: 34 }).map((_, i) => (
                <circle
                  key={i}
                  cx="240"
                  cy="240"
                  r={80 + i * 4.5}
                  fill="none"
                  stroke="#2a1c12"
                  strokeWidth={i % 4 === 0 ? 0.6 : 0.28}
                  strokeOpacity={0.5 + (i % 4) * 0.08}
                />
              ))}
              {/* highlight streak */}
              <path
                d="M 90 120 Q 240 60 390 120"
                stroke="rgba(255,220,170,0.1)"
                strokeWidth="40"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {/* Label with wolf */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '38%',
                aspectRatio: '1/1',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 40% 30%, #e8c58a 0%, #d97a3f 60%, #8b3a16 100%)',
                display: 'grid',
                placeItems: 'center',
                boxShadow: 'inset 0 0 20px rgba(60,20,10,0.4), 0 4px 12px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}
            >
              <img
                src={SONA_BLACK}
                alt="Kona — record label"
                style={{
                  width: '78%',
                  height: '78%',
                  objectFit: 'contain',
                  opacity: 0.9,
                  mixBlendMode: 'multiply',
                }}
              />
              {/* center hole */}
              <div
                style={{
                  position: 'absolute',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#0a0604',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)',
                }}
              />
            </div>
          </div>

          {/* Slower outer ring (counter-rotation visual, decorative) */}
          <svg
            aria-hidden
            className="vinyl-slow"
            viewBox="0 0 600 600"
            style={{ position: 'absolute', width: 'min(75vmin, 600px)', height: 'min(75vmin, 600px)', pointerEvents: 'none' }}
          >
            <circle cx="300" cy="300" r="290" fill="none" stroke="#d97a3f" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
            {Array.from({ length: 60 }).map((_, i) => {
              const a = (i / 60) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={300 + Math.cos(a) * 270}
                  y1={300 + Math.sin(a) * 270}
                  x2={300 + Math.cos(a) * 280}
                  y2={300 + Math.sin(a) * 280}
                  stroke="#d97a3f"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* lower-third caption */}
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.5rem 1rem',
              background: '#0a0604',
              border: '1px solid #d97a3f',
              color: '#f0e2c8',
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            side A · track 01 · <span style={{ color: '#d97a3f' }}>a quiet return</span>
          </div>
        </div>

        {/* Credits roll (right) */}
        <div style={{ position: 'relative', height: 580, display: 'flex', flexDirection: 'column' }}>
          {/* Title card */}
          <div style={{ textAlign: 'center', marginBottom: '1.4rem', position: 'relative' }}>
            <h1
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)',
                letterSpacing: '0.2em',
                fontWeight: 600,
                color: '#f0e2c8',
                margin: 0,
                lineHeight: 1,
                textShadow: '0 0 20px rgba(217,122,63,0.4)',
              }}
            >
              ENDING
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.2rem' }}>
              <OrnateDivider width={260} color="#d97a3f" />
            </div>
            <p
              style={{
                fontFamily: '"IM Fell English", serif',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: '#a89a80',
                margin: '0.3rem 0 0',
                letterSpacing: '0.12em',
              }}
            >
              thank you for staying through all seven rooms
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem', fontFamily: '"Cinzel", serif', fontSize: '0.72rem', color: '#8a7660', letterSpacing: '0.3em' }}>
            <button
              onClick={() => setRolling((r) => !r)}
              style={{
                background: 'transparent',
                color: '#d97a3f',
                border: '1px solid #d97a3f',
                padding: '0.35rem 0.8rem',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                cursor: 'pointer',
              }}
            >
              {rolling ? '⏸ PAUSE' : '▶ PLAY'}
            </button>
            <span style={{ flex: 1, height: 1, background: '#3a2a1a', position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: -1,
                  height: 3,
                  width: `${progress * 100}%`,
                  background: '#d97a3f',
                  transition: rolling ? 'width 0.1s linear' : 'none',
                }}
              />
            </span>
            <span>SIDE A</span>
          </div>

          {/* Credits scroll */}
          <div
            ref={rollRef}
            className="credits-list"
            style={{
              flex: 1,
              overflow: 'hidden',
              border: '1px solid #3a2a1a',
              padding: '2rem 1.6rem',
              background: 'linear-gradient(180deg, rgba(26,17,10,0.8), rgba(10,6,4,0.95))',
              fontFamily: '"EB Garamond", serif',
            }}
          >
            {CREDITS_GROUPS.map((g, i) => (
              <div key={g.head} style={{ marginBottom: '2.6rem' }}>
                <div
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.5em',
                    color: '#d97a3f',
                    textAlign: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  ❦ {g.head.toUpperCase()} ❦
                </div>
                {g.rows.map((r, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr',
                      gap: '0.8rem',
                      alignItems: 'baseline',
                      marginBottom: '0.4rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    <div style={{ textAlign: 'right', color: '#a89a80', fontStyle: 'italic' }}>{r.role}</div>
                    <div style={{ color: '#3a2a1a' }}>·</div>
                    <div style={{ textAlign: 'left', color: '#f0e2c8' }}>{r.who}</div>
                  </div>
                ))}
              </div>
            ))}
            {/* final wolf bow */}
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
              <img
                src={SONA_BLACK}
                alt=""
                aria-hidden
                style={{ width: 80, opacity: 0.7, filter: 'sepia(0.8) hue-rotate(-15deg)' }}
              />
              <div
                style={{
                  fontFamily: '"IM Fell English", serif',
                  fontStyle: 'italic',
                  color: '#a89a80',
                  fontSize: '0.92rem',
                  marginTop: '0.3rem',
                  letterSpacing: '0.1em',
                }}
              >
                — fin —
              </div>
              <div style={{ marginTop: '1.2rem', fontFamily: '"Cinzel", serif', fontSize: '0.65rem', color: '#d97a3f', letterSpacing: '0.5em' }}>
                ↑ BACK TO THE TOP ↑
              </div>
              <a
                href="/1"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.8rem',
                  color: '#f0e2c8',
                  border: '1px solid #d97a3f',
                  padding: '0.5rem 1.2rem',
                  letterSpacing: '0.3em',
                  textDecoration: 'none',
                }}
              >
                RETURN TO ACT I
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dedication stripe */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 900,
          margin: '5rem auto 0',
          padding: '0 2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid #d97a3f',
            borderLeft: 'none',
            borderRight: 'none',
            padding: '2rem 1rem',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#1a110a', padding: '0 0.8rem', color: '#d97a3f', fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.4em' }}>
            DEDICATION
          </div>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: '#f0e2c8',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            For the late nights, the one lamp, the quiet wolf on the
            screen who never complains when I throw away a day&rsquo;s work and
            start again.
          </p>
          <div style={{ marginTop: '1rem', color: '#8a7660', fontFamily: '"IM Fell English", serif', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            — k.
          </div>
        </div>
      </section>

      <footer
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '3rem 2rem 4rem',
          color: '#5a4428',
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
        }}
      >
        <img
          src={SONA_WHITE}
          alt=""
          aria-hidden
          style={{ width: 40, opacity: 0.28, margin: '0 auto 0.5rem', display: 'block', filter: 'sepia(0.8) hue-rotate(-15deg) invert(0.35)' }}
        />
        side A closes · side B begins when you press play again · mmxxvi
      </footer>
    </div>
  );
}
