import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import escrituraImg from '../../assets/media/catalogue/souvenirs-escritura.webp';
import indumentariaImg from '../../assets/media/catalogue/souvenirs-indumentaria.webp';
import accesoriosImg from '../../assets/media/catalogue/souvenirs-accesorios.webp';
import eventosImg from '../../assets/media/catalogue/souvenirs-eventos.webp';

/** Souvenirs Publicitarios — Stationery, Clothing, Accessories, Events */
export function SouvenirsSection() {
  const { t } = useTranslation();
  const s = (k: string) => t(`services_page.souvenirs.${k}`);

  return (
    <section className="pb-16 bg-jm-bg">
      <CategoryHeader tag="Merchandising" title={s('title')} subtitle={s('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Stationery & Office */}
        <div>
          <SubSectionLabel label={s('escritura_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ProductCard title={s('esferos_title')} specs={[s('esferos_spec_1'), s('esferos_spec_2')]} />
              <ProductCard title={s('vasos_title')} specs={[s('vasos_spec_1'), s('vasos_spec_2')]} />
              <ProductCard title={s('servilletas_title')} specs={[s('servilletas_spec_1'), s('servilletas_spec_2')]} />
              <ProductCard title={s('packaging_title')} specs={[s('packaging_spec_1'), s('packaging_spec_2')]} />
              <ProductCard title={s('habladores_title')} specs={[s('habladores_spec_1'), s('habladores_spec_2')]} />
              <ProductCard title={s('stickers_title')} specs={[s('stickers_spec_1'), s('stickers_spec_2'), s('stickers_spec_3')]} />
            </div>
            <img src={escrituraImg} alt="Souvenirs publicitarios — escritura y oficina" className="rounded-xl w-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Clothing */}
        <div>
          <SubSectionLabel label={s('indumentaria_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img src={indumentariaImg} alt="Uniformes y deportivos publicitarios — JM Publicidad" className="rounded-xl w-full object-cover" loading="lazy" />
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={s('uniformes_title')} specs={[s('uniformes_spec_1'), s('uniformes_spec_2'), s('uniformes_spec_3')]} />
              <ProductCard title={s('deportivos_title')} specs={[s('deportivos_spec_1'), s('deportivos_spec_2'), s('deportivos_spec_3')]} />
              <ProductCard title={s('flash_title')} specs={[s('flash_spec_1'), s('flash_spec_2'), s('flash_spec_3')]} />
              <ProductCard title={s('agendas_title')} specs={[s('agendas_spec_1'), s('agendas_spec_2'), s('agendas_spec_3')]} />
              <ProductCard title={s('carnets_title')} specs={[s('carnets_spec_1'), s('carnets_spec_2'), s('carnets_spec_3')]} />
            </div>
          </div>
        </div>

        {/* Accessories */}
        <div>
          <SubSectionLabel label={s('accesorios_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ProductCard title={s('gorras_title')} specs={[s('gorras_spec_1'), s('gorras_spec_2')]} />
              <ProductCard title={s('tomatodos_title')} specs={[s('tomatodos_spec_1'), s('tomatodos_spec_2')]} />
              <ProductCard title={s('jarros_title')} specs={[s('jarros_spec_1'), s('jarros_spec_2')]} />
              <ProductCard title={s('pulseras_title')} specs={[s('pulseras_spec_1'), s('pulseras_spec_2')]} />
              <ProductCard title={s('mousepad_title')} specs={[s('mousepad_spec_1'), s('mousepad_spec_2')]} />
              <ProductCard title={s('bolsos_title')} specs={[s('bolsos_spec_1'), s('bolsos_spec_2')]} />
            </div>
            <img src={accesoriosImg} alt="Accesorios publicitarios — JM Publicidad" className="rounded-xl w-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Events & Outdoor */}
        <div>
          <SubSectionLabel label={s('eventos_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img src={eventosImg} alt="Carpas y banderas publicitarias — JM Publicidad" className="rounded-xl w-full object-cover" loading="lazy" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProductCard title={s('carpas_title')} specs={[s('carpas_spec_1'), s('carpas_spec_2')]} />
              <ProductCard title={s('banderas_title')} specs={[s('banderas_spec_1'), s('banderas_spec_2')]} />
            </div>
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
