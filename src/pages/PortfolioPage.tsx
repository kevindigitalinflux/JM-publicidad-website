import { useTranslation } from 'react-i18next';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

/** Studio Capabilities spec sheet */
function StudioCapabilities() {
  const { t } = useTranslation();

  const rows = [
    { label: t('portfolio.format_range_label'), value: t('portfolio.format_range_value') },
    { label: t('portfolio.ink_systems_label'),  value: t('portfolio.ink_systems_value')  },
    { label: t('portfolio.stock_library_label'), value: t('portfolio.stock_library_value') },
  ];

  return (
    <section className="bg-jm-bg-card rounded-tl-[32px] rounded-tr-[32px] px-6 pt-20 pb-12 mx-0">
      <div className="max-w-lg mx-auto lg:max-w-3xl">
        <h2 className="font-manrope font-extrabold text-jm-heading text-[30px] leading-[36px] mb-8">
          {t('portfolio.capabilities_title')}
        </h2>
        <dl className="flex flex-col gap-6">
          {rows.map(({ label, value }, i) => (
            <div key={label}>
              {i > 0 && <div className="h-px bg-[rgba(197,200,189,0.1)] mb-6" aria-hidden="true" />}
              <div className="flex gap-4 items-start">
                <dt className="font-inter font-semibold text-jm-primary text-sm w-28 shrink-0 leading-5">{label}</dt>
                <dd className="font-inter text-jm-body text-sm leading-5">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const PORTFOLIO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'JM Publicidad Portfolio',
  description: 'A curated collection of architectural advertising and precision print productions from JM Publicidad studio.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Modernism Revived', description: 'Print production project for Studio Althea.' },
    { '@type': 'ListItem', position: 2, name: 'Copper Series', description: 'Precision foil stamping print campaign for Luna & Co.' },
    { '@type': 'ListItem', position: 3, name: 'Urban Canvas', description: 'Large-format urban advertising project for Chronos.' },
    { '@type': 'ListItem', position: 4, name: 'Ethereal Packaging', description: 'Brand identity and packaging for Nordis Luxe.' },
  ],
};

/** Portfolio page — project gallery, studio capabilities, testimonials */
export function PortfolioPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Portfolio — Advertising &amp; Print Projects | JM Publicidad"
        description="Browse JM Publicidad's portfolio of precision print production and advertising campaigns — large-format signage, brand identity, packaging, and vehicle branding."
        path="/portfolio"
      />
      <SchemaOrg schema={PORTFOLIO_SCHEMA} />

      {/* Hero */}
      <section className="px-6 pt-10 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <h1 className="font-manrope font-extrabold text-jm-heading text-[48px] leading-[48px] tracking-[-1.2px] mb-4">
          {t('portfolio.title')}
        </h1>
        <p className="font-inter text-jm-body text-base leading-[26px]">
          {t('portfolio.description')}
        </p>
      </section>

      <PortfolioGrid />
      <StudioCapabilities />
      <TestimonialsSection />
    </main>
  );
}
