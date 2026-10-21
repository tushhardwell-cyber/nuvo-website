// Tools Nuvō connects. Shown as monogram tiles (no third-party logos bundled).

export const toolCategories = [
  {
    name: 'Messaging & presence',
    tools: ['WhatsApp Business', 'Google Business Profile', 'Instagram', 'Facebook', 'LinkedIn', 'Justdial', 'IndiaMART'],
  },
  {
    name: 'Accounting & payments',
    tools: ['QuickBooks', 'Xero', 'Tally Prime', 'Zoho Books', 'Stripe', 'PayPal', 'Razorpay'],
  },
  {
    name: 'Office & data',
    tools: ['Microsoft Excel', 'Google Sheets', 'Google Drive', 'Gmail', 'Outlook', 'Google Calendar', 'OneDrive'],
  },
  {
    name: 'CRM & web',
    tools: ['Zoho CRM', 'HubSpot', 'WordPress', 'Shopify', 'Google Analytics', 'Search Console', 'Canva'],
  },
  {
    name: 'Automation',
    tools: ['Google Apps Script', 'VBA Macros', 'Power Automate', 'Make', 'Zapier', 'n8n', 'Airtable'],
  },
  {
    name: 'AI models',
    tools: ['Claude', 'OpenAI', 'Google Gemini', 'Mistral', 'Local / private models'],
  },
];

export const orbitInner = ['WhatsApp', 'Excel', 'Sheets', 'Gmail', 'Xero', 'Google Business'];
export const orbitOuter = ['Stripe', 'Zoho', 'Instagram', 'QuickBooks', 'Drive', 'Calendar', 'Canva', 'PayPal'];
export const aiTools = ['Claude', 'OpenAI', 'Gemini', 'Make', 'n8n', 'Zapier', 'Apps Script', 'Power Automate'];

export const monogram = (name) => {
  const clean = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
