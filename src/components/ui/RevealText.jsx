import { motion } from 'framer-motion';
import { useLang } from '../../i18n/LangContext';

// Splits text into words and reveals them through a mask.
// Wrap words in *asterisks* to render them as gold italics.
// Use "\n" to force a line break.
const parse = (text) => {
  const out = [];
  text.split('\n').forEach((line, li) => {
    if (li > 0) out.push({ br: true });
    let italic = false;
    line.split(/(\*)/).forEach((chunk) => {
      if (chunk === '*') {
        italic = !italic;
        return;
      }
      chunk
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => out.push({ w, italic }));
    });
  });
  return out;
};

const word = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

export default function RevealText({
  as = 'h2',
  text: source,
  className = '',
  delay = 0,
  stagger = 0.055,
  once = true,
  immediate = false,
  play = true,
}) {
  const { t } = useLang();
  const text = t(source);
  const Tag = motion[as] || motion.h2;
  const words = parse(text);
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = immediate
    ? { initial: 'hidden', animate: play ? 'show' : 'hidden' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once, margin: '0px 0px -12% 0px' } };

  return (
    <Tag className={`reveal-text ${className}`} aria-label={plain} variants={variants} {...trigger}>
      {words.map((t, i) =>
        t.br ? (
          <br key={`br${i}`} />
        ) : (
          <span key={i} aria-hidden="true">
            <span className="rt-mask">
              <motion.span className="rt-word" variants={word}>
                {t.italic ? <em>{t.w}</em> : t.w}
              </motion.span>
            </span>
            <span className="rt-sp"> </span>
          </span>
        )
      )}
    </Tag>
  );
}
