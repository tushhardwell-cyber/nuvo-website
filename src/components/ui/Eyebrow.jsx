export default function Eyebrow({ num, children, bar = true, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      {bar && <span className="eyebrow-bar" aria-hidden="true" />}
      {num && <span className="eyebrow-num">{num} /</span>}
      <span>{children}</span>
    </span>
  );
}
