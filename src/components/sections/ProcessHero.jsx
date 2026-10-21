import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import Video from '../ui/Video';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useReducedMotion } from '../../hooks/useMedia';

// Process hero: the road-trip footage fills the section (original 1920x1080 / 30 fps,
// never stretched). Animation = a "curtain" reveal: the video opens from a centred
// slit to full frame as you scroll in, while the footage itself drifts slowly — a
// widely used cinematic hero effect (clip-path wipe + parallax).
export default function ProcessHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // As you scroll past, the frame tightens into a rounded band (kept shallow so no
  // empty gap opens between the hero and the next section).
  const inset = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const clipPath = useTransform([inset, radius], ([v, r]) => `inset(${v}% ${v / 3}% ${v}% ${v / 3}% round ${r}px)`);
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="hero3 phero3 theme-dark" ref={ref}>
      <motion.div
        className="hero3-bg phero3-bg"
        initial={reduce ? false : { clipPath: 'inset(46% 0% 46% 0% round 0px)' }}
        animate={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        <motion.div className="phero3-clip" style={reduce ? undefined : { clipPath }}>
          <motion.div className="phero3-drift" style={reduce ? undefined : { y: drift }}>
            <Video
              src="/media/process-road.mp4"
              poster="/media/process-road-poster.jpg"
              fill
              label="A drone follows a red car along a winding forest road — the journey from first meeting to go-live"
            />
          </motion.div>
        </motion.div>
        <span className="hero3-scrim phero3-scrim" aria-hidden="true" />
      </motion.div>

      <motion.div className="container-wide hero3-inner" style={reduce ? undefined : { y: copyY, opacity: copyO }}>
        <Eyebrow>Process</Eyebrow>
        <RevealText
          as="h1"
          className="display hero3-title"
          text={'You handle the human side.\nWe handle the *build* side.'}
          immediate
          delay={0.7}
        />
        <p className="lead hero3-lead">
          You talk to us, we understand your business, you say “good to go”. Everything after that runs on a system — the
          same kind of system we’ll build for you.
        </p>
        <div className="hero3-ctas">
          <Button size="lg" arrow="↓" onClick={() => scrollToTarget('#process-steps')}>
            See the four steps
          </Button>
          <Button to="/contact" variant="ghost" size="lg">
            Book a free audit
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
