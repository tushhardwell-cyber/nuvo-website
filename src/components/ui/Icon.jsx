// Minimal line-icon set (24×24, 1.6 stroke).
const PATHS = {
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h6M7 16h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 12a8 8 0 1 1 3.4 6.5L4 20l1.3-3.6A7.9 7.9 0 0 1 4 12Z" />
      <path d="M8.5 11h7M8.5 14h4.5" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17M3.5 14.5h17M9 3.5v17" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-4M11 16V8M15 16v-6M19 16V5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  flow: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8.5 6h3a3 3 0 0 1 3 3v.5M8.5 18h3a3 3 0 0 0 3-3v-.5" />
    </>
  ),
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="m9.5 10-2.5 2.5 2.5 2.5M14.5 10l2.5 2.5-2.5 2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      <path d="M12 7.5v3M10.5 9h3" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.5-1 5-.9 5-.9s.1 2.5-.9 5L12.5 15 9 11.5Z" />
      <path d="M9 11.5 6.5 11l-2 2.5 3.5 1M12.5 15l.5 2.5-2.5 2-1-3.5M15.5 8.5h.01M6 18l-2 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M8 15l1.5 4.5M18.5 9.5a3 3 0 0 1 0 5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
      <circle cx="12" cy="12" r="6.2" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20h16M6.5 16.5v-3M10.5 16.5v-5M14.5 16.5v-7M18.5 16.5V7" />
      <path d="m5 11 5-4 3 2 6-5M15.5 4H19v3.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" />
      <path d="M15.5 8.5V6.2a1.7 1.7 0 0 0-1.7-1.7H6.2a1.7 1.7 0 0 0-1.7 1.7v7.6a1.7 1.7 0 0 0 1.7 1.7h2.3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5Z" />,
  sparkle: (
    <>
      <path d="M12 3.5 13.9 9a2 2 0 0 0 1.2 1.2L20.5 12l-5.4 1.9a2 2 0 0 0-1.2 1.2L12 20.5l-1.9-5.4a2 2 0 0 0-1.2-1.2L3.5 12l5.4-1.8A2 2 0 0 0 10.1 9Z" />
      <path d="M19 3v3M17.5 4.5h3" />
    </>
  ),
  send: <path d="M4 12 20 4l-4 16-4-7-8-1Zm8 1 8-9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
};

export default function Icon({ name, size = 20, stroke = 1.6, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
