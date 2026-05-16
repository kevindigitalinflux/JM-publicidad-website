import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import serviceExterior  from '../../assets/sections/service-exterior.jpg';
import serviceDigital   from '../../assets/sections/service-digital.jpg';
import serviceSouvenirs from '../../assets/sections/service-souvenirs.png';
import servicePrint     from '../../assets/sections/service-print.jpg';

const cards = [
  {
    key:   'services.card_1',
    bg:    'bg-jm-bg-card',
    text:  'text-jm-heading',
    image: serviceExterior,
  },
  {
    key:   'services.card_2',
    bg:    'bg-jm-accent',
    text:  'text-[#f9ffed]',
    image: serviceDigital,
  },
  {
    key:   'services.card_3',
    bg:    'bg-[#e4e2df]',
    text:  'text-jm-heading',
    image: serviceSouvenirs,
  },
  {
    key:   'services.card_4',
    bg:    'bg-jm-primary/10',
    text:  'text-jm-heading',
    image: servicePrint,
  },
] as const;

/** Services overview — 2×2 card grid with faded background images, hover effects, portfolio link */
export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-bg px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-manrope font-extrabold text-jm-heading text-[30px] tracking-[-0.025em] leading-[36px] mb-8">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {cards.map(({ key, bg, text, image }) => (
            <Link
              key={key}
              to="/portfolio"
              className={`${bg} ${text} relative overflow-hidden group rounded-lg p-6 flex flex-col justify-between min-h-[200px] cursor-pointer`}
            >
              {/* Faded reference image */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.13] group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none"
                loading="lazy"
              />

              {/* Content — sits above the image */}
              <div className="relative z-10 w-5 h-5 rounded-sm bg-current opacity-40" />
              <div className="relative z-10 flex items-end justify-between gap-2">
                <span className="font-inter font-semibold text-sm tracking-[0.1em] uppercase leading-[1.25]">
                  {t(key)}
                </span>
                <span className="text-base opacity-60 translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 font-inter font-semibold text-sm text-jm-primary hover:text-jm-accent transition-colors"
        >
          {t('nav.services')} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
