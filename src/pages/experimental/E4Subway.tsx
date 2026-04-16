import { useState } from 'react';

type Line = {
  id: string;
  name: string;
  color: string;
  desc: string;
  stations: string[];
};

type Station = {
  id: string;
  label: string;
  x: number;
  y: number;
  lines: string[];
  description: string;
  labelPosition?: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  terminus?: boolean;
};

const LINES: Line[] = [
  { id: 'red', name: 'RED LINE', color: '#E4003A', desc: 'Languages learned',
    stations: ['html', 'css', 'js2019', 'py2019', 'ts', 'rust', 'go2022', 'zig', 'present'] },
  { id: 'blue', name: 'BLUE LINE', color: '#0B5FA5', desc: 'Places I have lived',
    stations: ['raleigh', 'durham', 'asheville-brief', 'durham', 'raleigh', 'present'] },
  { id: 'green', name: 'GREEN LINE', color: '#0E8048', desc: 'Projects shipped',
    stations: ['first-blog', 'likwid', 'cms', 'duck-start', 'duck-v1', 'news', 'kcodesv5', 'present'] },
  { id: 'orange', name: 'ORANGE LINE', color: '#E07B1F', desc: 'Obsessions',
    stations: ['ambient', 'film-collecting', 'history', 'film-collecting', 'compilers', 'zines', 'ambient'] },
];

