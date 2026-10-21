import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site, waLink } from '../../data/site';
import { track } from '../../lib/analytics';
import OMark from '../ui/OMark';
import Icon from '../ui/Icon';

const empty = { name: '', phone: '', business: '', challenge: '', website: '' };

function Field({ id, label, error, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className={`ufield${error ? ' has-error' : ''}${textarea ? ' is-area' : ''}`} htmlFor={id}>
      <Tag id={id} placeholder=" " {...props} />
      <span className="ufield-label">{label}</span>
      {error && <em>{error}</em>}
    </label>
  );
}

// "Let's talk" form — underline fields, one clear action.
export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) e.phone = 'Please enter a valid phone / WhatsApp number.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const message = () =>
    [
      'Hi Nuvō! I would like to book a free business audit.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.business ? `Business: ${form.business}` : '',
      form.challenge ? `Biggest challenge: ${form.challenge}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!validate()) return;
    setStatus('sending');
    try {
      // Lead capture: your own endpoint if set, else the built-in /api/lead (needs WEB3FORMS_KEY or
      // LEAD_WEBHOOK_URL on the host). If neither is configured the visitor still reaches us on WhatsApp.
      const custom = !!site.formEndpoint;
      try {
        const res = await fetch(site.formEndpoint || '/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, source: 'nuvo-website' }),
        });
        if (custom && !res.ok) throw new Error('Request failed');
      } catch (err) {
        if (custom) throw err;
      }
      track('generate_lead');
      window.open(waLink(message()), '_blank', 'noopener');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="talk-card">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            className="cform-done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <OMark size={72} />
            <h3 className="h3">
              Thank you, <em className="gold-em">{form.name.split(' ')[0] || 'friend'}.</em>
            </h3>
            <p className="body-dim">WhatsApp has opened with your details filled in — just press send. {site.contact.replyPromise}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setForm(empty);
                setStatus('idle');
              }}
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" className="tform" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }}>
            <div className="tform-top">
              <span className="tform-badge">
                <i aria-hidden="true" /> Free business audit · zero commitment
              </span>
              <p>
                {site.formEndpoint ? 'Sends to our team and opens WhatsApp' : 'Opens WhatsApp'} with your message ready.
              </p>
            </div>

            <div className="tform-row">
              <Field id="t-name" label="Your name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
              <Field
                id="t-phone"
                label="Phone number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={set('phone')}
                error={errors.phone}
              />
            </div>
            <Field id="t-business" label="Business name" autoComplete="organization" value={form.business} onChange={set('business')} />
            <Field id="t-challenge" label="What’s your biggest challenge right now?" textarea rows={4} value={form.challenge} onChange={set('challenge')} />

            <label className="hp" aria-hidden="true">
              Website <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
            </label>

            <button type="submit" className="tform-submit" disabled={status === 'sending'}>
              <span>{status === 'sending' ? 'Sending…' : 'Send & book a call'}</span>
              <i aria-hidden="true">
                <Icon name="send" size={17} />
              </i>
            </button>
            {status === 'error' && (
              <p className="cform-error" role="alert">
                Something went wrong. Please WhatsApp us directly — we’ll reply fast.
              </p>
            )}
            <p className="tform-note">By sending, you agree to be contacted by call or WhatsApp about your inquiry.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
