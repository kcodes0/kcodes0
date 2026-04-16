import { useState, useEffect } from 'react';

type Entry = {
  date: string;
  time: string;
  title?: string;
  body: (string | { strike: string } | { underline: string } | { insert: string } | { margin: string })[];
  mood?: string;
  stain?: { top: string; left: string; size: number; opacity: number };
  doodle?: 'spiral' | 'arrow' | 'eye' | 'wave' | 'sun' | 'box';
  doodleSide?: 'left' | 'right';
};

const ENTRIES: Entry[] = [
  {
    date: 'Tuesday, March 3rd, 2026',
    time: '3:14 AM',
    title: 'the goose again',
    body: [
      'Had the goose dream again. It was standing at the end of my bed this time, not in a field. It was holding a piece of paper with a ',
      { strike: 'compiler error' },
      ' poem written on it, but when it opened its mouth all I could hear was ',
      { underline: 'a lawnmower' },
      '. I tried to read the paper but the letters kept rearranging. I think one of them was a semicolon.',
      '\n\nWhen I woke up I had written the word ',
      { underline: 'quack' },
      ' on my arm in pen. I don\'t remember doing it. I don\'t own a pen.',
    ],
    mood: 'unsettled',
    doodle: 'spiral',
    doodleSide: 'right',
  },
  {
    date: 'Friday, March 6th, 2026',
    time: '1:47 AM',
    title: 'a room with no windows',
    body: [
      'I dreamed I was in a room with no windows and one door. The door was locked but I had the key. I stood there for a very long time holding the key. I don\'t think I ever opened the door.',
      '\n\nThe ',
      { strike: 'wallpaper was yellow' },
      ' walls were made of old computer monitors all showing the same cursor blinking. No text. Just the cursor.',
      '\n\nI remember thinking ',
      { underline: 'I am not supposed to be here' },
      ' but also ',
      { underline: 'this is where I live now' },
      '. Both felt true.',
    ],
    mood: '?',
    stain: { top: '60%', left: '15%', size: 140, opacity: 0.22 },
    doodle: 'box',
    doodleSide: 'left',
  },
  {
    date: 'Sunday, March 15th, 2026',
    time: '4:02 AM',
    title: 'shipping the newsroom',
    body: [
      'Not really a dream. I woke up at three and couldn\'t sleep so I shipped the satirical newsroom. I kept expecting something to break but nothing did. The deploy took forty-one seconds.',
      '\n\nI sat on the floor of the kitchen after. The fridge was humming. ',
      { insert: 'It was humming the same note as the dream room cursors. I don\'t know if I imagined that.' },
      '\n\nI think the thing I actually wanted was for someone to be awake with me. That\'s a separate problem.',
    ],
    mood: 'oddly fine',
    doodle: 'wave',
    doodleSide: 'right',
  },
  {
    date: 'Wednesday, March 18th, 2026',
    time: '5:30 AM',
    body: [
      'I dreamed I was reading a book ',
      { strike: 'about myself' },
      ' and every page was different handwriting. The handwriting was all mine but from different years. The 2019 pages were embarrassing and I tried to ',
      { underline: 'eat them' },
      ' so no one else could read them. In the dream I could chew them into small balls and they tasted like paper.',
      '\n\nWhen I got to the last page it was blank.',
    ],
    doodle: 'eye',
    doodleSide: 'left',
  },
  {
    date: 'Saturday, March 21st, 2026',
    time: '— no time written —',
    title: 'did i work on duck lang this week',
    body: [
      'I can\'t remember if I worked on duck lang this week or dreamed about working on it. ',
      { margin: 'check git log' },
      ' I remember writing a parser for a keyword called ',
      { underline: 'honk' },
      ' but I don\'t think that\'s real. It would be ',
      { strike: 'so funny' },
      ' so dumb if it was real. Maybe I should make it real. Maybe that was the point of the dream.',
      '\n\nMaybe every dream about a project is just the project asking to be made.',
    ],
    mood: 'productive-adjacent',
    stain: { top: '12%', left: '72%', size: 90, opacity: 0.18 },
  },
  {
    date: 'Monday, March 30th, 2026',
    time: '2:11 AM',
    title: 'the tall library',
    body: [
      'There was a library and the shelves went up past where I could see. Every book on every shelf was a project I had never finished. ',
      { strike: 'I counted three' },
      ' I counted twelve before I stopped. One of them had my name on the spine but I had never heard of it. The title was ',
      { underline: 'A Field Guide to Barely-Started Things' },
      '.',
      '\n\nA librarian with no face pointed to one specific book and would not let me take it down. I was not angry. I understood.',
    ],
    doodle: 'arrow',
    doodleSide: 'right',
  },
  {
    date: 'Thursday, April 2nd, 2026',
    time: '11:58 PM (not sleeping yet)',
    body: [
      'Pre-sleep note so I can check it later: if I dream of the goose tonight I am going to try to ask it its actual name. It has never introduced itself.',
      '\n\n',
      { margin: 'UPDATE next morning' },
      ' — did not dream of the goose. Dreamed of a car I could not start. Checked engine. ',
      { underline: 'There was a keyboard where the engine should be.' },
      ' All the keys were the letter ',
      { strike: 'k' },
      ' q.',
    ],
    stain: { top: '70%', left: '68%', size: 110, opacity: 0.2 },
    doodle: 'sun',
    doodleSide: 'left',
  },
];

