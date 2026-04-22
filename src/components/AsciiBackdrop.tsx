import { useEffect, useRef } from "react";

/**
 * ASCII-dithered shader backdrop.
 * Renders an animated noise field, quantizes it per cell,
 * and maps each cell's brightness to a glyph from a baked atlas.
 */
const GLYPHS = " .':-+*=#%@";
const CELL = 10;

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform sampler2D u_atlas;
uniform float u_glyphs;
uniform float u_cell;
uniform vec3 u_accent;
uniform vec3 u_ink;

// hash + value noise
float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = v_uv * u_res;
  vec2 cell = floor(frag / u_cell);
  vec2 cellCenter = (cell + 0.5) * u_cell;
  vec2 local = (frag - cell * u_cell) / u_cell;

  // Field: flowing fbm warped by mouse + time
  vec2 uv = cellCenter / u_res;
  vec2 warp = vec2(
    fbm(uv * 2.2 + u_time * 0.04),
    fbm(uv * 2.2 - u_time * 0.05 + 7.3)
  );
  float d = length(uv - u_mouse) ;
  float pulse = smoothstep(0.55, 0.0, d) * 0.55;
  float f = fbm(uv * 3.3 + warp * 1.2 + vec2(0.0, -u_scroll * 0.25));
  f = f * 0.9 + pulse;

  // Diagonal scanline gradient to tilt composition
  f += (1.0 - uv.y) * 0.08 - uv.x * 0.02;

  // Quantize -> glyph index
  float g = floor(clamp(f, 0.0, 0.999) * u_glyphs);
  float gx = (g + local.x) / u_glyphs;
  float gy = local.y;
  float mask = texture(u_atlas, vec2(gx, gy)).r;

  // Color: mostly dim ink, accent pops on bright glyphs
  float hot = smoothstep(0.72, 0.95, f);
  vec3 base = mix(u_ink, u_ink * 1.4, f);
  vec3 col = mix(base, u_accent, hot * 0.9);

  // Apply glyph mask with subtle afterglow
  float alpha = mask * mix(0.35, 1.0, f);
  outColor = vec4(col * alpha, alpha * 0.9);
}`;

function buildGlyphAtlas(glyphs: string, size = 64): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size * glyphs.length;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = `700 ${Math.floor(size * 0.88)}px "JetBrains Mono", "Geist Mono", ui-monospace, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < glyphs.length; i++) {
    ctx.fillText(glyphs[i], i * size + size / 2, size / 2 + 2);
  }
  return canvas;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

export function AsciiBackdrop({
  cell = CELL,
  accent = [0.8, 1.0, 0.0],
  ink = [0.06, 0.07, 0.05],
  opacity = 1,
}: {
  cell?: number;
  accent?: [number, number, number];
  ink?: [number, number, number];
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a_pos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    // Glyph atlas texture
    const atlas = buildGlyphAtlas(GLYPHS);
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);

    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_mouse = gl.getUniformLocation(prog, "u_mouse");
    const u_scroll = gl.getUniformLocation(prog, "u_scroll");
    const u_atlas = gl.getUniformLocation(prog, "u_atlas");
    const u_glyphs = gl.getUniformLocation(prog, "u_glyphs");
    const u_cell = gl.getUniformLocation(prog, "u_cell");
    const u_accent = gl.getUniformLocation(prog, "u_accent");
    const u_ink = gl.getUniformLocation(prog, "u_ink");

    gl.uniform1i(u_atlas, 0);
    gl.uniform1f(u_glyphs, GLYPHS.length);
    gl.uniform1f(u_cell, cell);
    gl.uniform3f(u_accent, accent[0], accent[1], accent[2]);
    gl.uniform3f(u_ink, ink[0], ink[1], ink[2]);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u_res, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform1f(u_time, (performance.now() - start) / 1000);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.uniform1f(u_scroll, window.scrollY / Math.max(1, document.body.scrollHeight));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
    };
  }, [cell, accent, ink]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
}

export default AsciiBackdrop;
