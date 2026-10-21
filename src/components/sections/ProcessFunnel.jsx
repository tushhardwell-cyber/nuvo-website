import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { funnel } from '../../data/process';
import SectionHead from '../ui/SectionHead';
import Button from '../ui/Button';
import FadeUp from '../ui/FadeUp';

export default function ProcessFunnel({ num = '07', cream = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={`section process${cream ? ' on-cream' : ''}`} ref={ref}>
      <div className="container rel">
        <SectionHead
          num={num}
          eyebrow="No big upfront commitment"
          title={'Start small. Prove it.\nThen *scale.*'}
          lead="Every step is low-risk: a free audit, a fixed price you agree to before anything is built, and support only if you want it. You never feel locked in."
          split
        />

        <div className="funnel">
          <div className="funnel-track" aria-hidden="true">
            <motion.span className="funnel-fill" style={{ scaleX: line }} />
          </div>
          {funnel.map((s, i) => (
            <FadeUp className="funnel-step" key={s.n} delay={i * 0.12}>
              <span className="funnel-dot" aria-hidden="true">
                <i />
              </span>
              <span className="funnel-label">
                {s.n} / {s.label}
              </span>
              <h3 className="funnel-title">{s.title}</h3>
              <p>{s.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="center-row">
          <Button to="/contact" variant="primary" size="lg">
            Book your free audit
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
