// Lists strings in src/data/*.js that have no translation yet (run after editing copy: node scripts/i18n-missing.mjs)
import { build } from 'esbuild';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

process.chdir('d:/nuvo website');
const files = ['site', 'faq', 'packs', 'useCases', 'services', 'process', 'work', 'tools', 'selfCheck', 'testimonials', 'planMedia', 'seoRoutes'];
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const es = JSON.parse(fs.readFileSync('src/i18n/dist/es.json', 'utf8'));
const seen = new Set();
const walk = (v, key = '') => {
  if (typeof v === 'string') {
    if (/\p{L}{3}/u.test(v) && !/^(\/|https?:|#)/.test(v) && !/^[a-z0-9_-]+$/.test(v) && !/@/.test(v)) seen.add(norm(v));
  } else if (Array.isArray(v)) v.forEach((x) => walk(x));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (!['slug', 'icon', 'image', 'video', 'kind', 'src', 'to', 'tone', 'pos', 'brand', 'accent', 'visual', 'phone', 'whatsapp', 'url', 'email', 'path', 'poster'].includes(k)) walk(x, k); }
};
for (const f of files) {
  const out = await build({ entryPoints: [`src/data/${f}.js`], bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent' });
  const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
  for (const v of Object.values(mod)) if (typeof v !== 'function') walk(v);
}
const miss = [...seen].filter((s) => !es[s]);
console.log(miss.length);
console.log(miss.join('\n'));
