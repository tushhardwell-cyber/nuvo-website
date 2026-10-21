import FadeUp from '../ui/FadeUp';
import Eyebrow from '../ui/Eyebrow';
import { site, waLink } from '../../data/site';

// Founder introduction. Set site.founder.photo to a real photo (e.g. '/media/founder.webp') —
// until then a monogram is shown.
export default function FounderCard() {
  const f = site.founder;
  const links = [
    site.socials.linkedin && { label: 'LinkedIn', href: site.socials.linkedin },
    site.socials.instagram && { label: 'Instagram', href: site.socials.instagram },
  ].filter(Boolean);
  return (
    <section className="section founder3">
      <div className="container">
        <FadeUp className="founder3-card">
          <div className="founder3-photo">
            {f.photo ? <img src={f.photo} alt={`${f.name}, ${f.role}`} loading="lazy" /> : <span aria-hidden="true">{f.name[0]}</span>}
          </div>
          <div className="founder3-body">
            <Eyebrow>Meet the founder</Eyebrow>
            <h2 className="h3">{f.name}</h2>
            <p className="founder3-role">{f.role} · {site.contact.city}</p>
            <p className="lead">{f.bio}</p>
            <div className="founder3-links">
              <a className="text-link" href={waLink('Hi, I would like to talk to the founder.')} target="_blank" rel="noreferrer">Message on WhatsApp ↗</a>
              {links.map((l) => (
                <a key={l.label} className="text-link" href={l.href} target="_blank" rel="noreferrer me">{l.label} ↗</a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
