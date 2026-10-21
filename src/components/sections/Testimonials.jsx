import SectionHead from '../ui/SectionHead';
import FadeUp from '../ui/FadeUp';
import { testimonials } from '../../data/testimonials';

// What owners say. Data (and the placeholder warning) lives in data/testimonials.js.
export default function Testimonials({ num = '09' }) {
  if (!testimonials.length) return null;
  return (
    <section className="section quotes3">
      <div className="container">
        <SectionHead num={num} eyebrow="In their words" title={'Owners who stopped\n*chasing* and started running.'} />
        <div className="quotes3-grid">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.08}>
              <figure className="quote3">
                <span className="quote3-mark" aria-hidden="true">“</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="quote3-av" aria-hidden="true">{t.name[0]}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
