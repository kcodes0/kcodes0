import { useEffect, useRef, useState } from 'react';

// Fursona image paths
export const SONA_BLACK = '/images/sona/kona-black.png';
export const SONA_WHITE = '/images/sona/kona-white.png';

// ============================================================
// Corner flourish — ornate vines for stacked frames
// Paired: pass rotation to each corner (0, 90, 180, 270)
// ============================================================
export function CornerFlourish({
  size = 120,
  rotate = 0,
  stroke = 'currentColor',
  strokeWidth = 1,
  style,
}: {
  size?: number;
  rotate?: number;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d="M0 0 L40 0 M0 0 L0 40" />
      <path d="M10 0 Q 40 0 40 14 T 60 28" strokeOpacity="0.9" />
      <path d="M0 10 Q 0 40 14 40 T 28 60" strokeOpacity="0.9" />
      <path d="M4 4 Q 24 4 24 24 Q 44 24 44 44" strokeOpacity="0.6" />
      {/* trefoil */}
      <circle cx="40" cy="14" r="2.2" fill={stroke} stroke="none" />
      <circle cx="14" cy="40" r="2.2" fill={stroke} stroke="none" />
      <circle cx="28" cy="28" r="1.4" fill={stroke} stroke="none" />
      <path d="M24 24 C 28 20 34 22 36 28 C 30 30 24 28 24 24 Z" fill={stroke} fillOpacity="0.85" stroke="none" />
      <path d="M8 20 Q 14 24 20 20" strokeOpacity="0.55" />
      <path d="M20 8 Q 24 14 20 20" strokeOpacity="0.55" />
    </svg>
  );
}

// ============================================================
// Ornate horizontal divider
// ============================================================
export function OrnateDivider({
  width = 320,
  color = 'currentColor',
  style,
}: {
  width?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={width} height={28} viewBox="0 0 320 28" style={style} fill="none" stroke={color} strokeWidth="1">
      <line x1="0" y1="14" x2="120" y2="14" />
      <line x1="200" y1="14" x2="320" y2="14" />
      <path d="M120 14 Q 140 2 160 14 Q 180 26 200 14" />
      <circle cx="160" cy="14" r="3" fill={color} stroke="none" />
      <circle cx="120" cy="14" r="1.6" fill={color} stroke="none" />
      <circle cx="200" cy="14" r="1.6" fill={color} stroke="none" />
      <path d="M140 14 l -4 -4 M140 14 l -4 4" strokeOpacity="0.6" />
      <path d="M180 14 l 4 -4 M180 14 l 4 4" strokeOpacity="0.6" />
    </svg>
  );
}

// ============================================================
// Flying bats SVG — used across nocturnal pages
// ============================================================
export function Bat({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill={color}>
      <path d="M50 30 Q 55 20 65 22 Q 75 14 88 20 Q 82 26 78 30 Q 74 34 70 34 Q 60 38 50 32 Z" />
      <path d="M50 30 Q 45 20 35 22 Q 25 14 12 20 Q 18 26 22 30 Q 26 34 30 34 Q 40 38 50 32 Z" />
      <ellipse cx="50" cy="30" rx="4" ry="6" />
      <path d="M46 26 l 1 -6 M54 26 l -1 -6" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// ============================================================
// Candle flame glow — CSS-only flickering light
// Absolute-positioned inside a relative container
// ============================================================
export function CandleGlow({
  color = '#ffb347',
  size = 240,
  style,
}: {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}55 0%, ${color}00 70%)`,
        filter: 'blur(10px)',
        pointerEvents: 'none',
        animation: 'candleFlicker 3.2s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

// ============================================================
// Shared route nav — stacked cross-links used on every page
// ============================================================
export const ROUTES = [
  { path: '/1', name: 'Lunaria', sub: 'i. the portrait' },
  { path: '/2', name: 'Rosace', sub: 'ii. stained glass' },
  { path: '/3', name: 'Ōkami', sub: 'iii. the shrine' },
  { path: '/4', name: 'Nocturne', sub: 'iv. the castle' },
  { path: '/5', name: 'Grimoire', sub: 'v. illuminated' },
  { path: '/6', name: 'Sanguine', sub: 'vi. blood moon' },
  { path: '/7', name: 'Ending', sub: 'vii. the credits' },
];

// ============================================================
// useMouseParallax — smooth mouse-driven parallax
// ============================================================
export function useMouseParallax(strength = 20) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    let target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target = {
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      };
    };
    const tick = () => {
      setPos((p) => ({
        x: p.x + (target.x - p.x) * 0.08,
        y: p.y + (target.y - p.y) * 0.08,
      }));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return pos;
}

// ============================================================
// useReveal — intersection-observer based reveal-on-scroll
// ============================================================
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ============================================================
// Shared keyframes — injected once per page
// ============================================================
export const SHARED_KEYFRAMES = `
  @keyframes candleFlicker {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    25%      { opacity: 0.75; transform: scale(1.04); }
    50%      { opacity: 1; transform: scale(0.97); }
    75%      { opacity: 0.82; transform: scale(1.02); }
  }
  @keyframes drawStroke {
    from { stroke-dashoffset: var(--len, 1000); }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slowSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes embers {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 0.8; }
    100% { transform: translateY(-120vh) translateX(var(--drift, 20px)); opacity: 0; }
  }
  @keyframes batFlap {
    0%, 100% { transform: scaleY(1); }
    50%      { transform: scaleY(0.55); }
  }
  @keyframes shimmer {
    0%, 100% { filter: brightness(1); }
    50%      { filter: brightness(1.25); }
  }
`;

// ============================================================
// RouteCrossNav — compact cross-navigation used on every page
// Highlights the active index
// ============================================================
export function RouteCrossNav({
  active,
  color = 'currentColor',
  accent,
}: {
  active: number; // 1..7
  color?: string;
  accent: string;
}) {
  return (
    <nav
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.1rem 1.6rem',
        fontSize: '0.65rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color,
        opacity: 0.9,
      }}
    >
      <a href="/" style={{ color, textDecoration: 'none', opacity: 0.6 }}>
        ← index
      </a>
      {ROUTES.map((r, i) => {
        const isActive = i + 1 === active;
        return (
          <a
            key={r.path}
            href={r.path}
            style={{
              color: isActive ? accent : color,
              textDecoration: 'none',
              fontWeight: isActive ? 700 : 400,
              opacity: isActive ? 1 : 0.55,
              borderBottom: isActive ? `1px solid ${accent}` : '1px solid transparent',
              paddingBottom: 2,
            }}
          >
            {`${(i + 1).toString().padStart(2, '0')} · ${r.name}`}
          </a>
        );
      })}
    </nav>
  );
}
