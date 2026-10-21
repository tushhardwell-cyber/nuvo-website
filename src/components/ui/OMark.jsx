import { useId } from 'react';

// The Nuvō "Ō" emblem — ring + macron. Used as mark, separator and loader.
export default function OMark({ size = 40, className = '', strokeWidth = 3.2, ring = true }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`omark ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`og-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1dcaa" />
          <stop offset=".45" stopColor="#c9972c" />
          <stop offset="1" stopColor="#8f6a1c" />
        </linearGradient>
      </defs>
      {ring && <circle cx="32" cy="32" r="30" fill="none" stroke={`url(#og-${id})`} strokeWidth="1.2" opacity=".7" />}
      <rect x="21.5" y="14" width="21" height="3.2" rx="1.6" fill={`url(#og-${id})`} />
      <ellipse cx="32" cy="37" rx="11" ry="12.5" fill="none" stroke={`url(#og-${id})`} strokeWidth={strokeWidth} />
    </svg>
  );
}
