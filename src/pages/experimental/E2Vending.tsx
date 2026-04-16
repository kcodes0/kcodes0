import { useState, useEffect, useMemo } from 'react';

type SlotState = 'stocked' | 'sold_out' | 'jammed';
type Capsule = {
  code: string;
  title: string;
  body: string;
  kind: 'project' | 'thought' | 'photo' | 'rant' | 'artifact';
};

const COLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const CAPSULES: Record<string, Capsule> = {
  A1: { code: 'A1', kind: 'project', title: 'Duck Lang', body: 'A programming language where you must type "quack" to compile. The goose grades your code 1 to 10. Written in Rust, currently at v0.3.1.' },
  A4: { code: 'A4', kind: 'thought', title: 'thought #0042', body: 'every portfolio site looks the same because every designer reads the same three blogs. the only way out is to not read anything for six months.' },
  B2: { code: 'B2', kind: 'project', title: 'kcodes.me/news', body: 'A satirical newsroom built to feel like a real local paper from 1992. Articles by Claude. Editorial slant: skeptical.' },
  B6: { code: 'B6', kind: 'rant', title: 'on "minimum viable"', body: 'the M in MVP has been silently redefined to mean maximally-protected. everything ships polished now. nothing ships minimum. the whole point was to be embarrassed.' },
  B8: { code: 'B8', kind: 'photo', title: 'roll 14 — frame 11', body: 'Raleigh, early morning. Portra 400 pushed a stop. Uploaded 2024-06-03.' },
  C1: { code: 'C1', kind: 'artifact', title: 'receipt from Wendy\'s', body: 'Order #0043 — 2 Jr Bacon Cheeseburgers, 1 small Frosty. $8.47. 11:47 PM. Found in a jacket pocket from 2019.' },
  C3: { code: 'C3', kind: 'project', title: 'Blog CMS', body: 'Markdown-first content on Cloudflare Workers + D1. Fast, minimal, no bloat. Currently powers three of my sites.' },
  C7: { code: 'C7', kind: 'thought', title: 'thought #0088', body: 'the best part of the internet was when your homepage had a hit counter and you were genuinely excited at 300.' },
  D2: { code: 'D2', kind: 'rant', title: 'on CSS frameworks', body: 'tailwind is a crutch and it is a really good crutch. some people need crutches. that\'s fine. stop pretending the crutch is a leg.' },
  D5: { code: 'D5', kind: 'project', title: 'LIKWID', body: 'ASCII art fluid simulation you can run in your terminal. 2D Navier-Stokes on a character grid. Don\'t read the source.' },
  D9: { code: 'D9', kind: 'artifact', title: 'a midi file', body: 'composed at 2:11 AM on a laptop speaker. 14 bars. minor key. never finished. probably never will be.' },
  E1: { code: 'E1', kind: 'photo', title: 'roll 09 — frame 23', body: 'A parking lot at dusk. Nothing happened here. Portra 800. 2023.' },
  E4: { code: 'E4', kind: 'thought', title: 'thought #0121', body: 'if you can\'t describe your project in one sentence, you are still working on figuring out what it is. that\'s fine. don\'t ship it yet.' },
  E7: { code: 'E7', kind: 'project', title: 'c-lion-api', body: 'A Cloudflare Worker that proxies anthropic with strict per-key quotas. Currently running in prod for three internal tools.' },
  F2: { code: 'F2', kind: 'rant', title: 'on AI-generated sites', body: 'you can always tell. the gradients are too smooth. the headings are too confident. there is a cursor blob somewhere. a section titled "why choose us" you didn\'t write.' },
  F5: { code: 'F5', kind: 'artifact', title: 'handwritten note', body: '"call mom back. finish duck lang parser. buy salt." — found taped to a monitor, undated.' },
  F8: { code: 'F8', kind: 'project', title: 'claude-faqs', body: 'a small corner of the internet answering the same three questions about Claude Code over and over, in a more honest voice.' },
  G3: { code: 'G3', kind: 'thought', title: 'thought #0137', body: 'the computer does not know what you are trying to do. it is trying its best. be nicer to it.' },
  G6: { code: 'G6', kind: 'photo', title: 'roll 22 — frame 4', body: 'a dog, out of focus. the photo is bad. i love it.' },
  H1: { code: 'H1', kind: 'artifact', title: 'the big plan', body: 'one day i will have thirty small tools, each doing one thing. i will not charge for any of them. this is the whole plan.' },
  H4: { code: 'H4', kind: 'rant', title: 'on "designer-developer"', body: 'you are either willing to move the semicolon or you are not. the hyphen is doing a lot of work and it is lying.' },
  H9: { code: 'H9', kind: 'thought', title: 'thought #0203', body: 'i don\'t want to build an app. i want to build a room.' },
};

