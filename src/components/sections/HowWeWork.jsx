import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { method, commitments } from '../../data/process';
import SectionHead from '../ui/SectionHead';
import FadeUp from '../ui/FadeUp';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

// How Nuvō works — Research → Intelligence → Build → Deploy, plus the low-risk start.
export default function HowWeWork({ num = '04' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section how cine" ref={ref} data-glow>
      <div className="container">
        <SectionHead
          num={num}
          eyebrow="How Nuvō works"
          title={'*Always* the result.'}
          lead="You see the outcome, not the mess of getting there. Every engagement follows the same four steps — and starts with no big upfront commitment."
          split
        />

        <div className="method">
          <div className="method-track" aria-hidden="true">
            <motion.span style={{ scaleX: line }} />
          </div>
          {method.map((m, i) => (
            <FadeUp className="method-step" key={m.n} delay={i * 0.1}>
              <span className="method-dot" aria-hidden="true" />
              <span className="method-label">
                {m.n} · {m.label}
              </span>
              <h3 className="method-title">{m.title}</h3>
              <p>{m.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="commit">
          <ul>
            {commitments.map((c) => (
              <li key={c.k}>
                <Icon name="check" size={16} stroke={2.2} />
                <span>
                  <strong>{c.k}.</strong> {c.v}
                </span>
              </li>
            ))}
          </ul>
          <Button to="/contact">Start with a free audit</Button>
        </FadeUp>
      </div>
    </section>
  );
}
