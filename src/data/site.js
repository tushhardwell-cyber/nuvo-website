// ─────────────────────────────────────────────────────────────
//  Nuvō — global site configuration
//  Edit contact details, links and media slots here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Nuvō',
  legalName: 'Nuvō Business Solutions',
  tagline: 'The complete business transformation agency.',
  promise: ['Unconstrain your business.', 'Systematize your growth.'],
  positioning: 'Consultancy + software for growing businesses',
  mission:
    "We don't just set things up — we build systems that work for your business even when you're not working.",
  closer: 'Built the same way we build for you.',
  url: 'https://nuvobusinesssolutions.com',

  contact: {
    email: 'contact@nuvobusinesssolutions.com',
    phoneDisplay: '+91 93704 06605',
    phone: '+919370406605',
    whatsapp: '919370406605', // international format, digits only — used for wa.me links
    city: 'Pune, Maharashtra',
    reach: 'Pune, India · Working with businesses worldwide',
    replyPromise: 'We reply within one business day — usually on WhatsApp.',
    areas: ['Pune, India', 'Mumbai, India', 'Worldwide, online'],
  },

  // Optional form endpoint (Formspree, Web3Forms, Getform, your own API).
  // When empty, the contact form opens WhatsApp with the inquiry pre-filled.
  formEndpoint: '',

  // ⚠ Placeholder handles — replace with your real profiles (empty string hides a link).
  socials: {
    linkedin: 'https://www.linkedin.com/company/nuvo-the-business-transformation-agency/',
    instagram: 'https://www.instagram.com/nuvo.business',
  },

  // Founder — name, photo and bio shown on the About page.
  founder: {
    name: 'Tushar Awachar',
    role: 'Founder, Nuvō Business Solutions',
    photo: '/media/founder.webp',
    bio: 'I started Nuvō after watching good businesses lose leads, time and money to scattered tools and manual follow-ups. I meet every client myself, map how the business really runs, and personally review everything we deliver.',
  },
};

export const waLink = (text = '') =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { label: 'Services', to: '/services', mega: true },
  { label: 'Work', to: '/work' },
  { label: 'Process', to: '/process' },
  { label: 'About', to: '/about' },
];

// Services mega menu (nav). `icon` keys map to components/ui/Icon.jsx
export const megaMenu = {
  items: [
    { icon: 'browser', title: 'Website & Digital Presence', desc: 'A website built to bring inquiries — not just exist.', to: '/services/digital-foundation' },
    { icon: 'search', title: 'Google & Local Visibility', brand: 'google', desc: 'Be the first name Google shows near you.', to: '/services/digital-foundation' },
    { icon: 'chat', title: 'WhatsApp & Lead Capture', brand: 'whatsapp', desc: 'A 24/7 receptionist that never misses a lead.', to: '/services/digital-foundation' },
    { icon: 'grid', title: 'Excel Business Systems', brand: 'excel', desc: 'CRM, POS and HR — your business on one screen.', to: '/services/smart-operations' },
    { icon: 'chart', title: 'Dashboards & Reports', desc: 'Numbers that come to you, every morning.', to: '/services/smart-operations' },
    { icon: 'mail', title: 'Email & Daily Automation', brand: 'gmail', desc: 'Follow-ups and reminders that never forget.', to: '/services/smart-operations' },
    { icon: 'cpu', title: 'AI Integrations', brand: 'claude', desc: 'AI that sorts, drafts and summarizes for your team.', to: '/services/automation-ai', isNew: true },
    { icon: 'flow', title: 'Automated Workflows', desc: 'Your tools handing work to each other.', to: '/services/automation-ai', isNew: true },
    { icon: 'code', title: 'Custom Software & ERP', desc: 'Billing, ERP and attendance built around you.', to: '/services/custom-software', isNew: true },
  ],
  feature: {
    eyebrow: 'New · Automation & AI',
    title: "Systems that keep working when you're not.",
    sub: 'Websites, systems, automation & AI',
    to: '/services',
  },
};

export const sectorsMarquee = [
  'Distributors',
  'Manufacturers',
  'Dealers',
  'Automotive parts makers',
  'Egg distributors',
  'Press-parts manufacturers',
  'Plywood & laminates',
  'Exporters & traders',
  'Retail & shops',
  'Clinics & salons',
  'Service businesses',
  'Family businesses',
];

export const mirrorLines = [
  { a: 'My customers love me.', b: 'Nobody else knows I exist.' },
  { a: 'I have all the data.', b: "I just can't see what it's saying." },
  { a: 'I chase the same payments', b: 'every single week.' },
  { a: 'My best leads message on WhatsApp —', b: 'and go cold by Monday.' },
  { a: 'The whole business lives', b: 'in my head and fourteen Excel files.' },
];

export const heroTicker = [
  { icon: '✦', text: 'Morning summary sent to the owner — 9:00 AM, daily' },
  { icon: '↗', text: 'New website lead → WhatsApp alert in seconds' },
  { icon: '✦', text: 'Business Report Card delivered every Sunday evening' },
  { icon: '↗', text: 'Payment reminder sent at due date, 3, 7 & 14 days' },
];

export const heroStats = [
  { value: 6, suffix: '', label: 'Core services under one roof' },
  { value: 3, suffix: ' weeks', label: 'Typical Plan 1 delivery' },
  { value: 24, suffix: '/7', label: 'WhatsApp receptionist, always on' },
  { value: 9, prefix: '', suffix: ':00 AM', label: 'Your business summary, daily' },
];
