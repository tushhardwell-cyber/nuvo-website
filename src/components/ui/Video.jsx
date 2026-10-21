import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useMedia';

// Only an explicit Data-saver setting or a genuinely slow (2G) link gets the still poster. 3G is NOT
// treated as slow: browsers often report 'effectiveType: 3g' for ordinary broadband with a high ping.
const lowData = () => {
  const c = typeof navigator !== 'undefined' ? navigator.connection : null;
  return !!c && (c.saveData || /^(slow-)?2g$/.test(c.effectiveType || ''));
};

// Bump this when a media file is replaced: it changes every video/poster URL so browsers and CDNs
// never reuse an older (or missing) copy.
const MEDIA_V = '3';
const bust = (u) => (u ? `${u}${u.includes('?') ? '&' : '?'}v=${MEDIA_V}` : u);

// Muted looping video that plays only while on screen.
// Shown at its own aspect ratio (pass `ratio`, e.g. "16 / 9") so it is never stretched.
// Reduced-motion visitors get the still poster.
export default function Video({ src, poster, ratio, className = '', label, fill = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion() || lowData();
  const [ready, setReady] = useState(false);
  const visible = useRef(false); // on screen right now — lets a late-loading file start as soon as it can

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
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
        <img src={bust(poster)} alt={label || ''} />
      ) : (
        <video
          ref={ref}
          src={bust(src)}
          poster={bust(poster)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => visible.current && ref.current?.play().catch(() => {})}
        />
      )}
    </div>
  );
}
