import { useEffect, useRef, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  CornerFlourish,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
  useReveal,
} from './_shared';

/**
 * /5 — Grimoire
 * An illuminated vellum manuscript spread. Gold leaf borders trace
 * themselves as you scroll. Large rubricated drop caps. Fursona as
 * frontispiece. Stacked: vellum texture → gilt border → red rubric →
 * sona miniature → body text → marginalia doodles.
 */

type Arcana = { roman: string; name: string; motto: string; body: string };

const ARCANA: Arcana[] = [
  { roman: 'o', name: 'the fool', motto: 'begin with nothing', body: 'Every project starts in ignorance. The fool walks off the cliff in the tarot and the next card isn\'t death — it\'s the fall, which lasts long enough to learn the ground.' },
  { roman: 'i', name: 'the programmer', motto: 'make the machine listen', body: 'Before the language there is the will. Before the will there is a problem small enough to pick up without looking.' },
  { roman: 'vii', name: 'the chariot', motto: 'ship raw, steer later', body: 'Momentum is cheaper than plans. Cut the rope, point the car, fix the wheel while it\'s turning.' },
  { roman: 'ix', name: 'the hermit', motto: 'one lamp, one problem', body: 'I do my best work alone at 2am. The bugs come out to drink, and I can catch them one by one.' },
  { roman: 'xiii', name: 'the goose', motto: 'quack or be rated', body: 'An interpreter built for a single joke that turned out to rate your code 1-10. Sometimes the bit becomes the craft.' },
  { roman: 'xviii', name: 'the moon', motto: 'trust quiet data', body: 'At night the graphs are honest. Daytime dashboards lie. This is a rule I made up but I stand by it.' },
];