const STATIONS: Station[] = [
  { id: 'start', label: '2019 — start', x: 80, y: 140, lines: ['red'], description: 'The beginning of the line. Writing my first HTML in a Notepad.exe window. No version control. No backups. All the code on the desktop in a folder called "stuff".', terminus: true, labelPosition: 'w' },
  { id: 'html', label: 'HTML', x: 180, y: 140, lines: ['red'], description: 'First public page. A list of films I liked. Broken on mobile. I did not know that was a thing.', labelPosition: 'n' },
  { id: 'css', label: 'CSS', x: 260, y: 140, lines: ['red'], description: 'The first time I centered a div. Took two days. Felt like a god for fifteen minutes.', labelPosition: 'n' },
  { id: 'js2019', label: 'JavaScript', x: 360, y: 140, lines: ['red', 'green'], description: 'jQuery era, briefly. Then vanilla. Then whatever the new thing was every six weeks.', labelPosition: 'n' },
  { id: 'first-blog', label: 'First Blog', x: 360, y: 340, lines: ['green'], description: 'A Hugo blog nobody read. 14 posts. Most of them about discovering something everyone else already knew. Still up, redirects now.', labelPosition: 'w' },
  { id: 'py', label: 'Python', x: 440, y: 140, lines: ['red'], description: 'For scripts. Never for real apps. Never got on with the tooling.', labelPosition: 'n' },
  { id: 'raleigh', label: 'Raleigh', x: 80, y: 260, lines: ['blue'], description: 'Raleigh, NC. Where it started. Still where most of the weight is.', terminus: true, labelPosition: 'w' },
  { id: 'durham1', label: 'Durham', x: 220, y: 260, lines: ['blue'], description: 'Two years in Durham, first stint. The apartment with the window facing the dumpsters. Wrote the CMS here.', labelPosition: 's' },
  { id: 'asheville', label: 'Asheville (brief)', x: 340, y: 260, lines: ['blue'], description: 'Fall 2022. Four months. Thought I was moving for good. Was not.', labelPosition: 's' },
  { id: 'durham2', label: 'Durham again', x: 460, y: 260, lines: ['blue'], description: 'Came back. Same neighborhood. Different apartment. Better window.', labelPosition: 's' },
  { id: 'raleigh2', label: 'Raleigh again', x: 580, y: 260, lines: ['blue'], description: 'Back where I started. Which is and is not the same as staying.', labelPosition: 's' },
  { id: 'ts', label: 'TypeScript', x: 540, y: 140, lines: ['red', 'green'], description: 'Convert point. Daily driver since. Stopped feeling clever about types at some point.', labelPosition: 'n' },
  { id: 'likwid', label: 'LIKWID', x: 540, y: 340, lines: ['green'], description: 'ASCII fluid sim in the terminal. 2D Navier-Stokes on a character grid. Took three weekends. Most of them were weekends.', labelPosition: 'e' },
  { id: 'cms', label: 'Blog CMS', x: 640, y: 340, lines: ['green'], description: 'Markdown-first CMS on Cloudflare Workers + D1. Still runs three of my sites. No framework. One binary, basically.', labelPosition: 'e' },
  { id: 'rust', label: 'Rust', x: 680, y: 140, lines: ['red', 'green'], description: 'The language I keep coming back to. Compile errors that feel like a friend correcting you, instead of a teacher failing you.', labelPosition: 'n' },
  { id: 'duck-start', label: 'Duck Lang (start)', x: 740, y: 340, lines: ['green'], description: 'Started on a Thursday night after two coffees and a complaint about compilers. First commit: 38 lines.', labelPosition: 'e' },
  { id: 'duck', label: 'Duck Lang v0.3', x: 780, y: 260, lines: ['green', 'orange'], description: 'A programming language where you type "quack" to compile. Currently at v0.3.1. The goose has opinions.', labelPosition: 's' },
  { id: 'news', label: 'Satirical Newsroom', x: 820, y: 340, lines: ['green'], description: 'A fake local paper from 1992 that publishes in 2026. Articles written by Claude. Editorial stance: skeptical.', labelPosition: 'e' },
  { id: 'zig', label: 'Zig (briefly)', x: 800, y: 140, lines: ['red'], description: 'Dipped in for a weekend. Impressed. Scared of the manual memory. Came back to Rust.', labelPosition: 'n' },
  { id: 'compilers', label: 'Compilers', x: 880, y: 440, lines: ['orange'], description: 'The reason for Duck Lang. Reading the Dragon Book slowly, one chapter a month.', labelPosition: 'e' },
  { id: 'ambient', label: 'Ambient Music', x: 580, y: 440, lines: ['orange'], description: 'Hours of it per week. Currently: Stars of the Lid, Grouper, a Bandcamp rabbit hole that has no bottom.', labelPosition: 's' },
  { id: 'film', label: 'Film Collecting', x: 680, y: 440, lines: ['orange'], description: 'Criterion on sale, 35mm on eBay, a projector I keep saying I will buy. 400+ films catalogued.', labelPosition: 's' },
  { id: 'history', label: 'History', x: 780, y: 440, lines: ['orange'], description: 'Currently: the history of typography. Previously: early internet culture. Before that: railroad strikes.', labelPosition: 's' },
  { id: 'zines', label: 'Zines', x: 460, y: 440, lines: ['orange'], description: 'Made four. Distributed to no one. Kept in a box. Considering a fifth.', labelPosition: 's' },
  { id: 'present', label: '· YOU ARE HERE ·', x: 900, y: 260, lines: ['red', 'blue', 'green'], description: 'April 16, 2026. Drinking coffee from a mug with a chip in the rim. Writing the site you are reading. Thinking about what to do next.', terminus: true, labelPosition: 'e' },
];

const TRACKS: { line: string; path: string }[] = [
  // RED (top)
  { line: 'red', path: 'M 80 140 L 800 140' },
  // BLUE (middle, horizontal)
  { line: 'blue', path: 'M 80 260 L 580 260' },
  // GREEN (winding through projects)
  { line: 'green', path: 'M 360 140 L 360 340 L 820 340 L 820 260 L 900 260' },
  // ORANGE (bottom obsessions)
  { line: 'orange', path: 'M 460 440 L 880 440 L 880 260 L 780 260' },
  // transfers / verticals
  { line: 'red', path: 'M 900 260 L 900 140 L 810 140' },
  { line: 'blue', path: 'M 580 260 L 900 260' },
];

