import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFinePointer } from '../../hooks/useMedia';

// Magnetic button. Renders a router Link (to), anchor (href) or button.
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = '→',
  magnetic = true,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const fine = useFinePointer();

  const onMove = (e) => {
    if (!magnetic || !fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.22;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const cls = `btn btn-${variant} btn-${size} ${className}`;
  const inner = (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-label">{children}</span>
      {arrow && (
        <span className="btn-arrow" aria-hidden="true">
          {arrow}
        </span>
      )}
    </>
  );
  const common = { ref, className: cls, onMouseMove: onMove, onMouseLeave: onLeave, ...rest };

  if (to)
    return (
      <Link to={to} {...common}>
        {inner}
      </Link>
    );
  if (href) {
    const ext = /^https?:/.test(href);
    return (
      <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} {...common}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" {...common}>
      {inner}
    </button>
  );
}
