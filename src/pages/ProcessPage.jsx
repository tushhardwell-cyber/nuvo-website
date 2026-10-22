import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Seo from '../components/layout/Seo';
import ProcessHero from '../components/sections/ProcessHero';
import ProcessFunnel from '../components/sections/ProcessFunnel';
import ContactCTA from '../components/sections/ContactCTA';
import SectionHead from '../components/ui/SectionHead';
import Video from '../components/ui/Video';
import FadeUp from '../components/ui/FadeUp';
import { buildSteps, journey } from '../data/process';

function BuildSteps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.5'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div className="build-steps" ref={ref}>
      <div className="build-rail" aria-hidden="true">
        <motion.i style={{ height: h }} />
      </div>
      {buildSteps.map((s, i) => (
        <FadeUp className="build-step" key={s.n} delay={0.05 * i}>
          <span className="build-n">{s.n}</span>
          <div>
            <h3 className="h3">{s.title}</h3>
            <p className="body-dim">{s.body}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

// Background for each journey card (Day 1, Day 2, Good to go, Build).
const JOURNEY_MEDIA = [
  { img: '/media/journey-1.webp' }, // coffee — the first conversation
  { img: '/media/journey-2.webp' }, // sunrise over golden grass — the preview
  { img: '/media/journey-3.webp' }, // sunlight through green trees — the green light
  { video: '/media/journey-4.mp4', poster: '/media/journey-4-poster.jpg' }, // growing trees — the build
];

export default function ProcessPage() {
  return (
    <>
      <Seo
        title="How we work"
        path="/process"
        description="Free audit, preview with a fixed quote, build in about three weeks, then grow. Plus the five-step build process behind every Nuvō project."
      />
      <ProcessHero />

      <div id="process-steps">
        <ProcessFunnel num="01" />
      </div>

      <section className="section journey">
        <div className="container">
          <SectionHead
            num="02"
            eyebrow="Client journey"
            title={'What you do.\nWhat we do — *simultaneously.*'}
            lead="Your time commitment is small and front-loaded. While you talk, we research, prepare and plan."
            split
          />
          <div className="journey-grid">
            {journey.map((j, i) => (
              <FadeUp className="journey-card jc" key={j.stage} delay={i * 0.08}>
                <span className="jc-media" aria-hidden="true">
                  {JOURNEY_MEDIA[i].video ? (
                    <Video src={JOURNEY_MEDIA[i].video} poster={JOURNEY_MEDIA[i].poster} fill />
                  ) : (
                    <img src={JOURNEY_MEDIA[i].img} alt="" loading="lazy" />
                  )}
                </span>
                <span className="jc-shade" aria-hidden="true" />
                <span className="journey-stage">{j.stage}</span>
                <h3 className="h4">{j.title}</h3>
                <div className="journey-cols">
                  <div>
                    <span className="journey-k">You</span>
                    <ul>
                      {j.you.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="we">
                    <span className="journey-k">Nuvō</span>
                    <ul>
                      {j.we.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-navy night-section">
        <div className="night-bg" aria-hidden="true">
          <Video src="/media/process-night-hd.mp4" poster="/media/process-night-poster.jpg" fill label="Stars turning over a quiet hillside at night" />
          <span className="night-scrim" />
        </div>
        <div className="container build-wrap rel">
          <SectionHead
            num="03"
            eyebrow="Behind the scenes"
            title={'Five steps.\nEvery *single* project.'}
            lead="AI and automation do the heavy lifting; a human verifies everything. This is why we can deliver premium quality at accessible prices — and why every project is backed up on our side."
          />
          <BuildSteps />
        </div>
      </section>

      <ContactCTA
        num="04"
        media={{ src: '/media/talk-peace.webp', alt: 'A calm stone Buddha above green trees — "peace: a quiet feeling of calm, safety and ease"', w: 1080, h: 1350 }}
      />
    </>
  );
}
