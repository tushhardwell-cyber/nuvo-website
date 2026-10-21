import { coreServices } from '../../data/services';
import Marquee from '../ui/Marquee';
import Icon from '../ui/Icon';

// "Our core services" — the six pillars from the Nuvō card, as a slow strip.
export default function SectorStrip() {
  return (
    <section className="svc-strip" aria-label="Our core services">
      <p className="svc-strip-label">Our core services</p>
      <Marquee
        items={coreServices}
        speed={48}
        render={(s) => (
          <span className="svc-pill">
            <Icon name={s.icon} size={20} />
            {s.title}
          </span>
        )}
      />
    </section>
  );
}
