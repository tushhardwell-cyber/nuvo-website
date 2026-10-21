import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
export const getLenis = () => lenisInstance;

export function scrollToTarget(target, opts = {}) {
  if (lenisInstance) {
    // re-measure first: lazily rendered pages can grow after Lenis cached the scroll limit
    lenisInstance.resize();
    lenisInstance.scrollTo(target, { offset: -90, duration: 1.4, ...opts });
  }
  else if (typeof target === 'number') window.scrollTo(0, target);
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 });
    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    // Keep GSAP's default lag smoothing so timelines (e.g. the intro) never
    // jump ahead when the main thread is briefly blocked by WebGL compiles.
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
