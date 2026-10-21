import Seo from '../components/layout/Seo';
import ContactCTA from '../components/sections/ContactCTA';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — book a free business audit"
        path="/contact"
        description="Tell us what's slowing your business down. Free audit, fixed-quote plan, reply within one business day — usually on WhatsApp."
      />
      <ContactCTA asPage />
    </>
  );
}
