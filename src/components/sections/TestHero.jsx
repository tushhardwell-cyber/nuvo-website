import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import Video from '../ui/Video';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useReducedMotion } from '../../hooks/useMedia';

// Test-yourself hero: ocean footage fills the section (original 1920x1080 / 30 fps,
// never stretched). Animation = a slow "Ken Burns" zoom on arrival that eases back
// out with a gentle parallax as you scroll — a popular cinematic hero effect.
export default function TestHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const parallax = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scrollZoom = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const copyO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="hero3 thero theme-dark" ref={ref}>
      <div className="hero3-bg thero-bg">
        <motion.div
          className="thero-zoom"
          initial={reduce ? false : { scale: 1.28 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="thero-par" style={reduce ? undefined : { y: parallax, scale: scrollZoom }}>
            <Video
              src="/media/test-ocean.mp4"
              poster="/media/test-ocean-poster.jpg"
              fill
              label="Ocean waves rolling in — calm, clear and measurable"
            />
          </motion.div>
        </motion.div>
        <span className="hero3-scrim thero-scrim" aria-hidden="true" />
      </div>

      <motion.div className="container-wide hero3-inner" style={reduce ? undefined : { y: copyY, opacity: copyO }}>
        <Eyebrow>Test yourself</Eyebrow>
        <RevealText
          as="h1"
          className="display hero3-title"
          text={'Free tools and\n*straight* answers.'}
          immediate
          delay={0.3}
        />
        <p className="lead hero3-lead">
          Start with a two-minute self-check, browse practical guides, or find the answer to the question you were about
          to ask.
        </p>
        <div className="hero3-ctas">
          <Button size="lg" arrow="↓" onClick={() => scrollToTarget('#self-check')}>
            Start the 2-minute check
          </Button>
          <Button variant="ghost" size="lg" onClick={() => scrollToTarget('#faq')}>
            Jump to the FAQ
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
