// Generates brand assets into /public:
//   • og-image.jpg (1200×630) for social sharing
//   • favicon-32.png + apple-touch-icon.png
//   • /work/*.svg — art-directed placeholder visuals for "Our work"
//     (replace with AI-generated or real photography whenever ready)
//
// Run:  npm run assets

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(join(root, 'work'), { recursive: true });

const GOLD_DEFS = `
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f7ecd2"/><stop offset=".3" stop-color="#e6c27a"/>
    <stop offset=".62" stop-color="#c9972c"/><stop offset="1" stop-color="#8f6a1c"/>
  </linearGradient>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1b2a52"/><stop offset=".55" stop-color="#0b1226"/><stop offset="1" stop-color="#04070f"/>
  </linearGradient>
  <radialGradient id="glow" cx=".72" cy=".3" r=".6">
    <stop offset="0" stop-color="#c9972c" stop-opacity=".35"/><stop offset="1" stop-color="#c9972c" stop-opacity="0"/>
  </radialGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0"/></filter>`;

const frame = (w, h, body, extraDefs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>${GOLD_DEFS}${extraDefs}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#glow)"/>
${body}
<rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>`;

// deterministic pseudo-random
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const gearPath = (cx, cy, r, teeth, depth) => {
  const pts = [];
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r - depth;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

const W = 1200;
const H = 900;

const art = {
  hetvik: () => {
    let s = '';
    for (let x = 0; x <= W; x += 40) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#2f4580" stroke-opacity=".25"/>`;
    for (let y = 0; y <= H; y += 40) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#2f4580" stroke-opacity=".25"/>`;
    s += `<path d="${gearPath(720, 430, 260, 18, 34)}" fill="url(#gold)" opacity=".95"/>
      <circle cx="720" cy="430" r="120" fill="#0b1226"/><circle cx="720" cy="430" r="120" fill="none" stroke="url(#gold)" stroke-width="6"/>
      <circle cx="720" cy="430" r="44" fill="url(#gold)"/>
      <path d="${gearPath(330, 650, 150, 12, 26)}" fill="none" stroke="url(#gold)" stroke-width="5" opacity=".8"/>
      <circle cx="330" cy="650" r="54" fill="none" stroke="url(#gold)" stroke-width="5" opacity=".8"/>
      <rect x="140" y="150" width="300" height="120" rx="14" fill="none" stroke="#e6c27a" stroke-opacity=".5" stroke-dasharray="8 8"/>
      <text x="160" y="200" font-family="Georgia, serif" font-size="30" fill="#f1dcaa">PRECISION</text>
      <text x="160" y="240" font-family="Georgia, serif" font-size="30" fill="#f1dcaa" font-style="italic">press parts</text>`;
    return s;
  },
  eggs: () => {
    const r = rng(7);
    let s = '';
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 7; col++) {
        const cx = 140 + col * 160 + (row % 2) * 80;
        const cy = 160 + row * 150;
        const lit = r() > 0.72;
        s += `<ellipse cx="${cx}" cy="${cy}" rx="52" ry="66" fill="${lit ? 'url(#gold)' : '#f6f1e6'}" opacity="${lit ? 1 : 0.14 + r() * 0.2}"/>`;
      }
    }
    s += `<rect x="760" y="640" width="360" height="170" rx="22" fill="#0b1226" stroke="url(#gold)" stroke-width="2"/>
      <text x="790" y="690" font-family="Arial" font-size="20" fill="#e6c27a" letter-spacing="3">TODAY'S RATE · 7:00 AM</text>
      <text x="790" y="770" font-family="Georgia, serif" font-size="64" fill="#f7ecd2">₹ 5.40</text>`;
    return s;
  },
  plywood: () => {
    let s = '';
    const colors = ['#e6c27a', '#c9972c', '#d9a947', '#8f6a1c', '#f1dcaa', '#a97b1f'];
    for (let i = 0; i < 9; i++) {
      const y = 200 + i * 58;
      const x = 180 + i * 22;
      s += `<g transform="skewX(-18)"><rect x="${x + 120}" y="${y}" width="720" height="44" rx="6" fill="${colors[i % colors.length]}" opacity="${0.55 + (i % 3) * 0.15}"/>`;
      for (let g = 0; g < 6; g++) {
        s += `<path d="M${x + 140 + g * 110} ${y + 8} q 30 14 60 0 t 60 0" fill="none" stroke="#0b1226" stroke-opacity=".25" stroke-width="2"/>`;
      }
      s += `</g>`;
    }
    s += `<text x="120" y="130" font-family="Georgia, serif" font-size="46" fill="#f1dcaa" font-style="italic">Finish by finish.</text>`;
    return s;
  },
  autoparts: () => {
    let s = `<rect x="120" y="140" width="960" height="620" rx="28" fill="#0b1226" stroke="#e6c27a" stroke-opacity=".35"/>`;
    const bars = [52, 68, 61, 80, 74, 88, 70, 92, 84, 77];
    bars.forEach((h, i) => {
      const bh = h * 4.2;
      s += `<rect x="${190 + i * 84}" y="${700 - bh}" width="50" height="${bh}" rx="8" fill="url(#gold)" opacity="${0.55 + i * 0.045}"/>`;
    });
    s += `<polyline points="${bars.map((h, i) => `${215 + i * 84},${660 - h * 4.2}`).join(' ')}" fill="none" stroke="#f7ecd2" stroke-width="4"/>`;
    for (let i = 0; i < 3; i++) {
      const x = 200 + i * 300;
      s += `<rect x="${x}" y="180" width="260" height="90" rx="16" fill="#1b2a52"/><text x="${x + 22}" y="216" font-family="Arial" font-size="16" fill="#aab2c8" letter-spacing="2">${['OUTPUT', 'REJECTION', 'ATTENDANCE'][i]}</text><text x="${x + 22}" y="254" font-family="Arial" font-size="30" font-weight="bold" fill="#f7ecd2">${['12,480', '1.8%', '96%'][i]}</text>`;
    }
    s += `<path d="M1010 760 l40 -24 l40 24 v46 l-40 24 l-40 -24z" fill="none" stroke="url(#gold)" stroke-width="5"/>`;
    return s;
  },
  exports: () => {
    let s = `<circle cx="600" cy="450" r="300" fill="#0b1226" stroke="url(#gold)" stroke-width="3"/>`;
    for (let i = 1; i < 6; i++) s += `<ellipse cx="600" cy="450" rx="${i * 55}" ry="300" fill="none" stroke="#e6c27a" stroke-opacity=".28"/>`;
    for (let i = 1; i < 6; i++) {
      const y = 150 + i * 100;
      const rx = Math.sqrt(Math.max(0, 300 ** 2 - (y - 450) ** 2));
      s += `<ellipse cx="600" cy="${y}" rx="${rx}" ry="${rx * 0.12}" fill="none" stroke="#e6c27a" stroke-opacity=".22"/>`;
    }
    const arcs = [
      [460, 380, 900, 250],
      [520, 520, 1050, 600],
      [640, 340, 220, 230],
    ];
    arcs.forEach(([x1, y1, x2, y2]) => {
      s += `<path d="M${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 220} ${x2} ${y2}" fill="none" stroke="url(#gold)" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
        <circle cx="${x2}" cy="${y2}" r="12" fill="url(#gold)"/><circle cx="${x1}" cy="${y1}" r="8" fill="#f7ecd2"/>`;
    });
    return s;
  },
  dealer: () => {
    let s = '';
    for (let i = 0; i < 3; i++) {
      const x = 320 + i * 70;
      const y = 140 + i * 50;
      s += `<g transform="rotate(${-8 + i * 6} ${x + 220} ${y + 300})"><rect x="${x}" y="${y}" width="440" height="580" rx="20" fill="${i === 2 ? '#f6f1e6' : '#1b2a52'}" opacity="${i === 2 ? 1 : 0.7}" stroke="url(#gold)" stroke-width="2"/></g>`;
    }
    const x = 460;
    const y = 240;
    s += `<g transform="rotate(4 680 540)">
      <text x="${x + 30}" y="${y + 60}" font-family="Georgia, serif" font-size="34" fill="#152142">TAX INVOICE</text>
      <rect x="${x + 30}" y="${y + 84}" width="120" height="6" rx="3" fill="#c9972c"/>`;
    for (let r = 0; r < 6; r++) {
      s += `<rect x="${x + 30}" y="${y + 130 + r * 44}" width="220" height="12" rx="6" fill="#152142" opacity=".18"/><rect x="${x + 300}" y="${y + 130 + r * 44}" width="80" height="12" rx="6" fill="#152142" opacity=".3"/>`;
    }
    s += `<rect x="${x + 30}" y="${y + 420}" width="350" height="56" rx="12" fill="#152142"/><text x="${x + 50}" y="${y + 456}" font-family="Arial" font-size="20" font-weight="bold" fill="#e6c27a">Sent on WhatsApp ✓</text></g>`;
    return s;
  },
};

