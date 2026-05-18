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
import totem1Img from '../../assets/media/digital/totem-1.png';
import totem2Img from '../../assets/media/digital/totem-2.png';
import totem3Img from '../../assets/media/digital/totem-3.png';
import totem4Img from '../../assets/media/digital/totem-4.png';
import videoWall1Img from '../../assets/media/digital/video-wall-1.png';
import videoWall2Img from '../../assets/media/digital/video-wall-2.png';
import videoWall3Img from '../../assets/media/digital/video-wall-3.png';
import videoWall4Img from '../../assets/media/digital/video-wall-4.png';
import videoWall5Img from '../../assets/media/digital/video-wall-5.png';
import videoWall6Img from '../../assets/media/digital/video-wall-6.png';

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
            <div className="grid grid-cols-2 gap-4 order-last md:order-none">
              <img src={totem1Img} alt="Tótem LED — JM Publicidad"          className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={totem2Img} alt="Tótem doble — JM Publicidad"        className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={totem3Img} alt="Tótem cap touch — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={totem4Img} alt="Tótem outdoor — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
            </div>
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
            <div className="grid grid-cols-2 gap-4 order-last md:order-none">
              <img src={videoWall1Img} alt="Video wall — JM Publicidad"              className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={videoWall2Img} alt="Pantalla colgante — JM Publicidad"       className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={videoWall3Img} alt="Pantalla translúcida — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={videoWall4Img} alt="Menu board digital — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={videoWall5Img} alt="Poster LED — JM Publicidad"              className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={videoWall6Img} alt="Cap touch signage — JM Publicidad"       className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={d('video_wall_title')} specs={[d('video_wall_spec')]} />
              <ProductCard title={d('colgante_title')} specs={[d('colgante_spec')]} />
              <ProductCard title={d('translucida_title')} specs={[]} />
              <ProductCard title={d('menu_board_title')} specs={[]} />
              <ProductCard title={d('poster_led_title')} specs={[]} />
              <ProductCard title={d('cap_touch_signage_title')} specs={[]} />
            </div>
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_enquire')} →
        </Link>
      </div>
    </section>
  );
}
