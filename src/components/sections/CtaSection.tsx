import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ctaBg from '../../assets/media/cta/cta-bg.jpg';

/** Full-width CTA banner — "Ready to give your brand visibility?" */
export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-primary relative overflow-hidden py-24 px-6">
      {/* Client installation photo — right side, blended into green at 13% opacity */}
      <img
        src={ctaBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-y-0 right-0 h-full w-[60%] object-cover object-left opacity-[0.13] pointer-events-none select-none"
      />

      {/* Subtle left-side fade so the image doesn't bleed into the text column */}
      <div
        className="absolute inset-y-0 right-0 w-[60%] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to right, #536049 0%, transparent 20%)' }}
      />

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
