import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { faqs } from '../../data/faq';
import { site, waLink } from '../../data/site';
import { selfCheckQuestions, scoreSelfCheck } from '../../data/selfCheck';
import { getLenis } from '../../hooks/useSmoothScroll';
import { useLang } from '../../i18n/LangContext';

// Floating "Test yourself" assistant.
// • "Test my business" runs the 8-question readiness check right in the chat.
// • Free-text questions go to /api/chat (Claude, server-side). If the API isn't
//   configured or fails, it answers from the site FAQ instead.

const GREETING =
  "Hi! I'm the Nuvō assistant. Want to test how digital-ready your business is? It takes 2 minutes — or ask me anything about our plans, services or process.";

const CHIPS = ['Test my business', 'Which plan fits me?', 'How is pricing decided?', 'How long does it take?'];

const STOP = new Set('a an the is are do does i we you it to of for on in my our your can how what with and or be this that me'.split(' '));
const words = (t) => t.toLowerCase().replace(/[^a-z0-9₹ ]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

const PRICE_RE = /\b(price|prices|pricing|cost|costs|charge|charges|fees?|rates?|how much|budget|quote|expensive|cheap)\b/i;

function bestFaq(text) {
  const q = new Set(words(text));
  let best = null;
  let bestScore = 0;
  for (const f of faqs) {
    const score = words(`${f.q} ${f.q} ${f.a}`).reduce((n, w) => n + (q.has(w) ? 1 : 0), 0);
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  return best && bestScore >= 2 ? best : null;
}

// Answers every part of a multi-part question ("…cost… and … QuickBooks?") from the FAQ.
function localAnswer(question) {
  const picked = [];
  const add = (f) => f && !picked.includes(f) && picked.push(f);
  if (PRICE_RE.test(question)) add(faqs.find((f) => /pricing/i.test(f.q)));
  question
    .split(/\?|\band\b|[,;]|\balso\b/i)
    .map((p) => p.trim())
    .filter((p) => p.length > 3)
    .forEach((part) => add(bestFaq(part)));
  if (!picked.length) add(bestFaq(question));
  if (picked.length) return picked.slice(0, 3).map((f) => f.a).join('\n\n');
  return "Good question — that's one for the team. Tap “Chat on WhatsApp” below or book a free audit at /contact and we'll reply within one business day.";
}

let nextId = 1;
const msg = (role, text, extra = {}) => ({ id: nextId++, role, text, ...extra });

export default function AskBot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [msg('assistant', GREETING, { greeting: true })]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [quiz, setQuiz] = useState(null); // { step, answers }
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  // ── Readiness check inside the chat ─────────────────────
  const startQuiz = () => {
    setQuiz({ step: 0, answers: {} });
    setMessages((m) => [
      ...m,
      msg('user', 'Test my business'),
      msg('assistant', `${t('Great — 8 quick yes/no questions.')}\n\n1/8 · ${t(selfCheckQuestions[0].q)}`),
    ]);
  };

  const answerQuiz = (yes) => {
    const { step, answers } = quiz;
    const nextAnswers = { ...answers, [step]: yes };
    const next = step + 1;
    const out = [msg('user', yes ? 'Yes' : 'No')];
    if (next < selfCheckQuestions.length) {
      out.push(msg('assistant', `${next + 1}/8 · ${t(selfCheckQuestions[next].q)}`));
      setQuiz({ step: next, answers: nextAnswers });
    } else {
      const r = scoreSelfCheck(nextAnswers);
      out.push(
        msg(
          'assistant',
          `${t('Your digital readiness:')} ${r.score}% — ${t(r.verdict)}\n${t('Presence')} ${r.p}/4 · ${t('Operations')} ${r.o}/4.\n\n${t('Your best first step is likely Plan')} ${r.rec.number} — ${t(r.rec.name)}: ${t(r.rec.short)}`,
          { links: [{ to: `/services/${r.rec.slug}`, label: `${t('See')} ${t(r.rec.name)}` }, { to: '/contact', label: t('Book a free audit') }] }
        )
      );
      setQuiz(null);
    }
    setMessages((m) => [...m, ...out]);
  };

  // ── Free-text questions → Claude ────────────────────────
  const ask = async (text) => {
    const question = text.trim();
    if (!question || busy) return;
    if (/^test( my)?( business)?$/i.test(question) || question === 'Test my business') {
      startQuiz();
      return;
    }
    setQuiz(null);
    setInput('');
    const history = [...messages, msg('user', question)];
    setMessages(history);
    setBusy(true);

    // Only real conversation turns go to the model (greeting excluded; must start with a user turn)
    const turns = history
      .filter((m) => !m.greeting)
      .map((m) => ({ role: m.role, content: m.text }))
      .slice(-12);
    while (turns.length && turns[0].role !== 'user') turns.shift();

    let reply;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: turns, lang }),
      });
      const data = await res.json().catch(() => ({}));
      reply = res.ok && data.reply ? data.reply : t(localAnswer(question));
    } catch {
      reply = t(localAnswer(question));
    }
    setMessages((m) => [...m, msg('assistant', reply)]);
    setBusy(false);
  };

  const onChip = (c) => (c === 'Test my business' ? startQuiz() : ask(c));

  const toggle = () => {
    setOpen((o) => !o);
    getLenis()?.start();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="askbot-panel"
            role="dialog"
            aria-label="Nuvō assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="askbot-head">
              <span className="askbot-avatar">
                <Icon name="sparkle" size={18} />
              </span>
              <span className="askbot-title">
                <strong>Nuvō assistant</strong>
                <small>
                  <i /> Test your business · ask anything
                </small>
              </span>
              <button className="askbot-x" onClick={() => setOpen(false)} aria-label="Close assistant">
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className="askbot-list" ref={listRef} data-lenis-prevent>
              {messages.map((m) => (
                <div key={m.id} className={`askbot-msg ${m.role}`}>
                  <p>{m.text}</p>
                  {m.links && (
                    <div className="askbot-links">
                      {m.links.map((l) => (
                        <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                          {l.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {busy && (
                <div className="askbot-msg assistant typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className="askbot-chips">
              {quiz ? (
                <>
                  <button className="askbot-chip yes" onClick={() => answerQuiz(true)}>
                    Yes
                  </button>
                  <button className="askbot-chip" onClick={() => answerQuiz(false)}>
                    No
                  </button>
                  <button className="askbot-chip ghost" onClick={() => setQuiz(null)}>
                    Stop test
                  </button>
                </>
              ) : (
                CHIPS.map((c) => (
                  <button key={c} className={`askbot-chip${c === 'Test my business' ? ' yes' : ''}`} onClick={() => onChip(c)} disabled={busy}>
                    {c}
                  </button>
                ))
              )}
            </div>

            <form
              className="askbot-form"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about plans, services, process…"
                maxLength={600}
                aria-label="Your question"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
                <Icon name="send" size={17} />
              </button>
            </form>
            <a className="askbot-wa" href={waLink('Hi Nuvō, I have a question:')} target="_blank" rel="noreferrer">
              Prefer a human? Chat on WhatsApp ↗
            </a>
            <p className="askbot-note">AI answers can be imperfect — {site.contact.replyPromise.toLowerCase()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button className={`askbot-fab${open ? ' is-open' : ''}`} onClick={toggle} aria-expanded={open} aria-label={open ? 'Close assistant' : 'Ask Nuvō — open the assistant'}>
        <span className="askbot-fab-icon">
          <Icon name={open ? 'close' : 'sparkle'} size={20} />
        </span>
        <span className="askbot-fab-label">Ask Nuvō</span>
      </button>
    </>
  );
}
