// Optional Google Analytics 4. Set VITE_GA_ID=G-XXXXXXX in the host's environment
// (or .env.local) to switch it on; with no ID nothing loads and nothing is tracked.
// Tracked: page views, call / WhatsApp / email clicks, and form submissions.

const ID = import.meta.env.VITE_GA_ID;
let ready = false;

function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

export function initAnalytics() {
  if (!ID || ready || typeof window === 'undefined') return;
  ready = true;
  window.dataLayer = window.dataLayer || [];
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', ID, { send_page_view: false, anonymize_ip: true });

  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('click_call');
    else if (href.startsWith('mailto:')) track('click_email');
    else if (/wa\.me|whatsapp\.com/.test(href)) track('click_whatsapp');
  });
}

export function track(name, params = {}) {
  if (ready) gtag('event', name, params);
}

export function pageView(path) {
  if (ready) gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}
