import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Signature intro: a documentary-style montage of everyday business chaos,
// a hard cut to "Enough.", the NUVO wordmark forged in gold strokes, and the
// macron dropping in to lock the Ō. Then the frame splits open on the hero.

const MONTAGE = [
  { t: 'Invoices.', s: 'pending · 23' },
  { t: 'Follow-ups.', s: 'overdue · 4 days' },
  { t: 'Missed calls.', s: '+91 ••••• ••412' },
  { t: 'Unpaid bills.', s: '$ 18,450 outstanding' },
  { t: 'final_v7 (2).xlsx', s: 'which one is latest?', mono: true },
  { t: 'Cold leads.', s: 'last reply · 11 days ago' },
];

const LETTERS = [
  { ch: 'N', x: 140 },
  { ch: 'U', x: 340 },
  { ch: 'V', x: 540 },
  { ch: 'O', x: 740 },
];

export default function CinematicIntro({ onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone?.();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const words = q('.intro-word');
      const letters = q('.intro-letter');
      const tc = { f: 0 };
      const tcEl = q('.intro-timecode-val')[0];

      gsap.set(words, { autoAlpha: 0 });
      gsap.set(letters, { strokeDashoffset: 1600, fillOpacity: 0 });
      gsap.set(q('.intro-burst'), { transformOrigin: '50% 50%', scale: 0.2, opacity: 0 });
      gsap.set(q('.intro-macron'), { y: -260, autoAlpha: 0 });
      gsap.set(q('.intro-tag, .intro-pillars, .intro-enough'), { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
      tlRef.current = tl;

      // film timecode ticking throughout
      tl.to(
        tc,
        {
          f: 140,
          duration: 5.6,
          ease: 'none',
          onUpdate: () => {
            const f = Math.floor(tc.f);
            const s = Math.floor(f / 24);
            if (tcEl) tcEl.textContent = `00:00:${String(s).padStart(2, '0')}:${String(f % 24).padStart(2, '0')}`;
          },
        },
        0
      );

      tl.fromTo(q('.intro-frame'), { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0);

      // (The opening "Invoices… Enough." montage was removed — the intro starts at the wordmark.)

      // ── Forge the wordmark
      const forge = 0.35;
      tl.to(letters, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, forge);
      tl.to(letters, { fillOpacity: 1, duration: 0.7, stagger: 0.08, ease: 'power1.out' }, forge + 0.8);
      tl.fromTo(q('.intro-forge-glow'), { opacity: 0 }, { opacity: 0.9, duration: 1.2 }, forge + 0.6);

      // ── Macron drops: lock the Ō
      const lock = forge + 1.75;
      tl.to(q('.intro-macron'), { y: 0, autoAlpha: 1, duration: 0.42, ease: 'power4.in' }, lock);
      tl.fromTo(
        q('.intro-burst'),
        { scale: 0.2, opacity: 1 },
        { scale: 2.6, opacity: 0, duration: 0.9, ease: 'power2.out' },
        lock + 0.4
      );
      tl.fromTo(q('.intro-flash'), { opacity: 0.35 }, { opacity: 0, duration: 0.4 }, lock + 0.4);
      tl.to(q('.intro-svg'), { keyframes: { x: [0, -6, 5, -3, 2, 0] }, duration: 0.35, ease: 'none' }, lock + 0.4);

      // ── Tagline
      tl.fromTo(
        q('.intro-tag'),
        { autoAlpha: 0, letterSpacing: '0.7em', y: 10 },
        { autoAlpha: 1, letterSpacing: '0.34em', y: 0, duration: 0.9 },
        lock + 0.55
      );
      tl.fromTo(q('.intro-pillars'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7 }, lock + 0.8);

      // ── Exit: content recedes, frame splits open
      const exit = lock + 1.9;
      tl.to(q('.intro-stage'), { scale: 0.94, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, exit);
      tl.to(q('.intro-frame, .intro-hud, .intro-skip'), { autoAlpha: 0, duration: 0.4 }, exit);
      tl.to(q('.intro-half.top'), { yPercent: -100, duration: 1.0, ease: 'expo.inOut' }, exit + 0.45);
      tl.to(q('.intro-half.bottom'), { yPercent: 100, duration: 1.0, ease: 'expo.inOut' }, exit + 0.45);
      tl.to(q('.intro-seam'), { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, exit + 0.1);
      tl.to(q('.intro-seam'), { autoAlpha: 0, duration: 0.3 }, exit + 0.6);
      tl.set(root.current, { pointerEvents: 'none' }, exit + 0.6);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && skip();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    const tl = tlRef.current;
    if (tl && tl.progress() < 0.86) tl.timeScale(1).seek(tl.duration() - 1.5);
    else finish();
  };

  return (
    <div className="intro" ref={root} role="dialog" aria-label="Nuvō intro">
      <div className="intro-half top" />
      <div className="intro-half bottom" />
      <div className="intro-seam" />

      <div className="intro-frame" aria-hidden="true">
        <span className="c tl" />
        <span className="c tr" />
        <span className="c bl" />
        <span className="c br" />
      </div>
      <div className="intro-hud" aria-hidden="true">
        <span className="intro-rec">
          <i /> REC
        </span>
        <span className="intro-timecode-val">00:00:00:00</span>
        <span className="intro-reel">NUVŌ · REEL 01</span>
      </div>

      <div className="intro-stage">
        <div className="intro-montage" aria-hidden="true">
          {MONTAGE.map((m) => (
            <div className={`intro-word${m.mono ? ' mono' : ''}`} key={m.t}>
              <span className="w">{m.t}</span>
              <span className="s">{m.s}</span>
            </div>
          ))}
          <div className="intro-enough">Enough.</div>
        </div>

        <div className="intro-forge">
          <div className="intro-forge-glow" />
          <svg className="intro-svg" viewBox="0 0 880 260" role="img" aria-label="NUVŌ">
            <defs>
              <linearGradient id="intro-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f7ecd2" />
                <stop offset=".3" stopColor="#e6c27a" />
                <stop offset=".6" stopColor="#c9972c" />
                <stop offset="1" stopColor="#8f6a1c" />
              </linearGradient>
              <radialGradient id="intro-burst-g">
                <stop offset="0" stopColor="#fff8e6" stopOpacity="1" />
                <stop offset=".3" stopColor="#e6c27a" stopOpacity=".6" />
                <stop offset="1" stopColor="#c9972c" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle className="intro-burst" cx="740" cy="44" r="110" fill="url(#intro-burst-g)" />
            {LETTERS.map((l) => (
              <text
                key={l.ch}
                className="intro-letter"
                x={l.x}
                y="215"
                textAnchor="middle"
                fill="url(#intro-gold)"
                stroke="#e6c27a"
                strokeWidth="1.6"
                strokeDasharray="1600"
              >
                {l.ch}
              </text>
            ))}
            <rect className="intro-macron" x="690" y="38" width="100" height="13" rx="6.5" fill="url(#intro-gold)" />
          </svg>
          <div className="intro-tag">The Complete Business Transformation Agency</div>
          <div className="intro-pillars">
            <span>Presence</span>
            <i />
            <span>Operations</span>
            <i />
            <span>Growth</span>
          </div>
        </div>
      </div>

      <div className="intro-flash" aria-hidden="true" />
      <button className="intro-skip" onClick={skip}>
        Skip intro <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
