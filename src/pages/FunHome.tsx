import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ============================================
// Tinker-able home. Everything is a toy.
// ============================================

type FontChoice = 'graffiti' | 'marker' | 'tag' | 'street' | 'plain';
type Pattern = 'dots' | 'grid' | 'stripes' | 'checker' | 'none';
type Mood = 'cozy' | 'chaos' | 'vapor' | 'gameboy' | 'paper';

const FONT_LABELS: Record<FontChoice, string> = {
  graffiti: 'DON GRAFFITI',
  marker: 'most wasted',
  tag: 'a another tag',
  street: 'docallisme on street',
  plain: 'System Sans',
};

const MOODS: Record<Mood, { bg: string; ink: string; accent: string; accent2: string; note: string }> = {
  cozy: { bg: '#f7efe0', ink: '#2a1f14', accent: '#e0633a', accent2: '#6a9a6a', note: 'cozy den' },
  chaos: { bg: '#fffb00', ink: '#111111', accent: '#ff2bd6', accent2: '#00e5ff', note: 'CHAOS MODE' },
  vapor: { bg: '#1a0b2e', ink: '#ffe7fb', accent: '#ff6ec7', accent2: '#7afcff', note: 'vapor hours' },
  gameboy: { bg: '#9bbc0f', ink: '#0f380f', accent: '#306230', accent2: '#8bac0f', note: 'game boy' },
  paper: { bg: '#fafafa', ink: '#101010', accent: '#e63946', accent2: '#1d3557', note: 'plain paper' },
};

const STICKERS: { label: string; emoji?: string; href?: string; rot: number }[] = [
  { label: 'blog', emoji: '✍️', href: 'https://blog.kcodes.me', rot: -8 },
  { label: 'news', emoji: '📰', href: 'https://news.kcodes.me', rot: 6 },
  { label: 'github', emoji: '🐙', href: 'https://github.com/kcodes0', rot: -3 },
  { label: 'labs', emoji: '⚗️', href: '/labs', rot: 10 },
  { label: 'photos', emoji: '📷', href: '/photos', rot: -6 },
  { label: 'now', emoji: '🌱', href: '/now', rot: 4 },
  { label: 'uses', emoji: '🛠', href: '/uses', rot: -10 },
  { label: 'duck', emoji: '🦆', href: 'https://github.com/kcodes0/duck-lang', rot: 2 },
];

const PROJECTS = [
  {
    title: 'Duck Lang',
    blurb: 'a programming language where you MUST say "quack" or the goose refuses to compile your code',
    tag: 'rust · silly · real',
    href: 'https://github.com/kcodes0/duck-lang',
    sticker: '🦆',
  },
  {
    title: 'Blog CMS',
    blurb: 'markdown-first, D1-backed, lives on a Cloudflare Worker. the kind of thing you write in a weekend and then keep forever',
    tag: 'workers · d1 · fast',
    href: 'https://blog.kcodes.me',
    sticker: '📝',
  },
  {
    title: 'Satirical News',
    blurb: 'a whole newsroom for headlines that shouldn\'t be real but feel extremely real',
    tag: 'news · satire · ads',
    href: 'https://news.kcodes.me',
    sticker: '🗞️',
  },
  {
    title: 'Experimental UI',
    blurb: 'seven themed routes, /1 through /7. museum pages, vending machines, subway maps, a two-cursor thing. tinker bait.',
    tag: '/1 /2 /3 /4 /5 /6 /7',
    href: '/1',
    sticker: '🎛️',
  },
  {
    title: 'LIKWID',
    blurb: 'ASCII fluid that drips under your cursor. looks cooler than it has any right to.',
    tag: 'typescript · ascii',
    href: 'https://github.com/kcodes0/likwid',
    sticker: '💧',
  },
  {
    title: 'this website',
    blurb: 'the thing you are tinkering with right now. drag stuff. change the hue. press the red button. do not press the red button.',
    tag: 'react · vite · toys',
    href: 'https://github.com/kcodes0/konacodes',
    sticker: '🌀',
  },
];

