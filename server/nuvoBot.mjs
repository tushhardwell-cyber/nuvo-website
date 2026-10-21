// Nuvō assistant — server-side Claude call shared by the Vercel function
// (api/chat.js), the Netlify function (netlify/functions/chat.mjs) and the
// Vite dev/preview middleware. The API key never reaches the browser.
//
// Requires ANTHROPIC_API_KEY in the server environment.

import Anthropic from '@anthropic-ai/sdk';
import { packs } from '../src/data/packs.js';
import { faqs } from '../src/data/faq.js';
import { site } from '../src/data/site.js';
import { useCases } from '../src/data/useCases.js';

const MODEL = 'claude-opus-5-5';
const LANGS = { es: 'Spanish', fr: 'French', ru: 'Russian', zh: 'Simplified Chinese (Mandarin)', de: 'German' };
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 1500;
const MAX_TOTAL_CHARS = 12000;

function buildSystemPrompt() {
  const packText = packs
    .map(
      (p) =>
        `Plan ${p.number} — ${p.name} (${p.status}). ${p.short} Engagement: ${p.engagement}. ` +
        `Timeline: ${p.timeline}. After launch: ${p.support}. Best for: ${p.forWho} ` +
        `Includes: ${p.services.map((s) => s.title).join(', ')}. Page: /services/${p.slug}`
    )
    .join('\n');
  const faqText = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
  const useCaseText = useCases.map((u) => `- ${u.title} (${u.timing}): ${u.body}`).join('\n');

  return `You are the assistant on the website of ${site.legalName} — a founder-led consultancy and software studio in Pune, India, working with growing businesses around the world. ${site.tagline} Brand promise: "${site.promise.join(' ')}"
Core services: Business Strategy, Branding, Website & Online Presence, Digital Marketing, Business Systems, Growth Support.
Mission: "${site.mission}"

Who you talk to: owners and managers of small and mid-sized businesses around the world (distributors, manufacturers, dealers, traders, exporters, retailers, clinics, service firms). Many are not technical. Write in clear, warm, plain English, the way a sharp consultant talks to a busy owner.

How to answer:
- If a message has more than one question, answer every part, each briefly.
- Keep replies short: usually 2–5 sentences, at most about 120 words. Use a short list with "•" only when it genuinely helps.
- Plain text only — no markdown headings, bold, tables or links syntax. You may mention site pages by path, e.g. /services/smart-operations or /contact.
- Answer only from the facts below. Never invent timelines, client names, results or statistics. If you don't know, say so and suggest a free conversation.
- Never quote prices, ranges or estimates — not even roughly. Nuvō has no public rate card: every engagement gets a fixed scope and a fixed quote after a free audit. Say that, and offer the free audit.
- When it fits, recommend the most relevant plan and suggest the free business audit (/contact) or WhatsApp. Don't push on every message.
- If someone asks to "test" their business, tell them to tap "Test my business" in this chat for the 2-minute readiness check.
- Stay on topic: Nuvō, its services, and how digital tools and automation help a business. Politely steer unrelated requests back.
- Never ask for passwords, OTPs, bank or card details.

Contact: WhatsApp and phone ${site.contact.phoneDisplay}, email ${site.contact.email}, ${site.contact.reach}. ${site.contact.replyPromise}

PLANS
${packText}

THINGS WE AUTOMATE
${useCaseText}

FREQUENTLY ASKED QUESTIONS
${faqText}`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

let client;
function getClient() {
  if (!client) client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment
  return client;
}

function validate(body) {
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return 'messages must be a non-empty array';
  if (messages.length > MAX_MESSAGES) return 'conversation is too long — please start a new chat';
  let total = 0;
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return 'each message needs a role (user/assistant) and text content';
    }
    if (m.content.length > MAX_CHARS_PER_MESSAGE) return 'message is too long';
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return 'conversation is too long — please start a new chat';
  if (messages[0].role !== 'user' || messages[messages.length - 1].role !== 'user') {
    return 'conversation must start and end with a user message';
  }
  return null;
}

// Returns { status, json } so each platform adapter can send it its own way.
export async function handleChat(body) {
  const problem = validate(body);
  if (problem) return { status: 400, json: { error: problem } };

  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return { status: 503, json: { error: 'assistant_not_configured' } };
  }

  const messages = body.messages.map((m) => ({ role: m.role, content: m.content.trim() }));

  try {
    const response = await getClient().beta.messages.create({
      model: MODEL,
      max_tokens: 2048,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default', // re-run a declined request on Anthropic's recommended fallback model
      output_config: { effort: 'low' }, // short conversational answers
      cache_control: { type: 'ephemeral' }, // the system prompt is identical on every request
      system: LANGS[body.lang]
        ? `${SYSTEM_PROMPT}

LANGUAGE: The visitor is using the site in ${LANGS[body.lang]}. Write every reply in ${LANGS[body.lang]} (keep brand and tool names such as Nuvō, WhatsApp and Excel as they are).`
        : SYSTEM_PROMPT,
      messages,
    });

    if (response.stop_reason === 'refusal') {
      return {
        status: 200,
        json: { reply: "I can't help with that one here — but the Nuvō team can. Message us on WhatsApp or use /contact." },
      };
    }

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return { status: 200, json: { reply: reply || 'Sorry, I lost my train of thought — could you ask that again?' } };
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
      console.error('[nuvo-bot] auth error:', error.message);
      return { status: 503, json: { error: 'assistant_not_configured' } };
    }
    if (error instanceof Anthropic.RateLimitError) {
      return { status: 429, json: { error: 'busy' } };
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[nuvo-bot] API error ${error.status}:`, error.message);
      return { status: 502, json: { error: 'upstream_error' } };
    }
    console.error('[nuvo-bot] unexpected error:', error);
    return { status: 500, json: { error: 'server_error' } };
  }
}
