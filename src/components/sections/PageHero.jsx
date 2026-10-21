import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';

// Shared cinematic hero for inner pages.
export default function PageHero({ eyebrow, title, lead, children, aside, short = false }) {
  return (
    <section className={`page-hero${short ? ' is-short' : ''}`}>
      <div className="glow page-hero-glow" />
      <div className="container rel page-hero-inner">
        <div className="page-hero-main">
          <FadeUp y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </FadeUp>
          <RevealText as="h1" className="display page-hero-title" text={title} immediate delay={0.3} />
          {lead && (
            <FadeUp delay={0.5}>
              <p className="lead">{lead}</p>
            </FadeUp>
          )}
          {children && (
            <FadeUp delay={0.65} className="page-hero-extra">
              {children}
            </FadeUp>
          )}
        </div>
        {aside && (
          <FadeUp delay={0.6} className="page-hero-aside">
            {aside}
          </FadeUp>
        )}
      </div>
    </section>
  );
}