export default function E5Grimoire() {
  const { ref: frontRef, visible: frontVisible } = useReveal<HTMLDivElement>(0.2);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 50% 0%, #f4e9c8 0%, #e8d9a8 35%, #d9c58a 80%, #c8b374 100%)',
        color: '#2a1f12',
        fontFamily: '"EB Garamond", Georgia, serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=UnifrakturMaguntia&family=Cinzel:wght@400;600&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #d9c58a; }
        ::selection { background: #8b1a1a; color: #f4e9c8; }

        .vellum {
          background-image:
            radial-gradient(ellipse at 30% 20%, rgba(120,80,40,0.10), transparent 55%),
            radial-gradient(ellipse at 70% 80%, rgba(120,80,40,0.12), transparent 55%),
            radial-gradient(ellipse at 15% 60%, rgba(140,100,60,0.06), transparent 40%),
            repeating-linear-gradient(18deg, rgba(140,100,60,0.04) 0 1px, transparent 1px 30px);
        }
        .gilt-draw path, .gilt-draw line, .gilt-draw circle, .gilt-draw rect {
          stroke-dasharray: var(--len, 1000);
          stroke-dashoffset: var(--len, 1000);
          animation: drawStroke 3s 0.4s ease-out forwards;
        }
        .drop-cap::first-letter {
          font-family: '"UnifrakturMaguntia", "EB Garamond", serif';
          font-size: 5.4em;
          line-height: 0.85;
          float: left;
          margin: 0.08em 0.1em 0 0;
          color: #8b1a1a;
          text-shadow: 2px 2px 0 rgba(184,146,58,0.5);
        }
        .rubric { color: #8b1a1a; font-family: '"UnifrakturMaguntia", serif'; }
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity 1.2s ease, transform 1.2s ease; }
        .reveal.on { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .gilt-draw path, .gilt-draw line, .gilt-draw circle, .gilt-draw rect { animation: none !important; stroke-dashoffset: 0 !important; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="vellum" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <header style={{ position: 'relative', zIndex: 6, padding: '1.5rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#8b1a1a', fontWeight: 600 }}>ACT · V</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#5a4424', textTransform: 'uppercase', marginTop: 4 }}>
            Grimoire — the illuminated codex
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={5} color="#5a4424" accent="#8b1a1a" />
        </div>
      </header>

      {/* Frontispiece spread */}
      <section
        ref={frontRef}
        className={`reveal ${frontVisible ? 'on' : ''}`}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1080,
          margin: '3rem auto 4rem',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #f6ecd0, #ecdcae)',
            border: '1px solid #8a6a3a',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.2rem, 4vw, 3rem)',
            boxShadow: '0 20px 60px rgba(74,46,20,0.3), inset 0 0 60px rgba(184,146,58,0.12)',
            minHeight: 640,
          }}
        >
          {/* gilt border that draws itself */}
          <svg
            aria-hidden
            className="gilt-draw"
            viewBox="0 0 1000 640"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 18, width: 'calc(100% - 36px)', height: 'calc(100% - 36px)', pointerEvents: 'none', filter: 'drop-shadow(0 0 4px rgba(184,146,58,0.6))' }}
          >
            <rect x="2" y="2" width="996" height="636" fill="none" stroke="#b8923a" strokeWidth="2" style={{ ['--len' as any]: 3500 }} />
            <rect x="14" y="14" width="972" height="612" fill="none" stroke="#8b1a1a" strokeWidth="1" strokeDasharray="2 2" style={{ ['--len' as any]: 3300 }} />
            {/* vines */}
            <path d="M14 40 Q 60 60 60 120 Q 40 160 80 200 Q 130 240 80 320 Q 40 400 80 480 Q 120 540 60 620" fill="none" stroke="#b8923a" strokeWidth="1.6" style={{ ['--len' as any]: 1400 }} />
            <path d="M986 40 Q 940 60 940 120 Q 960 160 920 200 Q 870 240 920 320 Q 960 400 920 480 Q 880 540 940 620" fill="none" stroke="#b8923a" strokeWidth="1.6" style={{ ['--len' as any]: 1400 }} />
            {/* leaves */}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i}>
                <path d={`M${70 + (i % 2) * 6} ${60 + i * 70} q 10 -6 16 0 q -6 10 -16 0 z`} fill="#b8923a" style={{ ['--len' as any]: 40 }} />
                <path d={`M${924 - (i % 2) * 6} ${60 + i * 70} q -10 -6 -16 0 q 6 10 16 0 z`} fill="#b8923a" style={{ ['--len' as any]: 40 }} />
              </g>
            ))}
          </svg>

          {/* top rubric line */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '1.2rem' }}>
            <div className="rubric" style={{ fontSize: '1.2rem', letterSpacing: '0.2em', color: '#8b1a1a' }}>
              ❦ Liber Lupi — the book of the wolf ❦
            </div>
          </div>

          {/* Main spread: sona + opening paragraph */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'clamp(180px, 28%, 280px) 1fr',
              gap: 'clamp(1.2rem, 3vw, 2.4rem)',
              alignItems: 'start',
            }}
          >
            {/* Fursona miniature with gilt frame */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', background: '#f1e1b8', padding: '0.8rem', border: '1px solid #b8923a', boxShadow: '0 6px 16px rgba(74,46,20,0.25)' }}>
                <img
                  src={SONA_BLACK}
                  alt="Kona, frontispiece"
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'sepia(0.4) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                  }}
                />
                {/* inner double line */}
                <div style={{ position: 'absolute', inset: 4, border: '1px dashed rgba(139,26,26,0.4)', pointerEvents: 'none' }} />
              </div>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '0.6rem',
                  fontFamily: '"UnifrakturMaguntia", serif',
                  fontSize: '1.1rem',
                  color: '#8b1a1a',
                }}
              >
                Kona, the Wolf
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  color: '#5a4424',
                }}
              >
                as drawn by lamplight
              </div>
              {/* decorative ornaments — stacked */}
              <div style={{ position: 'absolute', top: -16, left: -16, color: '#b8923a' }}>
                <CornerFlourish size={42} rotate={0} strokeWidth={1.4} />
              </div>
              <div style={{ position: 'absolute', top: -16, right: -16, color: '#b8923a' }}>
                <CornerFlourish size={42} rotate={90} strokeWidth={1.4} />
              </div>
            </div>

            {/* Opening text with drop cap */}
            <div>
              <h1
                style={{
                  fontFamily: '"UnifrakturMaguntia", serif',
                  fontSize: 'clamp(3rem, 7vw, 5.6rem)',
                  lineHeight: 0.9,
                  margin: '0 0 0.4rem',
                  color: '#2a1f12',
                }}
              >
                Grimoire
              </h1>
              <div style={{ color: '#8b1a1a', fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.4em', marginBottom: '1.4rem' }}>
                ❧ a book of small spells ❧
              </div>
              <p
                className="drop-cap"
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                  lineHeight: 1.75,
                  color: '#2a1f12',
                  marginBottom: '1.2rem',
                  textAlign: 'justify',
                }}
              >
                Herein are recorded the minor arts of one who works
                at night with the lamps low. Not spells exactly — but
                the things I return to when the code grows stubborn
                and the sun is still four hours away. Six cards, six
                small arcana, and the wolf who keeps them.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <OrnateDivider width={220} color="#b8923a" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arcana cards — tarot spread */}
      <section style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="rubric" style={{ fontSize: '1rem', letterSpacing: '0.3em' }}>
            ✦ the six minor cards ✦
          </div>
          <OrnateDivider width={260} color="#8a6a3a" style={{ margin: '0.4rem auto 0' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ARCANA.map((a, i) => (
            <ArcanumCard key={a.roman} a={a} index={i} />
          ))}
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '2rem 2rem 4rem', color: '#5a4424', fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
        <img src={SONA_WHITE} alt="" aria-hidden style={{ width: 40, opacity: 0.35, margin: '0 auto 0.6rem', display: 'block', filter: 'sepia(0.6) invert(0.3)' }} />
        scribe: kcodes · colophon: mmxxvi
      </footer>
    </div>
  );
}

