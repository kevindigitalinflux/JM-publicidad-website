import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const cards = [
  { key: 'services.card_1', bg: 'bg-jm-bg-card',       text: 'text-jm-heading' },
  { key: 'services.card_2', bg: 'bg-jm-accent',         text: 'text-[#f9ffed]'  },
  { key: 'services.card_3', bg: 'bg-[#e4e2df]',         text: 'text-jm-heading' },
  { key: 'services.card_4', bg: 'bg-jm-primary/10',     text: 'text-jm-heading' },
] as const;

/** Services overview — 2×2 card grid */
export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-bg px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-manrope font-extrabold text-jm-heading text-[30px] tracking-[-0.025em] leading-[36px] mb-8">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {cards.map(({ key, bg, text }) => (
            <div
              key={key}
              className={`${bg} ${text} p-6 rounded-lg flex flex-col justify-between min-h-[163px]`}
            >
              {/* TODO: add service category icon */}
              <div className="w-5 h-5 rounded-sm bg-current opacity-40" />
              <span className="font-inter font-semibold text-sm tracking-[0.1em] uppercase leading-[1.25]">
                {t(key)}
              </span>
            </div>
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
