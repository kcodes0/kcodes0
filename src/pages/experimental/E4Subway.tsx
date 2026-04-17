import { useEffect, useRef, useState } from 'react';
import {
  SONA_BLACK,
  SONA_WHITE,
  OrnateDivider,
  SHARED_KEYFRAMES,
  RouteCrossNav,
} from './_shared';

/**
 * /4 — Nocturne
 * A side-scrolling Symphony-of-the-Night style castle map.
 *  Rooms = projects / sections. The fursona avatar walks between them
 *  (drag the map, click a room, or use arrow keys). Stacked composition:
 *  parchment castle blueprint → room grid → sona avatar → HUD overlay.
 */

type Room = {
  id: string;
  x: number; // grid columns
  y: number; // grid rows
  w: number;
  h: number;
  name: string;
  subtitle: string;
  description: string;
  href?: string;
  tech?: string[];
  status?: 'active' | 'archived';
  doors?: ('N' | 'S' | 'E' | 'W')[];
};

const CELL = 72; // px per grid cell

const ROOMS: Room[] = [
  { id: 'entry', x: 0, y: 4, w: 3, h: 2, name: 'The Entrance Hall', subtitle: 'kcodes.me', description: 'Where the wolf first greets you. All roads branch from here.', doors: ['E', 'N', 'S'] },
  { id: 'duck', x: 3, y: 3, w: 4, h: 3, name: 'The Goose Tower', subtitle: 'Duck Lang', description: 'A programming language where you have to say "quack" or the goose won\'t run your code. The goose rates everything 1–10.', href: 'https://github.com/kcodes0/duck-lang', tech: ['Rust'], status: 'active', doors: ['E', 'W'] },
  { id: 'blog', x: 3, y: 1, w: 3, h: 2, name: 'The Scriptorium', subtitle: 'Blog CMS', description: 'Markdown-first content management running on Cloudflare Workers + D1. Fast, minimal, no bloat.', href: 'https://blog.kcodes.me', tech: ['Workers', 'D1'], status: 'active', doors: ['S'] },
  { id: 'null', x: 7, y: 4, w: 3, h: 2, name: 'The Sealed Chamber', subtitle: 'null', description: 'An experiment built entirely by Claude. It worked until it didn\'t. We do not speak of what happened near the end.', href: 'https://github.com/kcodes0/null', tech: ['TypeScript', 'Claude'], status: 'archived', doors: ['W'] },
  { id: 'news', x: 7, y: 1, w: 3, h: 2, name: 'The Press Room', subtitle: 'Satirical Newsroom', description: 'A full satirical news site. Built in a weekend. Still running.', href: 'https://news.kcodes.me', tech: ['React', 'Bun'], status: 'active', doors: ['S'] },
  { id: 'this', x: 0, y: 1, w: 3, h: 2, name: 'The Atelier', subtitle: 'This Site', description: 'The castle you are standing in. Always under renovation.', href: 'https://github.com/kcodes0/konacodes', tech: ['React', 'Vibes'], status: 'active', doors: ['E', 'S'] },
  { id: 'crypt', x: 0, y: 6, w: 3, h: 2, name: 'The Crypt', subtitle: 'Old projects', description: 'Where the first attempts rest, unremembered and peaceful.', doors: ['N', 'E'] },
  { id: 'library', x: 3, y: 6, w: 4, h: 2, name: 'The Library', subtitle: 'Labs & experiments', description: 'Shelf upon shelf of half-finished ideas and working prototypes — the smell of candle wax and RAM.', href: '/labs', doors: ['W', 'E', 'N'] },
  { id: 'observatory', x: 7, y: 6, w: 3, h: 2, name: 'The Observatory', subtitle: 'Now page', description: 'What I\'m looking at right now. Updated when the stars move.', href: '/now', doors: ['W', 'N'] },
];

// corridors — pairs of room ids connected on a grid line
const CORRIDORS: Array<{ a: string; b: string }> = [
  { a: 'entry', b: 'duck' },
  { a: 'entry', b: 'this' },
  { a: 'entry', b: 'crypt' },
  { a: 'duck', b: 'null' },
  { a: 'duck', b: 'blog' },
  { a: 'blog', b: 'this' },
  { a: 'news', b: 'null' },
  { a: 'crypt', b: 'library' },
  { a: 'library', b: 'observatory' },
  { a: 'library', b: 'duck' },
];

