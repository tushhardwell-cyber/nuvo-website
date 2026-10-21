import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCases, useCaseCategories } from '../../data/useCases';
import BrandMark from '../ui/BrandMark';
import { useLang } from '../../i18n/LangContext';

// Compact card: everything visible at a glance; the full description slides in on hover / focus / tap.
export function UseCaseCard({ uc, i = 0 }) {
  const { t } = useLang();
  return (
    <article className="uc2" tabIndex={0} aria-label={`${t(uc.title)}: ${t(uc.body)}`}>
      <div className="uc2-top">
        <span className="uc2-cat">{uc.category}</span>
        <span className="uc2-n">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="uc2-title">{uc.title}</h3>
      <span className="uc2-when">
        <i aria-hidden="true" /> {uc.timing}
      </span>
      <ul className="uc2-tools">
        {uc.tools.map((t) => (
          <li key={t}>
            <BrandMark name={t} size={16} showName />
          </li>
        ))}
      </ul>
      <p className="uc2-body">{uc.body}</p>
    </article>
  );
}

export default function UseCaseGrid({ filterable = false }) {
  const [cat, setCat] = useState('All');
  const list = useMemo(() => (cat === 'All' ? useCases : useCases.filter((u) => u.category === cat)), [cat]);

  return (
    <>
      {filterable && (
        <div className="uc-filters" role="tablist" aria-label="Filter by category">
          {useCaseCategories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`uc-filter${cat === c ? ' is-on' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="uc2-grid">
        <AnimatePresence mode="popLayout">
          {list.map((uc, i) => (
            <motion.div
              key={uc.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: '0px 0px -5% 0px' }}
              transition={{ duration: 0.6, delay: (i % 7) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <UseCaseCard uc={uc} i={useCases.indexOf(uc)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
