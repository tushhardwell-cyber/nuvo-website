import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useReducedMotion } from '../../hooks/useMedia';

// Photos that keep sliding by themselves (cross-fade + slow zoom). Moving the cursor across the
// frame scrubs between them (left → first, right → last) and pauses the auto-slide; dots also work.
export default function ImageSlider({ images, interval = 4200 }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (hover || reduce || images.length < 2) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [hover, reduce, images.length, interval]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const k = Math.min(images.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * images.length)));
    setI(k);
  };

  return (
    <div
      className="slider"
      ref={ref}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onPointerMove={(e) => e.pointerType === 'mouse' && onMove(e)}
    >
      {images.map((g, k) => (
        <img key={g.src} className={k === i ? 'is-on' : ''} src={g.src} alt={t(g.alt)} loading="lazy" style={{ objectPosition: g.pos }} />
      ))}
      <div className="slider-dots">
        {images.map((g, k) => (
          <button key={g.src} type="button" className={k === i ? 'is-on' : ''} aria-label={t(g.alt)} onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  );
}
