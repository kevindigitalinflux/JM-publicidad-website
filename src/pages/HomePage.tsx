import { HeroSection } from '../components/sections/HeroSection';
import { PrecisionSection } from '../components/sections/PrecisionSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CtaSection } from '../components/sections/CtaSection';

/** Landing page — composes all home screen sections */
export function HomePage() {
  return (
    <main>
      <HeroSection />
      <PrecisionSection />
      <ServicesSection />
      <CtaSection />
    </main>
  );
}
