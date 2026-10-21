// The four Nuvō plans. Plan 1 + 2 are live; 3 + 4 are scoped per client.
// No prices on the site — every engagement is quoted after a free audit.

export const packs = [
  {
    slug: 'digital-foundation',
    number: '01',
    kicker: 'PRESENCE',
    focus: true,
    status: 'Active',
    name: 'Digital Foundation',
    short: 'Website, Google, WhatsApp and LinkedIn — set up to bring you customers on autopilot.',
    tagline: 'Your business, found. Your presence, felt. Your leads, captured.',
    forWho: 'Businesses with no — or a weak — digital presence.',
    engagement: 'One-time project',
    support: 'Optional monthly care',
    timeline: '3 weeks',
    tags: ['Website', 'Google Business', 'WhatsApp', 'LinkedIn', 'Lead capture'],
    visual: 'phone',
    services: [
      {
        title: 'Website',
        philosophy:
          'Not a template. Not AI-generated filler. A website that genuinely reflects your industry, your customers and how you want to be seen.',
        deliverables: [
          '5–7 pages: Home, About, Services, Contact + custom pages',
          'Industry-accurate design, mobile-first, fast-loading clean code',
          'Full SEO setup — meta titles, descriptions, keywords, sitemap, indexing',
          'Optimized to show up on Google for your product or service',
        ],
        smart: [
          'Lead form → instant WhatsApp alert to the owner',
          'Every lead auto-logged into a Google Sheet / Excel tracker',
          'Automatic WhatsApp reply to the visitor the moment they inquire',
          'Follow-up reminder set 24 hours after every new lead',
          'Live "We\'re open / closed right now" indicator',
          'Live Google Reviews widget, one-tap call and WhatsApp buttons',
          'FAQ built from questions your customers actually ask',
        ],
      },
      {
        title: 'Google Business Profile',
        philosophy:
          'Not just listed on Google — fully optimized and set up to collect reviews automatically, so you dominate local search while doing nothing extra.',
        deliverables: [
          'Full profile setup or clean-up — every field filled',
          'Local SEO: categories, keywords and service areas optimized',
          '15–20 professional photos uploaded',
          'A business description written to convert',
          'Q&A pre-filled with 10 real questions and answers',
        ],
        smart: [
          'Automatic review request on WhatsApp after every job',
          'Visual comparison against your top 3 local competitors',
          'Monthly post schedule template that keeps the profile alive',
          'Monthly performance report — views, clicks, calls',
          'Direct review link for website, WhatsApp and business card',
        ],
      },
      {
        title: 'WhatsApp Business',
        philosophy:
          'A 24/7 digital receptionist that answers customers, collects inquiries, organizes leads and alerts you — without anyone picking up the phone.',
        deliverables: [
          'Complete business profile setup',
          'Professional catalog with photos and prices',
          'WhatsApp QR code for cards, storefront, website and packaging',
          'Warm welcome and away messages with real response times',
        ],
        smart: [
          'Interactive menu on first message — "Reply 1 for pricing, 2 for services…"',
          '"Call me back" trigger — customer says YES, you get an instant alert',
          'Broadcast lists — send offers to existing customers in one click',
          'Labels: New lead / Follow-up / Closed / VIP',
        ],
      },
      {
        title: 'LinkedIn Business Page',
        philosophy:
          'A credibility machine. When a potential client looks you up, LinkedIn tells a story that makes them want to reach out.',
        deliverables: [
          'Company page created and fully filled',
          '"About" written as a story — who you are, what you solve',
          'Custom brand-accurate banner',
          "Founder's personal profile cleaned up and optimized",
        ],
        smart: [
          'First 5 posts written and published',
          'Fill-in-the-blank case study post template',
          'Linked to website and email signature, SEO-optimized',
          'Looks active, credible and worth following from day one',
        ],
      },
    ],
    addons: ['Branding & visual identity', 'Brochure design (digital + print-ready)', 'Business card with QR'],
    weeks: [
      { w: 'Week 1', t: 'Discovery, content & design preview — you approve the look' },
      { w: 'Week 2', t: 'Website build, Google & WhatsApp setup, automations wired' },
      { w: 'Week 3', t: 'LinkedIn, testing on real devices, handover guide & go-live' },
    ],
  },
  {
    slug: 'smart-operations',
    number: '02',
    kicker: 'OPERATIONS',
    status: 'Active',
    name: 'Smart Operations',
    short: 'Excel-based CRM / POS / HR, live dashboards and daily automations that run your back office.',
    tagline: 'Your business, organized. Your data, alive. Your time, yours again.',
    forWho: 'Businesses drowning in manual work and scattered data.',
    engagement: 'One-time project',
    support: 'Optional monthly care',
    timeline: '3.5 – 4 weeks',
    tags: ['Excel CRM / POS / HR', 'Dashboards', 'Email automation', 'Daily tasks'],
    visual: 'dashboard',
    services: [
      {
        title: 'Excel Business Tool — CRM / POS / HR',
        philosophy:
          'A business command center: one screen, everything you need to run the company. Pick what applies — CRM, POS, HR, operations, inventory or production.',
        deliverables: [
          'Dropdowns + data validation — staff can\'t enter wrong data',
          'Red / Yellow / Green priority system',
          'Password-protected structure — formulas never break',
          'Clean layout any staff member learns in 30 minutes',
          'One efficient file structure replacing the messy old files',
        ],
        smart: [
          'One dashboard screen — the entire business at a glance',
          'Morning WhatsApp summary to the owner at 9:00 AM',
          'Automatic overdue task and follow-up alerts',
          'Low-stock alert at your minimum threshold',
          'Birthday / anniversary reminders for key clients',
          'Team performance tracker and monthly auto-summary',
        ],
      },
      {
        title: 'Data Analysis Dashboard',
        philosophy:
          'You should never have to dig through sheets. Numbers come to you — clean, clear and automatic.',
        deliverables: [
          'Existing data cleaned and structured',
          'Pivot tables and charts that update when new data is pasted',
          '5–8 key metrics always visible',
        ],
        smart: [
          'Weekly "Business Report Card" on WhatsApp every Sunday evening',
          'This week vs last week — revenue, leads, conversions',
          'Top products / services and best day-time analysis',
          'Revenue forecast based on the current trend',
          'Leak analysis — where money is slipping away',
          'Customer behavior — who buys what, how often',
        ],
      },
      {
        title: 'Email + Excel Integration',
        philosophy:
          'Every important email — follow-ups, reminders, reports, task assignments — goes out automatically at exactly the right time.',
        deliverables: ['Email templates written for your business', 'Sheet-driven sending rules', 'Sending from your own Gmail / Outlook'],
        smart: [
          'Follow-up if no reply in 2 days, a fresh angle on day 5',
          '"Gone cold" flag after 7 days of silence',
          'Invoice sent → confirmation email to the client',
          'Deal closed → thank-you + review request',
          'Polite → firmer payment reminders',
          'Daily sales report to the owner; morning task email to the team',
        ],
      },
      {
        title: 'Automated Daily Tasks',
        philosophy:
          'Every task you or your team repeat daily — identified, automated and removed from your mental load.',
        deliverables: ['Task audit of your daily routine', 'Files rebuilt and synced across devices', 'Automations documented for your team'],
        smart: [
          'Payment chaser — due date, 3, 7 and 14 days overdue',
          'Payment received → WhatsApp confirmation + thank-you',
          'Automatic daily backup of key files',
          'Monday team reminders and weekly unpaid-invoice list',
          '"You haven\'t contacted this client in 30 days" nudges',
          'End-of-day summary — what happened today',
        ],
      },
    ],
    addons: ['Billing app', 'Attendance tracker', 'Inventory module'],
    weeks: [
      { w: 'Week 1', t: 'Process audit, data collection, tool structure approved' },
      { w: 'Week 2', t: 'Excel tool + dashboard built on your real data' },
      { w: 'Week 3', t: 'Email + WhatsApp automations wired and tested' },
      { w: 'Week 4', t: 'Team training, handover guide, first live reports' },
    ],
  },
  {
    slug: 'automation-ai',
    number: '03',
    kicker: 'AUTOMATION',
    status: 'By request',
    name: 'Automation & AI',
    short: 'Connected workflows and AI integrations that move work between your tools — with human review where it matters.',
    tagline: 'Your tools, talking to each other. Your team, freed for real work.',
    forWho: 'Businesses with repeatable processes that still run on copy-paste.',
    engagement: 'Scoped after a free audit',
    support: 'Monthly care available',
    timeline: 'Pilot live in 2 – 3 weeks',
    tags: ['Workflows', 'AI integrations', 'WhatsApp + payments', 'Reporting'],
    visual: 'flow',
    services: [
      {
        title: 'Automated Workflows',
        philosophy:
          'Connected, step-by-step workflows that move information and tasks between tools automatically — with triggers, notifications, approvals and tracking.',
        deliverables: ['Process map of how work moves today', 'Workflow built in Make, n8n, Power Automate or Apps Script', 'Logs and alerts so nothing fails silently'],
        smart: ['Approvals on WhatsApp or email', 'Automatic hand-offs between team members', 'Status tracking in one shared sheet'],
      },
      {
        title: 'Payment + WhatsApp + Email Automation',
        philosophy: 'Money in, confirmation out, records updated — without anyone touching a keyboard.',
        deliverables: ['Payment gateway and online payments integration', 'Message templates', 'Ledger sync to your sheet'],
        smart: ['Instant receipts on WhatsApp', 'Reminders that escalate politely', 'Daily collections summary'],
      },
      {
        title: 'AI Integrations',
        philosophy:
          'AI added to your existing tools to help your team work faster — selected to fit your needs and your privacy requirements.',
        deliverables: ['Use-case selection workshop', 'AI connected to your sheets, inbox or website', 'Human review step where it matters'],
        smart: [
          'Inquiry classification and smart routing',
          'Document & quotation drafting',
          'Data summaries in plain language',
          'Knowledge assistant for your team',
        ],
      },
    ],
    addons: ['AI-written weekly business commentary', 'Website + Excel + email pipeline'],
    weeks: [
      { w: 'Step 1', t: 'Free audit — top 3 workflows worth automating' },
      { w: 'Step 2', t: 'Pilot — one automation, fixed scope, tested on real work' },
      { w: 'Step 3', t: 'Roll out — connect the rest once the pilot proves value' },
    ],
  },
  {
    slug: 'custom-software',
    number: '04',
    kicker: 'SYSTEMS',
    status: 'By request',
    name: 'Custom Software & Systems',
    short: 'ERP-style systems, billing apps, attendance and custom software with AI — built around how you actually work.',
    tagline: 'Software that fits your business — not the other way round.',
    forWho: 'Distributors, manufacturers and traders who have outgrown spreadsheets.',
    engagement: 'Scoped after a free audit',
    support: 'Monthly care available',
    timeline: 'Scoped per project',
    tags: ['ERP', 'Billing apps', 'Attendance', 'Custom + AI'],
    visual: 'window',
    services: [
      {
        title: 'ERP Software & Systems',
        philosophy: 'Inventory, purchasing, sales and reporting brought into one organized workflow.',
        deliverables: ['Modules for your real processes', 'Role-based access', 'Reports your accountant will like'],
        smart: ['Low-stock and reorder triggers', 'Dealer / distributor ledgers', 'Daily dispatch summaries'],
      },
      {
        title: 'Billing Apps',
        philosophy: 'Billing tailored to your products, customers and everyday transactions.',
        deliverables: ['Tax-ready invoice formats', 'Customer records', 'Transaction history and exports'],
        smart: ['Invoice on WhatsApp in one tap', 'Outstanding balance alerts', 'Monthly sales digest'],
      },
      {
        title: 'Attendance Software & Systems',
        philosophy: 'Record, review and manage attendance and shifts consistently — no more registers.',
        deliverables: ['Shift and attendance tracking', 'Leave records', 'Payroll-ready exports'],
        smart: ['Late / absent alerts to supervisors', 'Monthly attendance report', 'Works on any phone'],
      },
      {
        title: 'Custom Software with AI',
        philosophy: 'Business-specific software with useful AI built in — to cut repetitive work and help teams act faster.',
        deliverables: ['Internal tools, portals and dashboards', 'AI-assisted features where they earn their place', 'Documentation and handover'],
        smart: ['Information extraction from documents', 'Auto-generated reports', 'Smart search across your records'],
      },
    ],
    addons: ['Mobile-friendly web app', 'Dealer / client portal'],
    weeks: [
      { w: 'Phase 1', t: 'Map before building — tools, integrations and an ordered plan' },
      { w: 'Phase 2', t: 'Build module by module — each one 100% before the next' },
      { w: 'Phase 3', t: 'Verify, train, hand over — archived and backed up' },
    ],
  },
];

export const packBySlug = (slug) => packs.find((p) => p.slug === slug);
