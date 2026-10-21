import Seo from '../components/layout/Seo';
import Hero from '../components/sections/Hero';
import SectorStrip from '../components/sections/SectorStrip';
import WhoWeAre from '../components/sections/WhoWeAre';
import CardGame from '../components/sections/CardGame';
import CoreServices from '../components/sections/CoreServices';
import HowWeWork from '../components/sections/HowWeWork';
import UseCasesSection from '../components/sections/UseCasesSection';
import Integrations from '../components/sections/Integrations';
import Results from '../components/sections/Results';
import WhyNuvo from '../components/sections/WhyNuvo';
import Testimonials from '../components/sections/Testimonials';
import FAQSection from '../components/sections/FAQSection';
import ContactCTA from '../components/sections/ContactCTA';

// Story: who we are → the problem → what we do → how → what it automates →
// what it connects → proof → why → questions → act.
export default function Home({ introActive }) {
  return (
    <>
      <Seo
        path="/"
        description="Nuvō is a consultancy and software studio for growing businesses — strategy, branding, websites, digital marketing, business systems and AI automation. Based in Pune, working with businesses worldwide."
      />
      <Hero introActive={introActive} />
      <SectorStrip />
      <WhoWeAre num="01" />
      <CardGame num="02" />
      <CoreServices num="03" />
      <HowWeWork num="04" />
      <UseCasesSection num="05" />
      <Integrations num="06" />
      <Results num="07" />
      <WhyNuvo num="08" />
      <Testimonials />
      <FAQSection num="10" />
      <ContactCTA num="11" />
    </>
  );
}
