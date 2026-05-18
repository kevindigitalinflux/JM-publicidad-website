import { Fragment, useEffect, useRef, useState } from 'react';
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
    <Fragment key={i}>
      <span className="word inline-block">{word}</span>
      {i < words.length - 1 && ' '}
    </Fragment>
  ));
}

/** Landing page hero — headline, subtext, dual CTAs */
export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // Track mobile breakpoint — drives which Unicorn Studio project is mounted
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Re-init Unicorn Studio whenever the active project div changes +
  // suppress their attribution badge via MutationObserver
  useEffect(() => {
    const tryInit = () => {
      if (typeof window.UnicornStudio?.init === 'function') {
        window.UnicornStudio.init();
      } else {
        setTimeout(tryInit, 50);
      }
    };
    tryInit();

    // Unicorn Studio injects a fixed-position badge that z-index alone cannot beat.
    // Watch for it and suppress immediately on insertion.
    const suppress = (el: Element) => {
      const text = el.textContent?.toLowerCase() ?? '';
      const html = el.innerHTML?.toLowerCase() ?? '';
      if (text.includes('unicorn') || html.includes('unicorn')) {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      }
    };
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            suppress(node);
            node.querySelectorAll('*').forEach(suppress);
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isMobile]);

  // Hero entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-headline span', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      })
      .from('.hero-subtext .word', {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.25')
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
    <section ref={sectionRef} className="relative h-screen min-h-[640px] bg-jm-bg overflow-hidden">
      {/* Unicorn Studio animated background.
          inert prevents keyboard focus on any injected canvas elements. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        // @ts-expect-error inert is a valid HTML attribute; React types lag behind the spec
        inert=""
      >
        {isMobile ? (
          // Mobile project — 390×844 portrait, scaled to fill viewport width
          <div className="absolute top-0 left-0">
            <div style={{ width: '100vw', height: 'calc(844 / 390 * 100vw)' }} data-us-project="MnYfxl5z4olR10DYUb9g" />
          </div>
        ) : (
          // Desktop project — 1440×900 landscape, centred
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div style={{ width: '1440px', height: '900px' }} data-us-project="NUtfgbuISPQpTZ0NzzZa" />
          </div>
        )}
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-8 md:pt-28">
        <div className="max-w-[448px]">
          {/* Badge */}
          <div className="inline-flex items-center bg-jm-accent/20 px-3 py-1 rounded mb-6">
            <span className="font-inter font-medium text-jm-primary text-xs tracking-[0.2em] uppercase">
              {t('hero.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline font-manrope font-extrabold text-[clamp(52px,13vw,68px)] leading-[1.1] tracking-[-0.05em] text-jm-heading mb-4">
            <span className="block">{t('hero.headline_1')}</span>
            <span className="block text-jm-primary">{t('hero.headline_2')}</span>
            <span className="block">{t('hero.headline_3')}</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subtext font-inter font-normal text-jm-body text-lg leading-[1.625] mb-8 pt-2">
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
