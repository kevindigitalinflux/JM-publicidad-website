import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';

/** Publicidad Digital — Pantallas, Tótems, Video Wall */
export function DigitalSection() {
  const { t } = useTranslation();
  const d = (k: string) => t(`services_page.digital.${k}`);

  return (
    <section className="pb-16 bg-jm-bg-section">
      <CategoryHeader tag="Digital" title={d('title')} subtitle={d('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Pantallas */}
        <div>
          <SubSectionLabel label={d('screens_label')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard title={d('vallas_digitales_title')} specs={[]} />
            <ProductCard title={d('pantallas_digitales_title')} specs={[]} />
            <ProductCard title={d('vallas_led_title')} specs={[]} />
            <ProductCard title={d('counter_cap_title')} specs={[]} />
          </div>
        </div>

        {/* Tótems */}
        <div>
          <SubSectionLabel label={d('totems_label')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard title={d('totem_led_title')} specs={[]} />
            <ProductCard title={d('totem_doble_title')} specs={[]} />
            <ProductCard title={d('totem_cap_touch_title')} specs={[]} />
            <ProductCard title={d('totem_outdoor_title')} specs={[]} />
          </div>
        </div>

        {/* Video Wall & Hanging Screens */}
        <div>
          <SubSectionLabel label={d('video_label')} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={d('video_wall_title')} specs={[d('video_wall_spec')]} />
            <ProductCard title={d('colgante_title')} specs={[d('colgante_spec')]} />
            <ProductCard title={d('translucida_title')} specs={[]} />
            <ProductCard title={d('menu_board_title')} specs={[]} />
            <ProductCard title={d('poster_led_title')} specs={[]} />
            <ProductCard title={d('cap_touch_signage_title')} specs={[]} />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_enquire')} →
        </Link>
      </div>
    </section>
  );
}
