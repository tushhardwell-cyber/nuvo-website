// Converts the raw files in /resources into web-ready media in /public/media.
// Videos keep their original aspect ratio (no stretching/cropping), lose audio,
// get faststart for instant playback, and a poster image each.
//
// Run:  node scripts/build-media.mjs

import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => join(root, 'resources', f);
const out = (f) => join(root, 'public', 'media', f);
mkdirSync(join(root, 'public', 'media'), { recursive: true });

const videos = [
  // [source, output name, width, crf]
  ['WhatsApp Video 2026-10-14 at 6.53.24 PM.mp4', 'hero-earth', 1600, 25],
  ['WhatsApp Video 2026-10-14 at 6.53.24 PM (1).mp4', 'automate-particles', 1280, 30],
  ['WhatsApp Video 2026-10-14 at 6.51.21 PM.mp4', 'value-counter', 1280, 27],
  ['WhatsApp Video 2026-10-14 at 6.51.15 PM.mp4', 'about-skyline', 1280, 27],
];

for (const [file, name, width, crf] of videos) {
  const mp4 = out(`${name}.mp4`);
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', src(file),
    '-an', '-vf', `scale=${width}:-2:flags=lanczos,fps=30`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', mp4,
  ]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', mp4, '-frames:v', '1', '-q:v', '4', out(`${name}-poster.jpg`)]);
  console.log(`✓ ${name}.mp4  ${(statSync(mp4).size / 1e6).toFixed(1)} MB`);
}

// Hero background: kept at the ORIGINAL resolution and bitrate (3840x2160,
// 29.97 fps). Streams are copied, not re-encoded, so quality is untouched;
// only faststart is added so it begins playing before the file finishes loading.
{
  const out4k = out('hero-earth-4k.mp4');
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error',
    '-i', src('WhatsApp Video 2026-10-14 at 6.53.24 PM.mp4'),
    '-c', 'copy', '-movflags', '+faststart', out4k,
  ]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', out4k, '-frames:v', '1', '-q:v', '2', out('hero-earth-poster.jpg')]);
  console.log(`✓ hero-earth-4k.mp4  ${(statSync(out4k).size / 1e6).toFixed(1)} MB (original quality)`);
}

// About background: original 1920x1080 video stream copied as-is (no re-encode,
// audio dropped, faststart added).
{
  const hd = out('about-skyline-hd.mp4');
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', src('WhatsApp Video 2026-10-14 at 6.51.15 PM.mp4'),
    '-an', '-c:v', 'copy', '-movflags', '+faststart', hd,
  ]);
  console.log(`✓ about-skyline-hd.mp4  ${(statSync(hd).size / 1e6).toFixed(1)} MB (original quality)`);
}

// Work page background: the supplied 1920x1080 / 30 fps nature video. The video
// stream is COPIED as-is (no re-encode, no scaling, no compression); only the
// silent audio track is dropped and fast-start is added.
{
  const nature = out('work-nature.mp4');
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', src('Green Serene Nature Landscape Video.mp4'),
    '-an', '-c:v', 'copy', '-movflags', '+faststart', nature,
  ]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', nature, '-frames:v', '1', '-q:v', '2', out('work-nature-poster.jpg')]);
  console.log('✓ work-nature.mp4  ' + (statSync(nature).size / 1e6).toFixed(1) + ' MB (original quality)');
}

// Process + Test-yourself heroes: 1920x1080 / 30 fps. The sources are 30-45 MB, over Cloudflare Pages'
// 25 MB per-file limit, so both are re-encoded at FULL 1080p with high-quality H.264 (crf 22, 5 Mbps cap):
// visually identical, ~19 MB each. Audio is dropped, faststart added.
for (const [file, name] of [
  ['Animated Travel Vlog Youtube Video Intro (1).mp4', 'process-road'],
  ['Light Blue Music Ocean Waves Inspirational Video.mp4', 'test-ocean'],
]) {
  const dest = out(`${name === 'process-road' ? 'process-road-hd' : name}.mp4`); // new name so CDN caches never serve an old/missing copy
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src(file), '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-maxrate', '5M', '-bufsize', '10M', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', dest, '-frames:v', '1', '-q:v', '2', out(`${name}-poster.jpg`)]);
  console.log(`✓ ${name}.mp4  ${(statSync(dest).size / 1e6).toFixed(1)} MB (1080p, Cloudflare-safe)`);
}

