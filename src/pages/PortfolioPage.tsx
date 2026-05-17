import { useTranslation } from 'react-i18next';
import { InfiniteCarousel } from '../components/portfolio/InfiniteCarousel';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

// Client logos
import abrus       from '../assets/clients/abrus.png';
import adelca      from '../assets/clients/adelca.png';
import continental from '../assets/clients/continental.png';
import softlanding from '../assets/clients/softlanding.png';
import sucesores   from '../assets/clients/sucesores.png';
import toscana     from '../assets/clients/toscana.png';

// Catalogue images (text-free transparent PNGs — show product variety)
import catRotulos       from '../assets/media/catalogue/rotulos.png';
import catPantallas     from '../assets/media/catalogue/pantallas.png';
import catTotems        from '../assets/media/catalogue/totems.png';
import catVideoWall     from '../assets/media/catalogue/video-wall.png';
import catEscritura     from '../assets/media/catalogue/souvenirs-escritura.png';
import catIndumentaria  from '../assets/media/catalogue/souvenirs-indumentaria.png';
import catAccesorios    from '../assets/media/catalogue/souvenirs-accesorios.png';
import catEventos       from '../assets/media/catalogue/souvenirs-eventos.png';
import catPapeleria     from '../assets/media/catalogue/print-papeleria.png';
import catImpresos      from '../assets/media/catalogue/print-impresos.png';
import catVehicular     from '../assets/media/catalogue/vehicular.png';

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

const CATALOGUE_IMAGES = [
  catRotulos, catPantallas, catTotems, catVideoWall,
  catEscritura, catIndumentaria, catAccesorios,
  catEventos, catPapeleria, catImpresos, catVehicular,
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

/** Portfolio page — client logos, pop-up and roll-up infinite carousels, catalogue variety */
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

      {/* Variedad de trabajos — catalogue product images */}
      <section className="py-12 bg-jm-bg-section">
        <p className="font-inter font-semibold text-jm-primary text-[11px] tracking-[2.2px] uppercase leading-[16.5px] mb-6 px-6 max-w-lg mx-auto lg:max-w-3xl">
          {t('portfolio.variety_label')}
        </p>
        <InfiniteCarousel images={CATALOGUE_IMAGES} direction="right" speed={55} imageHeight={280} />
      </section>
    </main>
  );
}
