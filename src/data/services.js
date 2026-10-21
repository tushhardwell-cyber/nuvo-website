// Full service catalogue (31 services) + sectors served.
// `live: true` → available now inside Plan 1 / Plan 2.

export const catalogue = [
  {
    group: 'Digital presence & setup',
    items: [
      { name: 'Website development', live: true },
      { name: 'WhatsApp Business setup', live: true },
      { name: 'Google Business Profile setup & improvement', live: true },
      { name: 'LinkedIn business page setup & improvement', live: true },
      { name: 'Online business setup' },
    ],
  },
  {
    group: 'Data & analysis',
    items: [
      { name: 'Excel data analysis', live: true },
      { name: 'Data analysis consulting' },
      { name: 'Data conclusions & reporting', live: true },
    ],
  },
  {
    group: 'Custom tools & systems',
    items: [
      { name: 'Excel-based CRM system', live: true },
      { name: 'Excel-based ERP system' },
      { name: 'Excel-based POS system', live: true },
      { name: 'Excel / app-based HR system', live: true },
      { name: 'Custom software & systems' },
    ],
  },
  {
    group: 'Marketing & social',
    items: [{ name: 'Business promotion & social media management' }, { name: 'LinkedIn hiring improvement' }],
  },
  {
    group: 'Integration & automation',
    items: [
      { name: 'Email + Excel integration', live: true },
      { name: 'Website + Excel integration', live: true },
      { name: 'Website + Excel + email automation' },
      { name: 'Payment + WhatsApp + email automation' },
      { name: 'Automated daily repeating tasks', live: true },
      { name: 'Automated workflows' },
      { name: 'Automation — data entry, follow-ups, reporting' },
      { name: 'Business process automation' },
      { name: 'AI integrations' },
      { name: 'CRM + Excel integration' },
    ],
  },
  {
    group: 'Consultancy & growth',
    items: [
      { name: 'Business development consultancy' },
      { name: 'Business + digital integration' },
      { name: 'Taking enterprises digital' },
      { name: 'Virtual business / industry setup' },
      { name: 'Personalized business opportunity listing' },
      { name: 'Business development leads & contacts' },
    ],
  },
];

export const sectors = [
  { name: 'Distribution businesses', note: 'Orders, routes, collections and dealer ledgers.' },
  { name: 'Manufacturers', note: 'Production logs, rejections, attendance and dispatch.', image: '/media/sector-foundry.webp' },
  { name: 'Dealers', note: 'Billing, stock alerts and customer follow-ups.', image: '/media/presence-storefront.webp' },
  { name: 'Automotive parts manufacturers', note: 'Shop-floor dashboards and buyer-ready websites.' },
  { name: 'Egg distributors', note: 'Daily rate broadcasts and WhatsApp ordering.' },
  { name: 'Automobile press-parts manufacturers', note: 'Premium industrial presence and quotation tracking.', image: '/media/hetvik-front.webp' },
  { name: 'Plywood & laminates distributors', note: 'Digital catalogs and contractor inquiries.' },
  { name: 'Exporters & traders', note: 'Inquiry sorting, quotations and document drafting.', image: '/media/hero-earth-poster.jpg' },
];

export const segments = [
  { who: 'Retail & shop owners', pain: 'Manual billing, no CRM, losing leads', fix: 'POS + CRM + WhatsApp automation' },
  { who: 'Local service businesses', pain: 'Not found on Google, no booking system', fix: 'Google Business + website + lead capture' },
  { who: 'Growing startups', pain: 'No systems before they scale', fix: 'Full operations setup before chaos hits' },
  { who: 'Traditional family businesses', pain: "Going digital, don't know where to start", fix: 'End-to-end hand-holding' },
  { who: 'Solopreneurs & freelancers', pain: 'No professional presence', fix: 'A quick, credible digital foundation' },
];

export const differentiators = [
  {
    title: 'We sell outcomes, not tasks.',
    body: "You don't want a website — you want customers. You don't want a spreadsheet — you want answers. Everything we build is measured by what it does for the business.",
  },
  {
    title: 'Automation is built in. Never optional.',
    body: 'Every deliverable comes with smart features that keep working without you: alerts, follow-ups, reminders, reports. That is the part most providers leave out.',
  },
  {
    title: 'No expensive subscriptions.',
    body: 'We build on WhatsApp, Excel and Google — tools you already have and own. Premium outcomes without the enterprise overhead.',
  },
];

export const selfStack = [
  { name: 'Website', note: 'Lead capture built in' },
  { name: 'Google Business', note: 'Fully optimized' },
  { name: 'WhatsApp Business', note: 'Digital receptionist' },
  { name: 'LinkedIn', note: 'Credibility engine' },
  { name: 'CRM', note: 'Every lead & client tracked' },
  { name: 'Task manager', note: 'Every task organized' },
  { name: 'Scheduler', note: 'Milestones auto-planned' },
  { name: 'Email + Excel', note: 'Fully automated' },
];

// The six core services — straight from the Nuvō business card.
export const coreServices = [
  {
    icon: 'bulb',
    title: 'Business Strategy',
    image: '/media/core-strategy.webp',
    tone: 'amber',
    pos: '50% 40%',
    line: 'Know exactly where to grow — before you spend anything.',
    points: ['Market research', 'Business strategy', 'Business plan', 'Growth planning'],
    to: '/services#catalogue',
  },
  {
    icon: 'rocket',
    title: 'Branding',
    image: '/media/core-branding.webp',
    tone: 'rose',
    pos: '50% 40%',
    line: 'A brand that looks as serious as the work you do.',
    points: ['Logo & brand identity', 'Brand voice', 'Brand guidelines', 'Brochures'],
    to: '/services#catalogue',
  },
  {
    icon: 'globe',
    title: 'Website & Online Presence',
    image: '/media/core-website.webp',
    tone: 'blue',
    pos: '40% 50%',
    line: 'Be found, be trusted, capture every inquiry.',
    points: ['Website development', 'Google Business Profile', 'LinkedIn management', 'WhatsApp Business'],
    to: '/services/digital-foundation',
  },
  {
    icon: 'megaphone',
    title: 'Digital Marketing',
    image: '/media/core-marketing.webp',
    tone: 'violet',
    pos: '50% 50%',
    line: 'Reach the customers who are already looking for you.',
    points: ['Social media management', 'Facebook & Instagram ads', 'Google Ads', 'Blog & content'],
    to: '/services#catalogue',
  },
  {
    icon: 'gear',
    title: 'Business Systems',
    image: '/media/core-systems.webp',
    tone: 'teal',
    pos: '50% 50%',
    line: 'Software and automation that run your back office.',
    points: ['Custom software & systems', 'Automation', 'Analytics & reporting', 'Operational efficiency'],
    to: '/services/smart-operations',
  },
  {
    icon: 'growth',
    title: 'Growth Support',
    image: '/media/core-growth.webp',
    tone: 'green',
    pos: '50% 40%',
    line: 'We stay on — reviewing, measuring and improving.',
    points: ['Quarterly reviews', 'Strategy sessions', 'Performance tracking', 'Continuous improvement'],
    to: '/process',
  },
];
