import { useState } from 'react';
import LiquidBackdrop from './LiquidBackdrop';

const isImage = (src) => /\.(webp|gif|png|jpe?g|avif)(\?|$)/i.test(src || '');

// Background layer: plays a real video or animated image (.webp/.gif) when one is
// configured in data/site.js, otherwise (or if the file fails) falls back to the
// live WebGL backdrop. Reduced-motion visitors get the still poster.
export default function AmbientVideo({ src, poster, gold, light, className = '' }) {
  const [failed, setFailed] = useState(false);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasMedia = src && !failed;

  let layer;
  if (hasMedia && reduce && poster) {
    layer = <img className="ambient-video" src={poster} alt="" />;
  } else if (hasMedia && !reduce && isImage(src)) {
    layer = <img className="ambient-video" src={src} alt="" decoding="async" onError={() => setFailed(true)} />;
  } else if (hasMedia && !reduce) {
    layer = (
      <video
        className="ambient-video"
        src={src}
        poster={poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />
    );
  } else {
    layer = <LiquidBackdrop gold={gold} light={light} />;
  }

  return (
    <div className={`ambient ${className}`} aria-hidden="true">
      {layer}
      <div className="ambient-shade" />
    </div>
  );
}
