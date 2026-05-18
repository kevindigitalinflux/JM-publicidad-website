import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import { useImageReveal } from '../../hooks/useScrollReveal';
import pantalla1Img from '../../assets/media/digital/pantalla-1.png';
import pantalla2Img from '../../assets/media/digital/pantalla-2.png';
import pantalla3Img from '../../assets/media/digital/pantalla-3.png';
import pantalla4Img from '../../assets/media/digital/pantalla-4.png';
import totemsImg from '../../assets/media/digital/totems-new.png';
import videoWallImg from '../../assets/media/digital/video-wall-new.png';

/** Publicidad Digital — Pantallas, Tótems, Video Wall */
export function DigitalSection() {
  const { t } = useTranslation();
  const d = (k: string) => t(`services_page.digital.${k}`);
  const sectionRef = useImageReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="pb-16 bg-jm-bg-section">
      <CategoryHeader tag="Digital" title={d('title')} subtitle={d('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Pantallas — cards left, 2×2 photo grid right */}
        <div>
          <SubSectionLabel label={d('screens_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={d('vallas_digitales_title')} specs={[]} />
              <ProductCard title={d('pantallas_digitales_title')} specs={[]} />
              <ProductCard title={d('vallas_led_title')} specs={[]} />
              <ProductCard title={d('counter_cap_title')} specs={[]} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={pantalla1Img} alt="Vallas digitales — JM Publicidad" className="reveal-img rounded-xl w-full object-cover aspect-video mix-blend-multiply" loading="lazy" />
              <img src={pantalla2Img} alt="Pantallas digitales — JM Publicidad" className="reveal-img rounded-xl w-full object-cover aspect-video mix-blend-multiply" loading="lazy" />
              <img src={pantalla3Img} alt="Vallas LED — JM Publicidad" className="reveal-img rounded-xl w-full object-cover aspect-video mix-blend-multiply" loading="lazy" />
              <img src={pantalla4Img} alt="Counter Cap Touch — JM Publicidad" className="reveal-img rounded-xl w-full object-cover aspect-video mix-blend-multiply" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Tótems */}
        <div>
          <SubSectionLabel label={d('totems_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img src={totemsImg} alt="Tótems LED — JM Publicidad" className="reveal-img rounded-xl w-full object-cover order-last md:order-none mix-blend-multiply" loading="lazy" />
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={d('totem_led_title')} specs={[]} />
              <ProductCard title={d('totem_doble_title')} specs={[]} />
              <ProductCard title={d('totem_cap_touch_title')} specs={[]} />
              <ProductCard title={d('totem_outdoor_title')} specs={[]} />
            </div>
          </div>
        </div>

        {/* Video Wall & Hanging Screens */}
        <div>
          <SubSectionLabel label={d('video_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={d('video_wall_title')} specs={[d('video_wall_spec')]} />
              <ProductCard title={d('colgante_title')} specs={[d('colgante_spec')]} />
              <ProductCard title={d('translucida_title')} specs={[]} />
              <ProductCard title={d('menu_board_title')} specs={[]} />
              <ProductCard title={d('poster_led_title')} specs={[]} />
              <ProductCard title={d('cap_touch_signage_title')} specs={[]} />
            </div>
            <img src={videoWallImg} alt="Video wall y pantallas colgantes — JM Publicidad" className="reveal-img rounded-xl w-full object-cover mix-blend-multiply" loading="lazy" />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_enquire')} →
        </Link>
      </div>
    </section>
  );
}
