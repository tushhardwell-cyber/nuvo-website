import Chip from '../ui/Chip';
import Video from '../ui/Video';
import Button from '../ui/Button';
import ImageSlider from '../ui/ImageSlider';
import { useLang } from '../../i18n/LangContext';

// A delivered project, shown open: media on one side, the full story on the other.
export default function ProjectCard({ item, flip = false }) {
  const { t } = useLang();
  return (
    <article className={`proj${flip ? ' is-flip' : ''}`}>
      <div className={`proj-media${item.gallery ? ' has-gallery' : ''}`}>
        {item.gallery ? (
          <ImageSlider images={item.gallery} />
        ) : item.video ? (
          <Video src={item.video} poster={item.image} fill label={`${t(item.client)} — ${t('project video')}`} />
        ) : (
          <img src={item.image} alt={`${t(item.client)} — ${t('project visual')}`} loading="lazy" style={item.imagePos ? { objectPosition: item.imagePos } : undefined} />
        )}
      </div>
      <div className="proj-body">
        <span className="work-kind static case">Case study</span>
        <h3 className="h3">{item.client}</h3>
        <p className="mute">
          {item.industry} · {item.pack}
        </p>
        <p className="proj-headline">{item.headline}</p>
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
      </div>
    </article>
  );
}
