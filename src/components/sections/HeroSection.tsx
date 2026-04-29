import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import UnicornScene from 'unicornstudio-react';

/** Landing page hero — headline, subtext, dual CTAs */
export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-jm-bg flex items-center overflow-hidden pt-20">
      {/* Unicorn Studio animated background — pointer-events disabled so CTAs remain interactive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <UnicornScene
            projectId="NUtfgbuISPQpTZ0NzzZa"
            width="1440px"
            height="900px"
            scale={1}
            dpi={1.5}
          />
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-[448px]">
          {/* Badge */}
          <div className="inline-flex items-center bg-jm-accent/20 px-3 py-1 rounded mb-6">
            <span className="font-inter font-medium text-jm-primary text-xs tracking-[0.2em] uppercase">
              {t('hero.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-manrope font-extrabold text-[clamp(40px,10vw,64px)] leading-[1.1] tracking-[-0.05em] text-jm-heading mb-4">
            <span className="block">{t('hero.headline_1')}</span>
            <span className="block text-jm-primary">{t('hero.headline_2')}</span>
            <span className="block">{t('hero.headline_3')}</span>
            <span className="block text-jm-accent">{t('hero.headline_4')}</span>
          </h1>

          {/* Subheadline */}
          <p className="font-inter font-normal text-jm-body text-lg leading-[1.625] mb-10 pt-2">
            {t('hero.subheadline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="flex items-center justify-between bg-jm-primary text-white font-inter font-semibold text-base px-8 py-5 rounded tracking-[-0.025em] hover:bg-jm-accent transition-colors"
            >
              <span>{t('hero.cta_primary')}</span>
              <span className="text-lg">→</span>
            </Link>
            <Link
              to="/portfolio"
              className="flex items-center justify-center bg-jm-bg-card text-jm-primary font-inter font-semibold text-base px-8 py-5 rounded tracking-[-0.025em] hover:bg-jm-bg-section transition-colors"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
