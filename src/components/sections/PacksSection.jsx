import { Link } from 'react-router-dom';
import { packs } from '../../data/packs';
import SectionHead from '../ui/SectionHead';
import Chip from '../ui/Chip';
import FadeUp from '../ui/FadeUp';
import TiltCard from '../ui/TiltCard';
import PackVisual from './PackVisual';
import Button from '../ui/Button';

export default function PacksSection({ num = '03' }) {
  return (
    <section className="section packs" id="packs">
      <div className="glow packs-glow" />
      <div className="container rel">
        <SectionHead
          num={num}
          eyebrow="Plans"
          title={'Four plans.\nAutomation *built into* every one.'}
          lead="Each plan is a complete outcome, not a list of tasks — scoped and quoted for your business after a free audit. Every plan ships with automation built in."
          split
        />

        <div className="pack-list">
          {packs.map((p, i) => (
            <article className={`pack-row${i % 2 ? ' is-flip' : ''}`} key={p.slug}>
              <FadeUp className="pack-copy">
                <div className="pack-meta">
                  <span className="pack-num">
                    Plan {p.number} / {p.kicker}
                  </span>
                  {p.focus && <span className="pack-focus">Our focus</span>}
                  {!p.focus && p.status === 'Active' && <span className="pack-status">Available now</span>}
                  {p.status === 'By request' && <span className="pack-status soft">By request</span>}
                </div>
                <h3 className="h3 pack-name">{p.name}</h3>
                <p className="pack-short">{p.short}</p>
                <p className="pack-tagline">“{p.tagline}”</p>
                <dl className="pack-facts">
                  <div>
                    <dt>Engagement</dt>
                    <dd>{p.engagement}</dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>{p.timeline}</dd>
                  </div>
                </dl>
                <div className="chips">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <Link to={`/services/${p.slug}`} className="text-link">
                  Explore {p.name} <span aria-hidden="true">→</span>
                </Link>
              </FadeUp>
              <FadeUp delay={0.15} className="pack-visual-wrap">
                <TiltCard className="pack-visual-card" max={6}>
                  <PackVisual kind={p.visual} />
                </TiltCard>
              </FadeUp>
            </article>
          ))}
        </div>

        <FadeUp className="care-callout">
          <div>
            <span className="eyebrow">Ongoing care</span>
            <h3 className="h3">
              Systems need looking after. <em className="gold-em">We stay on.</em>
            </h3>
            <p className="body-dim">
              Optional monthly care — fixes, performance reports, fresh content and new automations as your
              business grows. No lock-in, cancel any month.
            </p>
          </div>
          <Button to="/contact" variant="ghost">
            Ask about ongoing care
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
