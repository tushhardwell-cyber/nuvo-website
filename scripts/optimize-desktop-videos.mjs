// Desktop video delivery profile: every video capped at 1920x1080 / 30 fps and ~3 Mbps (H.264, crf 23).
// A 4K or 8-Mbps clip stalls on ordinary broadband and is heavy to decode; at 1080p/3 Mbps it still looks HD
// on desktop screens and starts playing quickly. Sources come from /resources.
//
// Run:  node scripts/optimize-desktop-videos.mjs   (then node scripts/build-mobile-videos.mjs)
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jobs = [
  ['WhatsApp Video 2026-10-14 at 6.53.24 PM.mp4', 'hero-earth-hd'], // was the 4K original
  ['12815787-uhd_3840_2160_24fps.mp4', 'process-night-hd'], // was the 4K original
  ['Animated Travel Vlog Youtube Video Intro (1).mp4', 'process-road-hd'],
  ['Light Blue Music Ocean Waves Inspirational Video.mp4', 'test-ocean'],
  ['Green Serene Nature Landscape Video.mp4', 'work-nature'],
  ['Blue Black Modern Minimalist Cinematic Space Documentary Intro Video.mp4', 'catalog-bg'],
  ['WhatsApp Video 2026-10-14 at 6.51.15 PM.mp4', 'about-skyline-hd'],
];
for (const [file, name] of jobs) {
  const dest = join(root, 'public', 'media', `${name}.mp4`);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', join(root, 'resources', file), '-an', '-vf', 'scale=1920:-2:flags=lanczos:force_original_aspect_ratio=decrease,fps=30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-maxrate', '3000k', '-bufsize', '6000k', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
  console.log(`✓ ${name}.mp4  ${(statSync(dest).size / 1e6).toFixed(1)} MB`);
}
