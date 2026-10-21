import { useEffect, useRef } from 'react';

// A lightweight raw-WebGL "liquid navy & gold" backdrop that reads like a slow,
// cinematic background video. No three.js needed. Pauses when off-screen.

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uGold;
uniform float uLight;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.045;
  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.5 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3 + uMouse * 0.18),
                fbm(p * 1.5 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.15 + 3.4 * r);

  vec3 ink   = vec3(0.020, 0.032, 0.075);
  vec3 navy  = vec3(0.082, 0.129, 0.259);
  vec3 navy2 = vec3(0.165, 0.245, 0.470);
  vec3 gold  = vec3(0.788, 0.592, 0.173);
  vec3 goldL = vec3(0.945, 0.863, 0.667);

  vec3 col = mix(ink, navy, smoothstep(0.18, 0.92, f));
  col = mix(col, navy2, smoothstep(0.6, 1.1, length(q)) * 0.35 * uLight);
  float vein = smoothstep(0.6, 0.92, f) * smoothstep(0.35, 0.95, r.x);
  col += mix(gold, goldL, vein) * vein * 0.5 * uGold;
  float spark = pow(smoothstep(0.82, 1.0, f), 3.0);
  col += goldL * spark * 0.35 * uGold;

  col *= 1.0 - 0.6 * smoothstep(0.3, 1.25, length(uv - 0.5) * 1.35);
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function LiquidBackdrop({ gold = 1, light = 1, scale = 0.5, className = '' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    // The canvas is created here (not in JSX) so every mount gets a fresh
    // WebGL context — safe under React StrictMode's double effects.
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const canvas = document.createElement('canvas');
    canvas.className = 'liquid-backdrop';
    wrap.appendChild(canvas);
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      canvas.remove();
      return undefined;
    }

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.remove();
      return undefined;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    gl.uniform1f(gl.getUniformLocation(prog, 'uGold'), gold);
    gl.uniform1f(gl.getUniformLocation(prog, 'uLight'), light);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = true;
    let raf = 0;
    const start = performance.now() - Math.random() * 20000;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const s = Math.min(window.devicePixelRatio || 1, 2) * scale;
      canvas.width = Math.max(2, Math.round(r.width * s));
      canvas.height = Math.max(2, Math.round(r.height * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      draw();
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = 0.5 - e.clientY / window.innerHeight;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });

    resize();
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, [gold, light, scale]);

  return <div ref={wrapRef} className={`liquid-wrap ${className}`} aria-hidden="true" />;
}
