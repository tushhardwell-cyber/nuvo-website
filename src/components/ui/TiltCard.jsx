import { useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../../hooks/useMedia';

// 3D tilt with a moving specular highlight.
export default function TiltCard({ as: Tag = 'div', max = 8, className = '', children, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const active = fine && !reduce;

  const onMove = (e) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
    ref.current.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  return (
    <Tag ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
      <span className="tilt-shine" aria-hidden="true" />
    </Tag>
  );
}
