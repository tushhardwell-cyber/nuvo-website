import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Chip from '../ui/Chip';
import Video from '../ui/Video';
import Button from '../ui/Button';
import { getLenis } from '../../hooks/useSmoothScroll';

export default function WorkModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="work-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="work-modal"
            layoutId={`work-${item.slug}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.client}
            data-lenis-prevent
          >
            <button className="work-modal-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
            <div className="work-modal-media">
              <motion.div className="work-media-inner" layoutId={`work-img-${item.slug}`}>
                {item.video ? (
                  <Video src={item.video} poster={item.image} fill label={item.client} />
                ) : (
                  <img src={item.image} alt="" />
                )}
              </motion.div>
            </div>
            <motion.div
              className="work-modal-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
            >
              <span className={`work-kind static ${item.kind}`}>Case study</span>
              <h2 className="h3">{item.client}</h2>
              <p className="mute">
                {item.industry} · {item.pack}
              </p>
              <p className="work-modal-headline">{item.headline}</p>
              <p className="body-dim">{item.body}</p>
              <p className="work-result">
                <span aria-hidden="true">↗</span> {item.result}
              </p>
              <div className="chips">
                {item.services.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <Button to="/contact" variant="primary" size="md">
                Build something like this
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