for (const [name, fn] of Object.entries(art)) {
  writeFileSync(join(root, 'work', `${name}.svg`), frame(W, H, fn()));
}

// ── OG image ──────────────────────────────────────────────
const og = frame(
  1200,
  630,
  `<circle cx="960" cy="300" r="230" fill="none" stroke="url(#gold)" stroke-width="2" opacity=".5"/>
   <circle cx="960" cy="300" r="300" fill="none" stroke="#e6c27a" stroke-opacity=".2" stroke-dasharray="4 10"/>
   <rect x="895" y="150" width="130" height="20" rx="10" fill="url(#gold)"/>
   <ellipse cx="960" cy="320" rx="78" ry="92" fill="none" stroke="url(#gold)" stroke-width="26"/>
   <text x="80" y="140" font-family="Arial" font-size="20" font-weight="bold" letter-spacing="6" fill="#e6c27a">NUVŌ BUSINESS SOLUTIONS</text>
   <text x="80" y="270" font-family="Georgia, serif" font-size="76" fill="#eef0f6">Your business does</text>
   <text x="80" y="360" font-family="Georgia, serif" font-size="76" fill="#eef0f6">good work.</text>
   <text x="80" y="450" font-family="Georgia, serif" font-size="58" font-style="italic" fill="#e6c27a">We make sure the world knows it.</text>
   <text x="80" y="540" font-family="Arial" font-size="22" fill="#aab2c8">Websites · WhatsApp · Excel systems · AI automation — Pune, India</text>`
);
await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile(join(root, 'og-image.jpg'));

// ── Favicons ──────────────────────────────────────────────
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1dcaa"/><stop offset=".5" stop-color="#c9972c"/><stop offset="1" stop-color="#8f6a1c"/></linearGradient></defs><circle cx="32" cy="32" r="31" fill="#0b1226"/><circle cx="32" cy="32" r="29.5" fill="none" stroke="url(#g)" stroke-width="2"/><rect x="21" y="15" width="22" height="3.4" rx="1.7" fill="url(#g)"/><ellipse cx="32" cy="37" rx="11.5" ry="13" fill="none" stroke="url(#g)" stroke-width="4.4"/></svg>`;
await sharp(Buffer.from(fav)).resize(32, 32).png().toFile(join(root, 'favicon-32.png'));
await sharp(Buffer.from(fav)).resize(180, 180).png().toFile(join(root, 'apple-touch-icon.png'));

console.log('✓ Assets generated in /public');
