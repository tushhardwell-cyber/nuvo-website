import Seo from '../components/layout/Seo';
import ServicesHero from '../components/sections/ServicesHero';
import PlanShowcase from '../components/sections/PlanShowcase';
import PacksSection from '../components/sections/PacksSection';
import ContactCTA from '../components/sections/ContactCTA';
import SectionHead from '../components/ui/SectionHead';
import FadeUp from '../components/ui/FadeUp';
import ToolTile from '../components/ui/ToolTile';
import Video from '../components/ui/Video';
import Button from '../components/ui/Button';
import CoreServices from '../components/sections/CoreServices';
import { catalogue, sectors, segments } from '../data/services';
import { toolCategories } from '../data/tools';

export default function Services() {
  const total = catalogue.reduce((n, g) => n + g.items.length, 0);
  const live = catalogue.reduce((n, g) => n + g.items.filter((i) => i.live).length, 0);

  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Nuvō’s six core services — strategy, branding, websites, digital marketing, business systems and growth support — and four plans to start with."
      />
      <ServicesHero />

      <PlanShowcase num="01" />

      <CoreServices num="02" />

      <div className="on-cream">
        <PacksSection num="03" />
      </div>

      <section className="section catalog-vid" id="catalogue">
        <Video src="/media/catalog-bg.mp4" poster="/media/catalog-bg-poster.jpg" fill className="catalog-vid-bg" />
        <div className="catalog-vid-scrim" aria-hidden="true" />
        <div className="container rel">
          <SectionHead
            num="04"
            eyebrow="Full catalog"
            title={`${total} services.\n*One* partner.`}
            lead={`${live} are available today inside Plan 1 and Plan 2. The rest are delivered by request and are being rolled out as Nuvō grows.`}
            split
          />
          <div className="catalogue">
            {catalogue.map((g, gi) => (
              <FadeUp className="cat-group" key={g.group} delay={(gi % 3) * 0.08}>
                <h3 className="cat-title">
                  <span>{String(gi + 1).padStart(2, '0')}</span>
                  {g.group}
                </h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.name} className={it.live ? 'is-live' : ''}>
                      <span>{it.name}</span>
                      <em>{it.live ? 'Available now' : 'By request'}</em>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-navy">
        <div className="container">
          <SectionHead
            num="05"
            eyebrow="Sectors we serve"
            title={'Built for distribution,\nmanufacturing and *trade.*'}
            lead="Practical software, connected systems and AI-enabled services tailored to day-to-day operations — not generic templates."
            split
          />
          <div className="sector-grid">
            {sectors.map((s, i) => (
              <FadeUp className={`sector-card${s.image ? ' has-img' : ''}`} key={s.name} delay={(i % 4) * 0.06}>
                {s.image && <img className="sector-img" src={s.image} alt="" loading="lazy" />}
                <span className="sector-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="segments">
            <div className="segments-head">
              <span>Who</span>
              <span>The problem</span>
              <span>What Nuvō solves</span>
            </div>
            {segments.map((s) => (
              <div className="segments-row" key={s.who}>
                <strong>{s.who}</strong>
                <span className="mute">{s.pain}</span>
                <span>{s.fix}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container">
          <SectionHead
            num="06"
            eyebrow="Tools we connect"
            title={'If it has an API,\nwe can *connect* it.'}
            lead="The tools small businesses already use — WhatsApp, QuickBooks, Xero, Zoho, Stripe, Google Workspace — plus the automation platforms and AI models that tie them together."
            split
          />
          <div className="tool-cats">
            {toolCategories.map((c, i) => (
              <FadeUp className="tool-cat" key={c.name} delay={(i % 3) * 0.08}>
                <h3>{c.name}</h3>
                <div className="tool-cat-grid">
                  {c.tools.map((t) => (
                    <ToolTile key={t} name={t} />
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="integ-escape">
            <p>
              <strong>Don't see your tool?</strong> Tell us what you use — if it has an API or an export, it can almost
              certainly be connected.
            </p>
            <Button to="/contact" variant="ghost" size="sm">
              Ask us
            </Button>
          </FadeUp>
        </div>
      </section>

      <ContactCTA num="07" />
    </>
  );
}
