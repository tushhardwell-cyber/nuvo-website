import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import Counter from '../ui/Counter';
import Button from '../ui/Button';
import Video from '../ui/Video';
import { heroStats, site } from '../../data/site';

// The first two About sections ("About Nuvō" and "Our mission") share one
// stable, full-bleed video. It stays still (no zoom, no resize) and scrolls
// away when the second section ends. Text and cards float above it on glass
// panels and stay clickable.
export default function AboutStage() {
  return (
    <div className="astage">
      <div className="astage-pin" aria-hidden="true">
        <div className="astage-video">
          <Video
            src="/media/about-skyline-hd.mp4"
            poster="/media/about-skyline-poster.jpg"
            fill
            label="Looking up at city skyscrapers"
          />
          <span className="astage-scrim" />
        </div>
      </div>

      {/* 1 — About Nuvō */}
      <section className="astage-sec astage-hero">
        <div className="container">
          <div className="astage-panel">
            <FadeUp y={12}>
              <Eyebrow>About Nuvō</Eyebrow>
            </FadeUp>
            <RevealText
              as="h1"
              className="display astage-title"
              text={'Not a web agency.\nNot just a consultant.\nWe do *both.*'}
              immediate
              delay={0.3}
            />
            <FadeUp delay={0.5}>
              <p className="lead">
                Nuvō helps small and mid-sized businesses become efficient and profitable through personalized digital
                tools, systems and automation — based in Pune and working with businesses around the world.
              </p>
            </FadeUp>
            <FadeUp delay={0.65} className="astage-ctas">
              <Button to="/contact">Book a free audit</Button>
              <Button to="/work" variant="ghost">
                See our work
              </Button>
            </FadeUp>
          </div>
          <FadeUp delay={0.8} className="astage-cap">
            Built for businesses with bigger plans.
          </FadeUp>
        </div>
      </section>

      {/* 2 — Our mission */}
      <section className="astage-sec astage-last">
        <div className="container">
          <FadeUp className="astage-panel astage-mission">
            <span className="eyebrow">Our mission</span>
            <blockquote className="display about-quote">
              “
              {site.mission.split('systems').map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <em>systems</em>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
              ”
            </blockquote>
          </FadeUp>
          <div className="astage-stats">
            {heroStats.map((s) => (
              <FadeUp className="astage-stat" key={s.label}>
                <Counter className="metric stat-n" value={s.value} prefix={s.prefix} suffix={s.suffix} />
                <span className="stat-l">{s.label}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
