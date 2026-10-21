import { Link } from 'react-router-dom';
import { faqs } from '../../data/faq';
import SectionHead from '../ui/SectionHead';
import Accordion from '../ui/Accordion';
import FadeUp from '../ui/FadeUp';
import { site, waLink } from '../../data/site';

export default function FAQSection({ num = '10', all = false }) {
  const items = all ? faqs : faqs.filter((f) => f.home);
  return (
    <section className="section faq">
      <div className="container rel faq-grid">
        <div className="faq-side">
          <SectionHead
            num={num}
            eyebrow="Questions"
            title={"Let's clear\nthings *up.*"}
            lead="Straight answers to what business owners actually ask us — including the awkward ones."
          />
          <FadeUp className="faq-ask">
            <p>Still wondering about something?</p>
            <a href={waLink('Hi Nuvō, I have a question:')} target="_blank" rel="noreferrer" className="text-link">
              Ask us on WhatsApp ↗
            </a>
            <a href={`mailto:${site.contact.email}`} className="text-link">
              {site.contact.email}
            </a>
            {!all && (
              <Link to="/resources#faq" className="text-link">
                All questions →
              </Link>
            )}
          </FadeUp>
        </div>
        <FadeUp delay={0.1}>
          <Accordion items={items} />
        </FadeUp>
      </div>
    </section>
  );
}
