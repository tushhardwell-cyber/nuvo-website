import { useEffect } from 'react';

// Background hover light: any element with [data-glow] gets --gx/--gy set to the
// pointer position, which CSS turns into a soft radial highlight. One listener
// for the whole site; mouse/trackpad only.
export function useHoverGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let raf = 0;
    let last = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const els = [];
        let el = e.target instanceof Element ? e.target.closest('[data-glow]') : null;
        while (el) {
          els.push(el);
          el = el.parentElement?.closest('[data-glow]');
        }
        for (const g of els) {
          const r = g.getBoundingClientRect();
          g.style.setProperty('--gx', `${e.clientX - r.left}px`);
          g.style.setProperty('--gy', `${e.clientY - r.top}px`);
          g.classList.add('is-glowing');
        }
        if (last) for (const g of last) if (!els.includes(g)) g.classList.remove('is-glowing');
        last = els;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
