import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { megaMenu, nav, site, waLink } from '../../data/site';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import BrandMark from '../ui/BrandMark';
import LangSwitch from '../ui/LangSwitch';
import { getLenis } from '../../hooks/useSmoothScroll';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef();
  const location = useLocation();
  const onServices = location.pathname.startsWith('/services');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMega(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}${hidden && !mega && !open ? ' is-hidden' : ''}`}>
        <div className="nav-inner container-wide">
          <Link to="/" className="nav-logo" aria-label="Nuvō — home">
            <Logo />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="nav-mega-trigger"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <NavLink
                    to={item.to}
                    className={`nav-link${mega || onServices ? ' active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={mega}
                    onFocus={openMega}
                  >
                    {item.label}
                    <Icon name="chevronDown" size={14} stroke={2} className={`nav-chev${mega ? ' is-up' : ''}`} />
                  </NavLink>
                </div>
              ) : (
                <NavLink key={item.label} to={item.to} className="nav-link">
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="nav-actions">
            <LangSwitch />
            <a href={`tel:${site.contact.phone}`} className="nav-btn nav-btn-outline">
              <Icon name="phone" size={16} />
              <span>Call</span>
            </a>
            <NavLink to="/resources" className="nav-btn nav-btn-glow">
              <i className="glow-ring" aria-hidden="true" />
              <Icon name="sparkle" size={16} />
              <span>Test yourself</span>
            </NavLink>
            <Link to="/contact" className="nav-btn nav-btn-solid">
              <span>Book a call</span>
              <Icon name="arrowUpRight" size={15} stroke={2} />
            </Link>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              className="mega"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && closeMega()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mega-grid">
                {megaMenu.items.map((m, i) => (
                  <Link key={m.title} to={m.to} className="mega-item">
                    {m.brand ? (
                      <span className="mega-icon is-brand">
                        <BrandMark name={m.brand} size={24} />
                      </span>
                    ) : (
                      <span className={`mega-icon tone-${i % 9}`}>
                        <Icon name={m.icon} size={20} />
                      </span>
                    )}
                    <span className="mega-text">
                      <strong>
                        {m.title}
                        {m.isNew && <em className="mega-new">New</em>}
                      </strong>
                      <span>{m.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link to={megaMenu.feature.to} className="mega-feature">
                <span className="mega-feature-eyebrow">{megaMenu.feature.eyebrow}</span>
                <span className="mega-feature-title">{megaMenu.feature.title}</span>
                <span className="mega-feature-sub">
                  {megaMenu.feature.sub}
                  <Icon name="arrowRight" size={16} />
                </span>
                <span className="mega-feature-line" aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-inner container">
              <ul>
                {[{ label: 'Home', to: '/' }, ...nav, { label: 'Contact', to: '/contact' }].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  >
                    <NavLink to={item.to} className="mobile-link">
                      <span className="mobile-link-num">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div className="mobile-menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.7 } }}>
                <div className="mobile-menu-btns">
                  <a href={`tel:${site.contact.phone}`} className="nav-btn nav-btn-outline">
                    <Icon name="phone" size={16} /> <span>Call</span>
                  </a>
                  <Link to="/resources" className="nav-btn nav-btn-glow">
              <i className="glow-ring" aria-hidden="true" />
                    <Icon name="sparkle" size={16} /> <span>Test yourself</span>
                  </Link>
                  <a href={waLink('Hi Nuvō, I would like a free business audit.')} target="_blank" rel="noreferrer" className="nav-btn nav-btn-solid">
                    <span>WhatsApp us</span> <Icon name="arrowUpRight" size={15} stroke={2} />
                  </a>
                </div>
                <p className="mute">{site.contact.reach}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
