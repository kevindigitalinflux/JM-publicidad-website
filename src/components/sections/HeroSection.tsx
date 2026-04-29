import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
    __unicornSDKReady?: boolean;
  }
}

/** Wraps each word in an inline-block span so GSAP can stagger per word */
function splitWords(text: string) {
  const words = text.split(' ').filter(Boolean);
  return words.map((word, i) => (
    <span key={i} className="word inline-block">
      {word}{i < words.length - 1 ? ' ' : ''}
    </span>
  ));
}

/** Landing page hero — headline, subtext, dual CTAs */
export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // Unicorn Studio init
  useEffect(() => {
    const tryInit = () => {
      if (typeof window.UnicornStudio?.init === 'function') {
        window.UnicornStudio.init();
      } else {
        setTimeout(tryInit, 50);
      }
    };
    tryInit();
  }, []);

  // Hero entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Headline lines — fade in + 20px upward slide
      tl.from('.hero-headline span', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      })
      // 2. Subheadline — stagger 0.1s per word
      .from('.hero-subtext .word', {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.25')
      // 3. CTA buttons — bounce on arrival
      .from('.hero-cta', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(2.5)',
      }, '-=0.15');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-jm-bg flex items-center overflow-hidden pt-20">
      {/* Unicorn Studio animated background — pointer-events disabled so CTAs remain interactive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div style={{ width: '1440px', height: '900px' }} data-us-project="NUtfgbuISPQpTZ0NzzZa" />
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
          <h1 className="hero-headline font-manrope font-extrabold text-[clamp(40px,10vw,64px)] leading-[1.1] tracking-[-0.05em] text-jm-heading mb-4">
            <span className="block">{t('hero.headline_1')}</span>
            <span className="block text-jm-primary">{t('hero.headline_2')}</span>
            <span className="block">{t('hero.headline_3')}</span>
            <span className="block text-jm-accent">{t('hero.headline_4')}</span>
          </h1>

          {/* Subheadline — split into word spans for per-word stagger */}
          <p className="hero-subtext font-inter font-normal text-jm-body text-lg leading-[1.625] mb-10 pt-2">
            {splitWords(t('hero.subheadline'))}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="hero-cta flex items-center justify-between bg-jm-primary text-white font-inter font-semibold text-base px-8 py-5 rounded tracking-[-0.025em] hover:bg-jm-accent transition-colors"
            >
              <span>{t('hero.cta_primary')}</span>
              <span className="text-lg">→</span>
            </Link>
            <Link
              to="/portfolio"
              className="hero-cta flex items-center justify-center bg-jm-bg-card text-jm-primary font-inter font-semibold text-base px-8 py-5 rounded tracking-[-0.025em] hover:bg-jm-bg-section transition-colors"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
