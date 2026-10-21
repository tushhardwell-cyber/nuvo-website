import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import Button from '../ui/Button';

const FACTS = [
  { k: 'Consultancy', v: 'Research, strategy, brand and the plan — written down before anything is built.' },
  { k: 'Software', v: 'Websites, business systems, automation and AI — built around how you actually work.' },
  { k: 'One partner', v: 'The thinking and the building under one roof. No hand-offs, no gaps.' },
];

// Who we are — introduces Nuvō as consultancy + software and carries the mission line.
export default function WhoWeAre({ num = '01' }) {
  return (
    <section className="section who cine theme-dark" data-glow>
      {/* Misty forest behind the section; the top and bottom edges fade into the neighbouring sections */}
      <div className="who-bg" aria-hidden="true">
        <img src="/media/who-forest.webp" alt="" loading="lazy" width="2400" height="1347" />
      </div>
      <div className="container who-grid">
        <FadeUp className="who-media">
          <img
            src="/media/who-consultation.webp"
            alt="A Nuvō consultant walking a business owner through an analysis, roadmap and financial impact report"
            loading="lazy"
            width="1400"
            height="1114"
          />
        </FadeUp>

        <div className="who-copy">
          <FadeUp y={12}>
            <Eyebrow num={num}>Who we are</Eyebrow>
          </FadeUp>
          <RevealText text={'Big-consultancy thinking.\nBuilt for *growing* businesses.'} className="h2" />
          <FadeUp delay={0.1}>
            <p className="lead">
              We don’t just set things up — we build systems that work for your business even when you’re not working.
              Nuvō brings the research and rigour of a serious consultancy and the hands-on build of a software studio
              to businesses that are ready to grow.
            </p>
          </FadeUp>
          <div className="who-facts">
            {FACTS.map((f, i) => (
              <FadeUp className="who-fact" key={f.k} delay={0.15 + i * 0.08}>
                <strong>{f.k}</strong>
                <span>{f.v}</span>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.35}>
            <Button to="/about" variant="ghost">
              More about Nuvō
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
