import { useState, useEffect, useRef, useCallback } from 'react';

type Exhibit = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  room: string;
  title: string;
  year: string;
  label: string;
  shape: 'plinth' | 'frame' | 'bench' | 'sculpture';
  swatch?: string;
};

type Rect = { x: number; y: number; w: number; h: number };

const WORLD_W = 1400;
const WORLD_H = 900;
const PLAYER_R = 10;
const SPEED = 3;
const PLAQUE_RADIUS = 55;

// Walls — outer + inner dividers between rooms (4 rooms: entrance + 3 galleries)
const WALLS: Rect[] = [
  // outer
  { x: 0, y: 0, w: WORLD_W, h: 20 },
  { x: 0, y: WORLD_H - 20, w: WORLD_W, h: 20 },
  { x: 0, y: 0, w: 20, h: WORLD_H },
  { x: WORLD_W - 20, y: 0, w: 20, h: WORLD_H },
  // divider: entrance → gallery A (vertical wall with doorway)
  { x: 340, y: 20, w: 14, h: 340 },
  { x: 340, y: 460, w: 14, h: 440 },
  // divider: gallery A → gallery B (horizontal)
  { x: 354, y: 440, w: 440, h: 14 },
  { x: 880, y: 440, w: 300, h: 14 },
  // divider: gallery B → gallery C (vertical)
  { x: 880, y: 454, w: 14, h: 280 },
  { x: 880, y: 800, w: 14, h: 100 },
  // gift shop divider
  { x: 1180, y: 440, w: 14, h: 460 },
];

const EXHIBITS: Exhibit[] = [
  { id: 'a1', x: 500, y: 120, w: 60, h: 60, room: 'A', shape: 'plinth', swatch: '#c8a876',
    title: 'DUCK LANG', year: 'Rust · 2024—ongoing',
    label: 'A programming language in which every source file must begin with the token QUACK. Critics have called it "at once a parody and a love letter to compiler design." Currently at version 0.3.1. The goose, we are told, has opinions.' },
  { id: 'a2', x: 700, y: 120, w: 180, h: 20, room: 'A', shape: 'frame', swatch: '#2a3a5a',
    title: 'BLOG CMS', year: 'TypeScript · 2023',
    label: 'Markdown-first content management running on Cloudflare Workers and D1. Presently powers three of the artist\'s sites. Medium: serverless functions and a SQLite database at the edge.' },
  { id: 'a3', x: 500, y: 280, w: 140, h: 14, room: 'A', shape: 'frame', swatch: '#5a2a2a',
    title: 'KCODES.ME / NEWS', year: 'Cloudflare · 2025',
    label: 'A satirical newsroom styled after a small-town American paper circa 1992. Articles are drafted by a language model under editorial constraint. The slant is described as "skeptical."' },
  { id: 'a4', x: 800, y: 240, w: 60, h: 60, room: 'A', shape: 'plinth', swatch: '#3a5a3a',
    title: 'LIKWID', year: 'TypeScript · 2024',
    label: 'A two-dimensional Navier-Stokes fluid simulation rendered as ASCII art in the terminal. Updates at sixty frames per second on a commodity laptop. Source code unadvisable.' },

  // Gallery B
  { id: 'b1', x: 500, y: 560, w: 60, h: 60, room: 'B', shape: 'plinth', swatch: '#88a8c8',
    title: 'UNTITLED, 2019', year: 'Analog photograph',
    label: 'Portra 400, pushed one stop. A parking lot at dusk. The artist has said only: "Nothing happened here."' },
  { id: 'b2', x: 700, y: 560, w: 60, h: 60, room: 'B', shape: 'plinth', swatch: '#a88860',
    title: 'ROLL 22, FRAME 4', year: 'Analog photograph',
    label: 'A dog, out of focus. The photograph is widely considered unsuccessful, including by the artist, who has nevertheless continued to include it in every exhibition since.' },
  { id: 'b3', x: 500, y: 720, w: 160, h: 14, room: 'B', shape: 'frame', swatch: '#3a5050',
    title: 'RALEIGH, 4AM', year: 'Analog photograph',
    label: 'The view from a kitchen window at four in the morning on a Tuesday. Coffee had been made but not drunk. A refrigerator was humming, reportedly, in the key of D.' },
  { id: 'b4', x: 760, y: 680, w: 14, h: 100, room: 'B', shape: 'frame', swatch: '#8a3838',
    title: 'ROLL 14, FRAME 11', year: 'Analog photograph',
    label: 'Early morning, Raleigh, 2024. The artist arrived before his subject. No subject arrived. The photograph is of the place where the subject was not.' },

  // Gallery C (mid)
  { id: 'c1', x: 960, y: 560, w: 80, h: 80, room: 'C', shape: 'sculpture', swatch: '#7a5a8a',
    title: 'CAPSULE (MACHINE 7K)', year: 'Mixed media · 2025',
    label: 'A functioning plastic capsule retrieved from a fictional vending machine. The contents are a single handwritten line which varies between viewings. Visitors are asked not to shake the capsule.' },
  { id: 'c2', x: 1080, y: 640, w: 70, h: 70, room: 'C', shape: 'plinth', swatch: '#b8985a',
    title: 'RECEIPT', year: 'Found object · 2019',
    label: 'A receipt from a Wendy\'s drive-through, dated 11:47 PM. Two Jr. Bacon Cheeseburgers, one small Frosty. Total: $8.47. Discovered by the artist in a jacket pocket in 2023.' },

  // Gift shop
  { id: 'g1', x: 1240, y: 120, w: 80, h: 40, room: 'SHOP', shape: 'bench', swatch: '#b8c8d8',
    title: 'POSTCARD SET', year: '8 for $12 · Available',
    label: 'A set of eight postcards depicting works from the permanent collection. Printed in Durham, NC on recycled stock. Pen not included.' },
  { id: 'g2', x: 1240, y: 240, w: 80, h: 40, room: 'SHOP', shape: 'bench', swatch: '#d8b8a8',
    title: 'TOTE BAG', year: '$22 · Sold out',
    label: 'A 100% cotton tote bag printed with the phrase "SHIP IT RAW" in Helvetica. Currently sold out at all locations. A restock is not planned.' },
  { id: 'g3', x: 1240, y: 360, w: 80, h: 40, room: 'SHOP', shape: 'bench', swatch: '#a8d8b8',
    title: 'EXHIBITION CATALOG', year: '$35 · Available',
    label: 'A 180-page hardcover catalog with color plates and critical essays by three writers the artist has not personally met. Ships in four to six weeks.' },
  { id: 'g4', x: 1240, y: 500, w: 80, h: 40, room: 'SHOP', shape: 'bench', swatch: '#c8a8d8',
    title: 'THE GOOSE', year: '$145 · 1 in stock',
    label: 'A resin figurine of the Duck Lang compiler goose, produced in a limited run of fifty. Hand-painted. Judgmental. Staff advise against making eye contact.' },
];

