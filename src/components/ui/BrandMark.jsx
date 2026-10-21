import { brandFor } from '../../data/brands';

// A tool's logo (real mark or brand-colour tile), optionally with its name.
export default function BrandMark({ name, size = 22, showName = false, className = '' }) {
  const b = brandFor(name);
  const icon = b.paths ? (
    <svg className="bm-svg bm-color" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {b.paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} />
      ))}
    </svg>
  ) : b.path ? (
    <svg className="bm-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={b.path} fill={b.color} />
    </svg>
  ) : (
    <span
      className="bm-tile"
      aria-hidden="true"
      style={{ width: size, height: size, background: b.color, fontSize: size * (b.mark.length > 2 ? 0.34 : 0.46) }}
    >
      {b.mark}
    </span>
  );
  return (
    <span className={`bm ${showName ? 'bm-named' : ''} ${className}`} title={b.label}>
      {icon}
      {showName ? <span className="bm-name">{b.label}</span> : <span className="sr-only">{b.label}</span>}
    </span>
  );
}
