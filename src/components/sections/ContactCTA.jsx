import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site, waLink } from '../../data/site';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import Icon from '../ui/Icon';
import ContactForm from './ContactForm';

export function WhatsAppGlyph({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={style}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"
      />
    </svg>
  );
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button type="button" className={`reach-copy${done ? ' is-done' : ''}`} onClick={copy} aria-label="Copy email address">
      {done ? <Icon name="check" size={16} stroke={2.2} /> : <Icon name="copy" size={16} />}
    </button>
  );
}

// Left column: direct ways to reach Nuvō + the self-check shortcut.
export function ContactAside() {
  const { contact } = site;
  return (
    <div className="reach">
      <FadeUp className="reach-head" y={10}>
        <strong>Reach us</strong>
        <i aria-hidden="true" />
        <span>{contact.replyPromise}</span>
      </FadeUp>

      <FadeUp delay={0.05}>
        <a href={`tel:${contact.phone}`} className="reach-row">
          <span className="reach-ic">
            <Icon name="phone" size={18} />
          </span>
          <span className="reach-txt">
            <small>Call</small>
            <b>{contact.phoneDisplay}</b>
          </span>
          <Icon name="arrowUpRight" size={18} className="reach-go" />
        </a>
      </FadeUp>

      <FadeUp delay={0.1}>
        <a href={waLink('Hi Nuvō, I would like a free business audit.')} target="_blank" rel="noreferrer" className="reach-row">
          <span className="reach-ic">
            <WhatsAppGlyph size={18} />
          </span>
          <span className="reach-txt">
            <small>WhatsApp</small>
            <b>Message us</b>
          </span>
          <Icon name="arrowUpRight" size={18} className="reach-go" />
        </a>
      </FadeUp>

      <FadeUp delay={0.15}>
        <div className="reach-row">
          <a href={`mailto:${contact.email}`} className="reach-row-link">
            <span className="reach-ic">
              <Icon name="mail" size={18} />
            </span>
            <span className="reach-txt">
              <small>Email</small>
              <b className="reach-email">
                {contact.email.split('@')[0]}@
                <wbr />
                {contact.email.split('@')[1]}
              </b>
            </span>
          </a>
          <CopyButton text={contact.email} />
        </div>
      </FadeUp>

      <FadeUp delay={0.2} className="reach-areas">
        <Icon name="pin" size={14} />
        {contact.areas.join(' · ')}
      </FadeUp>

      <FadeUp delay={0.25}>
        <Link to="/resources" className="reach-check" data-cursor="Start">
          <span className="reach-check-bg" aria-hidden="true" />
          <span className="reach-check-ic" aria-hidden="true">
            <Icon name="sparkle" size={18} />
          </span>
          <small>Not ready to call?</small>
          <strong>Take the 2-minute self-check and see where to start.</strong>
        </Link>
      </FadeUp>
    </div>
  );
}

// "Let's talk" — used at the end of every page and as the Contact page.
// Optional `media` ({ src, alt, w, h }) shows an image in a right-hand column and the
// content shifts left to make room (used on the Process page).
export default function ContactCTA({ num = '11', asPage = false, media }) {
  const body = (
    <>
      <div className="talk-head">
        <FadeUp y={10}>
          <Eyebrow num={asPage ? undefined : num}>Let's talk</Eyebrow>
        </FadeUp>
        <RevealText as={asPage ? 'h1' : 'h2'} className="h2" text={'Ready to *upgrade* your business?'} immediate={asPage} />
      </div>
      <div className="talk-grid">
        <ContactAside />
        <FadeUp delay={0.15} className="talk-form">
          <ContactForm />
        </FadeUp>
      </div>
    </>
  );

  return (
    <section className={`talk theme-dark${asPage ? ' is-page' : ' section'}${media ? ' has-media' : ''}`} id="contact">
      <div className="glow talk-glow" />
      {media ? (
        <div className="talk-split rel">
          <div className="talk-main">{body}</div>
          <FadeUp className="talk-media" delay={0.2}>
            <img src={media.src} alt={media.alt} width={media.w} height={media.h} loading="lazy" />
          </FadeUp>
        </div>
      ) : (
        <div className="container rel">{body}</div>
      )}
    </section>
  );
}