function Doodle({ kind }: { kind: NonNullable<Entry['doodle']> }) {
  const color = '#3a2a1a';
  const stroke = { stroke: color, strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'spiral':
      return (
        <svg viewBox="0 0 60 60" width="60" height="60"><path d="M30 30 Q22 30 22 22 Q22 12 32 12 Q44 12 44 24 Q44 40 28 40 Q10 40 10 22 Q10 4 30 4" {...stroke} /></svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 70 40" width="70" height="40">
          <path d="M4 22 Q18 6 34 22 T66 20" {...stroke} />
          <path d="M60 14 L66 20 L60 26" {...stroke} />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 70 40" width="70" height="40">
          <path d="M6 20 Q35 2 64 20 Q35 38 6 20 Z" {...stroke} />
          <circle cx="35" cy="20" r="7" {...stroke} />
          <circle cx="35" cy="20" r="2.5" fill={color} />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 80 30" width="80" height="30">
          <path d="M2 15 Q12 2 22 15 T42 15 T62 15 T80 15" {...stroke} />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 60 60" width="60" height="60">
          <circle cx="30" cy="30" r="10" {...stroke} />
          {[...Array(8)].map((_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={30 + Math.cos(a) * 15} y1={30 + Math.sin(a) * 15} x2={30 + Math.cos(a) * 22} y2={30 + Math.sin(a) * 22} {...stroke} />;
          })}
        </svg>
      );
    case 'box':
      return (
        <svg viewBox="0 0 60 50" width="60" height="50">
          <path d="M8 14 L52 14 L52 44 L8 44 Z" {...stroke} />
          <path d="M8 14 L16 6 L60 6 L52 14" {...stroke} />
          <path d="M52 14 L60 6 L60 36 L52 44" {...stroke} />
        </svg>
      );
  }
}

