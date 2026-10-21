import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHead from '../ui/SectionHead';
import OMark from '../ui/OMark';
import { useMedia } from '../../hooks/useMedia';
import { useLang } from '../../i18n/LangContext';

// "Your hand, upgraded." — a fanned hand of playing cards. Each card is a
// pain the owner is holding; flip it to see the Nuvō fix. Play the Ace of
// NUVŌ in the centre and every card turns at once.

const CARDS = [
  { rank: '2', suit: '♣', pain: 'Leads lost in WhatsApp chats', fix: 'Every lead auto-logged. You get an alert in seconds.', tag: 'Lead capture' },
  { rank: '5', suit: '♦', pain: 'Chasing payments by hand', fix: 'Reminders at due date, 3, 7 & 14 days — automatically.', tag: 'Payment chaser' },
  { rank: '8', suit: '♥', pain: 'Invisible on Google', fix: 'Optimized profile + review requests after every job.', tag: 'Google Business' },
  { rank: 'A', suit: 'Ō', ace: true, pain: 'The whole system', fix: 'Working while you don\'t.', tag: 'Nuvō' },
  { rank: 'J', suit: '♠', pain: '14 Excel files. Zero answers.', fix: 'One dashboard. Your summary at 9:00 AM.', tag: 'Smart Operations' },
  { rank: '9', suit: '♦', pain: 'Sundays lost to reports', fix: 'Business Report Card, delivered every Sunday evening.', tag: 'Auto reports' },
  { rank: 'Q', suit: '♥', pain: 'Customers waiting for a reply', fix: '24/7 WhatsApp receptionist with an instant menu.', tag: 'WhatsApp Business' },
];

function Card({ card, flipped, onFlip, style, i, mid, fan }) {
  const { t } = useLang();
  const offset = i - mid;
  const red = card.suit === '♦' || card.suit === '♥';
  return (
    <motion.button
      type="button"
      className={`gcard${card.ace ? ' is-ace' : ''}${flipped ? ' is-flipped' : ''}`}
      style={style}
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={flipped ? `${t(card.tag)}: ${t(card.fix)}` : `${t('Problem:')} ${t(card.pain)}. ${t('Flip to see the fix.')}`}
      initial={fan ? { opacity: 0, y: 160, rotate: 0, x: -offset * 120 } : { opacity: 0, y: 40 }}
      whileInView={
        fan
          ? { opacity: 1, y: Math.abs(offset) * Math.abs(offset) * 9, rotate: offset * 6.5, x: 0 }
          : { opacity: 1, y: 0 }
      }
      whileHover={fan ? { y: Math.abs(offset) * Math.abs(offset) * 9 - 46, rotate: offset * 3, scale: 1.06, zIndex: 20 } : undefined}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: fan ? 0.1 + Math.abs(offset) * 0.09 : i * 0.05 }}
      data-cursor={flipped ? '' : 'Flip'}
    >
      <span className="gcard-inner">
        {/* FRONT — the pain */}
        <span className="gcard-face gcard-front">
          <span className={`gcard-corner tl${red ? ' red' : ''}`}>
            {card.rank}
            <small>{card.ace ? <OMark size={14} ring={false} strokeWidth={5} /> : card.suit}</small>
          </span>
          {card.ace ? (
            <span className="gcard-ace-center">
              <OMark size={74} />
              <span className="gcard-ace-word">NUVŌ</span>
              <span className="gcard-ace-hint">Play the ace</span>
            </span>
          ) : (
            <span className="gcard-center">
              <span className={`gcard-pip${red ? ' red' : ''}`}>{card.suit}</span>
              <span className="gcard-pain">{card.pain}</span>
              <span className="gcard-hint">Tap to fix →</span>
            </span>
          )}
          <span className={`gcard-corner br${red ? ' red' : ''}`}>
            {card.rank}
            <small>{card.ace ? <OMark size={14} ring={false} strokeWidth={5} /> : card.suit}</small>
          </span>
        </span>
        {/* BACK — the fix */}
        <span className="gcard-face gcard-back">
          <span className="gcard-back-pattern" aria-hidden="true" />
          <OMark size={34} />
          <span className="gcard-tag">{card.tag}</span>
          <span className="gcard-fix">{card.fix}</span>
          <span className="gcard-solved">✓ Automated</span>
        </span>
      </span>
    </motion.button>
  );
}

export default function CardGame({ num = '04' }) {
  const fan = useMedia('(min-width: 1100px)');
  const [flipped, setFlipped] = useState(() => new Set());
  const mid = Math.floor(CARDS.length / 2);
  const allFlipped = flipped.size === CARDS.length;

  const flip = (i) => {
    if (CARDS[i].ace) {
      // Play the ace: flip every card in a cascade
      if (allFlipped) return setFlipped(new Set());
      const order = CARDS.map((_, k) => k).sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
      order.forEach((k, n) => setTimeout(() => setFlipped((s) => new Set(s).add(k)), n * 130));
      return undefined;
    }
    setFlipped((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    return undefined;
  };

  return (
    <section className="section cardgame cine-tall" data-glow>
      <div className="container rel problem-head">
        <div className="problem-media">
          <img
            src="/media/problem-overwhelmed.webp"
            alt="A business owner overwhelmed by paperwork at his desk"
            loading="lazy"
            width="768"
            height="512"
          />
        </div>
        <SectionHead
          num={num}
          eyebrow="The problem"
          title={'Every business has\na few *weak points.*'}
          lead="Leads that go cold. Payments you chase by hand. Numbers you can’t see. These are the cards most owners are holding — flip one to see how Nuvō fixes it, or play the ace to see what a complete system does."
        />
      </div>

      <div className={`gtable${fan ? ' is-fan' : ' is-row'}${allFlipped ? ' is-won' : ''}`}>
        <div className="gtable-felt" aria-hidden="true" />
        <div className="ghand">
          {CARDS.map((c, i) => (
            <Card
              key={c.pain}
              card={c}
              i={i}
              mid={mid}
              fan={fan}
              flipped={flipped.has(i)}
              onFlip={() => flip(i)}
              style={fan ? { zIndex: c.ace ? 10 : 10 - Math.abs(i - mid) } : undefined}
            />
          ))}
        </div>
      </div>

      <div className="container gtable-foot">
        <p className="mute">
          {allFlipped
            ? 'That is what a Nuvō system feels like — every problem handled, quietly, in the background.'
            : `${flipped.size} of ${CARDS.length} cards played`}
        </p>
        {flipped.size > 0 && (
          <button type="button" className="text-link" onClick={() => setFlipped(new Set())}>
            Shuffle again ↺
          </button>
        )}
      </div>
    </section>
  );
}
