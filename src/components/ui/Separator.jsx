import { motion } from 'framer-motion';
import OMark from './OMark';

const ease = [0.16, 1, 0.3, 1];

// Recurring ornamental Ō separator — identity rhythm between sections.
export default function Separator({ className = '' }) {
  return (
    <div className={`separator ${className}`} aria-hidden="true">
      <motion.span
        className="sep-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        style={{ transformOrigin: 'right' }}
      />
      <motion.span
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.2 }}
      >
        <OMark size={30} />
      </motion.span>
      <motion.span
        className="sep-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
