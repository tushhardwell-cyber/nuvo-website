import Eyebrow from './Eyebrow';
import RevealText from './RevealText';
import FadeUp from './FadeUp';

export default function SectionHead({ num, eyebrow, title, lead, align = 'left', split = false, children }) {
  return (
    <div className={`section-head${align === 'center' ? ' center' : ''}${split ? ' split' : ''}`}>
      <div className="section-head-main">
        <FadeUp y={12}>
          <Eyebrow num={num}>{eyebrow}</Eyebrow>
        </FadeUp>
        <RevealText text={title} className="h2" />
      </div>
      {(lead || children) && (
        <FadeUp delay={0.15} className="section-head-side">
          {lead && <p className="lead">{lead}</p>}
          {children}
        </FadeUp>
      )}
    </div>
  );
}
