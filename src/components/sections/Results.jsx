import { Link } from 'react-router-dom';
import { work } from '../../data/work';
import SectionHead from '../ui/SectionHead';
import FadeUp from '../ui/FadeUp';
import ProjectCard from './ProjectCard';

// Our work — three delivered projects, shown open (no click needed).
export default function Results({ num = '07' }) {
  return (
    <section className="section results2" data-glow>
      <div className="container">
        <SectionHead
          num={num}
          eyebrow="Our work"
          title={'From invisible\nto *premium.*'}
          lead="Real projects, and the systems we run for each sector. We only publish outcomes we can stand behind."
          split
        />

        <div className="proj-list">
          {work.slice(0, 3).map((w, i) => (
            <FadeUp key={w.slug}>
              <ProjectCard item={w} flip={i % 2 === 1} />
            </FadeUp>
          ))}
        </div>

        <FadeUp className="center-row">
          <Link to="/work?tab=projects" className="text-link lg">
            See all work <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