const SOLD_OUT = new Set(['A2', 'A7', 'B4', 'C5', 'D7', 'E3', 'E8', 'F1', 'G1', 'G8', 'H6']);
const JAMMED = new Set(['A9', 'C8', 'F6', 'H2']);

function kindBadge(kind: Capsule['kind']): { label: string; bg: string; fg: string } {
  switch (kind) {
    case 'project': return { label: 'PROJECT', bg: '#1a4d2e', fg: '#8ee4a7' };
    case 'thought': return { label: 'THOUGHT', bg: '#2d3748', fg: '#a3bffa' };
    case 'photo': return { label: 'PHOTO', bg: '#4a3a22', fg: '#ffcb6b' };
    case 'rant': return { label: 'RANT', bg: '#4a2626', fg: '#ff8a80' };
    case 'artifact': return { label: 'ARTIFACT', bg: '#3a2e4a', fg: '#d0a9f5' };
  }
}

export default function E2Vending() {
  const [display, setDisplay] = useState('');
  const [dispensed, setDispensed] = useState<Capsule | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [vending, setVending] = useState(false);
  const [coils, setCoils] = useState<Record<string, boolean>>({});

  const slotState = useMemo(() => {
    const m: Record<string, SlotState> = {};
    for (const r of ROWS) for (const c of COLS) {
      const k = `${r}${c}`;
      if (SOLD_OUT.has(k)) m[k] = 'sold_out';
      else if (JAMMED.has(k)) m[k] = 'jammed';
      else m[k] = 'stocked';
    }
    return m;
  }, []);

  const press = (ch: string) => {
    if (vending) return;
    setErrMsg('');
    if (ch === 'CLEAR') { setDisplay(''); return; }
    if (ch === 'VEND') {
      if (display.length !== 2) { setErrMsg('ENTER A CODE'); return; }
      const state = slotState[display];
      if (!state) { setErrMsg('INVALID SLOT'); return; }
      if (state === 'sold_out') { setErrMsg('SOLD OUT'); return; }
      if (state === 'jammed') { setErrMsg('OUT OF ORDER'); return; }
      setCoils(c => ({ ...c, [display]: true }));
      setVending(true);
      setTimeout(() => {
        const cap = CAPSULES[display];
        setDispensed(cap || { code: display, kind: 'artifact', title: 'mystery capsule', body: 'empty. the mechanism whirred but nothing came out. file a complaint with the operator.' });
        setVending(false);
        setCoils({});
        setDisplay('');
      }, 1600);
      return;
    }
    if (display.length >= 2) return;
    setDisplay(d => d + ch);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (/^[A-H]$/.test(k) && display.length === 0) press(k);
      else if (/^[1-9]$/.test(k) && display.length === 1) press(k);
      else if (e.key === 'Enter') press('VEND');
      else if (e.key === 'Escape' || e.key === 'Backspace') {
        if (dispensed) setDispensed(null);
        else press('CLEAR');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #2a2420 0%, #0a0806 70%)',
      color: '#e8dcc0',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '2rem',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes coil-spin { from { transform: rotateZ(0) } to { transform: rotateZ(360deg) } }
        @keyframes capsule-drop {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(340px); opacity: 1; }
          100% { transform: translateY(360px); opacity: 0; }
        }
        @keyframes lcd-flicker { 0%,100% { opacity: 1 } 92% { opacity: 0.88 } 95% { opacity: 1 } }
        .vm-key:active { transform: translateY(1px); box-shadow: inset 0 2px 4px rgba(0,0,0,0.6); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#8a7e60' }}>
        SELF-SERVICE · MODEL 7-K · TYPE CODE AND PRESS VEND
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        maxWidth: '1100px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, #3a342c 0%, #2a2420 50%, #1a1612 100%)',
        padding: '1.25rem',
        borderRadius: '6px',
        border: '2px solid #141210',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {/* Main cabinet — slots behind glass */}
        <div style={{
          flex: '1 1 auto',
          background: '#0b0a08',
          border: '6px solid #1a1612',
          padding: '0.75rem',
          position: 'relative',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)',
        }}>
          {/* Glass reflection */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 40%, transparent 42%, transparent 60%, rgba(255,255,255,0.025) 62%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 10,
          }} />

          {ROWS.map((row, ri) => (
            <div key={row} style={{
              display: 'grid',
              gridTemplateColumns: '1.5rem repeat(9, 1fr)',
              gap: '4px',
              marginBottom: ri === ROWS.length - 1 ? 0 : '6px',
              alignItems: 'stretch',
            }}>
              <div style={{
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: '#8a7e60',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>{row}</div>

              {COLS.map(col => {
                const code = `${row}${col}`;
                const state = slotState[code];
                const cap = CAPSULES[code];
                const isSpinning = coils[code];
                return (
                  <div key={code} style={{
                    position: 'relative',
                    background: state === 'jammed' ? '#2a1810' : '#151310',
                    border: '1px solid #0a0806',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8), inset 0 0 0 1px #322c22',
                    padding: '4px',
                    minHeight: '62px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {/* Coil */}
                    <svg viewBox="0 0 40 40" style={{
                      position: 'absolute',
                      inset: 2,
                      width: 'calc(100% - 4px)',
                      height: 'calc(100% - 4px)',
                      animation: isSpinning ? 'coil-spin 0.4s linear infinite' : 'none',
                      transformOrigin: 'center',
                      opacity: state === 'jammed' ? 0.25 : 0.4,
                    }}>
                      {[...Array(6)].map((_, i) => (
                        <circle key={i} cx="20" cy={7 + i * 5} r="8" fill="none" stroke="#5c4a28" strokeWidth="1.5" />
                      ))}
                    </svg>

                    {/* Item preview */}
                    {state === 'stocked' && cap && (
                      <div style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        margin: '6px auto 0',
                        background: `linear-gradient(180deg, ${kindBadge(cap.kind).fg} 0%, ${kindBadge(cap.kind).bg} 100%)`,
                        border: '1px solid rgba(0,0,0,0.4)',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.5)',
                      }} />
                    )}
                    {state === 'stocked' && !cap && (
                      <div style={{
                        position: 'relative', zIndex: 2, width: '22px', height: '22px', borderRadius: '50%', margin: '6px auto 0',
                        background: 'linear-gradient(180deg, #666 0%, #333 100%)', border: '1px solid rgba(0,0,0,0.4)',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.5)',
                      }} />
                    )}
                    {state === 'sold_out' && (
                      <div style={{
                        position: 'relative', zIndex: 2, fontSize: '0.5rem',
                        color: '#5a4a2a', textAlign: 'center', marginTop: '14px',
                        letterSpacing: '0.1em',
                      }}>SOLD OUT</div>
                    )}
                    {state === 'jammed' && (
                      <div style={{
                        position: 'relative', zIndex: 2, fontSize: '0.55rem',
                        color: '#a06040', textAlign: 'center', marginTop: '14px',
                        letterSpacing: '0.1em',
                      }}>!</div>
                    )}

                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      fontSize: '0.55rem',
                      color: '#8a7e60',
                      textAlign: 'center',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}>{code}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Control panel */}
        <div style={{
          width: '240px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          {/* LCD display */}
          <div style={{
            background: '#141a10',
            border: '2px solid #0a0806',
            padding: '0.75rem 1rem',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
            position: 'relative',
          }}>
            <div style={{ fontSize: '0.55rem', color: '#5a7048', letterSpacing: '0.2em', marginBottom: '0.3rem' }}>SELECT</div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: errMsg ? '#ffb04a' : '#9ac96a',
              letterSpacing: '0.2em',
              textShadow: '0 0 8px currentColor',
              lineHeight: 1,
              minHeight: '2.4rem',
              animation: 'lcd-flicker 3s infinite',
            }}>
              {errMsg || display.padEnd(2, '_')}
            </div>
            {!errMsg && (
              <div style={{ fontSize: '0.55rem', color: '#4a6038', marginTop: '0.4rem', letterSpacing: '0.15em' }}>
                {vending ? 'VENDING...' : display.length === 2 ? 'PRESS VEND' : display.length === 1 ? 'ENTER NUMBER' : 'ENTER LETTER'}
              </div>
            )}
          </div>

          {/* Letter keys */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            {ROWS.map(ch => (
              <button key={ch} className="vm-key" onClick={() => press(ch)} disabled={vending} style={keyStyle(display.length !== 0 || vending)}>{ch}</button>
            ))}
          </div>

          {/* Number keys */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {COLS.map(ch => (
              <button key={ch} className="vm-key" onClick={() => press(ch)} disabled={vending} style={keyStyle(display.length !== 1 || vending)}>{ch}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            <button className="vm-key" onClick={() => press('CLEAR')} disabled={vending} style={{ ...keyStyle(false), background: 'linear-gradient(180deg, #5a3a2a 0%, #3a221a 100%)' }}>CLEAR</button>
            <button className="vm-key" onClick={() => press('VEND')} disabled={vending || display.length !== 2} style={{ ...keyStyle(display.length !== 2 || vending), background: display.length === 2 && !vending ? 'linear-gradient(180deg, #4a7a3a 0%, #2a5a1a 100%)' : 'linear-gradient(180deg, #3a3a2a 0%, #222216 100%)', color: display.length === 2 && !vending ? '#e8f8c0' : '#5a5040' }}>VEND</button>
          </div>

          {/* Coin slot / plaque */}
          <div style={{
            marginTop: '0.4rem',
            padding: '0.75rem 0.5rem',
            border: '1px solid #141210',
            background: '#1a1612',
            fontSize: '0.55rem',
            color: '#6a5e40',
            letterSpacing: '0.15em',
            lineHeight: 1.7,
          }}>
            <div style={{ color: '#8a7e60' }}>NO CHANGE</div>
            <div>CORRECT CODE ONLY</div>
            <div>MACHINE PROPERTY OF</div>
            <div style={{ color: '#b5a878' }}>KCODES VENDING CO.</div>
            <div style={{ marginTop: '0.4em', opacity: 0.6 }}>COMPLAINTS → /</div>
          </div>
        </div>
      </div>

      {/* Tray */}
      <div style={{
        maxWidth: '1100px',
        margin: '1rem auto 0',
        height: '56px',
        background: 'linear-gradient(180deg, #0a0806 0%, #1a1612 100%)',
        border: '2px solid #0a0806',
        borderTop: '1px solid #322c22',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '6px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.5rem',
          color: '#3a3228',
          letterSpacing: '0.3em',
        }}>PUSH UP TO RETRIEVE</div>
      </div>

      {/* Capsule drop modal */}
      {dispensed && (
        <div
          onClick={() => setDispensed(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: '2rem',
          }}>
          <div onClick={e => e.stopPropagation()} style={{
            maxWidth: '480px',
            width: '100%',
            background: 'linear-gradient(180deg, #f0e4c8 0%, #d8c8a0 100%)',
            color: '#2a2420',
            padding: '2rem',
            fontFamily: '"Courier New", Courier, monospace',
            borderRadius: '160px 160px 12px 12px',
            boxShadow: '0 40px 80px -10px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.4)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: '#b8a878',
              borderRadius: '2px',
            }} />
            <div style={{
              fontSize: '0.65rem', letterSpacing: '0.25em', color: '#7a6e50',
              textAlign: 'center', marginTop: '1.5rem', marginBottom: '0.5rem',
            }}>
              SLOT {dispensed.code}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                background: kindBadge(dispensed.kind).bg,
                color: kindBadge(dispensed.kind).fg,
                padding: '0.2em 0.6em',
              }}>
                {kindBadge(dispensed.kind).label}
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 700,
              margin: '0 0 0.75rem',
              textAlign: 'center',
              lineHeight: 1.2,
            }}>
              {dispensed.title}
            </h2>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: '#4a3a20',
              margin: 0,
              fontFamily: 'Georgia, serif',
            }}>
              {dispensed.body}
            </p>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button onClick={() => setDispensed(null)} style={{
                background: 'transparent',
                border: '1px solid #7a6e50',
                color: '#4a3a20',
                padding: '0.5em 1.5em',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                fontFamily: '"Courier New", monospace',
              }}>
                DISCARD & RETURN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Falling capsule animation */}
      {vending && (
        <div style={{
          position: 'fixed',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #f5e8c0, #8a7860)`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          animation: 'capsule-drop 1.5s ease-in forwards',
          zIndex: 50,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'fixed', bottom: '0.8rem', left: '1rem', fontSize: '0.6rem', color: '#5a5040', fontFamily: '"Courier New", monospace' }}>
        <a href="/" style={{ color: '#8a7e60', textDecoration: 'none' }}>← back</a>
      </div>
      <div style={{ position: 'fixed', bottom: '0.8rem', right: '1rem', fontSize: '0.55rem', color: '#5a5040', fontFamily: '"Courier New", monospace', letterSpacing: '0.2em' }}>
        SER# 7K-19994012
      </div>
    </div>
  );
}

function keyStyle(dimmed: boolean): React.CSSProperties {
  return {
    padding: '0.7rem 0',
    background: dimmed ? 'linear-gradient(180deg, #2a2620 0%, #181612 100%)' : 'linear-gradient(180deg, #4a4238 0%, #2a2620 100%)',
    color: dimmed ? '#5a5040' : '#d8c8a0',
    border: '1px solid #0a0806',
    borderTop: '1px solid #5c5448',
    fontFamily: '"Courier New", monospace',
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    cursor: dimmed ? 'default' : 'pointer',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 0 rgba(0,0,0,0.4)',
    transition: 'transform 0.05s',
  };
}
