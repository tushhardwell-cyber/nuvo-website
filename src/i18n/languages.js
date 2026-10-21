// Languages offered in the nav. English is the default and the source text of the site.
export const languages = [
  { code: 'en', short: 'EN', name: 'English', native: 'English' },
  { code: 'es', short: 'ES', name: 'Spanish', native: 'Español' },
  { code: 'fr', short: 'FR', name: 'French', native: 'Français' },
  { code: 'ru', short: 'RU', name: 'Russian', native: 'Русский' },
  { code: 'zh', short: '中文', name: 'Chinese (Mandarin)', native: '中文（简体）' },
  { code: 'de', short: 'DE', name: 'German', native: 'Deutsch' },
];

export const DEFAULT_LANG = 'en';
export const isLang = (c) => languages.some((l) => l.code === c);

// Whitespace-insensitive lookup key (JSX line wrapping must not matter).
export const normalize = (s) => String(s).replace(/\s+/g, ' ').trim();
