import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useMedia';

// Data-saver or 2G/3G visitors get the still poster instead of downloading video.
const lowData = () => {
  const c = typeof navigator !== 'undefined' ? navigator.connection : null;
  return !!c && (c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || ''));
};

// Muted looping video that plays only while on screen.
// Shown at its own aspect ratio (pass `ratio`, e.g. "16 / 9") so it is never stretched.
// Reduced-motion visitors get the still poster.
export default function Video({ src, poster, ratio, className = '', label, fill = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion() || lowData();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const style = ratio && !fill ? { aspectRatio: ratio } : undefined;
  return (
    <div className={`nv-video${fill ? ' is-fill' : ''}${ready ? ' is-ready' : ''} ${className}`} style={style}>
      {reduce ? (
        <img src={poster} alt={label || ''} />
      ) : (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onLoadedData={() => setReady(true)}
        />
      )}
    </div>
  );
}
