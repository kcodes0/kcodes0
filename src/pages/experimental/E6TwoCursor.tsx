import { useState, useEffect, useRef, useCallback } from 'react';

type Panel = {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
  unlocked: boolean;
};

const INITIAL_PANELS: Panel[] = [
  { id: 'p1', title: 'THE FIRST SEAL', content: 'I built this site, but I only finish it if someone else reads it at the same time as me. Most pages you visit are alone. This one is not.', x: 20, y: 18, unlocked: false },
  { id: 'p2', title: 'ABOUT', content: 'Jason, creative developer. Self-taught. Builds small things. Ships rough. Prefers things you can hold: film, books, records, printed zines.', x: 62, y: 18, unlocked: false },
  { id: 'p3', title: 'CURRENT WORK', content: 'Duck Lang v0.4 (Rust). A satirical newsroom. A content management system on CF Workers. This site, which is somehow also a small art project.', x: 20, y: 52, unlocked: false },
  { id: 'p4', title: 'ELSEWHERE', content: 'kcodes.me — the main site. blog.kcodes.me — longer pieces. github.com/kcodes0 — code. This is the only version of me that asks for a witness.', x: 62, y: 52, unlocked: false },
];

const MESSAGES_TO_OTHER = [
  'hi. thanks for being here.',
  'no — the other one is me. you are the one on the left.',
  'we only have to agree once. one click, together.',
  'i can see your cursor. i think you can see mine.',
];

const FAKE_VISITOR_NAMES = ['visitor 1a14', 'k.m.', 'anon-0042', 'someone', 'guest-7730'];

