import { HeroSection } from '../components/sections/HeroSection';
import { PrecisionSection } from '../components/sections/PrecisionSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { SEO } from '../components/SEO';

/** Landing page — composes all home screen sections */
export function HomePage() {
  return (
    <main>
      <SEO
        title="JM Publicidad — Advertising &amp; Print Production Studio, Spain"
        description="Full-service advertising and print production studio in Spain. Outdoor signage, vehicle branding, digital displays and bespoke print collateral. Get a quote today."
        path="/"
      />
      <HeroSection />
      <PrecisionSection />
      <ServicesSection />
      <CtaSection />
    </main>
  );
}
