import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface Testimonial {
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quoteKey: 'portfolio.t1_quote', nameKey: 'portfolio.t1_name', roleKey: 'portfolio.t1_role', initials: 'SM' },
  { quoteKey: 'portfolio.t2_quote', nameKey: 'portfolio.t2_name', roleKey: 'portfolio.t2_role', initials: 'JL' },
];

/** Scrollable testimonials row — "Voices from the Studio" */
export function TestimonialsSection() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="pb-16 pt-8">
      <h2 className="font-manrope font-extrabold text-jm-heading text-[30px] leading-[36px] text-center px-6 mb-10">
        {t('portfolio.testimonials_title')}
      </h2>
      <div className="flex gap-4 px-6 overflow-x-auto pb-4 max-w-lg mx-auto lg:max-w-3xl lg:grid lg:grid-cols-2 lg:overflow-visible">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.nameKey}
            className="card bg-white rounded-lg p-8 flex flex-col justify-between min-w-[280px] lg:min-w-0 shrink-0 lg:shrink"
          >
            <p className="font-inter italic text-jm-body text-base leading-[26px] pb-8">
              {t(item.quoteKey)}
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-jm-primary w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <span className="font-manrope font-bold text-white text-sm leading-6">{item.initials}</span>
              </div>
              <div>
                <p className="font-inter font-semibold text-jm-heading text-sm leading-5">{t(item.nameKey)}</p>
                <p className="font-inter text-jm-body text-xs leading-4">{t(item.roleKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
