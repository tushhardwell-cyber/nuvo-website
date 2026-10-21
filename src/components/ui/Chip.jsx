export default function Chip({ children, tone = 'line', className = '' }) {
  return <span className={`chip chip-${tone} ${className}`}>{children}</span>;
}
