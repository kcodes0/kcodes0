import { useEffect, useRef, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  Bat,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
  useReveal,
} from './_shared';

/**
 * /6 — Sanguine
 * The blood moon eclipse. Cinematic full-bleed. The wolf silhouette
 * beneath a red moon that finishes eclipsing on load. Bats drift past.
 * Stacked: starfield → moon corona → eclipsing disc → wolf silhouette →
 * dripping title → verses that reveal as you descend.
 */

const VERSES = [
  { num: 'I', text: 'A red moon climbs and the code holds its breath.' },
  { num: 'II', text: 'The fan spins. The cursor blinks. Outside, nothing.' },
  { num: 'III', text: 'I am slow and the work is slow, and this is how it survives.' },
  { num: 'IV', text: 'What I make for strangers I first make for myself.' },
  { num: 'V', text: 'Every bug is a teacher I did not ask for.' },
  { num: 'VI', text: 'When the moon passes, the day will come and the day will want its things — but not yet.' },
];

export default function E6Sanguine() {
  const [eclipse, setEclipse] = useState(0); // 0 = off-center, 1 = fully eclipsed
  useEffect(() => {
    let raf = 0;
    let t0 = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(1, (t - t0) / 3200);
      setEclipse(easeOutQuart(dt));
      if (dt < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const batsCount = 9;
  const bats = Array.from({ length: batsCount }).map((_, i) => ({
    top: 5 + ((i * 11) % 70),
    delay: (i * 1.4) % 10,
    dur: 22 + (i % 4) * 4,
    scale: 0.5 + (i % 3) * 0.2,
  }));

  // offset for eclipse disc — starts right of moon, ends centered
  const offsetX = (1 - eclipse) * 420;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #1a0506 0%, #0a0102 60%, #000 100%)',
        color: '#f0e4d6',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Cinzel:wght@400;600;900&family=IM+Fell+English:ital@0;1&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #000; }
        ::selection { background: #a01020; color: #0a0102; }

        .bat {
          position: absolute;
          animation: batDrift var(--dur, 26s) var(--delay, 0s) linear infinite;
          color: #0a0102;
          filter: drop-shadow(0 0 2px #5a0a10);
        }
        .bat > div { animation: batFlap 0.35s ease-in-out infinite; transform-origin: 50% 50%; }
        @keyframes batDrift {
          0%   { transform: translateX(-20vw) translateY(0) rotate(-3deg); }
          50%  { transform: translateX(60vw) translateY(-40px) rotate(4deg); }
          100% { transform: translateX(120vw) translateY(10px) rotate(-2deg); }
        }

        .drip {
          filter: drop-shadow(0 0 12px rgba(160,16,32,0.8)) drop-shadow(0 0 30px rgba(160,16,32,0.4));
        }

        .reveal-verse {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-verse.on { opacity: 1; transform: translateY(0); }

        .corona {
          animation: coronaPulse 6s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @keyframes coronaPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bat, .bat > div, .corona { animation: none !important; }
        }
      `}</style>

      {/* star backdrop */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 37) % 100}%`,
              top: `${(i * 59) % 100}%`,
              width: 1 + (i % 3),
              height: 1 + (i % 3),
              background: i % 6 === 0 ? '#a01020' : '#f0e4d6',
              opacity: 0.15 + (i % 5) * 0.08,
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* bats */}
      {bats.map((b, i) => (
        <div
          key={i}
          className="bat"
          style={{
            top: `${b.top}%`,
            transform: `scale(${b.scale})`,
            ['--delay' as any]: `${b.delay}s`,
            ['--dur' as any]: `${b.dur}s`,
            zIndex: 2,
          }}
        >
          <div>
            <Bat size={36} color="#1a0506" />
          </div>
        </div>
      ))}

      {/* Masthead */}
      <header style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#a01020', fontWeight: 600 }}>ACT · VI</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#78665a', textTransform: 'uppercase', marginTop: 4 }}>
            Sanguine — the eclipse
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={6} color="#78665a" accent="#a01020" />
        </div>
      </header>

      {/* Eclipse hero */}
      <section
        style={{
          position: 'relative',
          zIndex: 3,
          height: 'min(100vh, 900px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Corona glow */}
        <div
          className="corona"
          aria-hidden
          style={{
            position: 'absolute',
            width: 'min(120vmin, 1000px)',
            height: 'min(120vmin, 1000px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(240,90,80,0.55) 0%, rgba(160,16,32,0.35) 25%, rgba(80,6,12,0.15) 45%, rgba(0,0,0,0) 60%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Red moon (back layer) */}
        <svg
          aria-hidden
          viewBox="0 0 600 600"
          style={{
            position: 'absolute',
            width: 'min(90vmin, 720px)',
            height: 'min(90vmin, 720px)',
            filter: 'drop-shadow(0 0 40px rgba(200,30,40,0.6))',
          }}
        >
          <defs>
            <radialGradient id="bloodMoon" cx="0.38" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#ffb088" />
              <stop offset="25%" stopColor="#e84030" />
              <stop offset="60%" stopColor="#a01020" />
              <stop offset="100%" stopColor="#4a0610" />
            </radialGradient>
            <pattern id="craters" patternUnits="userSpaceOnUse" width="24" height="24">
              <circle cx="5" cy="7" r="1.3" fill="#4a0610" opacity="0.5" />
              <circle cx="18" cy="14" r="0.9" fill="#4a0610" opacity="0.4" />
              <circle cx="11" cy="19" r="2" fill="#4a0610" opacity="0.35" />
            </pattern>
          </defs>
          <circle cx="300" cy="300" r="260" fill="url(#bloodMoon)" />
          <circle cx="300" cy="300" r="260" fill="url(#craters)" />
          {/* outer ring */}
          <circle cx="300" cy="300" r="265" fill="none" stroke="#f0e4d6" strokeWidth="0.6" strokeOpacity="0.35" />
        </svg>

        {/* Eclipsing black disc */}
        <svg
          aria-hidden
          viewBox="0 0 600 600"
          style={{
            position: 'absolute',
            width: 'min(90vmin, 720px)',
            height: 'min(90vmin, 720px)',
          }}
        >
          <defs>
            <radialGradient id="eclipseG" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#050102" />
              <stop offset="86%" stopColor="#050102" />
              <stop offset="100%" stopColor="#050102" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={300 + offsetX * 0.3} cy="300" r="258" fill="url(#eclipseG)" />
        </svg>

        {/* Wolf silhouette foreground (big, cropped at bottom) */}
        <img
          src={SONA_BLACK}
          alt="Kona silhouette beneath the eclipse"
          style={{
            position: 'absolute',
            bottom: '-4%',
            left: '50%',
            width: 'min(70vmin, 560px)',
            transform: 'translateX(-50%)',
            filter:
              'brightness(0) drop-shadow(0 0 20px rgba(160,16,32,0.5)) drop-shadow(0 0 40px rgba(160,16,32,0.3))',
            opacity: 0.95,
            zIndex: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <h1
            className="drip"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              letterSpacing: '0.22em',
              fontWeight: 900,
              color: '#f0e4d6',
              margin: 0,
              lineHeight: 1,
              textShadow:
                '0 0 30px rgba(200,30,40,0.9), 0 2px 0 #1a0506, 0 4px 0 rgba(160,16,32,0.7)',
            }}
          >
            SANGUINE
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.4rem' }}>
            <OrnateDivider width={300} color="#a01020" />
          </div>
          <p
            style={{
              fontFamily: '"IM Fell English", "Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#b8a89a',
              margin: '0.4rem 0 0',
              letterSpacing: '0.1em',
            }}
          >
            the moon forgets its color; the wolf remembers.
          </p>
        </div>

        {/* Dripping blood SVG under title */}
        <svg
          aria-hidden
          viewBox="0 0 400 120"
          style={{ position: 'absolute', top: '32%', left: '50%', width: 360, transform: 'translateX(-50%)', zIndex: 5, pointerEvents: 'none' }}
        >
          {[60, 120, 200, 280, 340].map((x, i) => (
            <path
              key={i}
              d={`M${x} 0 L${x} ${30 + (i * 17) % 40} Q ${x} ${60 + (i * 13) % 40} ${x + 4} ${70 + (i * 11) % 30} Q ${x - 4} ${60 + (i * 13) % 40} ${x} ${80}`}
              fill="#a01020"
              opacity="0.85"
              className="drip"
            />
          ))}
        </svg>
      </section>

      {/* Verses section */}
      <section style={{ position: 'relative', zIndex: 3, maxWidth: 820, margin: '0 auto', padding: '5rem 2rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.5em', color: '#a01020' }}>
            ✞ VERSES UNDER A RED MOON ✞
          </div>
          <OrnateDivider width={260} color="#4a2020" style={{ margin: '0.4rem auto 0' }} />
        </div>

        {VERSES.map((v, i) => (
          <Verse key={i} verse={v} index={i} />
        ))}

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <img src={SONA_WHITE} alt="" aria-hidden style={{ width: 60, opacity: 0.18, filter: 'invert(0.4) sepia(1) hue-rotate(-20deg) saturate(3)' }} />
          <p
            style={{
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              color: '#78665a',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              margin: '0.6rem 0 0',
            }}
          >
            — and still the cursor blinks —
          </p>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '1rem 2rem 3.5rem', color: '#5a2020', fontFamily: '"IM Fell English", serif', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
        sanguis et lux · kcodes mmxxvi
      </footer>
    </div>
  );
}

function Verse({ verse, index }: { verse: { num: string; text: string }; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const align = index % 2 === 0 ? 'left' : 'right';
  return (
    <div
      ref={ref}
      className={`reveal-verse ${visible ? 'on' : ''}`}
      style={{
        textAlign: align,
        margin: '3.4rem 0',
        transitionDelay: `${index * 70}ms`,
        position: 'relative',
      }}
    >
      {/* giant roman numeral behind */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          [align === 'left' ? 'right' : 'left']: 0,
          top: '-0.5em',
          fontFamily: '"Cinzel", serif',
          fontWeight: 900,
          fontSize: 'clamp(6rem, 14vw, 10rem)',
          color: '#a01020',
          opacity: 0.1,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
        }}
      >
        {verse.num}
      </div>
      <div
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '0.7rem',
          letterSpacing: '0.5em',
          color: '#a01020',
          marginBottom: '0.4rem',
        }}
      >
        {verse.num}
      </div>
      <p
        style={{
          fontFamily: '"IM Fell English", "Cormorant Garamond", serif',
          fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
          lineHeight: 1.55,
          color: '#f0e4d6',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        {verse.text}
      </p>
    </div>
  );
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}