function ArcanumCard({ a, index }: { a: Arcana; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={(el) => {
        // assign to both the reveal observer and the local tilt ref
        ref.current = el;
        tiltRef.current = el;
      }}
      className={`reveal ${visible ? 'on' : ''}`}
      style={{
        position: 'relative',
        padding: '1.8rem 1.4rem 1.6rem',
        background: 'linear-gradient(180deg, #f6ecd0, #ecdcae)',
        border: '1px solid #8a6a3a',
        boxShadow: '0 14px 30px rgba(74,46,20,0.25), inset 0 0 30px rgba(184,146,58,0.18)',
        transitionDelay: `${index * 80}ms`,
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.2s ease, opacity 1s, transform 1s',
      }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setTilt({ x: ((e.clientX - cx) / rect.width) * 10, y: -((e.clientY - cy) / rect.height) * 10 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* inner frame */}
      <div style={{ position: 'absolute', inset: 8, border: '1px dashed #b8923a', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#f4e9c8', padding: '0 0.6rem', fontFamily: '"UnifrakturMaguntia", serif', fontSize: '1.2rem', color: '#8b1a1a' }}>
        {a.roman.toUpperCase()}
      </div>
      <div style={{ position: 'absolute', top: 8, left: 8, color: '#b8923a' }}>
        <CornerFlourish size={26} rotate={0} strokeWidth={1.2} />
      </div>
      <div style={{ position: 'absolute', top: 8, right: 8, color: '#b8923a' }}>
        <CornerFlourish size={26} rotate={90} strokeWidth={1.2} />
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 8, color: '#b8923a' }}>
        <CornerFlourish size={26} rotate={270} strokeWidth={1.2} />
      </div>
      <div style={{ position: 'absolute', bottom: 8, right: 8, color: '#b8923a' }}>
        <CornerFlourish size={26} rotate={180} strokeWidth={1.2} />
      </div>

      <h3
        style={{
          fontFamily: '"UnifrakturMaguntia", serif',
          fontSize: '1.9rem',
          margin: '0.8rem 0 0.2rem',
          color: '#8b1a1a',
          textAlign: 'center',
          fontWeight: 400,
        }}
      >
        {a.name}
      </h3>
      <div
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: '#5a4424',
          textAlign: 'center',
          marginBottom: '0.9rem',
          fontStyle: 'italic',
        }}
      >
        {a.motto}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
        <img
          src={SONA_BLACK}
          alt=""
          aria-hidden
          style={{
            width: '70%',
            filter: 'sepia(0.7) contrast(0.95)',
            opacity: 0.8,
          }}
        />
      </div>
      <p
        style={{
          fontFamily: '"EB Garamond", serif',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: '#2a1f12',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        {a.body}
      </p>
    </div>
  );
}
