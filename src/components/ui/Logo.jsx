// NUVŌ wordmark — bold serif, gold Ō (brand logo), optional agency line.
export default function Logo({ compact = false }) {
  return (
    <span className="logo">
      <span className="logo-word" role="img" aria-label="Nuvō">
        <span className="lw-nuv" aria-hidden="true">NUV</span>
        <span className="lw-o" aria-hidden="true">Ō</span>
      </span>
      {!compact && <span className="logo-sub">Business Transformation</span>}
    </span>
  );
}
