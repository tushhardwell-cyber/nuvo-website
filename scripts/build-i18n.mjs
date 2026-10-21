// Builds src/i18n/dist/<lang>.json from the hand-written translation parts.
//
// Each file in src/i18n/parts/*.mjs default-exports an object:
//   { 'English text exactly as it appears on the site': ['es', 'fr', 'ru', 'zh', 'de'], ... }
// (Spanish, French, Russian, Chinese, German — in that order). Lookup keys are whitespace-normalised.
//
// Run:  npm run i18n   (also runs automatically before dev / build)

import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const partsDir = join(root, 'src', 'i18n', 'parts');
const outDir = join(root, 'src', 'i18n', 'dist');
mkdirSync(outDir, { recursive: true });

const LANGS = ['es', 'fr', 'ru', 'zh', 'de'];
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
const out = Object.fromEntries(LANGS.map((l) => [l, {}]));
let entries = 0;
const problems = [];

const files = existsSync(partsDir) ? readdirSync(partsDir).filter((f) => f.endsWith('.mjs')).sort() : [];
for (const f of files) {
  const mod = (await import(pathToFileURL(join(partsDir, f)).href)).default;
  for (const [key, tr] of Object.entries(mod)) {
    entries++;
    if (!Array.isArray(tr) || tr.length !== LANGS.length || tr.some((x) => typeof x !== 'string' || !x.trim())) {
      problems.push(`${f}: bad entry → ${key.slice(0, 60)}`);
      continue;
    }
    LANGS.forEach((l, i) => {
      out[l][norm(key)] = tr[i];
    });
  }
}
for (const l of LANGS) writeFileSync(join(outDir, `${l}.json`), JSON.stringify(out[l]));
console.log(`✓ i18n: ${entries} strings × ${LANGS.length} languages (${files.length} parts)`);
if (problems.length) console.warn(problems.slice(0, 20).join('\n'));

// Composite strings built in code from two translated parts (SEO descriptions of the plan pages:
// `${short} ${tagline}`) — join the two translations so they are found by the same lookup key.
{
  const { packs } = await import(pathToFileURL(join(root, 'src', 'data', 'packs.js')).href);
  let added = 0;
  for (const p of packs) {
    const a = norm(p.short);
    const b = norm(p.tagline);
    const key = norm(`${p.short} ${p.tagline}`).slice(0, 300);
    for (const l of LANGS) {
      if (out[l][a] && out[l][b] && !out[l][key]) {
        out[l][key] = `${out[l][a]} ${out[l][b]}`;
        added++;
      }
    }
  }
  for (const l of LANGS) writeFileSync(join(outDir, `${l}.json`), JSON.stringify(out[l]));
  console.log(`✓ i18n: ${added / LANGS.length} composite strings`);
}
