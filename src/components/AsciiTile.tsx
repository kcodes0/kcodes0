import { useEffect, useRef } from "react";

const GLYPHS = " .:-=+*#%@";

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Static ASCII-dither panel rendered with canvas 2D.
 * Cheap (no GL), good for many instances inside cards.
 */
export function AsciiTile({
  seed = 0,
  cell = 10,
  accent = "#CCFF00",
  dim = "#3a3a2a",
  live = false,
}: {
  seed?: number;
  cell?: number;
  accent?: string;
  dim?: string;
  live?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = wrap.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    const rand = mulberry32(seed + 1);
    const phase = rand() * 1000;

    const draw = (t: number) => {
      const { width: cw, height: ch } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.font = `700 ${Math.floor(cell * 0.9)}px "JetBrains Mono", "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const cols = Math.ceil(cw / cell);
      const rows = Math.ceil(ch / cell);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          const v =
            Math.sin((nx * 6 + phase) + Math.cos(ny * 5 + phase * 0.7) + t * 0.0004) * 0.5 +
            0.5;
          const r =
            ((Math.sin((x * 12.9898 + y * 78.233 + phase) * 0.2) + 1) * 0.5) * 0.45;
          const f = Math.min(0.999, Math.max(0, v * 0.75 + r * 0.6 - ny * 0.1));
          const idx = Math.floor(f * GLYPHS.length);
          ctx.fillStyle = f > 0.78 ? accent : dim;
          ctx.globalAlpha = 0.4 + f * 0.6;
          ctx.fillText(GLYPHS[idx], x * cell, y * cell);
        }
      }
      ctx.globalAlpha = 1;

      if (live) rafRef.current = requestAnimationFrame(draw);
    };

    draw(0);
    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [seed, cell, accent, dim, live]);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