// Process journey cards: photos resized to display size (cards are ~300px wide, so
// 900px keeps them sharp on 3x screens); the portrait video is scaled to 720x1280.
for (const [file, name] of [
  ['pexels-sedanur-kunuk-78972032-29866935.jpg', 'journey-1'],
  ['pexels-alexandr-shuvalov-1081264256-40090557.jpg', 'journey-2'],
  ['pexels-pth686817-17286545.jpg', 'journey-3'],
]) {
  await sharp(src(file)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 84 }).toFile(out(name + '.webp'));
  console.log('✓ ' + name + '.webp');
}
{
  const dest = out('journey-4.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src('17038255_2160_3840_30fps.mp4'), '-an', '-vf', 'scale=720:-2:flags=lanczos',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', dest, '-frames:v', '1', '-q:v', '3', out('journey-4-poster.jpg')]);
  console.log('✓ journey-4.mp4  ' + (statSync(dest).size / 1e6).toFixed(1) + ' MB');
}

// Process "Let's talk" side image: kept at its full original size (1080x1350), no crop.
await sharp(src('Green and Gray Calm Statue Instagram Post.png')).webp({ quality: 92 }).toFile(out('talk-peace.webp'));
console.log('✓ talk-peace.webp');

// "Who we are" background: misty forest, resized to 2400px (it is a soft, dark photo,
// so this stays sharp on full-width screens).
await sharp(src('pexels-berke-cetin-2156615637-37265747.jpg')).resize({ width: 2400 }).webp({ quality: 80 }).toFile(out('who-forest.webp'));
console.log('✓ who-forest.webp');

// Process "Behind the scenes" background: original 3840x2160 / 24 fps stream copied
// as-is (no re-encode, no scaling); audio dropped, faststart added.
{
  const dest = out('process-night.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src('12815787-uhd_3840_2160_24fps.mp4'), '-an', '-c:v', 'copy', '-movflags', '+faststart', dest]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '2', '-i', dest, '-frames:v', '1', '-q:v', '2', out('process-night-poster.jpg')]);
  console.log('✓ process-night.mp4  ' + (statSync(dest).size / 1e6).toFixed(1) + ' MB (original quality)');
}

// Work project cards: one video per project (replaces the generated artwork).
// Cards are ~300-500px wide, so 1280x720 is ample; long clips are capped at 14s.
for (const [file, name, maxSec] of [
  ['12984011_1920_1080_25fps.mp4', 'work-autoparts', 14],
  ['13691885-hd_1920_1080_25fps.mp4', 'work-plywood', 14],
  ['5116399-hd_1920_1080_25fps.mp4', 'work-eggs', 14],
  ['13962228_3840_2160_60fps.mp4', 'work-exports', 14],
  ['8478741-uhd_3840_2160_25fps.mp4', 'work-dealer', 14],
]) {
  const dest = out(name + '.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src(file), '-t', String(maxSec), '-an',
    '-vf', 'scale=1280:-2:flags=lanczos,fps=30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dest]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', dest, '-frames:v', '1', '-q:v', '3', out(name + '-poster.jpg')]);
  console.log('✓ ' + name + '.mp4  ' + (statSync(dest).size / 1e6).toFixed(1) + ' MB');
}

const images = [
  // [source, output name, max width]
  ['WhatsApp Image 2026-10-14 at 6.24.35 PM (2).jpeg', 'who-consultation', 1400],
  ['WhatsApp Image 2026-10-14 at 6.24.36 PM (1).jpeg', 'problem-overwhelmed', 768],
  ['WhatsApp Image 2026-10-14 at 6.24.36 PM (2).jpeg', 'presence-storefront', 768],
  ['WhatsApp Image 2026-10-14 at 6.24.36 PM (3).jpeg', 'desk-morning', 512],
  ['WhatsApp Image 2026-10-14 at 6.24.36 PM.jpeg', 'sector-foundry', 400],
];
// letterbox bars baked into some source images: [top, bottom] px to trim
const TRIM = { 'presence-storefront': [68, 26] };
for (const [file, name, w] of images) {
  const meta = await sharp(src(file)).metadata();
  const [tt, tb] = TRIM[name] || [0, 0];
  await sharp(src(file))
    .extract({ left: 0, top: tt, width: meta.width, height: meta.height - tt - tb }).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out(`${name}.webp`));
  console.log(`✓ ${name}.webp`);
}

