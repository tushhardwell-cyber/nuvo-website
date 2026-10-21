Background video slots
======================

Drop your background videos here and set the paths in src/data/site.js:

  media: {
    heroVideo: '/media/hero.mp4',     // homepage hero
    heroPoster: '/media/hero.jpg',    // first frame shown while loading (optional)
    ctaVideo:  '/media/cta.mp4',      // "Ready to upgrade your business?" section
  }

Tips
- Keep each file under ~4 MB: 1920x1080 (or 1280x720), H.264 MP4, 8–15 s seamless loop, no audio.
- Dark, slow, abstract footage works best (gold particles, ink in water, light leaks, slow city at night).
- Videos are muted, autoplay, loop and playsinline. If a video fails to load or the visitor
  prefers reduced motion, the live WebGL "liquid gold" backdrop is shown instead.