const POKE_LINES = [
  'ow',
  'hey',
  'please stop',
  'I\'m ticklish',
  'do that again',
  '★',
  '!!!',
  'lol',
  'wheeee',
  'bonk',
  'yessir',
  'why',
  ':o',
  '(╯°□°)╯',
  'quack',
  'boing',
];

const SPEECH = [
  'hi! tinker with me.',
  'drag the stickers. I\'ll wait.',
  'try the red button. or don\'t.',
  'this whole page is a toy.',
  'hold on, let me squish.',
  'did you know you can change the font?',
  'the konami code does something.',
  'built with bun + react + vibes.',
];

const CURSOR_OPTIONS = ['✨', '🌈', '🦆', '♥', '★', '🔥', '🫧', '·'];

// Helper: clamp number
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

// ============================================
// Cursor Trail — particles that follow the cursor
// ============================================
function useCursorTrail(emoji: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      const p = document.createElement('span');
      p.textContent = emoji;
      p.className = 'kc-trail';
      p.style.left = e.clientX + 'px';
      p.style.top = e.clientY + 'px';
      p.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
      p.style.setProperty('--dy', (Math.random() * 30 + 10) + 'px');
      p.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [emoji, enabled]);
}

// ============================================
// Konami Code listener — triggers paint mode
// ============================================
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function useKonami(onTrigger: () => void) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[idx];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        idx++;
        if (idx === KONAMI.length) {
          onTrigger();
          idx = 0;
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onTrigger]);
}

// ============================================
// Draggable sticker
// ============================================
function Sticker({
  children,
  initialX,
  initialY,
  rot,
  href,
  accent,
}: {
  children: React.ReactNode;
  initialX: number;
  initialY: number;
  rot: number;
  href?: string;
  accent: string;
}) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    setHasDragged(false);
    startPos.current = { x: e.clientX, y: e.clientY };
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dist = Math.hypot(e.clientX - startPos.current.x, e.clientY - startPos.current.y);
    if (dist > 4) setHasDragged(true);
    setPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const Element: any = href ? 'a' : 'div';

  return (
    <Element
      href={href}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
      className="kc-sticker"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: `rotate(${rot}deg) ${dragging ? 'scale(1.1)' : ''}`,
        borderColor: accent,
        zIndex: dragging ? 999 : 5,
        cursor: dragging ? 'grabbing' : 'grab',
        textDecoration: 'none',
      }}
    >
      {children}
    </Element>
  );
}

// ============================================
// Squishy wordmark — letters react to cursor
// ============================================
function SquishyWord({ text, font }: { text: string; font: string }) {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={ref} className="kc-word" style={{ fontFamily: font }}>
      {text.split('').map((c, i) => {
        // compute per-letter offset based on cursor proximity
        const el = ref.current?.children[i] as HTMLElement | undefined;
        let dx = 0, dy = 0, scale = 1;
        if (el) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            const ang = Math.atan2(cy - mouse.y, cx - mouse.x);
            dx = Math.cos(ang) * force * 24;
            dy = Math.sin(ang) * force * 24;
            scale = 1 + force * 0.3;
          }
        }
        return (
          <span
            key={i}
            className="kc-letter"
            style={{
              transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
            }}
          >
            {c === ' ' ? '\u00a0' : c}
          </span>
        );
      })}
    </div>
  );
}

// ============================================
// Poke button — says silly things
// ============================================
function PokeButton() {
  const [clicks, setClicks] = useState(0);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const idRef = useRef(0);

  const onClick = (e: React.MouseEvent) => {
    setClicks((c) => c + 1);
    const text = POKE_LINES[Math.floor(Math.random() * POKE_LINES.length)];
    const id = idRef.current++;
    setBubbles((b) => [
      ...b,
      { id, x: e.clientX + (Math.random() * 40 - 20), y: e.clientY - 30, text },
    ]);
    setTimeout(() => setBubbles((b) => b.filter((x) => x.id !== id)), 1200);
  };

  return (
    <>
      <button onClick={onClick} className="kc-red-button">
        <span className="kc-red-button-inner">
          DO NOT PRESS
        </span>
        <span className="kc-red-count">pressed {clicks} times</span>
      </button>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="kc-bubble"
          style={{ left: b.x, top: b.y }}
        >
          {b.text}
        </div>
      ))}
    </>
  );
}

