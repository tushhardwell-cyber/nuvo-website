import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useSmoothScroll, getLenis, scrollToTarget } from './hooks/useSmoothScroll';
import { useHoverGlow } from './hooks/useHoverGlow';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import PageShell from './components/layout/PageShell';
import { initAnalytics, pageView } from './lib/analytics';
import { withRetry } from './lib/chunkReload';
import CinematicIntro from './components/intro/CinematicIntro';
import AskBot from './components/layout/AskBot';

const lazyPage = (factory) => {
  const load = withRetry(factory);
  const C = lazy(load);
  C.preload = load;
  return C;
};

const Home = lazyPage(() => import('./pages/Home'));
const Services = lazyPage(() => import('./pages/Services'));
const PackDetail = lazyPage(() => import('./pages/PackDetail'));
const UseCasesPage = lazyPage(() => import('./pages/UseCasesPage'));
const Work = lazyPage(() => import('./pages/Work'));
const ProcessPage = lazyPage(() => import('./pages/ProcessPage'));
const About = lazyPage(() => import('./pages/About'));
const Resources = lazyPage(() => import('./pages/Resources'));
const Contact = lazyPage(() => import('./pages/Contact'));
const Legal = lazyPage(() => import('./pages/Legal'));
const NotFound = lazyPage(() => import('./pages/NotFound'));

const ALL = [Home, Services, PackDetail, UseCasesPage, Work, ProcessPage, About, Resources, Contact];

function introAlreadySeen() {
  try {
    return sessionStorage.getItem('nuvo-intro') === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const location = useLocation();
  useSmoothScroll();
  useHoverGlow();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return location.pathname === '/' && !introAlreadySeen();
  });

  // Lock scroll during intro
  useEffect(() => {
    const lenis = getLenis();
    if (showIntro) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
  }, [showIntro]);

  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  // Warm up the other route chunks once the first page has settled
  useEffect(() => {
    // fetch the other pages' (small) code right after the first page settles, so switching pages is instant
    const id = setTimeout(() => ALL.forEach((p) => p.preload()), 1200);
    return () => clearTimeout(id);
  }, []);

  const endIntro = () => {
    try {
      sessionStorage.setItem('nuvo-intro', '1');
    } catch {
      /* storage unavailable */
    }
    setShowIntro(false);
  };

  // Scroll to a #hash once its element has rendered (lazy pages may need a moment)
  const scrollToHash = (hash, tries = 25) => {
    let el = null;
    try {
      el = document.querySelector(hash);
    } catch {
      return;
    }
    if (el) scrollToTarget(el);
    else if (tries > 0) setTimeout(() => scrollToHash(hash, tries - 1), 100);
  };

  useEffect(() => {
    if (location.hash && !showIntro) setTimeout(() => scrollToHash(location.hash), 400);
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageEnter = () => {
    if (location.hash) {
      scrollToHash(location.hash);
    } else {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {showIntro && <CinematicIntro onDone={endIntro} />}
      <ScrollProgress />
      <Nav />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onPageEnter}>
        <PageShell key={location.pathname}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Routes location={location}>
              <Route path="/" element={<Home introActive={showIntro} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<PackDetail />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route path="/work" element={<Work />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Legal kind="privacy" />} />
              <Route path="/terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </PageShell>
      </AnimatePresence>
      {!showIntro && <AskBot />}
    </>
  );
}
