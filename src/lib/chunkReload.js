// If a page file (JS chunk) can't be fetched — typically because a new version was deployed and an
// open tab still points at the old file names, or the connection dropped — reload once to pick up the
// current version instead of hanging on a blank page. A guard stops reload loops.
export function reloadOnce() {
  try {
    const last = Number(sessionStorage.getItem('nuvo-chunk-reload') || 0);
    if (Date.now() - last < 15000) return false;
    sessionStorage.setItem('nuvo-chunk-reload', String(Date.now()));
  } catch {
    /* storage unavailable */
  }
  window.location.reload();
  return true;
}

// Retry a dynamic import once, then reload.
export const withRetry = (factory) => () =>
  factory()
    .catch(() => new Promise((r) => setTimeout(r, 600)).then(factory))
    .catch((err) => (reloadOnce() ? new Promise(() => {}) : Promise.reject(err)));

if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (e) => {
    e.preventDefault();
    reloadOnce();
  });
}
