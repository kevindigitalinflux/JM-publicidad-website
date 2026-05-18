import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import { useImageReveal } from '../../hooks/useScrollReveal';
import escritura1Img from '../../assets/media/catalogue/escritura-1.png';
import escritura2Img from '../../assets/media/catalogue/escritura-2.png';
import escritura3Img from '../../assets/media/catalogue/escritura-3.png';
import escritura4Img from '../../assets/media/catalogue/escritura-4.png';
import escritura5Img from '../../assets/media/catalogue/escritura-5.png';
import escritura6Img from '../../assets/media/catalogue/escritura-6.png';
import indumentaria1Img from '../../assets/media/catalogue/indumentaria-1.png';
import indumentaria2Img from '../../assets/media/catalogue/indumentaria-2.png';
import indumentaria3Img from '../../assets/media/catalogue/indumentaria-3.png';
import indumentaria4Img from '../../assets/media/catalogue/indumentaria-4.png';
import indumentaria5Img from '../../assets/media/catalogue/indumentaria-5.png';
import accesorios1Img from '../../assets/media/catalogue/accesorios-new-1.png';
import accesorios2Img from '../../assets/media/catalogue/accesorios-new-2.png';
import accesorios3Img from '../../assets/media/catalogue/accesorios-new-3.png';
import accesorios4Img from '../../assets/media/catalogue/accesorios-new-4.png';
import accesorios5Img from '../../assets/media/catalogue/accesorios-new-5.png';
import accesorios6Img from '../../assets/media/catalogue/accesorios-new-6.png';
import carpa1Img from '../../assets/media/catalogue/carpa-1.png';

/** Souvenirs Publicitarios — Stationery, Clothing, Accessories, Events */
export function SouvenirsSection() {
  const { t } = useTranslation();
  const s = (k: string) => t(`services_page.souvenirs.${k}`);
  const sectionRef = useImageReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="pb-16 bg-jm-bg">
      <CategoryHeader tag="Merchandising" title={s('title')} subtitle={s('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Stationery & Office */}
        <div>
          <SubSectionLabel label={s('escritura_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-4 order-last md:order-none">
              <img src={escritura1Img} alt="Esferos publicitarios — JM Publicidad"   className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={escritura2Img} alt="Vasos publicitarios — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={escritura3Img} alt="Servilletas publicitarias — JM Publicidad" className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={escritura4Img} alt="Packaging publicitario — JM Publicidad"   className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={escritura5Img} alt="Habladores publicitarios — JM Publicidad" className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={escritura6Img} alt="Stickers publicitarios — JM Publicidad"   className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={s('esferos_title')} specs={[s('esferos_spec_1'), s('esferos_spec_2')]} />
              <ProductCard title={s('vasos_title')} specs={[s('vasos_spec_1'), s('vasos_spec_2')]} />
              <ProductCard title={s('servilletas_title')} specs={[s('servilletas_spec_1'), s('servilletas_spec_2')]} />
              <ProductCard title={s('packaging_title')} specs={[s('packaging_spec_1'), s('packaging_spec_2')]} />
              <ProductCard title={s('habladores_title')} specs={[s('habladores_spec_1'), s('habladores_spec_2')]} />
              <ProductCard title={s('stickers_title')} specs={[s('stickers_spec_1'), s('stickers_spec_2'), s('stickers_spec_3')]} />
            </div>
          </div>
        </div>

        {/* Clothing */}
        <div>
          <SubSectionLabel label={s('indumentaria_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-4 order-last md:order-none">
              <img src={indumentaria1Img} alt="Uniformes publicitarios — JM Publicidad" className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={indumentaria2Img} alt="Uniformes deportivos — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={indumentaria3Img} alt="Flash publicitarias — JM Publicidad"     className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={indumentaria4Img} alt="Agendas corporativas — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={indumentaria5Img} alt="Carnets corporativos — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
            </div>
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
            <div className="grid grid-cols-2 gap-4 order-last md:order-none">
              <img src={accesorios1Img} alt="Gorras publicitarias — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={accesorios2Img} alt="Tomatodos — JM Publicidad"                 className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={accesorios3Img} alt="Jarros publicitarios — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={accesorios4Img} alt="Pulseras publicitarias — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={accesorios5Img} alt="Mouse pad publicitario — JM Publicidad"    className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              <img src={accesorios6Img} alt="Bolsos publicitarios — JM Publicidad"      className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={s('gorras_title')} specs={[s('gorras_spec_1'), s('gorras_spec_2')]} />
              <ProductCard title={s('tomatodos_title')} specs={[s('tomatodos_spec_1'), s('tomatodos_spec_2')]} />
              <ProductCard title={s('jarros_title')} specs={[s('jarros_spec_1'), s('jarros_spec_2')]} />
              <ProductCard title={s('pulseras_title')} specs={[s('pulseras_spec_1'), s('pulseras_spec_2')]} />
              <ProductCard title={s('mousepad_title')} specs={[s('mousepad_spec_1'), s('mousepad_spec_2')]} />
              <ProductCard title={s('bolsos_title')} specs={[s('bolsos_spec_1'), s('bolsos_spec_2')]} />
            </div>
          </div>
        </div>

        {/* Events & Outdoor */}
        <div>
          <SubSectionLabel label={s('eventos_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img src={carpa1Img} alt="Carpas y banderas publicitarias — JM Publicidad" className="reveal-img rounded-xl w-full object-cover order-last md:order-none mix-blend-multiply" loading="lazy" />
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
