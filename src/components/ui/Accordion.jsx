import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Accordion({ items, single = true }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div className={`acc-item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <button className="acc-q" aria-expanded={isOpen} onClick={() => toggle(i)}>
              <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="acc-text">{item.q}</span>
              <span className="acc-icon" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="acc-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
