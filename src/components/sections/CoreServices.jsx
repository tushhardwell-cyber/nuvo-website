import { Link } from 'react-router-dom';
import { coreServices } from '../../data/services';
import { packs } from '../../data/packs';
import SectionHead from '../ui/SectionHead';
import FadeUp from '../ui/FadeUp';
import Icon from '../ui/Icon';

// What we do — the six core services, then the plans as the ways to start.
// Used on the Home page and the Services page. Each card has a real photo, its own
// colour, and a coloured icon badge.
export default function CoreServices({ num = '03' }) {
  return (
    <section className="section core cine-tall" id="what-we-do" data-glow>
      <div className="container">
        <SectionHead
          num={num}
          eyebrow="What we do"
          title={'Six services.\nOne *connected* business.'}
          lead="Strategy tells you where to go. Brand and presence make you worth choosing. Systems and automation make it run. We do all of it — and connect it."
          split
        />

        <div className="core-grid">
          {coreServices.map((s, i) => (
            <FadeUp key={s.title} delay={(i % 3) * 0.07}>
              <Link to={s.to} className={`core-card tone-${s.tone}`} data-glow>
                <span className="core-photo" aria-hidden="true">
                  <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.pos }} />
                  <span className="core-photo-tint" />
                  <span className="core-num">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <span className="core-icon">
                  <Icon name={s.icon} size={26} stroke={1.8} />
                </span>
                <span className="core-body">
                  <h3 className="core-title">{s.title}</h3>
                  <p className="core-line">{s.line}</p>
                  <ul className="core-points">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className="core-more">
                    Explore <Icon name="arrowRight" size={15} />
                  </span>
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="plans-row">
          <div className="plans-row-head">
            <span className="eyebrow">Ways to start</span>
            <p>Four plans, each a complete outcome — scoped to your business after a free audit.</p>
          </div>
          <div className="plans-row-list">
            {packs.map((p) => (
              <Link key={p.slug} to={`/services/${p.slug}`} className="plan-chip">
                <span className="plan-chip-n">Plan {p.number}</span>
                <strong>{p.name}</strong>
                <span className="plan-chip-t">{p.timeline}</span>
              </Link>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
