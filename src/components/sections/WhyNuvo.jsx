import { differentiators } from '../../data/services';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import Video from '../ui/Video';

// Why Nuvō — value, not price.
export default function WhyNuvo({ num = '08' }) {
  return (
    <section className="section why2" data-glow>
      <div className="container why2-grid">
        <div className="why2-copy">
          <FadeUp y={12}>
            <Eyebrow num={num}>Why Nuvō</Eyebrow>
          </FadeUp>
          <RevealText
            text={'Every deliverable is worth\n*more* than what you paid for it.'}
            className="h2"
          />
          <FadeUp delay={0.1}>
            <p className="lead">
              Most growing businesses are stuck between a freelancer who builds whatever is asked and an agency priced
              for corporations. Nuvō is focused: we do everything for growing businesses, built on real research — and we
              automate it, so the value keeps compounding after we hand over.
            </p>
          </FadeUp>
          <div className="why2-list">
            {differentiators.map((d, i) => (
              <FadeUp className="why2-item" key={d.title} delay={0.15 + i * 0.08}>
                <span className="why2-n">0{i + 1}</span>
                <div>
                  <h3 className="h4">{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="why2-media">
          <div className="why2-frame">
            <Video
              src="/media/value-counter.mp4"
              poster="/media/value-counter-poster.jpg"
              fill
              label="A note-counting machine counting a stack of bills"
            />
          </div>
          <p className="why2-caption">Systems that pay for themselves — every follow-up sent, every payment chased.</p>
        </div>
      </div>
    </section>
  );
}
