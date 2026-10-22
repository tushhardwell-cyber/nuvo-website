# Nuvō Business Solutions — website

A cinematic, multipage marketing site for **Nuvō — The Complete Business Transformation Agency** (Pune).

**Stack:** React 18 · Vite 5 · React Router · GSAP · Framer Motion · Lenis smooth scroll · react-helmet-async · Groq API (assistant, server-side)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run assets     # regenerate OG image, favicons and /public/work placeholder art
npm run media      # convert local /resources photos & videos into web-ready /public/media
npm run type       # regenerate src/styles/type.css (supporting text +2px)
```

## Before launch — checklist

| What | Where |
| --- | --- |
| Email, phone, WhatsApp number | `src/data/site.js` → `contact` |
| Live domain (canonical + OG URLs) | `src/data/site.js` → `url`, `public/robots.txt`, `public/sitemap.xml` |
| Contact form backend (optional) | `src/data/site.js` → `formEndpoint` (Formspree / Web3Forms / own API). Empty = form opens WhatsApp pre-filled |
| Background videos (optional) | `public/media/` + `src/data/site.js` → `media` (see `public/media/README.txt`) |
| "Our work" images | replace files in `public/work/` (same names) or edit `image` paths in `src/data/work.js` |
| Verify case-study claims | `src/data/work.js` — every entry is presented as a delivered project |
| Legal text | `src/pages/Legal.jsx` (starter copy — have it reviewed) |

## Where the content lives

All copy is in `src/data/` — edit text without touching components:

- `site.js` — contact, nav, hero ticker, Mirror lines, stats
- `packs.js` — the 4 packs, every service, deliverables, smart features, timelines
- `useCases.js` — the workflow cards (`home: true` shows on the homepage)
- `work.js` — delivered projects (all shown as case studies)
- `faq.js` — questions (`home: true` shows on the homepage)
- `services.js` — 31-service catalogue, sectors, segments, price comparison, differentiators
- `tools.js` — integrations shown in the orbit, marquees and tool grid
- `process.js` — funnel, 5-step build process, client journey

## Pages

`/` · `/services` · `/services/:slug` (digital-foundation, smart-operations, automation-ai, custom-software) · `/work` (tabs: what we automate · projects) · `/process` · `/about` · `/resources` · `/contact` · `/privacy` · `/terms`

## Signature moments

- **Cinematic intro** (`components/intro/CinematicIntro.jsx`) — documentary montage → "Enough." → NUVO forged in gold → macron drops to lock the Ō → frame splits open. Plays once per session, skippable (button / Esc), skipped for reduced-motion users.
- **Liquid backdrop** (`components/three/LiquidBackdrop.jsx`) — a tiny raw-WebGL shader that plays like a slow background film; swapped for a real video when one is configured.
- **Owner voices** (on /about) — five sentences owners say, each sharpening and "inking in" as you scroll past. No pinning, no sliding.
- **The Card Game** — a hand of problem cards; flip one, or play the Ace of NUVŌ to flip them all.
- **Hero video** — animated `public/media/hero-bg.webp` starts as a framed panel beside the headline and zooms to full screen as you scroll down (and back as you scroll up). On mobile it is a card that zooms in/out while scrolling.
- **"Test yourself" assistant** (`components/layout/AskBot.jsx`) — floating button on every page: runs the 8-question readiness test in-chat and answers questions with Claude.
- Scroll-lit manifesto, orbiting integrations hub, 3D tilt cards, magnetic buttons, page-transition curtains.

## Media & brand

- Original photos/videos live in `resources/` locally and are not included in the public repository. Supply those source files separately to regenerate media with `npm run media` (scripts/build-media.mjs). Generated videos in `public/media` are muted and faststart-enabled; the process hero is scaled and re-encoded for web delivery.
- Brand: navy first, copper for icons/accents, gold only on the Ō and a few highlights. No prices anywhere — plans are scoped and quoted after a free audit.
- Tool logos: Simple Icons (CC0) via `src/data/brands.js`; tools Simple Icons does not carry use a brand-colour tile.

## Photo credits

The six core-service card photos (`public/media/core-*.webp`) are free-to-use photos from Pexels (pexels.com/license — no attribution required): photo IDs 5439484, 7598018, 326514, 267350, 7109291 and 7693707.

## Theme

Creamy-white gradient by default, with navy feature sections (hero, use cases, CTA, footer). Colours are tokens in `src/styles/global.css` — anything inside `.theme-dark` / `.on-navy` switches to the navy palette automatically. Nav and mega-menu styles live in `src/styles/theme.css`; mega-menu items are in `src/data/site.js` → `megaMenu`.

## "Test yourself" assistant (Claude)

The floating assistant calls `POST /api/chat`, which runs server-side (the API key never reaches the browser):

- Shared handler: `server/nuvoBot.mjs` (model `claude-opus-5-5`, low effort for short chat replies, server-side refusal fallback enabled, system prompt built from `src/data/*`)
- Vercel: `api/chat.js` · Netlify: `netlify/functions/chat.mjs` · Local: Vite middleware in `vite.config.js`

Setup: add `GROQ_API_KEY` to your hosting environment variables (and to `.env.local` for local dev — see `.env.example`). Without a key the assistant still works: the readiness test runs fully in the browser and questions are answered from the site FAQ.

Cost guardrails: conversations are capped at 20 messages / 12,000 characters. For a busy public site, also add rate limiting at your host (e.g. Vercel Firewall rules or Netlify rate limiting).

## Deploy

Static hosting — `vercel.json` and `netlify.toml` already include SPA rewrites. Build command `npm run build`, output `dist`.

Accessibility & performance: respects `prefers-reduced-motion`, keyboard-navigable, skip link, WebGL paused off-screen, route-level code splitting.

## SEO, leads & analytics

- **Per-page SEO** lives in `src/data/seoRoutes.js` (title, description, summary). `npm run build` runs
  `scripts/seo-static-plugin.mjs`, which writes a real HTML file per route (own title, description,
  canonical, Open Graph, JSON-LD, crawlable text), plus `sitemap.xml` and `robots.txt`.
  The domain comes from `site.url` (override at build time with `SITE_URL=https://…`).
- **Lead capture:** the contact form posts to `/api/lead` (Vercel / Netlify / dev server). Set **one** host
  environment variable — `WEB3FORMS_KEY` (free, emails each lead) or `LEAD_WEBHOOK_URL` (Zapier, Make,
  Slack, Formspree …). Without either, the form still opens WhatsApp as before.
- **Analytics:** set `VITE_GA_ID=G-XXXXXXX` to enable Google Analytics 4 (page views, call / WhatsApp /
  email clicks, `generate_lead`). With no ID nothing loads.
- Still to add by hand: `site.socials` links, real client quotes and a founder photo/bio (About page).

## Languages (EN · ES · FR · RU · 中文 · DE)

- English is the source text in the code; the other five languages live in `src/i18n/parts/*.mjs`
  (`'English text': ['es', 'fr', 'ru', 'zh', 'de']`), written meaning-first rather than word-for-word.
- `npm run i18n` (runs automatically before `dev` / `build`) turns the parts into `src/i18n/dist/<lang>.json`,
  which are loaded only when a visitor picks that language. The choice is remembered (`?lang=de` also works).
- A DOM translator swaps every rendered text, `alt`, `aria-label` and `placeholder` by exact match;
  headlines (`RevealText`), SEO tags and the chat use `useLang().t()`.
- **When you edit any English copy**, run `node scripts/i18n-missing.mjs` to list strings with no translation,
  then add them to a new part file (and `node scripts/fix-part.mjs <file>` if you write keys as `` `text`: [...] ``).
- The Ask Nuvō assistant answers in the visitor's language when `GROQ_API_KEY` is set; without a key the
  quick-question chips and the readiness test are fully translated, while free typing falls back to a polite
  "ask the team" message.
- Hetvik photos: save the two real photos as `resources/hetvik-front.jpg` and `resources/hetvik-floor.jpg`,
  then run `npm run media`.

## Deploying on Cloudflare (Workers + static assets)

`wrangler.jsonc` serves the built site (`dist/`) and runs `worker/index.js` for `/api/*` only:

| Endpoint | What it does | Secret to add (Cloudflare → Workers → nuvo-website → Settings → Variables and Secrets) |
|---|---|---|
| `POST /api/chat` | Ask Nuvō live AI answers (replies in the visitor's language) | `GROQ_API_KEY` |
| `POST /api/lead` | Contact form → your inbox | `WEB3FORMS_KEY` (free, web3forms.com) **or** `LEAD_WEBHOOK_URL` |

- Build command `npm run build` · deploy command `npx wrangler deploy` (Cloudflare's default for this repo).
- Google Analytics: add `VITE_GA_ID` as a **build** variable (Settings → Build → Variables).
- Every file in `dist/` must stay under 25 MB (Cloudflare's per-file limit). The two big hero videos are
  re-encoded by `npm run media` to ~19 MB each at full 1080p.
- Local test: `npm run build && npx wrangler dev` (put secrets in a git-ignored `.dev.vars` file).
- Without the secrets the site still works: the form opens WhatsApp, the chat answers from the built-in FAQ.

### Video delivery (speed)
- Desktop videos are produced by `node scripts/optimize-desktop-videos.mjs` (1080p, ≤ 30 fps, ~3 Mbps — HD-looking, plays
  smoothly on ordinary broadband; the two former 4K clips are now `hero-earth-hd` / `process-night-hd`).
- Phones, Data Saver and slow links (< 7 Mbps) automatically get `<name>-m.mp4` from `node scripts/build-mobile-videos.mjs`.
- Run both scripts after replacing any video, bump `MEDIA_V` in `components/ui/Video.jsx`, and don't re-run the old video
  blocks of `build-media.mjs` (they would bring back the heavy 4K files).
