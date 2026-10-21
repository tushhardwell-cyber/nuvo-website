import { Link } from 'react-router-dom';
import { site, waLink } from '../../data/site';
import { packs } from '../../data/packs';
import Logo from '../ui/Logo';
import { scrollToTarget } from '../../hooks/useSmoothScroll';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-big container-wide" aria-hidden="true">
        <span className="footer-wordmark">NUVŌ</span>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tag">Websites, systems &amp; AI automation for growing businesses.</p>
          <p className="footer-closer">{site.closer}</p>
        </div>

        <div className="footer-col">
          <h3>Plans</h3>
          <ul>
            {packs.map((p) => (
              <li key={p.slug}>
                <Link to={`/services/${p.slug}`}>
                  {p.number} · {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><Link to="/work">Use cases</Link></li>
            <li><Link to="/work?tab=projects">Our work</Link></li>
            <li><Link to="/process">Process</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/resources">Resources &amp; FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Talk to us</h3>
          <ul>
            <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp ↗</a></li>
            <li><a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a></li>
            {site.socials.linkedin && <li><a href={site.socials.linkedin} target="_blank" rel="noreferrer me">LinkedIn ↗</a></li>}
            {site.socials.instagram && <li><a href={site.socials.instagram} target="_blank" rel="noreferrer me">Instagram ↗</a></li>}
            <li className="mute">{site.contact.city}</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {site.legalName}. All rights reserved.</p>
        <p className="mute">{site.contact.reach}</p>
        <div className="footer-legal">
          <button type="button" onClick={() => scrollToTarget(0, { offset: 0 })}>Back to top ↑</button>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