// ============================================
// Paint layer (konami)
// ============================================
function PaintLayer({ on, color }: { on: boolean; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onDown = (e: MouseEvent) => {
      drawing.current = true;
      last.current = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!drawing.current) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      last.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { drawing.current = false; };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [on, color]);

  if (!on) return null;
  return <canvas ref={canvasRef} className="kc-paint" />;
}

// ============================================
// Main
// ============================================
export default function FunHome() {
  const [mood, setMood] = useState<Mood>('cozy');
  const [hue, setHue] = useState(18); // offset added to mood accents
  const [font, setFont] = useState<FontChoice>('graffiti');
  const [pattern, setPattern] = useState<Pattern>('dots');
  const [gravity, setGravity] = useState(false);
  const [wiggle, setWiggle] = useState(0.5);
  const [cursorEmoji, setCursorEmoji] = useState('✨');
  const [trailOn, setTrailOn] = useState(true);
  const [chaos, setChaos] = useState(false);
  const [paintMode, setPaintMode] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [speechIdx, setSpeechIdx] = useState(0);

  useCursorTrail(cursorEmoji, trailOn && !paintMode);
  useKonami(useCallback(() => setPaintMode((p) => !p), []));

  // rotate speech bubble
  useEffect(() => {
    const t = setInterval(() => setSpeechIdx((i) => (i + 1) % SPEECH.length), 4200);
    return () => clearInterval(t);
  }, []);

  // page title
  useEffect(() => {
    document.title = 'kona · tinker away';
  }, []);

  const moodTheme = MOODS[mood];

  // Shift the accent color by the user's hue slider
  const accent = useMemo(() => shiftHue(moodTheme.accent, hue - 18), [moodTheme.accent, hue]);
  const accent2 = useMemo(() => shiftHue(moodTheme.accent2, hue - 18), [moodTheme.accent2, hue]);

  const fontFamily = useMemo(() => {
    switch (font) {
      case 'graffiti': return '"DonGraffiti", "Impact", sans-serif';
      case 'marker': return '"Mostwasted", cursive';
      case 'tag': return '"aAnotherTag", cursive';
      case 'street': return '"docallismeonstreet", cursive';
      case 'plain': return '"Helvetica Neue", Helvetica, Arial, sans-serif';
    }
  }, [font]);

  const patternStyle = useMemo(() => {
    const inkFaint = moodTheme.ink + '22';
    switch (pattern) {
      case 'dots':
        return { backgroundImage: `radial-gradient(${inkFaint} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
      case 'grid':
        return { backgroundImage: `linear-gradient(${inkFaint} 1px, transparent 1px), linear-gradient(90deg, ${inkFaint} 1px, transparent 1px)`, backgroundSize: '32px 32px' };
      case 'stripes':
        return { backgroundImage: `repeating-linear-gradient(45deg, ${inkFaint}, ${inkFaint} 2px, transparent 2px, transparent 16px)` };
      case 'checker':
        return { backgroundImage: `repeating-conic-gradient(${inkFaint} 0 25%, transparent 0 50%)`, backgroundSize: '40px 40px' };
      case 'none':
        return {};
    }
  }, [pattern, moodTheme.ink]);

  const stickerPositions = useMemo(() => {
    if (typeof window === 'undefined') return STICKERS.map(() => ({ x: 100, y: 100 }));
    const w = window.innerWidth;
    const h = window.innerHeight;
    return STICKERS.map((_, i) => {
      // scatter in a ring around center-ish
      const angle = (i / STICKERS.length) * Math.PI * 2 + 0.3;
      const r = Math.min(w, h) * 0.32;
      return {
        x: w / 2 + Math.cos(angle) * r - 50 + (Math.random() * 40 - 20),
        y: h / 2 + Math.sin(angle) * r - 40 + (Math.random() * 40 - 20),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetAll = () => {
    setMood('cozy');
    setHue(18);
    setFont('graffiti');
    setPattern('dots');
    setGravity(false);
    setWiggle(0.5);
    setCursorEmoji('✨');
    setTrailOn(true);
    setChaos(false);
  };

  const styleVars = {
    '--bg': moodTheme.bg,
    '--ink': moodTheme.ink,
    '--accent': accent,
    '--accent-2': accent2,
    '--wiggle': wiggle,
    '--chaos': chaos ? 1 : 0,
  } as React.CSSProperties;

  return (
    <div className="kc-root" style={styleVars}>
      <style>{STYLE}</style>
      <div className="kc-bg-pattern" style={patternStyle} />

      <PaintLayer on={paintMode} color={accent} />

      {/* Top bar */}
      <header className="kc-top">
        <div className="kc-top-left">
          <span className="kc-top-logo" style={{ fontFamily }}>kcodes.me</span>
          <span className="kc-top-chip">{MOODS[mood].note}</span>
        </div>
        <div className="kc-top-right">
          <a href="/labs" className="kc-link">/labs</a>
          <a href="/now" className="kc-link">/now</a>
          <a href="/photos" className="kc-link">/photos</a>
          <a href="/uses" className="kc-link">/uses</a>
          <a href="https://blog.kcodes.me" className="kc-link">blog↗</a>
        </div>
      </header>

      {/* Hero */}
      <section className={`kc-hero ${chaos ? 'chaos' : ''} ${gravity ? 'gravity' : ''}`}>
        <div className="kc-hero-inner">
          <div className="kc-howdy" style={{ fontFamily }}>howdy,</div>
          <div className="kc-wordmark-wrap">
            <SquishyWord text="KONA" font={fontFamily} />
          </div>
          <p className="kc-sub">
            I'm Jason. I make dumb little websites, real little programs, and occasionally useful things.
            The whole internet is malleable. This page is proof. <b>Drag stuff. Turn knobs. Break it.</b>
          </p>
          <div className="kc-speech">
            <span key={speechIdx} className="kc-speech-text">{SPEECH[speechIdx]}</span>
          </div>
        </div>
      </section>

      {/* Stickers, drifting around */}
      {STICKERS.map((s, i) => (
        <Sticker
          key={s.label}
          initialX={stickerPositions[i].x}
          initialY={stickerPositions[i].y}
          rot={s.rot}
          href={s.href}
          accent={accent}
        >
          <span className="kc-sticker-emoji">{s.emoji}</span>
          <span className="kc-sticker-label">{s.label}</span>
        </Sticker>
      ))}

      {/* Tinker panel */}
      <aside className={`kc-panel ${panelOpen ? 'open' : 'closed'}`}>
        <button className="kc-panel-toggle" onClick={() => setPanelOpen((o) => !o)}>
          {panelOpen ? '— tinker' : '+ tinker'}
        </button>
        {panelOpen && (
          <div className="kc-panel-body">
            <div className="kc-panel-row">
              <label>mood</label>
              <div className="kc-chips">
                {(Object.keys(MOODS) as Mood[]).map((m) => (
                  <button
                    key={m}
                    className={`kc-chip ${mood === m ? 'on' : ''}`}
                    style={{ background: MOODS[m].bg, color: MOODS[m].ink, borderColor: MOODS[m].accent }}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="kc-panel-row">
              <label>hue <span className="kc-val">{hue}</span></label>
              <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(+e.target.value)} />
            </div>

            <div className="kc-panel-row">
              <label>font</label>
              <div className="kc-chips">
                {(Object.keys(FONT_LABELS) as FontChoice[]).map((f) => (
                  <button
                    key={f}
                    className={`kc-chip ${font === f ? 'on' : ''}`}
                    style={{ fontFamily: fontFamilyFor(f) }}
                    onClick={() => setFont(f)}
                  >
                    {FONT_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>

            <div className="kc-panel-row">
              <label>pattern</label>
              <div className="kc-chips">
                {(['dots', 'grid', 'stripes', 'checker', 'none'] as Pattern[]).map((p) => (
                  <button
                    key={p}
                    className={`kc-chip ${pattern === p ? 'on' : ''}`}
                    onClick={() => setPattern(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="kc-panel-row">
              <label>cursor trail</label>
              <div className="kc-chips">
                {CURSOR_OPTIONS.map((em) => (
                  <button
                    key={em}
                    className={`kc-chip ${cursorEmoji === em ? 'on' : ''}`}
                    onClick={() => { setCursorEmoji(em); setTrailOn(true); }}
                  >
                    {em}
                  </button>
                ))}
                <button
                  className={`kc-chip ${!trailOn ? 'on' : ''}`}
                  onClick={() => setTrailOn((t) => !t)}
                >
                  {trailOn ? 'off' : 'on'}
                </button>
              </div>
            </div>

            <div className="kc-panel-row">
              <label>wiggle <span className="kc-val">{Math.round(wiggle * 100)}%</span></label>
              <input type="range" min={0} max={1} step={0.05} value={wiggle} onChange={(e) => setWiggle(+e.target.value)} />
            </div>

            <div className="kc-panel-row">
              <div className="kc-chips">
                <button className={`kc-chip big ${gravity ? 'on' : ''}`} onClick={() => setGravity((g) => !g)}>
                  gravity {gravity ? 'ON' : 'off'}
                </button>
                <button className={`kc-chip big ${chaos ? 'on' : ''}`} onClick={() => setChaos((c) => !c)}>
                  chaos {chaos ? 'ON' : 'off'}
                </button>
                <button className="kc-chip big" onClick={resetAll}>reset</button>
              </div>
            </div>

            <div className="kc-panel-row kc-panel-hint">
              psst — try the konami code. ↑↑↓↓←→←→ B A
            </div>
          </div>
        )}
      </aside>

      {/* Projects */}
      <section className="kc-section">
        <h2 className="kc-h2" style={{ fontFamily }}>things I made</h2>
        <div className="kc-proj-grid">
          {PROJECTS.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              className="kc-proj"
              style={{ '--rot': `${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg` } as React.CSSProperties}
            >
              <div className="kc-proj-sticker">{p.sticker}</div>
              <div className="kc-proj-title" style={{ fontFamily }}>{p.title}</div>
              <div className="kc-proj-blurb">{p.blurb}</div>
              <div className="kc-proj-tag">{p.tag}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Poke */}
      <section className="kc-section">
        <h2 className="kc-h2" style={{ fontFamily }}>poke me</h2>
        <div className="kc-poke">
          <PokeButton />
          <p className="kc-poke-note">
            it does nothing important. but it <i>does</i> keep count. click more if you want to feel something.
          </p>
        </div>
      </section>

      {/* Other pages */}
      <section className="kc-section">
        <h2 className="kc-h2" style={{ fontFamily }}>other rooms</h2>
        <div className="kc-rooms">
          {[
            { href: '/1', label: 'wikipedia' },
            { href: '/2', label: 'vending' },
            { href: '/3', label: 'journal' },
            { href: '/4', label: 'subway' },
            { href: '/5', label: 'museum' },
            { href: '/6', label: 'two cursor' },
            { href: '/7', label: 'vernacular' },
          ].map((r) => (
            <a key={r.href} href={r.href} className="kc-room">
              <span className="kc-room-slug">{r.href}</span>
              <span className="kc-room-label">{r.label}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="kc-footer">
        <div className="kc-footer-left">
          <div className="kc-footer-big" style={{ fontFamily }}>kona</div>
          <div className="kc-footer-small">made with bun, react, and questionable judgement</div>
        </div>
        <div className="kc-footer-right">
          <a href="mailto:jason.awz2005@gmail.com" className="kc-link">say hi</a>
          <a href="https://github.com/kcodes0" className="kc-link">github</a>
          <span className="kc-link">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// Helpers
// ============================================
function fontFamilyFor(f: FontChoice): string {
  switch (f) {
    case 'graffiti': return '"DonGraffiti", sans-serif';
    case 'marker': return '"Mostwasted", cursive';
    case 'tag': return '"aAnotherTag", cursive';
    case 'street': return '"docallismeonstreet", cursive';
    case 'plain': return '"Helvetica Neue", sans-serif';
  }
}

// shift hue of a hex color by degrees
function shiftHue(hex: string, deg: number): string {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const nh = (h + deg / 360 + 1) % 1;
  const { r: r2, g: g2, b: b2 } = hslToRgb(nh, s, l);
  return rgbToHex(r2, g2, b2);
}

function hexToRgb(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g)!;
  return { r: parseInt(m[0], 16), g: parseInt(m[1], 16), b: parseInt(m[2], 16) };
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}
function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

// ============================================
// Style sheet (inlined)
// ============================================
const STYLE = `
@font-face { font-family: 'DonGraffiti'; src: url('/fonts/DonGraffiti.otf') format('opentype'); font-display: swap; }
@font-face { font-family: 'Mostwasted'; src: url('/fonts/Mostwasted.ttf') format('truetype'); font-display: swap; }
@font-face { font-family: 'aAnotherTag'; src: url('/fonts/aAnotherTag.otf') format('opentype'); font-display: swap; }
@font-face { font-family: 'docallismeonstreet'; src: url('/fonts/docallismeonstreet.otf') format('opentype'); font-display: swap; }
@font-face { font-family: 'adrip'; src: url('/fonts/adrip1.ttf') format('truetype'); font-display: swap; }

.kc-root {
  min-height: 100vh;
  position: relative;
  background: var(--bg);
  color: var(--ink);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  transition: background 0.35s ease, color 0.35s ease;
}
.kc-root.chaos { animation: kc-shake 0.6s infinite; }

.kc-bg-pattern {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: 0.85;
}

.kc-paint {
  position: fixed; inset: 0; z-index: 500; pointer-events: none;
}

/* Top bar */
.kc-top {
  position: relative;
  z-index: 10;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.1rem 1.5rem;
  border-bottom: 2px solid var(--ink);
  gap: 1rem; flex-wrap: wrap;
}
.kc-top-left { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.kc-top-logo { font-size: 1.4rem; letter-spacing: 0.02em; }
.kc-top-chip {
  border: 1.5px solid var(--ink); padding: 0.18rem 0.55rem;
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em;
  background: var(--accent); color: var(--bg);
  transform: rotate(-2deg);
}
.kc-top-right { display: flex; gap: 1rem; flex-wrap: wrap; }
.kc-link {
  color: var(--ink); text-decoration: none; font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}
.kc-link:hover { border-bottom-color: var(--accent); color: var(--accent); }

/* Hero */
.kc-hero {
  position: relative; z-index: 2;
  padding: 5rem 2rem 7rem;
  text-align: center;
}
.kc-hero-inner { max-width: 900px; margin: 0 auto; position: relative; }
.kc-howdy {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  opacity: 0.7;
  margin-bottom: 0.5rem;
  transform: rotate(-2deg);
  display: inline-block;
}
.kc-wordmark-wrap {
  font-size: clamp(4rem, 18vw, 14rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0.2em 0;
}
.kc-word { display: inline-block; }
.kc-letter {
  display: inline-block;
  transition: transform 0.18s cubic-bezier(.2,1.3,.3,1);
  color: var(--ink);
}
.kc-letter:nth-child(2n) { color: var(--accent); }
.kc-letter:nth-child(3n) { color: var(--accent-2); }
.kc-sub {
  max-width: 580px; margin: 1.5rem auto 0;
  font-size: 1.05rem; line-height: 1.6;
}
.kc-sub b { background: var(--accent); color: var(--bg); padding: 0 0.3rem; }
.kc-speech {
  margin-top: 2rem;
  display: inline-block;
  padding: 0.6rem 1rem;
  background: var(--bg);
  border: 2px solid var(--ink);
  border-radius: 20px;
  position: relative;
  transform: rotate(-1deg);
  box-shadow: 4px 4px 0 var(--ink);
}
.kc-speech::before {
  content: ''; position: absolute; bottom: -10px; left: 30px;
  width: 0; height: 0;
  border: 10px solid transparent;
  border-top-color: var(--ink);
  transform: translateY(2px);
}
.kc-speech-text {
  display: inline-block;
  animation: kc-pop 0.4s ease;
}
.kc-hero.chaos .kc-wordmark-wrap { animation: kc-wobble 0.4s infinite; }
.kc-hero.gravity .kc-wordmark-wrap { animation: kc-drop 1.2s ease-out; }

/* Stickers */
.kc-sticker {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 0.8rem;
  background: var(--bg);
  border: 2px solid var(--ink);
  border-radius: 14px;
  box-shadow: 3px 3px 0 var(--ink);
  font-weight: 700; font-size: 0.9rem;
  user-select: none;
  color: var(--ink);
  transition: box-shadow 0.15s, transform 0.15s;
  animation: kc-wiggle calc(3s / (var(--wiggle) + 0.2)) ease-in-out infinite;
}
.kc-sticker:hover { box-shadow: 5px 5px 0 var(--accent); }
.kc-sticker-emoji { font-size: 1.2rem; }

/* Tinker panel */
.kc-panel {
  position: fixed;
  right: 1rem; bottom: 1rem;
  z-index: 50;
  background: var(--bg);
  border: 2.5px solid var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
  max-width: 340px;
  width: calc(100vw - 2rem);
  font-size: 0.85rem;
}
.kc-panel.closed { max-width: 130px; }
.kc-panel-toggle {
  width: 100%;
  padding: 0.55rem 0.8rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  border-bottom: 2.5px solid var(--ink);
  font-weight: 800;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.kc-panel.closed .kc-panel-toggle { border-bottom: none; }
.kc-panel-body { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.7rem; max-height: 60vh; overflow-y: auto; }
.kc-panel-row { display: flex; flex-direction: column; gap: 0.35rem; }
.kc-panel-row label {
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em;
  font-weight: 700; opacity: 0.75;
  display: flex; justify-content: space-between; align-items: center;
}
.kc-val { font-weight: 400; opacity: 0.6; font-size: 0.75rem; }
.kc-panel-hint { font-size: 0.7rem; opacity: 0.5; font-style: italic; padding-top: 0.5rem; border-top: 1px dashed var(--ink); }

.kc-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.kc-chip {
  font-size: 0.7rem; padding: 0.3rem 0.55rem;
  background: var(--bg);
  border: 1.5px solid var(--ink);
  color: var(--ink);
  cursor: pointer;
  font-weight: 600;
  text-transform: lowercase;
  transition: all 0.12s;
}
.kc-chip:hover { transform: translate(-1px, -1px); box-shadow: 2px 2px 0 var(--ink); }
.kc-chip.on { background: var(--ink); color: var(--bg); }
.kc-chip.big { padding: 0.45rem 0.75rem; font-size: 0.75rem; }

input[type="range"] {
  width: 100%; accent-color: var(--accent);
}

/* Sections */
.kc-section {
  position: relative; z-index: 2;
  max-width: 1100px; margin: 0 auto;
  padding: 3rem 2rem;
}
.kc-h2 {
  font-size: clamp(2.2rem, 6vw, 4rem);
  margin: 0 0 1.75rem;
  transform: rotate(-1.5deg);
  display: inline-block;
  padding: 0.1em 0.5em;
  background: var(--accent);
  color: var(--bg);
  line-height: 1;
}

/* Projects */
.kc-proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}
.kc-proj {
  display: block;
  background: var(--bg);
  border: 2.5px solid var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
  padding: 1.3rem;
  text-decoration: none; color: var(--ink);
  transform: rotate(var(--rot, 0deg));
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.kc-proj:hover {
  transform: rotate(0deg) translate(-3px, -5px);
  box-shadow: 10px 10px 0 var(--accent);
}
.kc-proj-sticker { font-size: 2.2rem; margin-bottom: 0.5rem; }
.kc-proj-title {
  font-size: 1.7rem; margin-bottom: 0.4rem; line-height: 1; letter-spacing: 0.02em;
}
.kc-proj-blurb {
  font-size: 0.9rem; line-height: 1.55; margin-bottom: 0.75rem; opacity: 0.85;
}
.kc-proj-tag {
  font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent); font-weight: 700;
}

/* Poke */
.kc-poke { text-align: center; padding: 2rem; }
.kc-red-button {
  display: inline-block;
  background: #e63946;
  color: white;
  font-weight: 900;
  font-size: 1.2rem;
  padding: 1.5rem 2.5rem;
  border: 4px solid var(--ink);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 8px 0 var(--ink), 0 0 0 8px #a4121c inset;
  transition: transform 0.08s, box-shadow 0.08s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 220px; height: 220px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  margin: 0 auto;
}
.kc-red-button:hover { transform: scale(1.03); }
.kc-red-button:active { transform: translateY(4px) scale(0.97); box-shadow: 0 4px 0 var(--ink), 0 0 0 8px #a4121c inset; }
.kc-red-button-inner { font-size: 1rem; line-height: 1.2; }
.kc-red-count { font-size: 0.7rem; font-weight: 500; margin-top: 0.5rem; opacity: 0.85; }
.kc-poke-note { max-width: 400px; margin: 1.5rem auto 0; font-size: 0.9rem; line-height: 1.6; opacity: 0.8; }

.kc-bubble {
  position: fixed; z-index: 1000; pointer-events: none;
  background: var(--ink); color: var(--bg);
  padding: 0.3rem 0.6rem;
  border-radius: 14px;
  font-weight: 700; font-size: 0.9rem;
  transform: translate(-50%, 0);
  animation: kc-float-up 1.2s ease-out forwards;
}

/* Rooms */
.kc-rooms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}
.kc-room {
  display: flex; flex-direction: column; gap: 0.25rem;
  padding: 0.9rem;
  background: var(--bg);
  border: 2px dashed var(--ink);
  text-decoration: none; color: var(--ink);
  transition: all 0.15s;
}
.kc-room:hover { background: var(--ink); color: var(--bg); border-style: solid; transform: translate(-2px, -2px); }
.kc-room-slug { font-family: ui-monospace, monospace; font-size: 1.1rem; font-weight: 700; }
.kc-room-label { font-size: 0.75rem; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em; }

/* Footer */
.kc-footer {
  position: relative; z-index: 2;
  padding: 3rem 2rem 5rem;
  border-top: 2px solid var(--ink);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 1.5rem;
  max-width: 1100px; margin: 2rem auto 0;
}
.kc-footer-big { font-size: 3.5rem; line-height: 1; }
.kc-footer-small { font-size: 0.8rem; opacity: 0.65; margin-top: 0.3rem; }
.kc-footer-right { display: flex; gap: 1.25rem; flex-wrap: wrap; }

/* Trail particles */
.kc-trail {
  position: fixed;
  pointer-events: none;
  z-index: 999;
  font-size: 18px;
  transform: translate(-50%, -50%);
  animation: kc-trail-fade 0.9s ease-out forwards;
}

/* Animations */
@keyframes kc-wiggle {
  0%, 100% { transform: rotate(var(--rot, 0deg)); }
  25% { transform: rotate(calc(var(--rot, 0deg) - 3deg)); }
  75% { transform: rotate(calc(var(--rot, 0deg) + 3deg)); }
}
@keyframes kc-shake {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-3px, 2px) rotate(-0.4deg); }
  40% { transform: translate(3px, -2px) rotate(0.4deg); }
  60% { transform: translate(-2px, 3px) rotate(-0.3deg); }
  80% { transform: translate(2px, -3px) rotate(0.3deg); }
}
@keyframes kc-wobble {
  0%, 100% { transform: skew(0deg, 0deg); }
  25% { transform: skew(3deg, 1deg); }
  75% { transform: skew(-3deg, -1deg); }
}
@keyframes kc-drop {
  0% { transform: translateY(-100px) rotate(-6deg); }
  60% { transform: translateY(20px) rotate(2deg); }
  80% { transform: translateY(-5px) rotate(-1deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes kc-pop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes kc-float-up {
  0% { transform: translate(-50%, 0) scale(0.8); opacity: 0; }
  20% { transform: translate(-50%, -10px) scale(1.1); opacity: 1; }
  100% { transform: translate(-50%, -60px) scale(0.9); opacity: 0; }
}
@keyframes kc-trail-fade {
  0% { opacity: 1; transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  100% { opacity: 0;
    transform: translate(calc(-50% + var(--dx, 0px)), calc(-50% + var(--dy, 20px))) rotate(var(--rot, 30deg)) scale(0.4);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .kc-panel { right: 0.5rem; bottom: 0.5rem; width: calc(100vw - 1rem); }
  .kc-footer { flex-direction: column; align-items: flex-start; }
  .kc-red-button { width: 180px; height: 180px; font-size: 1rem; padding: 1rem; }
}
`;
