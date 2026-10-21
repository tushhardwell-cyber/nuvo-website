// Single source for per-page SEO. Used at runtime by <Seo> (defaults) and at build time
// by the `nuvoSeoStatic` Vite plugin, which writes a real HTML file per route (title,
// description, canonical, Open Graph, JSON-LD and a crawlable text summary).
import { packs } from './packs';
import { faqs } from './faq';

export const SITE_DEFAULT_DESCRIPTION =
  'Nuvō is a consultancy and software studio in Pune for growing businesses — strategy, branding, websites, digital marketing, business systems and AI automation.';

const base = [
  {
    path: '/',
    title: 'Nuvō Business Solutions — Websites, Systems & AI Automation | Pune',
    description:
      'Nuvō is a consultancy and software studio for growing businesses — strategy, branding, websites, digital marketing, business systems and AI automation. Based in Pune, working with businesses worldwide.',
    h1: 'Unconstrain your business. Systematize your growth.',
    summary:
      'Nuvō Business Solutions is the complete business transformation agency in Pune: consultancy plus software for growing businesses. We build the website, the Google and WhatsApp presence, the Excel business systems and the AI automation — with a free audit and a fixed quote before any work starts.',
    priority: 1.0,
  },
  {
    path: '/services',
    title: 'Services — websites, business systems & AI automation | Nuvō',
    description:
      'Nuvō’s six core services — strategy, branding, websites, digital marketing, business systems and growth support — and four plans to start with.',
    h1: 'Services',
    summary:
      'Six core services — strategy, branding, websites, digital marketing, business systems and growth support — delivered through four plans, each with a clear timeline and a fixed quote.',
    priority: 0.9,
  },
  ...packs.map((p) => ({
    path: `/services/${p.slug}`,
    title: `${p.name} — Plan ${p.number} | Nuvō`,
    description: `${p.short} ${p.tagline}`.slice(0, 300),
    h1: `${p.name} — Plan ${p.number}`,
    summary: `${p.short} ${p.tagline}`,
    priority: 0.8,
    service: true,
  })),
  {
    path: '/work',
    title: 'Work — what we automate and what we’ve built | Nuvō',
    description:
      'The workflows Nuvō automates for growing businesses, and the projects we have delivered.',
    h1: 'Our work',
    summary:
      'Seventeen everyday workflows we automate for growing businesses, plus the projects we have delivered.',
    priority: 0.8,
  },
  {
    path: '/process',
    title: 'How we work — audit, preview, build, grow | Nuvō',
    description:
      'Free audit, preview with a fixed quote, build in about three weeks, then grow. Plus the five-step build process behind every Nuvō project.',
    h1: 'How we work',
    summary:
      'A free audit, a design preview and a fixed quote, a build of about three weeks, then ongoing growth support. AI does the heavy lifting; a human verifies everything.',
    priority: 0.8,
  },
  {
    path: '/about',
    title: 'About Nuvō — founder-led business services in Pune',
    description:
      'Nuvō is a founder-led digital business services company in Pune that helps small and mid-sized businesses become efficient and profitable.',
    h1: 'About Nuvō',
    summary:
      'Not a web agency, not just a consultant — we do both. Nuvō is founder-led and deliberately lean: the founder meets you, understands your business and reviews every deliverable.',
    priority: 0.7,
  },
  {
    path: '/resources',
    title: 'Resources & FAQ — free business readiness self-check | Nuvō',
    description:
      'A free digital-readiness self-check, practical guides and straight answers to the questions business owners ask us.',
    h1: 'Test yourself — resources & FAQ',
    summary:
      'Eight yes-or-no questions give you a readiness score and the plan that fits best, followed by straight answers to the questions owners ask us most.',
    priority: 0.7,
    faq: true,
  },
  {
    path: '/contact',
    title: 'Contact — book a free business audit | Nuvō',
    description:
      'Tell us what’s slowing your business down. Free audit, fixed-quote plan, reply within one business day — usually on WhatsApp.',
    h1: 'Book a free business audit',
    summary:
      'Tell us what is slowing your business down. We reply within one business day, usually on WhatsApp, with a free audit and a fixed-quote plan.',
    priority: 0.9,
  },
  {
    path: '/privacy',
    title: 'Privacy policy | Nuvō Business Solutions',
    description:
      'How Nuvō collects, uses and protects the information you share with us, and how to ask for it to be corrected or deleted.',
    h1: 'Privacy policy',
    summary: 'What we collect, how we use it, who we share it with and your rights over your information.',
    priority: 0.3,
  },
  {
    path: '/terms',
    title: 'Terms & conditions | Nuvō Business Solutions',
    description:
      'Scope, quotes, ownership, support and third-party platform terms for working with Nuvō Business Solutions.',
    h1: 'Terms & conditions',
    summary: 'Scope and pricing, ownership of your work, support, payments and third-party platforms.',
    priority: 0.3,
  },
];

export const seoRoutes = base;
export const seoByPath = Object.fromEntries(base.map((r) => [r.path, r]));
export const seoFaqs = faqs.map(({ q, a }) => ({ q, a }));