export default function E6TwoCursor() {
  const [phase, setPhase] = useState<'waiting' | 'connected' | 'revealed' | 'ended'>('waiting');
  const [panels, setPanels] = useState<Panel[]>(INITIAL_PANELS);
  const [waitSeconds, setWaitSeconds] = useState(0);
  const [myPos, setMyPos] = useState({ x: 50, y: 50 });
  const [otherPos, setOtherPos] = useState({ x: 30, y: 30 });
  const [otherTarget, setOtherTarget] = useState({ x: 30, y: 30 });
  const [visitorName] = useState(() => FAKE_VISITOR_NAMES[Math.floor(Math.random() * FAKE_VISITOR_NAMES.length)] ?? 'visitor');
  const [message, setMessage] = useState('');
  const [hoveringPanel, setHoveringPanel] = useState<string | null>(null);
  const [otherHoveringPanel, setOtherHoveringPanel] = useState<string | null>(null);
  const [pendingUnlock, setPendingUnlock] = useState<{ id: string; t: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  // Wait timer
  useEffect(() => {
    if (phase !== 'waiting') return;
    const id = setInterval(() => setWaitSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === 'waiting' && waitSeconds >= 7) {
      setPhase('connected');
      setMessage(MESSAGES_TO_OTHER[0] ?? '');
      setTimeout(() => setMessage(MESSAGES_TO_OTHER[1] ?? ''), 4800);
      setTimeout(() => setMessage(MESSAGES_TO_OTHER[2] ?? ''), 9200);
      setTimeout(() => setMessage(MESSAGES_TO_OTHER[3] ?? ''), 14000);
      setTimeout(() => setMessage(''), 19000);
    }
  }, [waitSeconds, phase]);

  // Track mouse in percent
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!areaRef.current) return;
      const rect = areaRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMyPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  // Simulated other cursor: moves toward targets, occasionally hovers a panel
  useEffect(() => {
    if (phase === 'waiting') return;
    let raf = 0;
    const tick = () => {
      setOtherPos(p => {
        const dx = otherTarget.x - p.x;
        const dy = otherTarget.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.5) return p;
        const step = Math.min(0.9, d * 0.04);
        return { x: p.x + (dx / d) * step, y: p.y + (dy / d) * step };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, otherTarget]);

  // Pick new target for the other cursor at intervals
  useEffect(() => {
    if (phase === 'waiting') return;
    const pick = () => {
      // 60% of the time, target a panel (prefer same as mine 40% of those)
      const lockedPanels = panels.filter(p => !p.unlocked);
      if (lockedPanels.length === 0) {
        setOtherTarget({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 });
        return;
      }
      if (Math.random() < 0.6) {
        let target: Panel | undefined = lockedPanels[Math.floor(Math.random() * lockedPanels.length)];
        if (hoveringPanel && Math.random() < 0.45) {
          target = panels.find(p => p.id === hoveringPanel) || target;
        }
        if (target) setOtherTarget({ x: target.x + 12, y: target.y + 10 });
      } else {
        setOtherTarget({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 });
      }
    };
    pick();
    const id = setInterval(pick, 2400 + Math.random() * 1800);
    return () => clearInterval(id);
  }, [phase, hoveringPanel, panels]);

  // Detect what the other cursor is "hovering"
  useEffect(() => {
    if (phase === 'waiting') { setOtherHoveringPanel(null); return; }
    const inside = panels.find(p =>
      otherPos.x >= p.x && otherPos.x <= p.x + 30 &&
      otherPos.y >= p.y && otherPos.y <= p.y + 24 &&
      !p.unlocked
    );
    setOtherHoveringPanel(inside?.id || null);
  }, [otherPos, panels, phase]);

  // When both cursors are on the same panel, arm it; after ~1.2s together, unlock
  useEffect(() => {
    if (phase !== 'connected') return;
    if (hoveringPanel && hoveringPanel === otherHoveringPanel) {
      if (!pendingUnlock || pendingUnlock.id !== hoveringPanel) {
        setPendingUnlock({ id: hoveringPanel, t: Date.now() });
      } else if (Date.now() - pendingUnlock.t > 1200) {
        setPanels(ps => ps.map(p => p.id === hoveringPanel ? { ...p, unlocked: true } : p));
        setPendingUnlock(null);
      }
    } else if (pendingUnlock) {
      setPendingUnlock(null);
    }
  }, [hoveringPanel, otherHoveringPanel, phase, pendingUnlock]);

  // Detect when all panels unlocked
  useEffect(() => {
    if (phase === 'connected' && panels.every(p => p.unlocked)) {
      setTimeout(() => setPhase('revealed'), 800);
    }
  }, [panels, phase]);

  const enterPanel = useCallback((id: string) => setHoveringPanel(id), []);
  const leavePanel = useCallback(() => setHoveringPanel(null), []);

  return (
    <div ref={areaRef} style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0c',
      color: '#c8c8d0',
      fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
      cursor: 'none',
    }}>
      {/* Breathing dot matrix background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(200,200,220,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: phase === 'waiting' ? 0.4 : 0.7,
        transition: 'opacity 1.5s',
      }} />

      {phase === 'waiting' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            color: '#5a5a68',
            marginBottom: '2rem',
          }}>
            THIS SITE REQUIRES TWO VISITORS
          </div>
          <div style={{
            fontSize: '2.1rem',
            fontWeight: 200,
            color: '#a8a8c0',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
          }}>
            waiting for someone else<DotPulse />
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#5a5a68',
            letterSpacing: '0.1em',
            lineHeight: 1.7,
            maxWidth: '420px',
          }}>
            the content is sealed until a second visitor joins. you can keep this tab open. or you can come back later. or you can send someone the link.
          </div>
          <div style={{
            marginTop: '3rem',
            fontSize: '0.65rem',
            color: '#3a3a48',
            letterSpacing: '0.25em',
            fontVariantNumeric: 'tabular-nums',
          }}>
            1 PRESENT · {waitSeconds.toString().padStart(2, '0')}s ELAPSED
          </div>
          <div style={{
            marginTop: '2.5rem',
            display: 'flex',
            gap: '0.4rem',
            alignItems: 'center',
          }}>
            <Signal filled={true} />
            <Signal filled={false} />
          </div>
        </div>
      )}

      {phase !== 'waiting' && (
        <>
          {/* Status bar */}
          <div style={{
            position: 'absolute', top: '1rem', left: 0, right: 0,
            textAlign: 'center',
            fontSize: '0.65rem', letterSpacing: '0.3em',
            color: '#6a8aa0',
            zIndex: 4,
          }}>
            · CONNECTED · 2 PRESENT · {visitorName} JOINED ·
          </div>

          {/* Floating message */}
          {message && (
            <div style={{
              position: 'absolute',
              top: '3rem', left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.9rem',
              color: '#c0d0e0',
              letterSpacing: '0.04em',
              background: 'rgba(10,12,18,0.85)',
              padding: '0.5rem 1.2rem',
              border: '1px solid rgba(120,140,180,0.2)',
              borderRadius: '2px',
              zIndex: 4,
              fontStyle: 'italic',
            }}>
              {message}
            </div>
          )}

          {/* Panels */}
          {panels.map(panel => {
            const activeTogether = hoveringPanel === panel.id && otherHoveringPanel === panel.id && !panel.unlocked;
            const pendingProgress = pendingUnlock?.id === panel.id ? Math.min(1, (Date.now() - pendingUnlock.t) / 1200) : 0;
            return (
              <div
                key={panel.id}
                onMouseEnter={() => enterPanel(panel.id)}
                onMouseLeave={leavePanel}
                style={{
                  position: 'absolute',
                  left: `${panel.x}%`, top: `${panel.y}%`,
                  width: '30%', minHeight: '24%',
                  padding: '1.25rem 1.4rem',
                  background: panel.unlocked ? 'rgba(24,32,44,0.85)' : 'rgba(18,18,24,0.6)',
                  border: `1px solid ${panel.unlocked ? 'rgba(160,200,240,0.45)' : activeTogether ? 'rgba(200,220,255,0.8)' : 'rgba(100,110,140,0.2)'}`,
                  transition: 'background 0.4s, border-color 0.3s',
                  zIndex: 2,
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  color: panel.unlocked ? '#8aa8c8' : '#4a4a58',
                  marginBottom: '0.6rem',
                }}>
                  {panel.unlocked ? '● UNSEALED' : activeTogether ? '◐ AGREEING...' : '○ SEALED'}
                </div>
                <div style={{
                  fontSize: panel.unlocked ? '0.85rem' : '1.1rem',
                  fontWeight: panel.unlocked ? 400 : 200,
                  lineHeight: 1.55,
                  color: panel.unlocked ? '#d8dce4' : '#4a4a58',
                  letterSpacing: panel.unlocked ? '0.01em' : '0.15em',
                  transition: 'all 0.4s',
                }}>
                  {panel.unlocked ? (
                    <>
                      <div style={{ fontSize: '0.7rem', color: '#8aa8c8', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>{panel.title}</div>
                      {panel.content}
                    </>
                  ) : (
                    <>
                      {panel.title}
                      <div style={{ fontSize: '0.65rem', color: '#3a3a48', marginTop: '0.75rem', letterSpacing: '0.15em', fontWeight: 400 }}>
                        REQUIRES TWO CURSORS
                      </div>
                    </>
                  )}
                </div>
                {activeTogether && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #6aa8ff, #c8d8ff)',
                    width: `${pendingProgress * 100}%`,
                    transition: 'width 0.1s linear',
                  }} />
                )}
              </div>
            );
          })}

          {/* Connection line between cursors */}
          <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%', zIndex: 3 }}>
            <line
              x1={`${myPos.x}%`} y1={`${myPos.y}%`}
              x2={`${otherPos.x}%`} y2={`${otherPos.y}%`}
              stroke={pendingUnlock ? '#c8d8ff' : 'rgba(120,140,180,0.25)'}
              strokeWidth={pendingUnlock ? 1 : 0.5}
              strokeDasharray="3 5"
              opacity={pendingUnlock ? 0.8 : 0.4}
            />
          </svg>
        </>
      )}

      {phase === 'revealed' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,10,14,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5,
          flexDirection: 'column',
        }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#6a8aa0', marginBottom: '2rem' }}>
            EVERY SEAL BROKEN
          </div>
          <div style={{
            fontSize: '1.6rem',
            color: '#d8dce4',
            letterSpacing: '0.04em',
            maxWidth: '520px',
            textAlign: 'center',
            lineHeight: 1.55,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}>
            "thank you. whoever you were, whenever this was."
          </div>
          <div style={{ fontSize: '0.65rem', color: '#4a4a58', letterSpacing: '0.2em', marginTop: '2rem' }}>
            — j.
          </div>
          <a href="/" style={{
            marginTop: '3rem',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: '#8aa8c8',
            textDecoration: 'none',
            border: '1px solid #3a3a48',
            padding: '0.5rem 1.25rem',
          }}>
            ← CLOSE
          </a>
        </div>
      )}

      {/* My cursor */}
      <CursorGlyph x={myPos.x} y={myPos.y} color="#e8ecf4" label="you" pending={!!pendingUnlock && hoveringPanel === pendingUnlock.id} />

      {/* Other cursor */}
      {phase !== 'waiting' && (
        <CursorGlyph x={otherPos.x} y={otherPos.y} color="#6aa8ff" label={visitorName} pending={!!pendingUnlock && otherHoveringPanel === pendingUnlock.id} />
      )}

      <div style={{
        position: 'absolute', bottom: '1rem', left: '1rem',
        fontSize: '0.6rem', color: '#3a3a48', letterSpacing: '0.2em',
      }}>
        <a href="/" style={{ color: '#5a5a68', textDecoration: 'none' }}>← LEAVE</a>
      </div>
    </div>
  );
}