const DOCENT = { x: 180, y: 500, dialog: 'Welcome. Use WASD or the arrow keys. Stand near any piece to read its label. The galleries close at 5. Please do not touch the goose in the gift shop.' };

function rectsOverlap(a: Rect, b: Rect) {
  return !(a.x + a.w <= b.x || a.x >= b.x + b.w || a.y + a.h <= b.y || a.y >= b.y + b.h);
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export default function E5Museum() {
  const [pos, setPos] = useState({ x: 180, y: 220 });
  const keysRef = useRef<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [viewSize, setViewSize] = useState({ w: 1000, h: 600 });

  // Nearest exhibit
  const nearest = EXHIBITS.reduce<{ e: Exhibit; d: number } | null>((best, e) => {
    const ex = e.x + e.w / 2;
    const ey = e.y + e.h / 2;
    const d = dist(pos.x, pos.y, ex, ey);
    if (d < PLAQUE_RADIUS && (!best || d < best.d)) return { e, d };
    return best;
  }, null);

  const nearDocent = dist(pos.x, pos.y, DOCENT.x, DOCENT.y) < 70;

  const tryMove = useCallback((nx: number, ny: number) => {
    const hb: Rect = { x: nx - PLAYER_R, y: ny - PLAYER_R, w: PLAYER_R * 2, h: PLAYER_R * 2 };
    for (const w of WALLS) if (rectsOverlap(hb, w)) return false;
    for (const e of EXHIBITS) if (rectsOverlap(hb, { x: e.x, y: e.y, w: e.w, h: e.h })) return false;
    return true;
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = true; if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase())) e.preventDefault(); };
    const up = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setViewSize({ w: rect.width, h: rect.height });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      let dx = 0, dy = 0;
      const k = keysRef.current;
      if (k['w'] || k['arrowup']) dy -= 1;
      if (k['s'] || k['arrowdown']) dy += 1;
      if (k['a'] || k['arrowleft']) dx -= 1;
      if (k['d'] || k['arrowright']) dx += 1;
      if (dx !== 0 || dy !== 0) {
        const mag = Math.hypot(dx, dy);
        dx = (dx / mag) * SPEED;
        dy = (dy / mag) * SPEED;
        setPos(p => {
          let nx = p.x + dx;
          let ny = p.y + dy;
          if (!tryMove(nx, p.y)) nx = p.x;
          if (!tryMove(nx, ny)) ny = p.y;
          return { x: nx, y: ny };
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tryMove]);

  useEffect(() => {
    const ox = Math.max(0, Math.min(WORLD_W - viewSize.w, pos.x - viewSize.w / 2));
    const oy = Math.max(0, Math.min(WORLD_H - viewSize.h, pos.y - viewSize.h / 2));
    setCameraOffset({ x: ox, y: oy });
  }, [pos, viewSize]);

  return (
    <div style={{
      height: '100vh',
      background: '#1a1612',
      color: '#d8d0c0',
      fontFamily: '"EB Garamond", Georgia, "Times New Roman", serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Museum header */}
      <header style={{
        padding: '0.6rem 1.5rem',
        background: '#0e0c0a',
        borderBottom: '1px solid #2a2620',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#8a7e60' }}>THE KCODES COLLECTION · EST. MMXIX</div>
          <div style={{ fontSize: '1.2rem', fontFamily: '"EB Garamond", Georgia, serif', fontWeight: 400, letterSpacing: '0.05em' }}>Permanent Exhibit · West Wing</div>
        </div>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8a7e60' }}>
          WASD / ARROWS TO WALK · APPROACH WORKS FOR LABELS
        </div>
      </header>

      {/* Gallery viewport */}
      <div ref={containerRef} style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}>
        {/* Scrolled world */}
        <div style={{
          position: 'absolute',
          transform: `translate(${-cameraOffset.x}px, ${-cameraOffset.y}px)`,
          width: WORLD_W,
          height: WORLD_H,
        }}>
          {/* Floor */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              repeating-linear-gradient(90deg, transparent 0 119px, rgba(40,28,16,0.45) 119px 120px),
              repeating-linear-gradient(0deg, transparent 0 79px, rgba(40,28,16,0.25) 79px 80px),
              linear-gradient(180deg, #58422a 0%, #3e2e1c 100%)`,
          }} />

          {/* Room labels painted on floor */}
          <div style={{ position: 'absolute', top: 40, left: 120, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(255,240,200,0.12)', fontWeight: 700 }}>ENTRANCE</div>
          <div style={{ position: 'absolute', top: 40, left: 520, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(255,240,200,0.12)', fontWeight: 700 }}>GALLERY A · WORKS</div>
          <div style={{ position: 'absolute', top: 480, left: 520, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(255,240,200,0.12)', fontWeight: 700 }}>GALLERY B · PHOTOGRAPHS</div>
          <div style={{ position: 'absolute', top: 480, left: 930, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(255,240,200,0.12)', fontWeight: 700 }}>GALLERY C · ARTIFACTS</div>
          <div style={{ position: 'absolute', top: 40, left: 1230, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(255,240,200,0.12)', fontWeight: 700 }}>GIFT SHOP</div>

          {/* Walls */}
          {WALLS.map((w, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: w.x, top: w.y, width: w.w, height: w.h,
              background: 'linear-gradient(180deg, #e8dfc6 0%, #c8bda0 100%)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            }} />
          ))}

          {/* Exhibits */}
          {EXHIBITS.map(e => {
            const isFrame = e.shape === 'frame';
            const isSculpture = e.shape === 'sculpture';
            const isBench = e.shape === 'bench';
            return (
              <div key={e.id} style={{ position: 'absolute', left: e.x, top: e.y }}>
                {/* shadow */}
                <div style={{
                  position: 'absolute', inset: '-2px',
                  width: e.w + 4, height: e.h + 4,
                  background: 'rgba(0,0,0,0.5)', filter: 'blur(4px)',
                  borderRadius: isSculpture ? '50%' : '2px',
                }} />
                {/* piece */}
                <div style={{
                  position: 'relative',
                  width: e.w, height: e.h,
                  background: isFrame
                    ? `linear-gradient(180deg, #3a2a1a 0%, #1a1008 100%)`
                    : isBench
                      ? `linear-gradient(180deg, ${e.swatch} 0%, ${e.swatch}88 100%)`
                      : `linear-gradient(180deg, #2a2018 0%, #120a04 100%)`,
                  borderRadius: isSculpture ? '50%' : '1px',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {isFrame && (
                    <div style={{
                      position: 'absolute', inset: 3,
                      background: e.swatch,
                      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
                    }} />
                  )}
                  {!isFrame && !isBench && e.swatch && (
                    <div style={{
                      width: '60%', height: '60%',
                      background: e.swatch,
                      borderRadius: isSculpture ? '50%' : '1px',
                      boxShadow: '0 0 16px rgba(255,220,160,0.2)',
                    }} />
                  )}
                </div>
              </div>
            );
          })}

          {/* Velvet ropes around gallery A (example) */}
          {[[490, 100], [570, 100], [490, 200], [570, 200]].map(([x, y], i) => (
            <div key={i} style={{
              position: 'absolute', left: x, top: y,
              width: '8px', height: '8px',
              background: 'linear-gradient(180deg, #b89058 0%, #5a4020 100%)',
              borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
            }} />
          ))}

          {/* Docent */}
          <div style={{
            position: 'absolute',
            left: DOCENT.x - 10, top: DOCENT.y - 14,
            width: 20, height: 28,
          }}>
            <div style={{ width: 20, height: 20, background: '#2a2a2a', borderRadius: '3px 3px 0 0', boxShadow: '0 2px 4px rgba(0,0,0,0.6)' }} />
            <div style={{ width: 20, height: 8, background: '#1a1a1a', borderRadius: '0 0 3px 3px' }} />
            <div style={{
              position: 'absolute', top: -6, left: 3, width: 14, height: 14,
              background: '#d8b898', borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
            }} />
          </div>

          {/* Player */}
          <div style={{
            position: 'absolute',
            left: pos.x - PLAYER_R, top: pos.y - PLAYER_R - 6,
            width: PLAYER_R * 2, height: PLAYER_R * 2 + 6,
          }}>
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              width: PLAYER_R * 2, height: PLAYER_R * 2,
              background: '#a85030', borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.7)',
            }} />
            <div style={{
              position: 'absolute', bottom: PLAYER_R * 1.4, left: 3,
              width: PLAYER_R * 2 - 6, height: PLAYER_R * 2 - 6,
              background: '#d8b898', borderRadius: '50%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }} />
          </div>

          {/* Ground shadow under player */}
          <div style={{
            position: 'absolute',
            left: pos.x - 12, top: pos.y + 6,
            width: 24, height: 6,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
        </div>

        {/* HUD minimap */}
        <div style={{
          position: 'absolute',
          top: 10, right: 10,
          width: 180, height: 115,
          background: 'rgba(10,8,6,0.85)',
          border: '1px solid #3a2e1c',
          padding: '6px',
        }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8a7e60', marginBottom: '2px' }}>FLOOR PLAN</div>
          <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} style={{ width: '100%', height: 'calc(100% - 12px)' }}>
            <rect x="0" y="0" width={WORLD_W} height={WORLD_H} fill="#1a1612" />
            {WALLS.map((w, i) => <rect key={i} x={w.x} y={w.y} width={w.w} height={w.h} fill="#6a5a40" />)}
            {EXHIBITS.map(e => <rect key={e.id} x={e.x} y={e.y} width={e.w} height={e.h} fill={e.swatch || '#aaa'} opacity={0.7} />)}
            <circle cx={pos.x} cy={pos.y} r="30" fill="#a85030" />
          </svg>
        </div>

        {/* Plaque overlay when near exhibit */}
        {nearest && (
          <div style={{
            position: 'absolute',
            left: '50%', bottom: '2rem',
            transform: 'translateX(-50%)',
            width: 'min(600px, 90%)',
            background: '#f0e4c8',
            color: '#1a1008',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px #7a6548, inset 0 0 0 1px rgba(255,255,255,0.4)',
            fontFamily: '"EB Garamond", Georgia, serif',
          }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#5a4020', marginBottom: '0.3rem' }}>
              GALLERY {nearest.e.room} · ACC.NO. {nearest.e.id.toUpperCase()}.26
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '0.15rem' }}>
              {nearest.e.title}
            </div>
            <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#5a4020', marginBottom: '0.6rem' }}>
              {nearest.e.year}
            </div>
            <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#2a1a08' }}>
              {nearest.e.label}
            </div>
          </div>
        )}

        {/* Docent dialog */}
        {nearDocent && !nearest && (
          <div style={{
            position: 'absolute',
            left: 100, top: 380,
            maxWidth: '320px',
            background: '#faf6ec',
            color: '#1a1008',
            padding: '0.75rem 1rem',
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            border: '1px solid #3a2e1c',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#5a4020', marginBottom: '0.3rem' }}>DOCENT — MARGARET</div>
            "{DOCENT.dialog}"
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <footer style={{
        padding: '0.5rem 1.5rem',
        background: '#0e0c0a',
        borderTop: '1px solid #2a2620',
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        color: '#8a7e60',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <a href="/" style={{ color: '#c8a876', textDecoration: 'none' }}>← EXIT</a>
        <span>ADMISSION: FREE · WITH DONATION SUGGESTED</span>
      </footer>
    </div>
  );
}
