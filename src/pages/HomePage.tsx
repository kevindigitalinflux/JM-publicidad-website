import { HeroSection } from '../components/sections/HeroSection';
import { ClientsStrip } from '../components/sections/ClientsStrip';
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
  description: 'Producción publicitaria de alta calidad en Quito, Ecuador. Rótulos, roll ups, pop ups, brandeo vehicular, publicidad digital y medios impresos.',
  url: 'https://jm-publicidad-website.pages.dev',
  telephone: '+593960051007',
  email: 'jmpublicidad@outlook.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rio de Janeiro OE3-127 Y America',
    addressLocality: 'Quito',
    addressRegion: 'Pichincha',
    addressCountry: 'EC',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -0.2299,
    longitude: -78.5249,
  },
  areaServed: [
    { '@type': 'City', name: 'Quito' },
    { '@type': 'Country', name: 'Ecuador' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Publicitarios',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publicidad Exterior' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brandeo Vehicular' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publicidad Digital' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Souvenirs Publicitarios' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medios Impresos' } },
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

/** Landing page — hero, clients strip, precision, services, CTA */
export function HomePage() {
  return (
    <main>
      <SEO
        title="JM Publicidad — Producción Publicitaria en Quito, Ecuador"
        description="Rótulos, roll ups, pop ups, brandeo vehicular, pantallas digitales y medios impresos. Producción publicitaria de alta calidad en Quito, Ecuador."
        path="/"
      />
      <SchemaOrg schema={[LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]} />
      <HeroSection />
      <ClientsStrip />
      <PrecisionSection />
      <ServicesSection />
      <CtaSection />
    </main>
  );
}
