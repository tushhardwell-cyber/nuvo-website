import { Link } from 'react-router-dom';
import SectionHead from '../ui/SectionHead';
import UseCaseGrid from './UseCaseGrid';
import { useCases } from '../../data/useCases';
import FadeUp from '../ui/FadeUp';
import Video from '../ui/Video';

export default function UseCasesSection({ num = '05' }) {
  return (
    <section className="section usecases2 theme-dark cine-tall" id="what-we-automate">
      <Video src="/media/automate-particles.mp4" poster="/media/automate-particles-poster.jpg" fill className="usecases2-bg" />
      <div className="usecases2-shade" aria-hidden="true" />
      <div className="container-wide rel">
        <SectionHead
          num={num}
          eyebrow="What we automate"
          title={'Work nobody should\ndo *by hand.*'}
          lead={`If your team does it every week and it follows a pattern, it can be automated. Here are ${useCases.length} we build most often — hover any card for the detail.`}
          split
        />
        <UseCaseGrid />
        <FadeUp className="center-row">
          <Link to="/work" className="text-link lg">
            See them by category <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
