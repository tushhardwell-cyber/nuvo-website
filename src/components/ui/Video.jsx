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
const MEDIA_V = '7';
const bust = (u) => (u ? `${u}${u.includes('?') ? '&' : '?'}v=${MEDIA_V}` : u);

// Phones (<= 900 px) and data-saver visitors get the lighter <name>-m.mp4 copy (scripts/build-mobile-videos.mjs);
// desktops keep the full-resolution file.
const smallScreen = () => {
  if (typeof window === 'undefined') return false;
  const c = navigator.connection;
  // small screen, Data Saver, or a measured link slower than ~7 Mbps / reported 3G-or-worse → light copy
  return window.matchMedia('(max-width: 900px)').matches || !!(c && (c.saveData || (c.downlink && c.downlink < 7) || /^(slow-)?2g$|^3g$/.test(c.effectiveType || '')));
};

// Muted looping video that plays only while on screen.
// Shown at its own aspect ratio (pass `ratio`, e.g. "16 / 9") so it is never stretched.
// Reduced-motion visitors get the still poster.
export default function Video({ src, poster, ratio, className = '', label, fill = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion() || lowData();
  const [ready, setReady] = useState(false);
  const [file] = useState(() => (smallScreen() && /.mp4$/.test(src) ? src.replace(/.mp4$/, '-m.mp4') : src));
  const [load, setLoad] = useState(false); // download the file only when it is about to be seen
  const visible = useRef(false); // on screen right now — lets a late-loading file start as soon as it can

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return undefined;
    // start downloading ~500px before the video scrolls into view (above-the-fold videos start at once)
    const pre = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          pre.disconnect();
          // let the page's own scripts/styles/fonts finish first, then fetch the video
          if (document.readyState === 'complete') setLoad(true);
          else {
            // start after the page finished loading — but never wait longer than 2.5 s for it
            const go = () => setLoad(true);
            window.addEventListener('load', () => setTimeout(go, 150), { once: true });
            setTimeout(go, 2500);
          }
        }
      },
      { rootMargin: '500px 0px' }
    );
    pre.observe(v);
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => {
      io.disconnect();
      pre.disconnect();
    };
  }, [reduce]);

  const style = ratio && !fill ? { aspectRatio: ratio } : undefined;
  return (
    <div className={`nv-video${fill ? ' is-fill' : ''}${ready ? ' is-ready' : ''} ${className}`} style={style}>
      {reduce ? (
        <img src={bust(poster)} alt={label || ''} />
      ) : (
        <video
          ref={ref}
          src={load ? bust(file) : undefined}
          poster={bust(poster)}
          muted
          loop
          playsInline
          preload={load ? 'auto' : 'none'}
          aria-label={label}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => visible.current && ref.current?.play().catch(() => {})}
        />
      )}
    </div>
  );
}
