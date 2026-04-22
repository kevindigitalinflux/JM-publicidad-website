import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/** Full-width CTA banner — "Ready to build your brand's presence?" */
export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-bg-card px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="bg-jm-primary relative overflow-hidden rounded-lg p-12">
          {/* Decorative blur orb */}
          <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-xl bg-white/10 blur-[20px] pointer-events-none" />

          <div className="relative flex flex-col gap-6 max-w-sm">
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
              className="flex items-center justify-center bg-white text-jm-primary font-inter font-semibold text-base px-8 py-4 rounded hover:bg-jm-bg transition-colors"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
