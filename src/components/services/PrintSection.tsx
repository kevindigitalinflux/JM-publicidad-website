import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import papeleriaImg from '../../assets/media/catalogue/print-papeleria.webp';
import impresosImg from '../../assets/media/catalogue/print-impresos.webp';

/** Medios Impresos — Papelería Básica + Print Collateral */
export function PrintSection() {
  const { t } = useTranslation();
  const p = (k: string) => t(`services_page.print.${k}`);

  return (
    <section className="pb-16 bg-jm-bg-section">
      <CategoryHeader tag="Impresos" title={p('title')} subtitle={p('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Basic Stationery */}
        <div>
          <SubSectionLabel label={p('papeleria_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img src={papeleriaImg} alt="Papelería corporativa — JM Publicidad" className="rounded-xl w-full object-cover order-last md:order-none" loading="lazy" />
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={p('tarjetas_title')} specs={[p('tarjetas_spec_1'), p('tarjetas_spec_2'), p('tarjetas_spec_3')]} />
              <ProductCard title={p('hojas_title')} specs={[p('hojas_spec_1'), p('hojas_spec_2')]} />
              <ProductCard title={p('sobres_title')} specs={[p('sobres_spec_1'), p('sobres_spec_2')]} />
              <ProductCard title={p('carpetas_title')} specs={[p('carpetas_spec_1'), p('carpetas_spec_2')]} />
            </div>
          </div>
        </div>

        {/* Print Collateral */}
        <div>
          <SubSectionLabel label={p('impresos_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={p('flayers_title')} specs={[p('flayers_spec_1'), p('flayers_spec_2'), p('flayers_spec_3'), p('flayers_spec_4')]} />
              <ProductCard title={p('folletos_title')} specs={[p('folletos_spec_1'), p('folletos_spec_2'), p('folletos_spec_3')]} />
              <ProductCard title={p('dipticos_title')} specs={[p('dipticos_spec_1'), p('dipticos_spec_2'), p('dipticos_spec_3')]} />
              <ProductCard title={p('tripticos_title')} specs={[p('tripticos_spec_1'), p('tripticos_spec_2'), p('tripticos_spec_3')]} />
            </div>
            <img src={impresosImg} alt="Impresos publicitarios — flyers, folletos, dípticos" className="rounded-xl w-full object-cover" loading="lazy" />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