export default function E3Journal() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const existing = document.getElementById('dj-google-fonts');
    if (existing) { setFontLoaded(true); return; }
    const link = document.createElement('link');
    link.id = 'dj-google-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Shadows+Into+Light&display=swap';
    link.onload = () => setFontLoaded(true);
    document.head.appendChild(link);
    const t = setTimeout(() => setFontLoaded(true), 800);
    return () => { clearTimeout(t); };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8dfc6',
      fontFamily: fontLoaded ? '"Caveat", "Shadows Into Light", "Bradley Hand", cursive' : '"Bradley Hand", cursive',
      color: '#2a1d0e',
      padding: '3rem 0',
      overflow: 'hidden',
    }}>
      <style>{`
        .dj-page {
          position: relative;
          max-width: 720px;
          margin: 0 auto 2.5rem;
          padding: 3.5rem 3rem;
          background:
            repeating-linear-gradient(0deg, transparent 0 27px, rgba(80,120,160,0.14) 27px 28px),
            repeating-linear-gradient(90deg, transparent 0 27px, rgba(80,120,160,0.08) 27px 28px),
            #f5ecd2;
          box-shadow:
            0 1px 0 rgba(0,0,0,0.05),
            0 20px 40px -20px rgba(100,70,30,0.35),
            inset 0 0 40px rgba(180,140,80,0.12);
          border-left: 2px solid rgba(180,40,40,0.3);
        }
        .dj-page::before {
          content: '';
          position: absolute;
          left: 36px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(200,30,30,0.4);
        }
        .dj-page::after {
          content: '';
          position: absolute;
          left: 40px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(200,30,30,0.4);
        }
        .dj-strike {
          text-decoration: line-through;
          text-decoration-color: #a62828;
          text-decoration-thickness: 2px;
          color: #7a5a40;
        }
        .dj-underline {
          border-bottom: 2px solid #2a1d0e;
          padding-bottom: 1px;
        }
        .dj-insert {
          display: inline;
          color: #2a5a2a;
          position: relative;
          padding: 0 3px;
        }
        .dj-insert::before {
          content: '^';
          position: absolute;
          left: -4px;
          top: -10px;
          font-size: 0.9em;
          color: #2a5a2a;
          transform: scaleY(0.7);
        }
        .dj-margin-note {
          display: inline-block;
          transform: rotate(-6deg);
          font-size: 0.78em;
          color: #3a5a7a;
          margin: 0 0.3em;
          border: 1.5px solid #3a5a7a;
          padding: 0.05em 0.4em;
        }
      `}</style>

      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.8rem', fontWeight: 400, margin: 0, lineHeight: 1 }}>
          Dream Journal
        </h1>
        <div style={{ fontSize: '1.4rem', color: '#5a3a20', marginTop: '0.3rem', transform: 'rotate(-1.5deg)' }}>
          — Jason M.
        </div>
        <div style={{ fontSize: '1rem', color: '#7a5a30', marginTop: '1rem', letterSpacing: '0.02em' }}>
          <span style={{ textDecoration: 'line-through', textDecorationColor: '#a62828' }}>please</span>{' '}
          <span style={{ textDecoration: 'line-through', textDecorationColor: '#a62828' }}>do not</span>{' '}
          <span style={{ borderBottom: '1px solid #2a1d0e' }}>PLEASE DO NOT</span>{' '}
          read this
        </div>
      </header>

      {ENTRIES.map((entry, i) => (
        <div className="dj-page" key={i} style={{
          transform: `rotate(${i % 2 === 0 ? '-0.4' : '0.35'}deg)`,
        }}>
          {entry.stain && (
            <div style={{
              position: 'absolute',
              top: entry.stain.top,
              left: entry.stain.left,
              width: `${entry.stain.size}px`,
              height: `${entry.stain.size * 0.88}px`,
              borderRadius: '50% 45% 55% 50% / 50% 55% 45% 50%',
              background: `radial-gradient(circle at 40% 40%, rgba(140,90,40,${entry.stain.opacity}) 0%, rgba(120,70,30,${entry.stain.opacity * 0.6}) 50%, rgba(100,60,25,${entry.stain.opacity * 0.2}) 80%, transparent 100%)`,
              pointerEvents: 'none',
              boxShadow: `inset 0 0 12px rgba(90,50,20,${entry.stain.opacity * 0.8})`,
            }} />
          )}

          {entry.doodle && (
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              [entry.doodleSide === 'right' ? 'right' : 'left']: '1rem',
              transform: `rotate(${entry.doodleSide === 'right' ? '12' : '-8'}deg)`,
              opacity: 0.85,
            }}>
              <Doodle kind={entry.doodle} />
            </div>
          )}

          <div style={{
            fontSize: '1.15rem',
            color: '#7a4a22',
            marginBottom: '0.2rem',
            letterSpacing: '0.02em',
          }}>
            {entry.date}
          </div>
          <div style={{
            fontSize: '0.95rem',
            color: '#9a7450',
            marginBottom: '1.2rem',
            fontStyle: 'italic',
          }}>
            {entry.time}
            {entry.mood && <span style={{ marginLeft: '1.5rem', color: '#7a5a30' }}>mood: <u>{entry.mood}</u></span>}
          </div>

          {entry.title && (
            <div style={{
              fontSize: '1.8rem',
              marginBottom: '0.8rem',
              lineHeight: 1.1,
              color: '#1a0e02',
            }}>
              {entry.title}
            </div>
          )}

          <div style={{
            fontSize: '1.35rem',
            lineHeight: 1.55,
            whiteSpace: 'pre-wrap',
            color: '#1a0e02',
          }}>
            {entry.body.map((chunk, ci) => {
              if (typeof chunk === 'string') return <span key={ci}>{chunk}</span>;
              if ('strike' in chunk) return <span className="dj-strike" key={ci}>{chunk.strike}</span>;
              if ('underline' in chunk) return <span className="dj-underline" key={ci}>{chunk.underline}</span>;
              if ('insert' in chunk) return <span className="dj-insert" key={ci}>{chunk.insert}</span>;
              if ('margin' in chunk) return <span className="dj-margin-note" key={ci}>{chunk.margin}</span>;
              return null;
            })}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '0.8rem',
            right: '1.2rem',
            fontSize: '0.85rem',
            color: '#9a7450',
            transform: 'rotate(-2deg)',
          }}>
            — {i + 1} —
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.4rem', color: '#5a3a20' }}>
        ( end of current notebook. started a new one. )
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>
        <a href="/" style={{ color: '#3a5a7a', textDecoration: 'underline', textDecorationStyle: 'wavy' }}>
          ← close the journal
        </a>
      </div>
    </div>
  );
}
