import Video from './Video';
import Icon from './Icon';

// A plan's hero visual: photo or video at its own proportions (cropped, never
// stretched) with floating "live" pins that gently drift.
export default function PlanMedia({ media, className = '', pins = true, lazy = true }) {
  return (
    <div className={`pmedia ${className}`}>
      <div className="pmedia-frame">
        {media.kind === 'video' ? (
          <Video src={media.src} poster={media.poster} fill label={media.alt} />
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            width={media.w}
            height={media.h}
            loading={lazy ? 'lazy' : 'eager'}
            style={{ objectPosition: media.pos }}
          />
        )}
        <span className="pmedia-shade" aria-hidden="true" />
      </div>
      {pins &&
        media.pins.map((p, i) => (
          <span key={p.text} className={`pin pin-${p.pos}`} style={{ '--d': `${i * 0.9}s` }}>
            <i>
              <Icon name={p.icon} size={14} stroke={2} />
            </i>
            {p.text}
          </span>
        ))}
    </div>
  );
}
