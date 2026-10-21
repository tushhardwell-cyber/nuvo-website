// Vite plugin: after `vite build`, writes a real HTML file for every route
// (dist/services/index.html …) with its own <title>, description, canonical,
// Open Graph / Twitter tags, JSON-LD and a crawlable text summary — so search
// engines, social-preview bots and AI crawlers that don't run JavaScript still
// see correct, unique content. Also generates sitemap.xml and robots.txt from
// the configured site URL.
//
// Per-page copy lives in src/data/seoRoutes.js (shared with the runtime <Seo>).

import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

async function loadModule(entry) {
  const out = await build({ entryPoints: [join(root, entry)], bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent' });
  const code = out.outputFiles[0].text;
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}

export default function nuvoSeoStatic() {
  let outDir = join(root, 'dist');
  return {
    name: 'nuvo-seo-static',
    apply: 'build',
    configResolved(cfg) {
      outDir = join(cfg.root, cfg.build.outDir);
    },
    async closeBundle() {
      const { seoRoutes, seoFaqs } = await loadModule('src/data/seoRoutes.js');
      const { site } = await loadModule('src/data/site.js');
      const origin = (process.env.SITE_URL || site.url).replace(/\/$/, '');
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      const image = `${origin}/og-image.jpg`;
      const today = new Date().toISOString().slice(0, 10);

      const orgLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfessionalService',
            '@id': `${origin}/#org`,
            name: 'Nuvō Business Solutions',
            alternateName: 'Nuvō',
            url: `${origin}/`,
            logo: `${origin}/apple-touch-icon.png`,
            image,
            description:
              'Consultancy and software for growing businesses: strategy, branding, websites, digital marketing, business systems and AI automation.',
            slogan: 'Unconstrain your business. Systematize your growth.',
            email: site.contact.email,
            telephone: site.contact.phone,
            address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
            areaServed: ['Worldwide'],
            contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: site.contact.phone, email: site.contact.email, availableLanguage: ['English'] }],
            sameAs: Object.values(site.socials || {}).filter(Boolean),
          },
          { '@type': 'WebSite', '@id': `${origin}/#site`, url: `${origin}/`, name: 'Nuvō Business Solutions', inLanguage: 'en', publisher: { '@id': `${origin}/#org` } },
        ],
      };

      const links = seoRoutes
        .filter((r) => r.priority >= 0.7)
        .map((r) => `<li><a href="${r.path}">${esc(r.h1)}</a></li>`)
        .join('');

      const pageHtml = (r) => {
        const url = r.path === '/' ? `${origin}/` : `${origin}${r.path}`;
        const ld = [];
        if (r.path === '/') ld.push(orgLd);
        else {
          const crumbs = [{ n: 'Home', u: `${origin}/` }];
          if (r.service) crumbs.push({ n: 'Services', u: `${origin}/services` });
          crumbs.push({ n: r.h1, u: url });
          ld.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.n, item: c.u })),
          });
        }
        if (r.service)
          ld.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: r.h1,
            description: r.summary,
            url,
            provider: { '@id': `${origin}/#org` },
            areaServed: ['Worldwide'],
          });
        if (r.faq)
          ld.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: seoFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          });

        const head = [
          `<title>${esc(r.title)}</title>`,
          `<meta data-seo-static name="description" content="${esc(r.description)}" />`,
          `<meta data-seo-static name="robots" content="index, follow, max-image-preview:large" />`,
          `<link data-seo-static rel="canonical" href="${url}" />`,
          `<meta data-seo-static property="og:type" content="website" />`,
          `<meta data-seo-static property="og:site_name" content="Nuvō Business Solutions" />`,
          `<meta data-seo-static property="og:locale" content="en_US" />`,
          `<meta data-seo-static property="og:title" content="${esc(r.title)}" />`,
          `<meta data-seo-static property="og:description" content="${esc(r.description)}" />`,
          `<meta data-seo-static property="og:url" content="${url}" />`,
          `<meta data-seo-static property="og:image" content="${image}" />`,
          `<meta data-seo-static property="og:image:width" content="1200" />`,
          `<meta data-seo-static property="og:image:height" content="630" />`,
          `<meta data-seo-static name="twitter:card" content="summary_large_image" />`,
          `<meta data-seo-static name="twitter:title" content="${esc(r.title)}" />`,
          `<meta data-seo-static name="twitter:description" content="${esc(r.description)}" />`,
          `<meta data-seo-static name="twitter:image" content="${image}" />`,
          ...ld.map((o) => `<script type="application/ld+json">${json(o)}</script>`),
        ].join('\n    ');

        const faq = r.faq ? `<h2>Frequently asked questions</h2>${seoFaqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
        const body = `<div class="seo-static" data-seo-static><h1>${esc(r.h1)}</h1><p>${esc(r.summary)}</p>${faq}<nav aria-label="Site"><ul>${links}</ul></nav></div>`;

        return template
          .replace(/<title>[\s\S]*?<\/title>/, '')
          .replace(/<meta data-seo-static[^>]*>\s*/g, '')
          .replace('<!--seo-head-->', head)
          .replace('<!--seo-body-->', body);
      };

      for (const r of seoRoutes) {
        const html = pageHtml(r);
        if (r.path === '/') writeFileSync(join(outDir, 'index.html'), html);
        else {
          mkdirSync(join(outDir, r.path), { recursive: true });
          writeFileSync(join(outDir, r.path, 'index.html'), html);
        }
      }

      // 404 page: never indexed
      const nf = template
        .replace('<!--seo-head-->', '<meta name="robots" content="noindex, follow" />')
        .replace(/<meta data-seo-static[^>]*>\s*/g, '')
        .replace('<!--seo-body-->', '');
      writeFileSync(join(outDir, '404.html'), nf);

      const urls = seoRoutes
        .map((r) => `  <url><loc>${r.path === '/' ? origin + '/' : origin + r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
        .join('\n');
      writeFileSync(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
      writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
      console.log(`✓ nuvo-seo-static: ${seoRoutes.length} pages, sitemap.xml, robots.txt → ${origin}`);
    },
  };
}
