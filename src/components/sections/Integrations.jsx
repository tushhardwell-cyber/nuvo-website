import { orbitInner, orbitOuter, aiTools } from '../../data/tools';
import SectionHead from '../ui/SectionHead';
import ToolTile from '../ui/ToolTile';
import Marquee from '../ui/Marquee';
import OMark from '../ui/OMark';
import BrandMark from '../ui/BrandMark';
import FadeUp from '../ui/FadeUp';
import Button from '../ui/Button';

// Both rings turn together (same speed & direction), with the outer chips offset
// into the gaps of the inner ring, so chips can never collide while moving.
function Orbit({ items, radius, duration, offset = 0 }) {
  return (
    <div
      className="orbit"
      style={{ '--r': `${radius}px`, '--dur': `${duration}s` }}
      aria-hidden="true"
    >
      <span className="orbit-path" />
      {items.map((t, i) => (
        <span className="orbit-slot" key={t} style={{ '--a': `${offset + (360 / items.length) * i}deg` }}>
          <span className="orbit-chip">
            <BrandMark name={t} size={18} showName />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Integrations({ num = '05' }) {
  return (
    <section className="section integrations" data-glow>
      <div className="container rel">
        <div className="integ-grid">
          <div className="integ-copy">
            <SectionHead
              num={num}
              eyebrow="Integrations"
              title={'Your tools.\nWorking as *one system.*'}
              lead="Your business already runs on WhatsApp, Excel, accounting software and Google. We don't replace them — we connect them into one system, so information moves on its own and nobody copy-pastes anything again."
            />
          </div>

          <FadeUp className="integ-hub" delay={0.1}>
            <Orbit items={orbitInner} radius={190} duration={110} />
            <Orbit items={orbitOuter} radius={320} duration={110} offset={22.5} />
            <div className="integ-core">
              <span className="integ-core-ring" />
              <span className="integ-core-ring r2" />
              <OMark size={64} />
              <strong>NUVŌ</strong>
              <small>Business<br />Transformation</small>
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="integ-marquees">
        <Marquee items={aiTools} speed={38} render={(t) => <ToolTile name={t} />} />
        <Marquee
          items={['QuickBooks', 'Xero', 'Stripe', 'Google Sheets', 'PayPal', 'Zoho Books', 'Instagram', 'Shopify', 'WordPress', 'Outlook']}
          speed={46}
          reverse
          render={(t) => <ToolTile name={t} />}
        />
      </div>

      <div className="container">
        <FadeUp className="integ-escape">
          <p>
            <strong>Don't see your tool?</strong> If it has an API — or even just an Excel export — we can almost certainly
            connect it. Nothing is off the table.
          </p>
          <Button to="/services#tools" variant="ghost" size="sm">
            See every tool
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
