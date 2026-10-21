// Contact-form lead capture — shared by the Vercel function (api/lead.js), the Netlify
// function (netlify/functions/lead.mjs) and the Vite dev/preview middleware.
//
// Configure ONE of these in the host's environment (never in client code):
//   WEB3FORMS_KEY     — free key from web3forms.com; emails every lead to you
//   LEAD_WEBHOOK_URL  — any webhook (Zapier, Make, Slack, Google Apps Script, Formspree URL …)
// With neither set it answers 503 and the website simply opens WhatsApp as before.

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

// naive in-memory rate limit: 5 leads / 10 min per IP (per server instance)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 600000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function handleLead(body, ip = 'unknown') {
  const lead = {
    name: clean(body?.name, 80),
    phone: clean(body?.phone, 20),
    business: clean(body?.business, 120),
    challenge: clean(body?.challenge, 800),
  };
  if (body?.website) return { status: 200, json: { ok: true } }; // honeypot: pretend success
  if (!lead.name || lead.phone.replace(/\D/g, '').length < 10) return { status: 400, json: { error: 'invalid' } };
  if (limited(ip)) return { status: 429, json: { error: 'busy' } };

  const key = process.env.WEB3FORMS_KEY;
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!key && !hook) return { status: 503, json: { error: 'lead_capture_not_configured' } };

  try {
    const res = key
      ? await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: key, subject: `New Nuvō inquiry — ${lead.name}`, from_name: 'Nuvō website', ...lead }),
        })
      : await fetch(hook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lead, text: `New Nuvō inquiry: ${lead.name} · ${lead.phone} · ${lead.business} · ${lead.challenge}`, source: 'nuvo-website', at: new Date().toISOString() }),
        });
    if (!res.ok) return { status: 502, json: { error: 'upstream_error' } };
    return { status: 200, json: { ok: true } };
  } catch {
    return { status: 502, json: { error: 'upstream_error' } };
  }
}
