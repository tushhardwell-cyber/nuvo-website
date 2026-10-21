import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import Video from '../ui/Video';
import { scrollToTarget } from '../../hooks/useSmoothScroll';

// Work hero: the nature footage fills the whole section (original 1920x1080 / 30 fps,
// shown 16:9 so it is never stretched). It stays static — no zoom, no shrink.
export default function WorkHero({ onProjects }) {
  return (
    <section className="hero3 whero theme-dark">
      <div className="hero3-bg whero-bg">
        <Video
          src="/media/work-nature.mp4"
          poster="/media/work-nature-poster.jpg"
          fill
          label="A green cedar in the rain — steady work that keeps growing"
        />
        <span className="hero3-scrim" aria-hidden="true" />
      </div>

      <div className="container-wide hero3-inner">
        <Eyebrow>Work</Eyebrow>
        <RevealText
          as="h1"
          className="display hero3-title"
          text={'What we automate.\nWhat we’ve *built.*'}
          immediate
          delay={0.25}
        />
        <p className="lead hero3-lead">
          The everyday workflows we take off your team’s hands — and the projects where we’ve put them to work. We only
          publish outcomes we can stand behind.
        </p>
        <div className="hero3-ctas">
          <Button size="lg" arrow="↓" onClick={() => scrollToTarget('#work-tabs')}>
            See what we automate
          </Button>
          <Button variant="ghost" size="lg" onClick={onProjects}>
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
}
