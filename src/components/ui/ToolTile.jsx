import BrandMark from './BrandMark';

export default function ToolTile({ name, size = 'md' }) {
  return (
    <span className={`tool-tile tool-${size}`} title={name}>
      <BrandMark name={name} size={size === 'sm' ? 16 : 22} />
      <span className="tool-name">{name}</span>
    </span>
  );
}
