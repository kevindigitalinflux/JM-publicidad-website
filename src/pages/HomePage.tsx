import { HeroSection } from '../components/sections/HeroSection';
import { PrecisionSection } from '../components/sections/PrecisionSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://jm-publicidad-website.pages.dev/#business',
  name: 'JM Publicidad',
  description: 'Full-service advertising and precision print production studio in Madrid, Spain. Outdoor signage, vehicle branding, large-format print, brand identity, and digital advertising.',
  url: 'https://jm-publicidad-website.pages.dev',
  telephone: '+34912345678',
  email: 'studio@jmpublicidad.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. de la Industria 45',
    addressLocality: 'Madrid',
    addressRegion: 'Community of Madrid',
    addressCountry: 'ES',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 40.4168, longitude: -3.7038 },
  areaServed: { '@type': 'Country', name: 'Spain' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Advertising & Print Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outdoor Signage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vehicle Branding' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Large Format Print' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Advertising' } },
    ],
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://jm-publicidad-website.pages.dev/#website',
  url: 'https://jm-publicidad-website.pages.dev',
  name: 'JM Publicidad',
  publisher: { '@id': 'https://jm-publicidad-website.pages.dev/#business' },
};

/** Landing page — composes all home screen sections */
export function HomePage() {
  return (
    <main>
      <SEO
        title="JM Publicidad — Advertising &amp; Print Production Studio, Spain"
        description="Full-service advertising and print production studio in Spain. Outdoor signage, vehicle branding, digital displays and bespoke print collateral. Get a quote today."
        path="/"
      />
      <SchemaOrg schema={[LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]} />
      <HeroSection />
      <PrecisionSection />
      <ServicesSection />
      <CtaSection />
    </main>
  );
}
