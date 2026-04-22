import { type CSSProperties } from "react";

export function Crosshair({ size = 40, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="0" x2="20" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="28" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function CornerPlus({ style }: { style?: CSSProperties }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={style} aria-hidden>
      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function TickBar({ count = 40, style }: { count?: number; style?: CSSProperties }) {
  const ticks = Array.from({ length: count });
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        alignItems: "flex-end",
        height: 20,
        ...style,
      }}
      aria-hidden
    >
      {ticks.map((_, i) => (
        <div
          key={i}
          style={{
            width: 1,
            height: `${30 + Math.sin(i * 0.37) * 30 + (i % 5 === 0 ? 40 : 20)}%`,
            background: "currentColor",
            opacity: i % 5 === 0 ? 0.9 : 0.45,
          }}
        />
      ))}
    </div>
  );
}

export function RotatingBadge({
  text = "DESIGNING THE FUTURE · ONE PIXEL AT A TIME · ",
  size = 160,
}: {
  text?: string;
  size?: number;
}) {
  const id = "badge-path";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ animation: "kona-spin 22s linear infinite", display: "block" }}
      aria-hidden
    >
      <defs>
        <path id={id} d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* globe meridians */}
      <ellipse cx="100" cy="100" rx="58" ry="24" stroke="currentColor" strokeWidth="1" fill="none" />
      <ellipse cx="100" cy="100" rx="24" ry="58" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="42" y1="100" x2="158" y2="100" stroke="currentColor" strokeWidth="1" />
      <line x1="100" y1="42" x2="100" y2="158" stroke="currentColor" strokeWidth="1" />
      <text fill="currentColor" style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
        <textPath href={`#${id}`} startOffset="0">
          {text.repeat(2)}
        </textPath>
      </text>
    </svg>
  );
}

export function Barcode({ style }: { style?: CSSProperties }) {
  const bars = "1321112121131112121311121311".split("").map((n) => parseInt(n, 10));
  return (
    <div style={{ display: "flex", gap: 1, height: 18, ...style }} aria-hidden>
      {bars.map((w, i) => (
        <div key={i} style={{ width: w, height: "100%", background: i % 2 ? "transparent" : "currentColor" }} />
      ))}
    </div>
  );
}
