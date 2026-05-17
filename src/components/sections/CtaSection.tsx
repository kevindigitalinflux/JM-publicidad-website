import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import entrepreneurBg from '../../assets/media/cta/entrepreneur-bg.jpg';

/** Full-width CTA banner — "Ready to give your brand visibility?" */
export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-primary relative overflow-hidden py-24 px-6">
      {/* Entrepreneur background — right side, barely visible */}
      <img
        src={entrepreneurBg}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[55%] object-cover object-center opacity-[0.12] mix-blend-luminosity pointer-events-none select-none"
      />

      {/* Decorative blur orb */}
      <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[40px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 max-w-sm">
          <h2 className="font-manrope font-extrabold text-white text-[30px] tracking-[-0.05em] leading-[36px]">
            {t('cta.headline_1')}<br />
            {t('cta.headline_2')}<br />
            {t('cta.headline_3')}
          </h2>

          <p className="font-inter font-normal text-white/90 text-lg leading-7">
            {t('cta.body')}
          </p>

          <Link
            to="/contact"
            className="self-start flex items-center justify-center bg-white text-jm-primary font-inter font-semibold text-base px-8 py-4 rounded hover:bg-jm-bg transition-colors"
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