export default function E4Nocturne() {
  const [selectedRoom, setSelectedRoom] = useState<string>('entry');
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, dragX: 0, dragY: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const selected = ROOMS.find((r) => r.id === selectedRoom)!;
  const sonaPos = {
    x: (selected.x + selected.w / 2) * CELL,
    y: (selected.y + selected.h / 2) * CELL,
  };

  // center view on selected room
  useEffect(() => {
    if (!mapRef.current) return;
    const cw = mapRef.current.offsetWidth;
    const ch = mapRef.current.offsetHeight;
    setDrag({ x: cw / 2 - sonaPos.x, y: ch / 2 - sonaPos.y });
  }, [selectedRoom]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const DIRS: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      };
      const dir = DIRS[e.key];
      if (!dir) return;
      e.preventDefault();
      const cur = ROOMS.find((r) => r.id === selectedRoom)!;
      let best: Room | null = null;
      let bestScore = Infinity;
      for (const r of ROOMS) {
        if (r.id === cur.id) continue;
        const dx = r.x + r.w / 2 - (cur.x + cur.w / 2);
        const dy = r.y + r.h / 2 - (cur.y + cur.h / 2);
        if (Math.sign(dx) !== dir[0] && dir[0] !== 0) continue;
        if (Math.sign(dy) !== dir[1] && dir[1] !== 0) continue;
        const aligned = dir[0] === 0 ? Math.abs(dx) : Math.abs(dy);
        const along = dir[0] !== 0 ? Math.abs(dx) : Math.abs(dy);
        const score = along + aligned * 2;
        if (score < bestScore) {
          bestScore = score;
          best = r;
        }
      }
      if (best) setSelectedRoom(best.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedRoom]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 50% 20%, #162622 0%, #0a1512 40%, #040807 100%)',
        color: '#c8d8c0',
        fontFamily: '"VT323", monospace',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;1,300&family=VT323&display=swap"
      />
      <style>{`
        ${SHARED_KEYFRAMES}
        html, body { background: #040807; }
        ::selection { background: #d8ac4c; color: #0a1512; }

        .map-grid {
          background-image:
            linear-gradient(rgba(200,216,192,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,216,192,0.05) 1px, transparent 1px);
          background-size: ${CELL}px ${CELL}px;
        }
        .room {
          position: absolute;
          border: 2px solid #5a7a6a;
          background: linear-gradient(135deg, rgba(30,54,46,0.72), rgba(10,22,18,0.92));
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          cursor: pointer;
        }
        .room:hover { border-color: #a8c8b8; background: linear-gradient(135deg, rgba(40,74,62,0.9), rgba(14,28,24,0.95)); }
        .room.selected {
          border-color: #d8ac4c;
          box-shadow: 0 0 0 1px #d8ac4c, 0 0 30px rgba(216,172,76,0.4);
          background: linear-gradient(135deg, rgba(46,84,66,0.95), rgba(20,34,28,0.98));
        }
        .room::before, .room::after, .room > .corner {
          position: absolute;
          width: 10px; height: 10px;
          border: 1.5px solid #d8ac4c;
        }
        .room::before { content: ''; top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .room::after  { content: ''; bottom: -1px; right: -1px; border-left: none; border-top: none; }
        .corner.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .corner.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }

        .sona-walker {
          transition: top 0.6s cubic-bezier(0.4,1.4,0.5,1), left 0.6s cubic-bezier(0.4,1.4,0.5,1);
        }
        .sona-walker img { animation: walker 1.2s ease-in-out infinite; }
        @keyframes walker {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-4px) rotate(1deg); }
        }

        .hud-panel {
          background: linear-gradient(180deg, rgba(10,22,18,0.95), rgba(4,8,7,0.95));
          border: 2px solid #d8ac4c;
          position: relative;
        }
        .hud-panel::before, .hud-panel::after {
          content: '';
          position: absolute;
          width: 14px; height: 14px;
          border: 2px solid #d8ac4c;
        }
        .hud-panel::before { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .hud-panel::after  { bottom: -2px; right: -2px; border-left: none; border-top: none; }

        @media (prefers-reduced-motion: reduce) {
          .sona-walker img { animation: none !important; }
        }
      `}</style>

      <header style={{ position: 'relative', zIndex: 20, padding: '1.5rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#d8ac4c' }}>ACT · IV</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#8aa090', textTransform: 'uppercase', marginTop: 4, fontFamily: '"Cormorant Garamond", serif' }}>
            Nocturne — a castle of rooms
          </div>
        </div>
        <div style={{ maxWidth: 460, width: '100%' }}>
          <RouteCrossNav active={4} color="#8aa090" accent="#d8ac4c" />
        </div>
      </header>

      {/* Title band */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '1.4rem 1rem 1rem' }}>
        <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', letterSpacing: '0.24em', fontWeight: 600, color: '#e8e0c0', margin: 0, textShadow: '0 0 24px rgba(216,172,76,0.3)' }}>
          NOCTURNE
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.2rem' }}>
          <OrnateDivider width={300} color="#5a7a6a" />
        </div>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.95rem', color: '#7a9080', margin: '0.2rem 0 0', letterSpacing: '0.12em' }}>
          click a room · drag the map · or use arrow keys
        </p>
      </div>

      {/* Castle map viewport */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '1rem auto 2rem',
          width: 'calc(100% - 2rem)',
          maxWidth: 1200,
          height: '62vh',
          minHeight: 460,
          background: '#0a1512',
          border: '2px solid #5a7a6a',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.6), 0 10px 40px rgba(0,0,0,0.6)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={mapRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          dragStart.current = { x: e.clientX, y: e.clientY, dragX: drag.x, dragY: drag.y };
        }}
        onMouseMove={(e) => {
          if (!isDragging) return;
          setDrag({
            x: dragStart.current.dragX + (e.clientX - dragStart.current.x),
            y: dragStart.current.dragY + (e.clientY - dragStart.current.y),
          });
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div
          className="map-grid"
          style={{
            position: 'absolute',
            left: drag.x,
            top: drag.y,
            width: 14 * CELL,
            height: 10 * CELL,
            transition: isDragging ? 'none' : 'left 0.6s cubic-bezier(0.16,1,0.3,1), top 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* corridors (SVG) */}
          <svg
            viewBox={`0 0 ${14 * CELL} ${10 * CELL}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            {CORRIDORS.map(({ a, b }, i) => {
              const A = ROOMS.find((r) => r.id === a)!;
              const B = ROOMS.find((r) => r.id === b)!;
              const ax = (A.x + A.w / 2) * CELL;
              const ay = (A.y + A.h / 2) * CELL;
              const bx = (B.x + B.w / 2) * CELL;
              const by = (B.y + B.h / 2) * CELL;
              return (
                <g key={i}>
                  <line
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke="#d8ac4c"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.45"
                  />
                </g>
              );
            })}
          </svg>

          {/* rooms */}
          {ROOMS.map((r) => (
            <div
              key={r.id}
              className={`room ${selectedRoom === r.id ? 'selected' : ''}`}
              style={{
                left: r.x * CELL,
                top: r.y * CELL,
                width: r.w * CELL,
                height: r.h * CELL,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRoom(r.id);
              }}
            >
              <div className="corner tr" />
              <div className="corner bl" />
              <div style={{ padding: '8px 10px', fontFamily: '"VT323", monospace', fontSize: '0.9rem', color: selectedRoom === r.id ? '#d8ac4c' : '#8aa090', lineHeight: 1.05, textShadow: '0 1px 0 #000' }}>
                {r.name.toUpperCase()}
              </div>
              <div style={{ position: 'absolute', bottom: 6, right: 10, fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.7rem', color: '#5a7a6a' }}>
                {r.subtitle}
              </div>
              {/* doors */}
              {r.doors?.map((d) => {
                const style: React.CSSProperties = { position: 'absolute', background: '#d8ac4c', opacity: 0.9 };
                if (d === 'N') Object.assign(style, { top: -3, left: '50%', width: 8, height: 6, transform: 'translateX(-50%)' });
                if (d === 'S') Object.assign(style, { bottom: -3, left: '50%', width: 8, height: 6, transform: 'translateX(-50%)' });
                if (d === 'W') Object.assign(style, { left: -3, top: '50%', width: 6, height: 8, transform: 'translateY(-50%)' });
                if (d === 'E') Object.assign(style, { right: -3, top: '50%', width: 6, height: 8, transform: 'translateY(-50%)' });
                return <span key={d} style={style} />;
              })}
            </div>
          ))}

          {/* sona avatar */}
          <div
            className="sona-walker"
            style={{
              position: 'absolute',
              left: sonaPos.x - 28,
              top: sonaPos.y - 36,
              width: 56,
              height: 72,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <img
              src={SONA_BLACK}
              alt="Kona avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 12px rgba(216,172,76,0.6)) drop-shadow(0 4px 4px rgba(0,0,0,0.5))',
              }}
            />
          </div>
        </div>

        {/* minimap (HUD) */}
        <div
          className="hud-panel"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 170,
            height: 120,
            padding: 8,
            zIndex: 30,
          }}
        >
          <div style={{ fontFamily: '"VT323", monospace', fontSize: '0.78rem', color: '#d8ac4c', letterSpacing: '0.2em', marginBottom: 4 }}>MAP</div>
          <svg viewBox="0 0 14 10" style={{ width: '100%', height: 'calc(100% - 18px)' }}>
            {ROOMS.map((r) => (
              <rect
                key={r.id}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={selectedRoom === r.id ? '#d8ac4c' : '#3a5448'}
                stroke={selectedRoom === r.id ? '#d8ac4c' : '#5a7a6a'}
                strokeWidth="0.05"
              />
            ))}
          </svg>
        </div>

        {/* controls HUD */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            fontFamily: '"VT323", monospace',
            fontSize: '0.85rem',
            color: '#8aa090',
            letterSpacing: '0.12em',
            zIndex: 30,
            userSelect: 'none',
          }}
        >
          <span style={{ color: '#d8ac4c' }}>[WASD / ←↑↓→]</span> move &nbsp;·&nbsp; <span style={{ color: '#d8ac4c' }}>[click]</span> enter
        </div>
      </section>

      {/* Selected room detail — stacked below map with HUD border */}
      <section style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
        <div
          className="hud-panel"
          style={{
            padding: '1.8rem 1.6rem',
            display: 'grid',
            gridTemplateColumns: '64px 1fr auto',
            gap: '1.4rem',
            alignItems: 'center',
          }}
          key={selected.id}
        >
          <img
            src={SONA_BLACK}
            alt=""
            aria-hidden
            style={{ width: 64, opacity: 0.9, filter: 'drop-shadow(0 0 10px rgba(216,172,76,0.5))' }}
          />
          <div>
            <div style={{ fontFamily: '"VT323", monospace', fontSize: '0.9rem', color: '#d8ac4c', letterSpacing: '0.2em' }}>
              ROOM &nbsp;·&nbsp; {selected.id.toUpperCase()}
            </div>
            <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.8rem', margin: '0.1rem 0 0.2rem', color: '#e8e0c0', fontWeight: 500 }}>
              {selected.name}
            </h2>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.92rem', color: '#a8c0b0', marginBottom: '0.4rem' }}>
              {selected.subtitle}
            </div>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', color: '#c8d8c0', lineHeight: 1.6, margin: 0 }}>
              {selected.description}
            </p>
            {selected.tech && (
              <div style={{ marginTop: '0.7rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {selected.tech.map((t) => (
                  <span key={t} style={{ fontFamily: '"VT323", monospace', fontSize: '0.75rem', color: '#d8ac4c', border: '1px solid #5a7a6a', padding: '0.1rem 0.45rem', letterSpacing: '0.15em' }}>
                    {t}
                  </span>
                ))}
                {selected.status === 'archived' && (
                  <span style={{ fontFamily: '"VT323", monospace', fontSize: '0.75rem', color: '#a01010', border: '1px solid #a01010', padding: '0.1rem 0.45rem', letterSpacing: '0.2em' }}>
                    SEALED
                  </span>
                )}
              </div>
            )}
          </div>
          <div>
            {selected.href ? (
              <a
                href={selected.href}
                target={selected.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.3em',
                  color: '#d8ac4c',
                  textDecoration: 'none',
                  border: '1px solid #d8ac4c',
                  padding: '0.7rem 1.2rem',
                  background: 'linear-gradient(180deg, transparent, rgba(216,172,76,0.1))',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget as HTMLAnchorElement;
                  t.style.background = 'linear-gradient(180deg, rgba(216,172,76,0.3), rgba(216,172,76,0.15))';
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLAnchorElement;
                  t.style.background = 'linear-gradient(180deg, transparent, rgba(216,172,76,0.1))';
                }}
              >
                ENTER →
              </a>
            ) : (
              <span style={{ fontFamily: '"VT323", monospace', color: '#5a7a6a', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                [NO EXIT]
              </span>
            )}
          </div>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '1rem 2rem 3rem', color: '#5a7a6a', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
        <img src={SONA_WHITE} alt="" aria-hidden style={{ width: 40, opacity: 0.22, margin: '0 auto 0.6rem', display: 'block' }} />
        the castle is never finished · kcodes mmxxvi
      </footer>
    </div>
  );
}
