import { useTranslation } from 'react-i18next';
import { ServicesBento } from '../components/sections/ServicesBento';

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
        <div className="flex flex-col gap-4">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center">
              <span className="font-inter font-semibold text-jm-primary/70 text-xs w-24 shrink-0">{label}</span>
              <div className="flex-1 h-px bg-[rgba(197,200,189,0.3)] mx-4" />
              <span className="font-inter font-medium text-jm-heading text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Services page — hero, bento service cards, studio specs */
export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">

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
      <StudioSpecs />
    </main>
  );
}
