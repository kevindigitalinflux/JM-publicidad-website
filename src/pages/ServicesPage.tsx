import { useTranslation } from 'react-i18next';
import { ServicesBento } from '../components/sections/ServicesBento';
import { FAQSection } from '../components/sections/FAQSection';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

/** Studio Specs spec-sheet — lead time, software, materials */
function StudioSpecs() {
  const { t } = useTranslation();

  const rows = [
    { label: t('services_page.specs.lead_time_label'), value: t('services_page.specs.lead_time_value') },
    { label: t('services_page.specs.software_label'),  value: t('services_page.specs.software_value')  },
    { label: t('services_page.specs.materials_label'), value: t('services_page.specs.materials_value') },
  ];

  return (
    <section className="px-6 pb-16 max-w-lg mx-auto lg:max-w-3xl">
      <div className="bg-jm-bg-section border-t-4 border-jm-primary rounded-lg px-6 pt-11 pb-8">
        <h4 className="font-manrope font-bold text-jm-primary text-[18px] tracking-[-0.025em] uppercase leading-7 mb-6">
          {t('services_page.specs.title')}
        </h4>
        <dl className="flex flex-col gap-4">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center">
              <dt className="font-inter font-semibold text-jm-primary/70 text-xs w-24 shrink-0">{label}</dt>
              <div className="flex-1 h-px bg-[rgba(197,200,189,0.3)] mx-4" aria-hidden="true" />
              <dd className="font-inter font-medium text-jm-heading text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long does production take?', acceptedAnswer: { '@type': 'Answer', text: 'Standard orders complete in 10–14 business days. Express production (5–7 days) is available on request. Turnaround depends on material type, finish, and order volume — exact timelines are confirmed in every quote.' } },
    { '@type': 'Question', name: 'Do you handle design as well as print?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JM Publicidad offers end-to-end service: creative concept, graphic design, print production, and on-site installation. You can brief us from a rough idea or supply print-ready files.' } },
    { '@type': 'Question', name: 'What materials and finishes do you offer?', acceptedAnswer: { '@type': 'Answer', text: 'Our stock library includes imported Italian cotton papers, sustainable recycled stocks, luxury vinyls, UV-resistant outdoor laminates, anti-graffiti coatings, and Pantone-matched inks. Material recommendations are included in every quote.' } },
    { '@type': 'Question', name: 'Do you offer delivery and installation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer a turnkey service from production to on-site installation — managing logistics, site surveys, and installation for signage, vehicle branding, and large-format displays across Spain.' } },
    { '@type': 'Question', name: 'Is there a minimum order?', acceptedAnswer: { '@type': 'Answer', text: 'No minimum order. We produce single bespoke pieces and high-volume runs alike. Pricing scales with quantity — contact us for a tailored quote.' } },
    { '@type': 'Question', name: 'Which areas of Spain do you serve?', acceptedAnswer: { '@type': 'Answer', text: "Our studio is based in Madrid's Design District. We serve clients across Spain and coordinate national installations. International projects are accepted on request." } },
  ],
};

/** Services page — hero, bento service cards, FAQ, studio specs */
export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Services — Outdoor Signage, Print &amp; Branding | JM Publicidad"
        description="Creative campaigns, digital marketing, premium print media production, and brand identity from JM Publicidad. Madrid-based studio serving clients across Spain."
        path="/services"
      />
      <SchemaOrg schema={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="px-6 pt-10 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-3">
          {t('services_page.label')}
        </p>
        <h1 className="font-manrope font-extrabold text-jm-heading text-[36px] leading-[40px] tracking-[-0.9px] mb-4">
          {t('services_page.title')}
        </h1>
        <p className="font-inter text-jm-body text-base leading-[26px]">
          {t('services_page.description')}
        </p>
      </section>

      <ServicesBento />
      <FAQSection />
      <StudioSpecs />
    </main>
  );
}