export default function E4Subway() {
  const [selected, setSelected] = useState<Station | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);

  const isHighlighted = (stationLines: string[]) => highlight == null || stationLines.includes(highlight);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0ece2',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#1a1a1a',
    }}>
      {/* Header bar */}
      <header style={{
        background: '#1a1a1a',
        color: '#f5f0e0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '4px solid #E4003A',
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#c0b098' }}>METROPOLITAN TRANSIT AUTHORITY</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.1rem' }}>JASON METRO — SYSTEM MAP</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c0b098', lineHeight: 1.7 }}>
          <div>REVISION 09 · APR 2026</div>
          <div>26 STATIONS · 4 LINES · 1 OPERATOR</div>
        </div>
      </header>

      {/* Trip planner */}
      <div style={{
        background: '#ffffff',
        padding: '0.7rem 2rem',
        borderBottom: '1px solid #d8d2c2',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
      }}>
        <span style={{ fontWeight: 700, textTransform: 'uppercase', color: '#4a4a4a' }}>Plan a trip:</span>
        <input
          placeholder="FROM (e.g. 2019)"
          style={{
            padding: '0.4rem 0.75rem',
            border: '1px solid #c0b8a8',
            background: '#faf6ec',
            fontFamily: 'inherit',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flex: '1',
            maxWidth: '240px',
          }}
        />
        <span style={{ color: '#888' }}>→</span>
        <input
          placeholder="TO (e.g. PRESENT)"
          style={{
            padding: '0.4rem 0.75rem',
            border: '1px solid #c0b8a8',
            background: '#faf6ec',
            fontFamily: 'inherit',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flex: '1',
            maxWidth: '240px',
          }}
        />
        <button style={{
          padding: '0.45rem 1rem',
          background: '#1a1a1a',
          color: '#f5f0e0',
          border: 'none',
          fontFamily: 'inherit',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          fontWeight: 700,
          cursor: 'pointer',
        }}>ROUTE</button>
        <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#888', fontStyle: 'italic' }}>journey planner · stub</span>
      </div>

      {/* Map */}
      <div style={{
        position: 'relative',
        padding: '1.5rem 2rem',
        overflow: 'auto',
      }}>
        <svg viewBox="0 0 1000 540" style={{
          width: '100%',
          minWidth: '900px',
          height: 'auto',
          maxHeight: 'calc(100vh - 320px)',
          background: '#faf6ec',
          border: '1px solid #d8d2c2',
        }}>
          {/* Graticule */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e8e2d2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="540" fill="url(#grid)" />

          {/* Lines */}
          {TRACKS.map((t, i) => {
            const line = LINES.find(l => l.id === t.line)!;
            const opacity = highlight == null || highlight === t.line ? 1 : 0.18;
            return (
              <g key={i}>
                <path d={t.path} stroke={line.color} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
              </g>
            );
          })}

          {/* Stations */}
          {STATIONS.map(s => {
            const active = isHighlighted(s.lines);
            const isTransfer = s.lines.length > 1;
            const pos = s.labelPosition || 'n';
            const OFFSETS: Record<string, [number, number]> = { n: [0, -18], s: [0, 22], e: [14, 4], w: [-14, 4], ne: [10, -12], nw: [-10, -12], se: [10, 16], sw: [-10, 16] };
            const labelOffset = OFFSETS[pos] || [0, -18];
            const anchor = pos === 'w' || pos === 'nw' || pos === 'sw' ? 'end' : pos === 'e' || pos === 'ne' || pos === 'se' ? 'start' : 'middle';
            return (
              <g key={s.id} style={{ cursor: 'pointer', opacity: active ? 1 : 0.25, transition: 'opacity 0.2s' }} onClick={() => setSelected(s)}>
                {isTransfer ? (
                  <g>
                    <rect x={s.x - 12} y={s.y - 12} width="24" height="24" rx="4" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2.5" />
                    {s.lines.slice(0, 4).map((lid, i) => {
                      const line = LINES.find(l => l.id === lid);
                      if (!line) return null;
                      const cx = s.x - 6 + (i % 2) * 12;
                      const cy = s.y - 6 + Math.floor(i / 2) * 12;
                      return <circle key={lid} cx={cx} cy={cy} r="3" fill={line.color} />;
                    })}
                  </g>
                ) : s.terminus ? (
                  <circle cx={s.x} cy={s.y} r="9" fill="#ffffff" stroke={LINES.find(l => l.id === s.lines[0])!.color} strokeWidth="4" />
                ) : (
                  <circle cx={s.x} cy={s.y} r="5" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2.5" />
                )}
                <text
                  x={s.x + labelOffset[0]}
                  y={s.y + labelOffset[1]}
                  fontSize="10.5"
                  fontWeight="700"
                  fill="#1a1a1a"
                  textAnchor={anchor}
                  style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Compass / decoration */}
          <g transform="translate(920, 500)" fontSize="9" fill="#a09080">
            <text textAnchor="middle" y="-24" fontWeight="700" letterSpacing="0.1em">SCALE</text>
            <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#a09080" strokeWidth="1" />
            <line x1="-30" y1="-13" x2="-30" y2="-7" stroke="#a09080" strokeWidth="1" />
            <line x1="30" y1="-13" x2="30" y2="-7" stroke="#a09080" strokeWidth="1" />
            <text textAnchor="middle" y="4">1 year</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        padding: '1rem 2rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {LINES.map(line => (
          <button
            key={line.id}
            onMouseEnter={() => setHighlight(line.id)}
            onMouseLeave={() => setHighlight(null)}
            style={{
              background: highlight === line.id ? '#1a1a1a' : '#ffffff',
              color: highlight === line.id ? line.color : '#1a1a1a',
              border: `1px solid ${highlight === line.id ? line.color : '#d8d2c2'}`,
              padding: '0.75rem 1rem',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <div style={{ width: '28px', height: '8px', background: line.color, borderRadius: '1px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em' }}>{line.name}</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: highlight === line.id ? '#c0b098' : '#6a6a6a' }}>
              {line.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Station drawer */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(15,15,15,0.4)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            zIndex: 40,
          }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%',
            maxWidth: '720px',
            background: '#ffffff',
            padding: '1.5rem 2rem 2rem',
            borderTop: `6px solid ${LINES.find(l => l.id === selected.lines[0])!.color}`,
            boxShadow: '0 -20px 40px rgba(0,0,0,0.25)',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}>
            {/* Arrivals-board-style header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #1a1a1a',
              paddingBottom: '0.75rem',
              marginBottom: '1rem',
            }}>
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#888' }}>NOW ARRIVING</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.01em', marginTop: '0.1rem', textTransform: 'uppercase' }}>
                  {selected.label}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {selected.lines.map(lid => {
                  const line = LINES.find(l => l.id === lid)!;
                  return (
                    <div key={lid} title={line.name} style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: line.color,
                      color: '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 900,
                    }}>
                      {line.name[0]}
                    </div>
                  );
                })}
              </div>
            </div>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#1a1a1a',
              margin: '0 0 1rem',
              fontFamily: 'Georgia, serif',
            }}>
              {selected.description}
            </p>

            <div style={{
              borderTop: '1px dashed #c8c0b0',
              paddingTop: '0.8rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.7rem',
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span>STATION {STATIONS.indexOf(selected).toString().padStart(2, '0')} OF {STATIONS.length}</span>
              <button onClick={() => setSelected(null)} style={{
                background: 'transparent',
                border: '1px solid #1a1a1a',
                padding: '0.35rem 0.8rem',
                fontFamily: 'inherit',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                fontWeight: 700,
                cursor: 'pointer',
              }}>CLOSE ↑</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 2rem 2rem', fontSize: '0.7rem', color: '#7a7060', textAlign: 'center', letterSpacing: '0.15em' }}>
        <a href="/" style={{ color: '#0B5FA5', textDecoration: 'none' }}>← EXIT STATION</a>
        {' · '}
        HOVER LEGEND TO ISOLATE LINES · TAP STATIONS FOR DETAIL
      </div>
    </div>
  );
}
