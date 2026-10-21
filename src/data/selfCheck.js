// Digital-readiness self-check — used on /resources and in the "Test yourself" assistant.
import { packs } from './packs';

export const selfCheckQuestions = [
  { q: 'Do you show up on Google Maps when someone searches for what you sell?', area: 'presence' },
  { q: 'Do you have a website that brings in inquiries (not just a business card)?', area: 'presence' },
  { q: 'Does every WhatsApp inquiry get a reply within an hour — even after hours?', area: 'presence' },
  { q: 'Do you ask happy customers for Google reviews after every job?', area: 'presence' },
  { q: 'Can you see this week’s sales, leads and unpaid invoices on one screen?', area: 'ops' },
  { q: 'Do payment reminders go out without anyone having to remember?', area: 'ops' },
  { q: 'Is your business data in one clean file — not ten versions of it?', area: 'ops' },
  { q: 'Do routine reports and follow-ups happen automatically?', area: 'ops' },
];

// answers: { [index]: boolean }
export function scoreSelfCheck(answers) {
  const yes = (area) => selfCheckQuestions.filter((q, i) => q.area === area && answers[i]).length;
  const p = yes('presence');
  const o = yes('ops');
  const score = Math.round(((p + o) / selfCheckQuestions.length) * 100);
  const rec = p <= o ? packs[0] : packs[1];
  const verdict = score >= 75 ? 'Strong foundations.' : score >= 40 ? 'Halfway there.' : 'Lots of easy wins.';
  return { score, p, o, rec, verdict };
}
