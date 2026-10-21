import Seo from '../components/layout/Seo';
import AboutStage from '../components/sections/AboutStage';
import ContactCTA from '../components/sections/ContactCTA';
import OwnerVoices from '../components/sections/OwnerVoices';
import SectionHead from '../components/ui/SectionHead';
import FadeUp from '../components/ui/FadeUp';
import FounderCard from '../components/sections/FounderCard';
import Testimonials from '../components/sections/Testimonials';
import Separator from '../components/ui/Separator';
import { site } from '../data/site';
import { differentiators } from '../data/services';

const PERSONALITY = [
  { k: 'Smart', v: 'We think before we build. Every project starts with a map, not a template.' },
  { k: 'Practical', v: 'Tools you already own. Outcomes you can see on your phone.' },
  { k: 'Reliable', v: 'Fixed scope, fixed quote, honest timelines — and we stay on.' },
  { k: 'Modern', v: 'AI and automation inside everything, used where it genuinely helps.' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Nuvō is a founder-led digital business services company in Pune that helps small and mid-sized businesses become efficient and profitable."
      />
      <AboutStage />

      <section className="section on-cream">
        <div className="container">
          <SectionHead
            num="01"
            eyebrow="The problem we solve"
            title={'“I know I need to go digital.\nI just don’t know where to *start.*”'}
            lead="Who to trust. How to afford it. What actually matters. That sentence is why Nuvō exists — we hold your hand from the first meeting to the last automation."
          />
          <div className="why-grid">
            {differentiators.map((d, i) => (
              <FadeUp className="why-card" key={d.title} delay={i * 0.08}>
                <span className="why-num">0{i + 1}</span>
                <h3 className="h4">{d.title}</h3>
                <p>{d.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <OwnerVoices num="02" />


      <section className="section on-navy">
        <div className="container">
          <SectionHead num="03" eyebrow="Personality" title={'Like a sharp consultant who\nalso gets their hands *dirty.*'} split lead="Not overly corporate. Not too casual. Here's how that shows up in the work." />
          <div className="persona-grid">
            {PERSONALITY.map((p, i) => (
              <FadeUp className="persona" key={p.k} delay={i * 0.08}>
                <span className="display persona-k">{p.k}</span>
                <p>{p.v}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section honest">
        <div className="container honest-inner">
          <FadeUp>
            <span className="eyebrow">The honest answer</span>
            <h2 className="h2">
              “Nuvō is not just <em>a consultancy.”</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="lead">
              Nuvō is founder-led and deliberately lean. The founder meets you, understands your business and personally
              reviews every deliverable. We pair careful thinking with smart technology, so what you receive is polished,
              dependable and built to grow with you — and you always have someone beside you long after launch.
            </p>
            <p className="lead">
              We're based in <strong>Pune</strong>, we meet Pune businesses in person, and we work with businesses around
              the world remotely.
            </p>
          </FadeUp>
        </div>
        <div className="container">
          <Separator />
        </div>
      </section>

      <FounderCard />
      <Testimonials num="04" />

      <ContactCTA num="05" />
    </>
  );
}
