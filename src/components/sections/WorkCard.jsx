import { motion } from 'framer-motion';
import Chip from '../ui/Chip';
import Video from '../ui/Video';
import { useLang } from '../../i18n/LangContext';

export default function WorkCard({ item, onOpen, large = false }) {
  const { t } = useLang();
  return (
    <motion.div
      className={`work-card${large ? ' is-large' : ''}`}
      layoutId={`work-${item.slug}`}
      onClick={() => onOpen?.(item)}
      data-cursor="View"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen?.(item))}
    >
      <div className="work-media">
        <motion.div className="work-media-inner" layoutId={`work-img-${item.slug}`}>
          {item.video ? (
            <Video src={item.video} poster={item.image} fill label={`${t(item.client)} — ${t('project video')}`} />
          ) : (
            <img src={item.image} alt={`${t(item.client)} — ${t('project visual')}`} loading="lazy" style={item.imagePos ? { objectPosition: item.imagePos } : undefined} />
          )}
        </motion.div>
        <span className={`work-kind ${item.kind}`}>Case study</span>
      </div>
      <div className="work-body">
        <div className="work-head">
          <h3 className="work-client">{item.client}</h3>
          <span className="work-ind">{item.industry}</span>
        </div>
        <div className="chips">
          {item.services.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <p className="work-headline">{item.headline}</p>
        <p className="work-result">
          <span aria-hidden="true">↗</span> {item.result}
        </p>
      </div>
    </motion.div>
  );
}
