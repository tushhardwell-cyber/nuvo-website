export default function Marquee({ items, reverse = false, speed = 40, render, className = '' }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'is-reverse' : ''} ${className}`} style={{ '--speed': `${speed}s` }}>
      <div className="marquee-track">
        {list.map((item, i) => (
          <div className="marquee-item" key={i} aria-hidden={i >= items.length}>
            {render ? render(item, i) : item}
          </div>
        ))}
      </div>
    </div>
  );
}
