import { Link } from 'react-router-dom';
import { packs } from '../../data/packs';
import { planMedia } from '../../data/planMedia';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import Icon from '../ui/Icon';

// Services hero: copy on the left, an offset collage of real photos + video on
// the right with floating chips. Plan pills below the copy link straight in.
export default function ServicesHero() {
  // Collage photos: WhatsApp (new lead alert) · reports dashboard (9 AM summary) · sunset field (tomorrow)
  const a = { src: '/media/svc-hero-whatsapp.webp', w: 1500, h: 1000, pos: '42% 50%', alt: 'A smartphone screen with the WhatsApp icon among other apps' };
  const b = { src: '/media/svc-hero-reports.webp', w: 1500, h: 1000, pos: '36% 40%', alt: 'Printed analytics reports with charts beside a keyboard, pen and phone' };
  const c = { src: '/media/svc-hero-sunset.webp', w: 1200, h: 1600, pos: '50% 42%', alt: 'Tall grass and seed heads glowing in warm evening light' };

  return (
    <section className="shero" data-glow>
      <div className="container shero-grid">
        <div className="shero-copy">
          <FadeUp y={12}>
            <Eyebrow>Services</Eyebrow>
          </FadeUp>
          <RevealText
            as="h1"
            className="display shero-title"
            text={'Strategy, brand, presence\nand systems — *connected.*'}
            immediate
            delay={0.25}
          />
          <FadeUp delay={0.45}>
            <p className="lead">
              Pick the plan that matches where your business is today. Each one is a complete outcome, quoted after a
              free audit — and each one connects to the next.
            </p>
          </FadeUp>

          <ul className="shero-plans">
            {packs.map((p, i) => (
              <FadeUp as="li" key={p.slug} delay={0.55 + i * 0.07}>
                <Link to={`/services/${p.slug}`} className="shero-plan" style={{ '--plan': planMedia[p.slug].accent }}>
                  <span className="shero-plan-n">{p.number}</span>
                  <span className="shero-plan-t">
                    <strong>{p.name}</strong>
                    <small>{p.timeline}</small>
                  </span>
                  <span className="shero-plan-go" aria-hidden="true">
                    <Icon name="arrowUpRight" size={16} stroke={2} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </ul>
        </div>

        <div className="shero-collage" aria-hidden="false">
          <figure className="sc sc-a">
            <img src={a.src} alt={a.alt} width={a.w} height={a.h} style={{ objectPosition: a.pos }} />
          </figure>
          <figure className="sc sc-b">
            <img src={b.src} alt={b.alt} width={b.w} height={b.h} style={{ objectPosition: b.pos }} />
          </figure>
          <figure className="sc sc-c">
            <img src={c.src} alt={c.alt} width={c.w} height={c.h} style={{ objectPosition: c.pos }} />
          </figure>

          <span className="pin pin-1">
            <i>
              <Icon name="chat" size={14} stroke={2} />
            </i>
            New lead → WhatsApp alert
          </span>
          <span className="pin pin-2">
            <i>
              <Icon name="chart" size={14} stroke={2} />
            </i>
            9:00 AM summary sent
          </span>
          <span className="pin pin-3">
            <i>
              <Icon name="flow" size={14} stroke={2} />
            </i>
            Follow-up set for tomorrow
          </span>
        </div>
      </div>
    </section>
  );
}
