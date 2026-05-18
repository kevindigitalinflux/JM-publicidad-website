import { useTranslation } from 'react-i18next';
import { InfiniteCarousel } from '../components/portfolio/InfiniteCarousel';
import { StaticCarousel } from '../components/portfolio/StaticCarousel';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

// Client logos
import abrus       from '../assets/clients/abrus.png';
import adelca      from '../assets/clients/adelca.webp';
import continental from '../assets/clients/continental.webp';
import softlanding from '../assets/clients/softlanding.webp';
import sucesores   from '../assets/clients/sucesores.png';
import toscana     from '../assets/clients/toscana.webp';

// Exterior Signage — from ServicesPage ExteriorSection
import rotuloClasicoImg  from '../assets/media/exterior/rotulo-clasico.png';
import rotuloLuminosoImg from '../assets/media/exterior/rotulo-luminoso.png';
import letras3dImg       from '../assets/media/exterior/letras-3d.png';
import terminado1Img     from '../assets/media/exterior/terminado-1.png';
import terminado2Img     from '../assets/media/exterior/terminado-2.png';
import terminado3Img     from '../assets/media/exterior/terminado-3.png';
import popupSuzukiImg    from '../assets/media/exterior/popup-suzuki.jpg';
import rollupObiImg      from '../assets/media/exterior/rollup-obi.jpg';
import vehicularImg      from '../assets/media/catalogue/vehicular.webp';

// Digital — from ServicesPage DigitalSection
import pantalla1Img  from '../assets/media/digital/pantalla-1.png';
import pantalla2Img  from '../assets/media/digital/pantalla-2.png';
import pantalla3Img  from '../assets/media/digital/pantalla-3.png';
import pantalla4Img  from '../assets/media/digital/pantalla-4.png';
import totem1Img     from '../assets/media/digital/totem-1.png';
import totem2Img     from '../assets/media/digital/totem-2.png';
import totem3Img     from '../assets/media/digital/totem-3.png';
import totem4Img     from '../assets/media/digital/totem-4.png';
import videoWall1Img from '../assets/media/digital/video-wall-1.png';
import videoWall2Img from '../assets/media/digital/video-wall-2.png';
import videoWall3Img from '../assets/media/digital/video-wall-3.png';
import videoWall4Img from '../assets/media/digital/video-wall-4.png';
import videoWall5Img from '../assets/media/digital/video-wall-5.png';
import videoWall6Img from '../assets/media/digital/video-wall-6.png';

// Souvenirs — from ServicesPage SouvenirsSection
import escritura1Img    from '../assets/media/catalogue/escritura-1.png';
import escritura2Img    from '../assets/media/catalogue/escritura-2.png';
import escritura3Img    from '../assets/media/catalogue/escritura-3.png';
import escritura4Img    from '../assets/media/catalogue/escritura-4.png';
import escritura5Img    from '../assets/media/catalogue/escritura-5.png';
import escritura6Img    from '../assets/media/catalogue/escritura-6.png';
import indumentaria1Img from '../assets/media/catalogue/indumentaria-1.png';
import indumentaria2Img from '../assets/media/catalogue/indumentaria-2.png';
import indumentaria3Img from '../assets/media/catalogue/indumentaria-3.png';
import indumentaria4Img from '../assets/media/catalogue/indumentaria-4.png';
import indumentaria5Img from '../assets/media/catalogue/indumentaria-5.png';
import accesorios1Img   from '../assets/media/catalogue/accesorios-new-1.png';
import accesorios2Img   from '../assets/media/catalogue/accesorios-new-2.png';
import accesorios3Img   from '../assets/media/catalogue/accesorios-new-3.png';
import accesorios4Img   from '../assets/media/catalogue/accesorios-new-4.png';
import accesorios5Img   from '../assets/media/catalogue/accesorios-new-5.png';
import accesorios6Img   from '../assets/media/catalogue/accesorios-new-6.png';
import carpa1Img        from '../assets/media/catalogue/carpa-1.png';

// Print — from ServicesPage PrintSection
import papeleria1Img from '../assets/media/catalogue/papeleria-1.png';
import papeleria2Img from '../assets/media/catalogue/papeleria-2.png';

// Pop-up and roll-up photos loaded dynamically
type ImageMod = { default: string };
const rawPopups  = import.meta.glob<ImageMod>('../assets/media/portfolio/popups/*',  { eager: true });
const rawRollups = import.meta.glob<ImageMod>('../assets/media/portfolio/rollups/*', { eager: true });

