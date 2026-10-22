// Phone-sized copies of every site video: public/media/<name>-m.mp4
// Phones (<= 900 px wide) and data-saver visitors get these automatically (see components/ui/Video.jsx);
// desktops keep the full-resolution originals. 960 px wide is still crisp on a phone screen.
//
// Run:  node scripts/build-mobile-videos.mjs
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media');
const files = readdirSync(dir).filter((f) => f.endsWith('.mp4') && !f.endsWith('-m.mp4'));
let before = 0, after = 0;
for (const f of files) {
  const src = join(dir, f);
  const dest = join(dir, f.replace(/\.mp4$/, '-m.mp4'));
  // portrait clips (journey card) keep a 540 px width, landscape clips 960 px
  const portrait = /journey-4/.test(f);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src, '-an', '-vf', `scale=${portrait ? 540 : 960}:-2:flags=lanczos`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-maxrate', '1500k', '-bufsize', '3M', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
  before += statSync(src).size; after += statSync(dest).size;
  console.log(`✓ ${f.padEnd(26)} ${(statSync(src).size / 1e6).toFixed(1).padStart(5)} MB → ${(statSync(dest).size / 1e6).toFixed(1).padStart(4)} MB`);
}
console.log(`total ${(before / 1e6).toFixed(0)} MB → ${(after / 1e6).toFixed(0)} MB on phones`);
