import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo';
import TestHero from '../components/sections/TestHero';
import FAQSection from '../components/sections/FAQSection';
import ContactCTA from '../components/sections/ContactCTA';
import SectionHead from '../components/ui/SectionHead';
import FadeUp from '../components/ui/FadeUp';
import Button from '../components/ui/Button';
import { selfCheckQuestions, scoreSelfCheck } from '../data/selfCheck';

const QUESTIONS = selfCheckQuestions;

function SelfCheck() {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const done = answered === QUESTIONS.length;

  const result = useMemo(() => scoreSelfCheck(answers), [answers]);

  return (
    <div className="selfcheck">
      <ol className="sc-list">
        {QUESTIONS.map((item, i) => (
          <li key={item.q} className={answers[i] !== undefined ? 'is-done' : ''}>
            <span className="sc-n">{String(i + 1).padStart(2, '0')}</span>
            <p>{item.q}</p>
            <div className="sc-btns" role="group" aria-label={`Answer question ${i + 1}`}>
              {[
                ['Yes', true],
                ['No', false],
              ].map(([l, v]) => (
                <button
                  key={l}
                  type="button"
                  className={`sc-btn${answers[i] === v ? ' is-on' : ''}`}
                  aria-pressed={answers[i] === v}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: v }))}
                >
                  {l}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="sc-result" aria-live="polite">
        <div className="sc-gauge">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="sc-gauge-bg" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              className="sc-gauge-fg"
              pathLength="1"
              animate={{ pathLength: done ? result.score / 100 : answered / QUESTIONS.length }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <span className="sc-gauge-n">{done ? `${result.score}%` : `${answered}/${QUESTIONS.length}`}</span>
        </div>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="r" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="sc-copy">
              <span className="eyebrow">Your digital readiness</span>
              <h3 className="h3">
                {result.verdict}
              </h3>
              <p className="body-dim">
                Presence {result.p}/4 · Operations {result.o}/4. Your best first step is likely{' '}
                <strong>
                  Pack {result.rec.number} — {result.rec.name}
                </strong>
                .
              </p>
              <div className="sc-actions">
                <Button to={`/services/${result.rec.slug}`} variant="primary" size="sm">
                  See {result.rec.name}
                </Button>
                <button type="button" className="text-link" onClick={() => setAnswers({})}>
                  Retake ↺
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sc-copy">
              <span className="eyebrow">2-minute self-check</span>
              <h3 className="h3">How digital is your business, really?</h3>
              <p className="body-dim">Answer honestly — nobody's watching. Your result appears when all eight are done.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const GUIDES = [
  { t: 'What a 9 AM business summary looks like', d: 'The five numbers every owner should see before the first call of the day.', to: '/use-cases' },
  { t: 'Google Business Profile: the 20-minute fixes', d: 'Categories, photos, Q&A and the review link most businesses never set up.', to: '/services/digital-foundation' },
  { t: 'From 14 Excel files to one command center', d: 'How we restructure messy files into a tool any staff member learns in 30 minutes.', to: '/services/smart-operations' },
];

export default function Resources() {
  return (
    <>
      <Seo title="Resources & FAQ" path="/resources" description="A free digital-readiness self-check, practical guides and straight answers to the questions business owners ask us." />
      <TestHero />
      <section className="section" id="self-check">
        <div className="container">
          <SectionHead num="01" eyebrow="Self-check" title={'Score your business\nin *two minutes.*'} split lead="Eight yes-or-no questions across presence and operations. You'll get a readiness score and the plan that fits best." />
          <SelfCheck />
        </div>
      </section>

      <section className="section on-navy">
        <div className="container">
          <SectionHead num="02" eyebrow="Guides" title={'Practical, not *theoretical.*'} split />
          <div className="guide-grid">
            {GUIDES.map((g, i) => (
              <FadeUp key={g.t} delay={i * 0.08}>
                <Link to={g.to} className="guide-card" data-cursor="Read">
                  <span className="guide-n">0{i + 1}</span>
                  <h3 className="h4">{g.t}</h3>
                  <p className="body-dim">{g.d}</p>
                  <span className="text-link">Explore →</span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div id="faq">
        <FAQSection num="03" all />
      </div>
      <ContactCTA num="04" />
    </>
  );
}
