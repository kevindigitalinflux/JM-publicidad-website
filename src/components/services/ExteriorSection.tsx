import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import { useImageReveal } from '../../hooks/useScrollReveal';
import rotuloClasicoImg from '../../assets/media/exterior/rotulo-clasico.png';
import rotuloLuminosoImg from '../../assets/media/exterior/rotulo-luminoso.png';
import letras3dImg from '../../assets/media/exterior/letras-3d.png';
import popupSuzuki from '../../assets/media/exterior/popup-suzuki.jpg';
import rollupObi from '../../assets/media/exterior/rollup-obi.jpg';
import vehicularImg from '../../assets/media/catalogue/vehicular.webp';

/** Publicidad Exterior — Rótulos, Displays, Brandeo Vehicular */
export function ExteriorSection() {
  const { t } = useTranslation();
  const e = (k: string) => t(`services_page.exterior.${k}`);
  const sectionRef = useImageReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="pb-16 bg-jm-bg">
      <CategoryHeader
        tag={t('services_page.label')}
        title={e('title')}
        subtitle={e('subtitle')}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-12">

        {/* Rótulos */}
        <div>
          <SubSectionLabel label={e('rotulos_label')} />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="grid grid-cols-1 gap-4">
                <ProductCard title={e('clasicos_title')} specs={[e('clasicos_spec_1'), e('clasicos_spec_2'), e('clasicos_spec_3')]} />
                <ProductCard title={e('luminosos_title')} specs={[e('luminosos_spec_1'), e('luminosos_spec_2'), e('luminosos_spec_3')]} />
                <ProductCard title={e('letras3d_title')} specs={[e('letras3d_spec_1'), e('letras3d_spec_2'), e('letras3d_spec_3')]} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <img src={rotuloClasicoImg} alt="Rótulo clásico — JM Publicidad"   className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
                <img src={rotuloLuminosoImg} alt="Rótulo luminoso — JM Publicidad" className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
                <img src={letras3dImg}       alt="Letras 3D — JM Publicidad"        className="reveal-img rounded-xl w-full h-28 object-contain mix-blend-multiply" loading="lazy" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[e('terminado_1'), e('terminado_2'), e('terminado_3')].map((fin) => (
                <span key={fin} className="bg-jm-primary/10 text-jm-primary font-inter text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                  {fin}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Displays & Point of Sale */}
        <div>
          <SubSectionLabel label={e('displays_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-2 gap-3 order-last md:order-none">
              <img src={popupSuzuki} alt="Pop-up Suzuki — JM Publicidad" className="reveal-img rounded-xl object-cover aspect-[3/4] w-full mix-blend-multiply" loading="lazy" />
              <img src={rollupObi} alt="Roll-up OBI — JM Publicidad" className="reveal-img rounded-xl object-cover aspect-[3/4] w-full mix-blend-multiply" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ProductCard title={e('rollups_title')} specs={[e('rollups_spec_1'), e('rollups_spec_2'), e('rollups_spec_3')]} />
              <ProductCard title={e('vinil_title')} specs={[e('vinil_spec_1'), e('vinil_spec_2')]} />
              <ProductCard title={e('microperforado_title')} specs={[e('microperforado_spec_1'), e('microperforado_spec_2')]} />
              <ProductCard title={e('triangulos_title')} specs={[e('triangulos_spec_1'), e('triangulos_spec_2'), e('triangulos_spec_3')]} />
              <ProductCard title={e('exibidores_title')} specs={[e('exibidores_spec_1'), e('exibidores_spec_2'), e('exibidores_spec_3')]} />
              <ProductCard title={e('stands_title')} specs={[e('stands_spec_1'), e('stands_spec_2'), e('stands_spec_3')]} />
            </div>
          </div>
        </div>

        {/* Brandeo Vehicular */}
        <div>
          <SubSectionLabel label={e('vehicular_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col gap-4">
              <p className="font-inter text-jm-body text-sm leading-6">{e('vehicular_description')}</p>
              <ul className="flex flex-col gap-2">
                {[e('vehicular_spec_1'), e('vehicular_spec_2'), e('vehicular_spec_3'), e('vehicular_spec_4')].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="bg-jm-primary w-1.5 h-1.5 rounded-full mt-[5px] shrink-0" />
                    <span className="font-inter text-xs text-jm-body leading-5">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <img src={vehicularImg} alt="Brandeo vehicular — JM Publicidad" className="reveal-img rounded-xl object-cover w-full aspect-video mix-blend-multiply" loading="lazy" />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
