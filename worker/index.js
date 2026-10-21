// Cloudflare Worker entry — runs ONLY for /api/* (see run_worker_first in wrangler.jsonc);
// every other URL is served straight from the static files in /dist.
//
// POST /api/chat  → Ask Nuvō assistant (needs the GROQ_API_KEY secret)
// POST /api/lead  → contact form → your inbox (needs WEB3FORMS_KEY or LEAD_WEBHOOK_URL)
import { handleChat } from '../server/nuvoBot.mjs';
import { handleLead } from '../server/lead.mjs';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    // The shared handlers read secrets from process.env — copy the Worker's secrets/vars there.
    for (const [k, v] of Object.entries(env)) if (typeof v === 'string') process.env[k] = v;
    if (pathname !== '/api/chat' && pathname !== '/api/lead') return env.ASSETS.fetch(request);

    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }

    const { status, json: payload } =
      pathname === '/api/chat'
        ? await handleChat(body)
        : await handleLead(body, request.headers.get('CF-Connecting-IP') || 'unknown');
    return json(payload, status);
  },
};
