import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Full-width CTA banner — "Ready to give your brand visibility?"
 * Background image slot: drop entrepreneur-bg.jpg into src/assets/media/cta/ and
 * replace the CSS decorative layer with an <img> import when ready.
 */
export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-primary relative overflow-hidden py-24 px-6">
      {/* Decorative right-side treatment — placeholder until entrepreneur photo is added */}
      <div className="absolute right-0 top-0 h-full w-[55%] pointer-events-none" aria-hidden="true">
        {/* Large soft orb — upper right */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-white/[0.06] blur-[60px]" />
        {/* Mid orb — centre right */}
        <div className="absolute top-[30%] right-[5%] w-[280px] h-[280px] rounded-full bg-white/[0.04] blur-[40px]" />
        {/* Small accent orb — lower right */}
        <div className="absolute bottom-[-40px] right-[15%] w-[180px] h-[180px] rounded-full bg-white/[0.07] blur-[30px]" />
        {/* Subtle radial sweep from far right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right_center,rgba(255,255,255,0.08)_0%,transparent_65%)]" />
      </div>

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