function DotPulse() {
  const [d, setD] = useState('.');
  useEffect(() => {
    const id = setInterval(() => setD(s => s.length >= 3 ? '.' : s + '.'), 500);
    return () => clearInterval(id);
  }, []);
  return <span style={{ display: 'inline-block', width: '3ch', textAlign: 'left' }}>{d}</span>;
}

function Signal({ filled }: { filled: boolean }) {
  return (
    <div style={{
      width: '10px', height: '10px',
      borderRadius: '50%',
      background: filled ? '#a8a8c0' : 'transparent',
      border: '1px solid ' + (filled ? '#a8a8c0' : '#3a3a48'),
      animation: filled ? 'none' : 'pulse 1.8s ease-in-out infinite',
    }} />
  );
}

function CursorGlyph({ x, y, color, label, pending }: { x: number; y: number; color: string; label: string; pending: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      pointerEvents: 'none',
      zIndex: 10,
      transform: 'translate(-1px, -1px)',
    }}>
      <svg width="16" height="20" viewBox="0 0 16 20">
        <path d="M1 1 L1 15 L5 11 L7 16 L10 14 L7 9 L13 8 Z"
          fill={color}
          stroke="#0a0a0c"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '14px',
        fontSize: '0.55rem',
        color: color,
        background: 'rgba(10,12,18,0.7)',
        padding: '1px 6px',
        letterSpacing: '0.12em',
        whiteSpace: 'nowrap',
        border: `1px solid ${color}33`,
      }}>
        {label}{pending ? ' ◐' : ''}
      </div>
    </div>
  );
}
