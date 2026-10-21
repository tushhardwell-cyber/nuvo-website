import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { heroTicker, site } from '../../data/site';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import Video from '../ui/Video';
import Icon from '../ui/Icon';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useMedia } from '../../hooks/useMedia';

function Ticker({ play }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % heroTicker.length), 3400);
    return () => clearInterval(id);
  }, [play]);
  const item = heroTicker[i];
  return (
    <div className="hero-ticker" aria-live="polite">
      <span className="hero-ticker-live">
        <i /> Running now
      </span>
      <span className="hero-ticker-window">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            className="hero-ticker-item"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.text}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

const PROOF = ['Strategy + software under one roof', 'Pune-based · clients worldwide', 'Fixed scope, fixed quote'];

export default function Hero({ introActive = false }) {
  const ref = useRef(null);
  const play = !introActive;
  // Full 3840×2160 original on large screens; the lighter 1600px encode on phones.
  const wide = useMedia('(min-width: 1100px)', true);

  // The footage fills the section, then pulls back into a rounded card as you scroll on.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const radius = useTransform(scrollYProgress, [0, 0.9], [0, 34]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -40]);

  const show = (d) => ({
    initial: { opacity: 0, y: 20 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: d },
  });

  return (
    <section className="hero3 theme-dark" ref={ref}>
      <motion.div className="hero3-bg" style={{ scale, borderRadius: radius }}>
        <Video
          src={wide ? '/media/hero-earth-4k.mp4' : '/media/hero-earth.mp4'}
          poster="/media/hero-earth-poster.jpg"
          fill
          label="Earth from space at night — Nuvō works with businesses around the world"
        />
        <span className="hero3-scrim" aria-hidden="true" />
      </motion.div>

      <motion.div className="container-wide hero3-inner" style={{ opacity: copyOpacity, y: copyY }}>
        <motion.div {...show(0.05)}>
          <Eyebrow>{site.tagline.replace(/\.$/, '')}</Eyebrow>
        </motion.div>
        <RevealText
          as="h1"
          className="display hero3-title"
          text={'Unconstrain your business.\n*Systematize* your growth.'}
          immediate
          play={play}
          delay={0.15}
          stagger={0.06}
        />
        <motion.p className="lead hero3-lead" {...show(0.6)}>
          Nuvō is a consultancy and software studio for growing businesses. We research your market, build your brand and
          digital presence, and run your operations on systems and AI — so the business keeps working, even when you’re
          not.
        </motion.p>
        <motion.div className="hero3-ctas" {...show(0.75)}>
          <Button to="/contact" size="lg">
            Book a free business audit
          </Button>
          <Button variant="ghost" size="lg" arrow="↓" onClick={() => scrollToTarget('#what-we-do')}>
            See what we do
          </Button>
        </motion.div>
        <motion.ul className="hero3-proof" {...show(0.9)}>
          {PROOF.map((p) => (
            <li key={p}>
              <Icon name="check" size={15} stroke={2.2} /> {p}
            </li>
          ))}
        </motion.ul>
        <motion.div className="hero3-foot" {...show(1.05)}>
          <Ticker play={play} />
          <p className="hero3-caption">
            <span>From Pune</span> to wherever your customers are.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
