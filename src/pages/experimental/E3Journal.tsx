import { useEffect, useRef, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
} from './_shared';

/**
 * /3 — Ōkami (狼)
 * A vertical vermillion shrine scroll. The wolf is the mountain kami —
 * guardian of Mitsumine and Musashi-Mitake. Drifting ofuda talismans.
 * Anime-gothic. Stacked composition: inked scroll bg → red torii
 * silhouette → kanji seals → brush-strokes → fursona as mountain kami →
 * tategaki haiku columns with vermillion seals floating on top.
 */
export default function E3Okami() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ofudaCount = 12;
  const ofuda = Array.from({ length: ofudaCount }).map((_, i) => ({
    left: (i * 53) % 100,
    delay: (i * 2.7) % 18,
    dur: 20 + (i % 5) * 4,
    rot: (i * 17) % 40 - 20,
    kanji: ['狼', '月', '山', '夜', '神', '守', '影', '霊', '森', '風', '魂', '静'][i % 12],
  }));

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f3e8d3 0%, #e8dbc0 30%, #d9c89f 80%, #c4b285 100%)',
        color: '#1a1714',
        fontFamily: '"Shippori Mincho", "EB Garamond", serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Zen+Kurenaido&family=Noto+Serif+JP:wght@300;500;700&family=EB+Garamond:ital@1&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #efe1c4; }
        ::selection { background: #c0251a; color: #f3e8d3; }

        /* Paper fiber texture */
        .paper {
          background:
            radial-gradient(circle at 18% 12%, rgba(120,80,40,0.08), transparent 45%),
            radial-gradient(circle at 82% 70%, rgba(120,80,40,0.10), transparent 50%),
            repeating-linear-gradient(0deg, rgba(120,80,40,0.03) 0 1px, transparent 1px 5px),
            repeating-linear-gradient(90deg, rgba(120,80,40,0.03) 0 1px, transparent 1px 5px);
        }
        .ink-blot { filter: blur(0.3px); mix-blend-mode: multiply; opacity: 0.82; }
        .seal {
          background: #c0251a;
          color: #f3e8d3;
          display: inline-grid;
          place-items: center;
          font-family: '"Zen Kurenaido", "Noto Serif JP", serif';
          font-weight: 700;
          box-shadow: inset 0 0 0 2px #f3e8d3, 0 0 0 2px #c0251a, 2px 3px 0 rgba(0,0,0,0.2);
          letter-spacing: -0.04em;
        }

        .ofuda {
          position: absolute;
          top: -120px;
          width: 44px;
          height: 120px;
          background: linear-gradient(180deg, #f5ecd2 0%, #ead9b2 100%);
          border: 2px solid #a01020;
          display: grid;
          place-items: center;
          font-family: '"Noto Serif JP", serif';
          font-size: 1.4rem;
          color: #a01020;
          font-weight: 700;
          box-shadow: 2px 4px 8px rgba(0,0,0,0.15);
          animation: ofudaFall var(--dur, 26s) var(--delay, 0s) linear infinite;
        }
        .ofuda::after {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #a01020;
          border-radius: 50%;
        }
        @keyframes ofudaFall {
          0%   { transform: translateY(-10vh) rotate(var(--rot, 0deg)); opacity: 0; }
          10%  { opacity: 0.85; }
          100% { transform: translateY(110vh) rotate(calc(var(--rot, 0deg) + 20deg)); opacity: 0; }
        }

        .brush-draw path {
          stroke-dasharray: var(--len, 1000);
          stroke-dashoffset: var(--len, 1000);
          animation: drawStroke 2.4s 0.3s ease-out forwards;
        }
        .tategaki {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-feature-settings: 'vert';
        }
        @media (prefers-reduced-motion: reduce) {
          .ofuda, .brush-draw path { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>

      <div className="paper" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Drifting ofuda */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {ofuda.map((o, i) => (
          <div
            key={i}
            className="ofuda"
            style={{
              left: `${o.left}%`,
              ['--delay' as any]: `${o.delay}s`,
              ['--dur' as any]: `${o.dur}s`,
              ['--rot' as any]: `${o.rot}deg`,
            }}
          >
            {o.kanji}
          </div>
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
          <div style={{ fontFamily: '"Noto Serif JP", serif', fontSize: '0.75rem', letterSpacing: '0.5em', color: '#c0251a', fontWeight: 700 }}>
            第 · 参 · 幕
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#7a6a4a', textTransform: 'uppercase', marginTop: 4 }}>
            Ōkami — 狼 — the wolf kami
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={3} color="#7a6a4a" accent="#c0251a" />
        </div>
      </header>

      {/* Hero — torii + sona */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem 4rem',
        }}
      >
        {/* Enso circle — giant brush ring */}
        <svg
          className="brush-draw"
          aria-hidden
          viewBox="0 0 600 600"
          style={{
            position: 'absolute',
            width: 'min(85vmin, 620px)',
            height: 'min(85vmin, 620px)',
            top: '52%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${scrollY * 0.05}deg)`,
            filter: 'blur(0.4px)',
            opacity: 0.95,
          }}
        >
          <path
            d="M 300 40 A 260 260 0 1 1 299.9 40 M 280 44 Q 260 50 244 62"
            stroke="#1a1714"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            style={{ ['--len' as any]: 1800 }}
          />
        </svg>

        {/* Torii silhouette (stacked behind sona) */}
        <svg
          aria-hidden
          viewBox="0 0 400 500"
          style={{
            position: 'absolute',
            width: 'min(70vmin, 540px)',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <g fill="#c0251a" opacity="0.85">
            <rect x="40" y="80" width="320" height="24" />
            <rect x="20" y="108" width="360" height="14" />
            <rect x="140" y="130" width="120" height="10" />
            <rect x="80" y="110" width="30" height="360" />
            <rect x="290" y="110" width="30" height="360" />
          </g>
          <path
            d="M30 92 Q 200 50 370 92"
            stroke="#c0251a"
            strokeWidth="6"
            fill="none"
            opacity="0.85"
          />
        </svg>

        {/* Fursona — front layer */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: 'min(55vmin, 420px)',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={SONA_BLACK}
            alt="Kona kami"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 18px 30px rgba(192,37,26,0.25))',
            }}
          />
        </div>

        {/* Big kanji behind sona */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            fontFamily: '"Noto Serif JP", serif',
            fontSize: 'clamp(14rem, 40vmin, 28rem)',
            fontWeight: 700,
            color: '#c0251a',
            opacity: 0.06,
            lineHeight: 1,
            letterSpacing: '-0.1em',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            userSelect: 'none',
          }}
        >
          狼
        </div>

        {/* Seal stack — top-right */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            zIndex: 4,
          }}
        >
          <div className="seal" style={{ width: 72, height: 72, fontSize: '2rem', transform: 'rotate(-6deg)' }}>狼</div>
          <div className="seal" style={{ width: 44, height: 44, fontSize: '1.2rem', transform: 'rotate(4deg)', marginLeft: 18 }}>神</div>
        </div>

        {/* Tategaki title — vertical right */}
        <div
          className="tategaki"
          style={{
            position: 'absolute',
            right: '4%',
            top: '20%',
            fontFamily: '"Noto Serif JP", serif',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            color: '#1a1714',
            letterSpacing: '0.4em',
            zIndex: 4,
            textShadow: '1px 1px 0 #f3e8d3',
          }}
        >
          山の神、夜に歩む — 狼
        </div>

        {/* Title plate — bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: '"Shippori Mincho", serif',
              fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
              letterSpacing: '0.18em',
              fontWeight: 800,
              color: '#1a1714',
              margin: 0,
            }}
          >
            ŌKAMI
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.4rem' }}>
            <OrnateDivider width={300} color="#c0251a" />
          </div>
          <p
            style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#5a4a2a',
              margin: '0.35rem 0 0',
              letterSpacing: '0.12em',
            }}
          >
            the wolf kami who keeps watch at the edge of the mountain
          </p>
        </div>
      </section>

      {/* Scroll section — tategaki haiku columns */}
      <section
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1080,
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {HAIKU.map((h, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                padding: '2rem 1.2rem',
                background: 'linear-gradient(180deg, #f3e8d3, #e8dbc0)',
                border: '1px solid #b89a6a',
                boxShadow: '3px 4px 0 #1a1714, 6px 8px 0 rgba(192,37,26,0.3)',
                minHeight: 340,
              }}
            >
              {/* stacked: seal floating at top-right corner */}
              <div
                className="seal"
                style={{
                  position: 'absolute',
                  top: -14,
                  right: 14,
                  width: 42,
                  height: 42,
                  fontSize: '1.1rem',
                  transform: `rotate(${i * 3 - 4}deg)`,
                }}
              >
                {h.sealChar}
              </div>
              <div
                className="tategaki"
                style={{
                  fontFamily: '"Shippori Mincho", "Noto Serif JP", serif',
                  fontSize: '1.25rem',
                  color: '#1a1714',
                  letterSpacing: '0.3em',
                  margin: '0 auto',
                  height: 280,
                  fontWeight: 500,
                }}
              >
                {h.lines.join('　')}
              </div>
              <div
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  color: '#5a4a2a',
                  marginTop: '1rem',
                  textAlign: 'right',
                  borderTop: '1px solid #b89a6a',
                  paddingTop: '0.6rem',
                }}
              >
                — {h.en}
              </div>
            </div>
          ))}
        </div>

        {/* Central signature block w/ enso and sona echo */}
        <div
          style={{
            marginTop: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <img
            src={SONA_BLACK}
            alt=""
            aria-hidden
            style={{ width: 120, opacity: 0.82, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
          />
          <div style={{ textAlign: 'center', maxWidth: 440 }}>
            <div style={{ fontFamily: '"Noto Serif JP", serif', fontSize: '0.8rem', color: '#c0251a', letterSpacing: '0.5em', marginBottom: '0.4rem' }}>
              署名
            </div>
            <p
              style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: '#2a2418',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Made by someone who prefers nighttime and has been
              making things on computers since he was very small.
              The wolf is not a mascot — he&rsquo;s just the shape
              the work likes to take.
            </p>
          </div>
          <div
            className="seal"
            style={{ width: 90, height: 90, fontSize: '2.2rem', transform: 'rotate(8deg)' }}
          >
            印
          </div>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '3rem 2rem 3.5rem', color: '#7a6a4a', fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
        <img src={SONA_WHITE} alt="" aria-hidden style={{ width: 40, opacity: 0.25, margin: '0 auto 0.6rem', display: 'block', filter: 'invert(0.5)' }} />
        kcodes 印 · mmxxvi
      </footer>
    </div>
  );
}

const HAIKU = [
  { lines: ['月光に', '歩む狼', '声もなく'], en: 'the wolf walks in moonlight, without voicing a sound', sealChar: '狼' },
  { lines: ['鳥居越し', '月が笑う', '音もなく'], en: 'through the torii, the moon smiles without sound', sealChar: '月' },
  { lines: ['静けさが', '一番好き', '道連れ'], en: 'silence — my favorite companion on the road', sealChar: '静' },
  { lines: ['古き書', 'バグの歌を', '歌うなり'], en: 'the old book sings a song of bugs', sealChar: '書' },
  { lines: ['冬の朝', 'サーバが', '眠らない'], en: 'winter morning — the server never sleeps', sealChar: '冬' },
  { lines: ['影一つ', 'コードと友', '夜の中'], en: 'one shadow: me and the code, friends in the night', sealChar: '影' },
];
