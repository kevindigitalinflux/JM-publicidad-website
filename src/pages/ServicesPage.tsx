import { useTranslation } from 'react-i18next';
import { ServicesBento } from '../components/sections/ServicesBento';
import { FAQSection } from '../components/sections/FAQSection';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

/** Studio Specs spec-sheet — lead time, software, materials */
function StudioSpecs() {
  const { t } = useTranslation();

  const rows = [
    { label: t('services_page.specs.machine_label'),    value: t('services_page.specs.machine_value')    },
    { label: t('services_page.specs.resolution_label'), value: t('services_page.specs.resolution_value') },
    { label: t('services_page.specs.finish_label'),     value: t('services_page.specs.finish_value')     },
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
    { '@type': 'Question', name: '¿Cuánto tiempo tarda la producción?', acceptedAnswer: { '@type': 'Answer', text: 'Los tiempos varían según el tipo de producto y volumen del pedido. Confirmamos el plazo exacto al momento de enviarte el presupuesto.' } },
    { '@type': 'Question', name: '¿Ofrecen servicio de diseño?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Contamos con equipo de diseño propio. Podemos trabajar desde una idea inicial o con archivos listos para imprimir.' } },
    { '@type': 'Question', name: '¿Qué resolución tienen sus impresiones?', acceptedAnswer: { '@type': 'Answer', text: 'Imprimimos a 2400 ppi en maquinaria ecosolvente de gran formato propia (Signstar 320m y Kingjet).' } },
    { '@type': 'Question', name: '¿Trabajan con vinilos para vehículos?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Realizamos brandeo vehicular completo — autos, camiones, trailers y cualquier superficie. Incluye diseño, impresión e instalación.' } },
    { '@type': 'Question', name: '¿Hay un mínimo de pedido?', acceptedAnswer: { '@type': 'Answer', text: 'No. Producimos desde una sola pieza hasta tiradas de alto volumen.' } },
    { '@type': 'Question', name: '¿Dónde están ubicados?', acceptedAnswer: { '@type': 'Answer', text: 'Estamos en Quito, Ecuador. Atendemos a clientes en todo el país.' } },
  ],
};

/** Services page — hero, bento service cards, FAQ, studio specs */
export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Servicios — Publicidad Exterior, Digital e Impresos | JM Publicidad"
        description="Rótulos, roll ups, pop ups, brandeo vehicular, pantallas digitales, souvenirs corporativos y medios impresos. Producción publicitaria en Quito, Ecuador."
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
