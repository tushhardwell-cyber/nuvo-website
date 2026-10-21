import { mirrorLines } from '../../data/site';
import Marquee from '../ui/Marquee';
import Eyebrow from '../ui/Eyebrow';

// All five owner sentences in one slow running line (same style as the
// core-services strip). Hover pauses it so a quote can be read.
export default function OwnerVoices({ num = '02' }) {
  return (
    <section className="voices3" aria-label="Sentences owners say">
      <div className="voices3-top container">
        <Eyebrow num={num}>Sound familiar?</Eyebrow>
      </div>
      <Marquee
        items={mirrorLines}
        speed={80}
        render={(l) => (
          <span className="voice-tag">
            <span className="voice-tag-a">“{l.a}</span>
            <span className="voice-tag-b">{l.b}”</span>
          </span>
        )}
      />
    </section>
  );
}
