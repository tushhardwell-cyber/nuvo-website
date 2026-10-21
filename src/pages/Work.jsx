import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/layout/Seo';
import WorkHero from '../components/sections/WorkHero';
import { scrollToTarget } from '../hooks/useSmoothScroll';
import ContactCTA from '../components/sections/ContactCTA';
import CardGame from '../components/sections/CardGame';
import UseCaseGrid from '../components/sections/UseCaseGrid';
import ProjectCard from '../components/sections/ProjectCard';
import FadeUp from '../components/ui/FadeUp';
import { work } from '../data/work';
import { useCases } from '../data/useCases';

const TABS = [
  { k: 'automate', l: 'What we automate', count: useCases.length },
  { k: 'projects', l: 'Projects', count: work.length },
];

// Work = Use cases + Our work, one page with two tabs.
export default function Work() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'projects' ? 'projects' : 'automate';
  const list = work;

  return (
    <>
      <Seo
        title="Work — what we automate and what we've built"
        path="/work"
        description="The workflows Nuvō automates for growing businesses, and the projects we have delivered."
      />
      <WorkHero
        onProjects={() => {
          setParams({ tab: 'projects' }, { replace: true });
          setTimeout(() => scrollToTarget('#work-tabs'), 80);
        }}
      />

      <section className="section work-tabs-section" id="work-tabs">
        <div className="container-wide">
          <div className="work-tabs" role="tablist" aria-label="Work">
            {TABS.map((t) => (
              <button
                key={t.k}
                role="tab"
                aria-selected={tab === t.k}
                className={`work-tab${tab === t.k ? ' is-on' : ''}`}
                onClick={() => setParams(t.k === 'automate' ? {} : { tab: t.k }, { replace: true })}
              >
                {t.l}
                <span>{t.count}</span>
                {tab === t.k && <motion.i layoutId="work-tab-pill" className="work-tab-pill" />}
              </button>
            ))}
          </div>

          {tab === 'automate' ? (
            <div className="work-panel theme-dark">
              <UseCaseGrid filterable />
            </div>
          ) : (
            <div className="work-panel">
              <div className="proj-list">
                {list.map((w, i) => (
                  <FadeUp key={w.slug}>
                    <ProjectCard item={w} flip={i % 2 === 1} />
                  </FadeUp>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {tab === 'automate' && <CardGame num="01" />}
      <ContactCTA num={tab === 'automate' ? '02' : '01'} />
    </>
  );
}