const popupImages  = Object.values(rawPopups).map(m  => m.default);
const rollupImages = Object.values(rawRollups).map(m => m.default);

const CLIENT_LOGOS = [
  { src: abrus,       alt: 'Abrus'       },
  { src: adelca,      alt: 'Adelca'      },
  { src: continental, alt: 'Continental' },
  { src: softlanding, alt: 'SoftLanding' },
  { src: sucesores,   alt: 'Sucesores'   },
  { src: toscana,     alt: 'Toscana'     },
];

const SERVICES_IMAGES = [
  // Exterior Signage
  rotuloClasicoImg, rotuloLuminosoImg, letras3dImg,
  terminado1Img, terminado2Img, terminado3Img,
  popupSuzukiImg, rollupObiImg, vehicularImg,
  // Digital
  pantalla1Img, pantalla2Img, pantalla3Img, pantalla4Img,
  totem1Img, totem2Img, totem3Img, totem4Img,
  videoWall1Img, videoWall2Img, videoWall3Img, videoWall4Img, videoWall5Img, videoWall6Img,
  // Souvenirs
  escritura1Img, escritura2Img, escritura3Img, escritura4Img, escritura5Img, escritura6Img,
  indumentaria1Img, indumentaria2Img, indumentaria3Img, indumentaria4Img, indumentaria5Img,
  accesorios1Img, accesorios2Img, accesorios3Img, accesorios4Img, accesorios5Img, accesorios6Img,
  carpa1Img,
  // Print
  papeleria1Img, papeleria2Img,
];

const PORTFOLIO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'JM Publicidad Portfolio',
  description: 'Pop ups, roll ups y trabajos publicitarios de JM Publicidad en Quito, Ecuador.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pop Ups' },
    { '@type': 'ListItem', position: 2, name: 'Roll Ups' },
    { '@type': 'ListItem', position: 3, name: 'Brandeo Vehicular' },
  ],
};

/** Portfolio page — client logos, pop-up and roll-up infinite carousels, services variety */
export function PortfolioPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Portafolio — Pop Ups, Roll Ups y Publicidad Exterior | JM Publicidad"
        description="Trabajos reales de JM Publicidad: pop ups, roll ups, brandeo vehicular, pantallas digitales y souvenirs corporativos en Quito, Ecuador."
        path="/portfolio"
      />
      <SchemaOrg schema={PORTFOLIO_SCHEMA} />

      {/* Hero */}
      <section className="px-6 pt-10 pb-14 max-w-lg mx-auto lg:max-w-3xl">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-3">
          Portfolio
        </p>
        <h1 className="font-manrope font-extrabold text-jm-heading text-[36px] leading-[40px] tracking-[-0.9px] mb-4">
          {t('portfolio.title')}
        </h1>
        <p className="font-inter text-jm-body text-base leading-[26px]">
          {t('portfolio.description')}
        </p>
      </section>

      {/* Client logos — static */}
      <section className="pb-16 px-6 max-w-lg mx-auto lg:max-w-3xl">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-6">
          {t('portfolio.clients_label')}
        </p>
        <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-6">
          {CLIENT_LOGOS.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              loading="lazy"
              className="h-12 w-auto object-contain opacity-60"
            />
          ))}
        </div>
      </section>

      {/* Pop Ups carousel — scrolls right */}
      <section className="pb-16 bg-jm-bg-section py-12">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-6 px-6 max-w-lg mx-auto lg:max-w-3xl">
          {t('portfolio.pop_ups_label')}
        </p>
        <InfiniteCarousel images={popupImages} direction="right" speed={50} imageHeight={320} />
      </section>

      {/* Roll Ups carousel — scrolls left */}
      <section className="py-12">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-6 px-6 max-w-lg mx-auto lg:max-w-3xl">
          {t('portfolio.roll_ups_label')}
        </p>
        <InfiniteCarousel images={rollupImages} direction="left" speed={45} imageHeight={320} />
      </section>

      {/* Variedad de trabajos — full-bleed single-image carousel */}
      <section className="py-12 bg-jm-bg-section">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-6 px-6 max-w-lg mx-auto lg:max-w-3xl">
          {t('portfolio.variety_label')}
        </p>
        <StaticCarousel images={SERVICES_IMAGES} imageHeight={320} />
      </section>
    </main>
  );
}
