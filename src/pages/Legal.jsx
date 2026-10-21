import Seo from '../components/layout/Seo';
import PageHero from '../components/sections/PageHero';
import { site } from '../data/site';

// NOTE: plain-language starter policies — have a lawyer review them before launch.
const UPDATED = '17 October 2026';
const email = site.contact.email;

const CONTENT = {
  privacy: {
    title: 'Privacy policy',
    intro: `${site.legalName} ("Nuvō", "we") respects your privacy. This page explains what we collect through this website, why, and the choices you have. It is written to follow India's Digital Personal Data Protection Act, 2023, and the principles of other major data-protection laws such as the GDPR.`,
    sections: [
      ['What we collect', 'When you contact us we receive the details you choose to share — typically your name, phone or WhatsApp number, business type and a short message. If you use the Ask Nuvō assistant or the readiness self-check, we process what you type to answer you; the self-check score is calculated in your browser.'],
      ['How we use it', 'Only to reply to your inquiry and, if you become a client, to deliver the work. We do not sell or rent your information, and we do not send marketing messages you have not asked for.'],
      ['Contact form & WhatsApp', 'Submitting the form sends your details to our team (by email or a secure form service) and opens WhatsApp with your message ready. Messages you send on WhatsApp are also governed by WhatsApp\'s own privacy policy.'],
      ['Client data', 'Data inside your systems stays in your accounts (Google, WhatsApp, Excel). We use only the access needed to build, and you can revoke it at handover. Project archives are kept securely as a backup for you.'],
      ['Cookies & analytics', 'The site works without cookies. If we switch on Google Analytics, it records anonymous visit statistics (pages viewed, button clicks such as call or WhatsApp) to help us improve the site; IP addresses are anonymized. You can block analytics with your browser settings or an extension.'],
      ['Service providers', 'We use trusted providers to run the site and handle messages — for example hosting, email or form delivery, analytics, and an AI service that powers the assistant. They process data only to provide those services. Please do not share passwords, OTPs or card details in the chat.'],
      ['How long we keep it', 'Inquiries that do not become projects are deleted within 12 months. Client records are kept for as long as we work together and for the period the law requires for accounts and tax.'],
      ['Your rights', `You can ask us to see, correct or delete your information, or withdraw consent, at any time by writing to ${email}. We reply within 15 days. If you are not satisfied you may complain to the Data Protection Board of India.`],
      ['Changes', 'If we change this policy we will update the date below. Material changes will be highlighted on this page.'],
    ],
  },
  terms: {
    title: 'Terms & conditions',
    intro: `These terms apply when you use this website or engage ${site.legalName} for a project. Each project is also covered by the written scope and quote we agree with you.`,
    sections: [
      ['Scope & pricing', 'Every project has a written scope and a fixed quote agreed before work begins. Changes outside the agreed scope are quoted separately and only start once you approve them.'],
      ['Payments', 'Payment milestones are set out in the quote. Work on the next stage begins when the previous milestone is paid. Quotes are valid for 15 days unless stated otherwise; taxes such as GST or VAT are added where they apply.'],
      ['Your responsibilities', 'You provide accurate content, access and approvals on time. Delays in feedback or materials move the delivery date by the same amount.'],
      ['Ownership', 'On final payment, you own your website, content, files and accounts. Domains and platform accounts are registered in your name. We may mention the project in our portfolio unless you ask us not to.'],
      ['Support', 'Monthly support is optional and can be stopped at the end of any month.'],
      ['AI-assisted work', 'We use AI tools to speed up drafting and building, and a person reviews every deliverable before it reaches you. You are responsible for checking that final content about your business is accurate.'],
      ['Third-party platforms', 'We build on platforms such as Google, WhatsApp and Microsoft. Their availability, verification processes and policies are outside our control, and we cannot guarantee rankings, approvals or message delivery.'],
      ['Liability', 'We take care over our work, but we are not liable for indirect or consequential losses. Our total liability for any project is limited to the fees paid for it.'],
      ['Confidentiality', 'We keep your business information confidential and use it only for your project.'],
      ['Governing law', 'These terms are governed by the laws of India. Courts at Pune, Maharashtra have jurisdiction.'],
      ['Contact', `Questions about these terms? Write to ${email} or message us on WhatsApp.`],
    ],
  },
};

export default function Legal({ kind }) {
  const c = CONTENT[kind];
  return (
    <>
      <Seo title={c.title} path={`/${kind}`} />
      <PageHero eyebrow="Legal" title={c.title} short />
      <section className="section-tight">
        <div className="container legal">
          <p className="lead">{c.intro}</p>
          {c.sections.map(([h, p]) => (
            <div key={h} className="legal-block">
              <h2 className="h4">{h}</h2>
              <p className="body-dim">{p}</p>
            </div>
          ))}
          <p className="mute">Last updated {UPDATED}.</p>
        </div>
      </section>
    </>
  );
}
