import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import OMark from '../ui/OMark';

const ease = [0.76, 0, 0.24, 1];

// Each route is wrapped in a shell that carries its own enter/exit curtain.
const PageShell = forwardRef(function PageShell({ children }, ref) {
  return (
    <motion.div ref={ref} className="page-shell">
      <motion.div
        className="curtain curtain-in"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease, delay: 0.1 } }}
      />
      <motion.div
        className="curtain curtain-out"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.6, ease } }}
      >
        <motion.div
          className="curtain-mark"
          initial={{ opacity: 0, scale: 0.8 }}
          exit={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } }}
        >
          <OMark size={64} />
        </motion.div>
      </motion.div>
      <motion.main
        id="main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.45, ease } }}
      >
        {children}
      </motion.main>
    </motion.div>
  );
});

export default PageShell;