// Workshop photo: remove the generator watermark (bottom-right ✦) with a feathered,
// heavily blurred patch so no hard edge is visible.
{
  const file = src('WhatsApp Image 2026-10-14 at 6.24.36 PM (4).jpeg');
  const size = 170;
  const box = { left: 1288 - size / 2, top: 648 - size / 2, width: size, height: size };
  const blurred = await sharp(file).extract(box).blur(22).ensureAlpha().raw().toBuffer();
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - size / 2, y - size / 2) / (size / 2);
      const a = Math.max(0, Math.min(1, (1 - d) / 0.45)); // solid centre, soft 45% falloff
      blurred[(y * size + x) * 4 + 3] = Math.round(a * 255);
    }
  }
  await sharp(file)
    .composite([{ input: blurred, raw: { width: size, height: size, channels: 4 }, left: box.left, top: box.top }])
    .webp({ quality: 84 })
    .toFile(out('work-workshop.webp'));
  console.log('✓ work-workshop.webp');
}

// Hetvik Components — real photos of the site (the only genuine client project).
// Save the two photos in /resources as  hetvik-front.jpg  (building + sign)  and
// hetvik-floor.jpg  (shop floor), then run `npm run media`. Until they exist the previous
// workshop image is used so nothing on the site breaks.
{
  const { existsSync, copyFileSync } = await import('node:fs');
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  for (const [name, w] of [['hetvik-front', 1600], ['hetvik-floor', 1600]]) {
    const found = exts.map((e) => src(`${name}.${e}`)).find((p) => existsSync(p));
    if (found) {
      await sharp(found).resize({ width: w, withoutEnlargement: true }).webp({ quality: 84 }).toFile(out(`${name}.webp`));
      console.log(`✓ ${name}.webp (from your photo)`);
    } else if (!existsSync(out(`${name}.webp`))) {
      copyFileSync(out('work-workshop.webp'), out(`${name}.webp`));
      console.log(`• ${name}.webp — placeholder (add resources/${name}.jpg)`);
    }
  }
}

// Services "Full catalog" background: original 1920x1080 / 30 fps stream copied as-is (no re-encode).
{
  const dest = out('catalog-bg.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src('Blue Black Modern Minimalist Cinematic Space Documentary Intro Video.mp4'), '-an', '-c:v', 'copy', '-movflags', '+faststart', dest]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', dest, '-frames:v', '1', '-q:v', '3', out('catalog-bg-poster.jpg')]);
  console.log('✓ catalog-bg.mp4  ' + (statSync(dest).size / 1e6).toFixed(1) + ' MB (original quality)');
}

// Services hero collage: three photos (WhatsApp, reports dashboard, sunset field).
for (const [file, name, w] of [
  ['pexels-pixabay-267392.jpg', 'svc-hero-whatsapp', 1500],
  ['pexels-asphotography-95916.jpg', 'svc-hero-reports', 1500],
  ['pexels-alexandr-shuvalov-1081264256-40090557.jpg', 'svc-hero-sunset', 1200],
]) {
  await sharp(src(file)).resize({ width: w }).webp({ quality: 82 }).toFile(out(name + '.webp'));
  console.log('✓ ' + name + '.webp');
}

// Founder portrait for the About page: square crop around the consultant (left) from the consultation photo.
{
  const f = src('WhatsApp Image 2026-10-14 at 6.24.35 PM (2).jpeg');
  const m = await sharp(f).metadata();
  const size = Math.min(m.width, m.height, Math.round(m.height * 0.64));
  await sharp(f).extract({ left: Math.round(m.width * 0.07), top: Math.round(m.height * 0.02), width: size, height: size }).resize(900, 900).webp({ quality: 86 }).toFile(out('founder.webp'));
  console.log('✓ founder.webp');
}
