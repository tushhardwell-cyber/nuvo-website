import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useLang } from '../../i18n/LangContext';
import { languages } from '../../i18n/languages';

// Language picker for the navigation bar: glass pill with a globe, the language code and a list.
export default function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang ${className}`} ref={ref} translate="no">
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="globe" size={17} stroke={1.8} />
        <b>{current.short}</b>
        <Icon name="chevronDown" size={14} stroke={2} className={`lang-chev${open ? ' is-up' : ''}`} />
      </button>
      {open && (
        <ul className="lang-list" role="listbox" aria-label="Choose language">
          {languages.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                lang={l.code}
                className={l.code === lang ? 'is-on' : ''}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span>{l.native}</span>
                <small>{l.short}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
