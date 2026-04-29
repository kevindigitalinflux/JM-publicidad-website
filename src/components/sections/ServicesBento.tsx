import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/** Figma asset — Creative Campaigns background (expires 7 days; replace with hosted asset) */
const CREATIVE_BG = 'https://www.figma.com/api/mcp/asset/9531eeaf-c2af-4b05-9829-30a088e2e69a';

/** Four bento-style service cards for the Services page */
export function ServicesBento() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl flex flex-col gap-6">

      {/* Card 1: Creative Campaigns — image card */}
      <div className="card bg-jm-bg-card rounded-lg overflow-hidden">
        <div className="relative h-48 shrink-0">
          <img src={CREATIVE_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-jm-bg-card to-transparent" />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <svg className="w-5 h-5 text-jm-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
          </svg>
          <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8">
            {t('services_page.creative_campaigns.title')}
          </h3>
          <p className="font-inter text-jm-body text-sm leading-[1.625]">
            {t('services_page.creative_campaigns.description')}
          </p>
          <ul className="flex flex-col gap-2 py-1">
            {[
              t('services_page.creative_campaigns.feature_1'),
              t('services_page.creative_campaigns.feature_2'),
              t('services_page.creative_campaigns.feature_3'),
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <svg className="w-3.5 h-3.5 text-jm-primary shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="font-inter text-jm-body text-xs">{feat}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-2 bg-jm-primary text-white font-inter font-semibold text-sm px-6 py-3 rounded text-center hover:bg-jm-accent transition-colors">
            {t('services_page.creative_campaigns.cta')}
          </Link>
        </div>
      </div>

      {/* Card 2: Digital Marketing — light card */}
      <div className="card bg-jm-bg-section border border-[rgba(197,200,189,0.1)] rounded-lg p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <svg className="w-7 h-5 text-jm-primary" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 14l5-5 4 4 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="bg-jm-primary/10 text-jm-primary font-inter font-semibold text-[10px] px-2 py-1 rounded-sm tracking-wide">
            {t('services_page.digital_marketing.badge')}
          </span>
        </div>
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8 pt-2">
          {t('services_page.digital_marketing.title')}
        </h3>
        <p className="font-inter text-jm-body text-sm leading-[1.625]">
          {t('services_page.digital_marketing.description')}
        </p>
        <div className="flex flex-col gap-3 py-2">
          {[
            t('services_page.digital_marketing.feature_1'),
            t('services_page.digital_marketing.feature_2'),
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-3">
              <svg className="w-3.5 h-3.5 text-jm-primary shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-inter text-jm-body text-xs">{feat}</span>
            </div>
          ))}
        </div>
        <Link to="/contact" className="bg-jm-bg-card text-jm-primary font-inter font-semibold text-sm px-6 py-3 rounded text-center hover:bg-jm-bg transition-colors">
          {t('services_page.digital_marketing.cta')}
        </Link>
      </div>

      {/* Card 3: Print Media Production — green gradient */}
      <div className="card rounded-lg p-8 flex flex-col gap-3 shadow-xl" style={{ background: 'linear-gradient(135deg, #536049 0%, #6c7960 100%)' }}>
        <h3 className="font-manrope font-bold text-white text-2xl leading-8">
          {t('services_page.print_media.title')}
        </h3>
        <p className="font-inter text-white/90 text-sm leading-[1.625]">
          {t('services_page.print_media.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1">
          {[
            t('services_page.print_media.feature_1'),
            t('services_page.print_media.feature_2'),
            t('services_page.print_media.feature_3'),
          ].map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <svg className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-inter text-white/90 text-xs">{feat}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-4 py-3">
          {[
            { label: t('services_page.print_media.spec_1_label'), value: t('services_page.print_media.spec_1_value') },
            { label: t('services_page.print_media.spec_2_label'), value: t('services_page.print_media.spec_2_value') },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded p-3 flex flex-col gap-1">
              <span className="font-inter font-semibold text-white/70 text-[10px] tracking-[0.1em] uppercase">{label}</span>
              <span className="font-manrope font-bold text-white text-base leading-6">{value}</span>
            </div>
          ))}
        </div>
        <Link to="/contact" className="bg-white text-jm-primary font-inter font-semibold text-sm px-6 py-4 rounded text-center flex items-center justify-center gap-2 hover:bg-jm-bg transition-colors">
          {t('services_page.print_media.cta')} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Card 4: Identity & Branding — white centered */}
      <div className="card bg-white border border-[#e4e2df] rounded-lg p-6 flex flex-col items-center gap-4 text-center">
        <div className="bg-jm-bg-card w-16 h-16 rounded-xl flex items-center justify-center">
          <svg className="w-[14px] h-[23px] text-jm-primary" viewBox="0 0 14 23" fill="currentColor" aria-hidden="true">
            <path d="M0 0h9.6C12.02 0 14 1.98 14 4.4c0 1.5-.72 2.84-1.84 3.67A4.4 4.4 0 0110.4 17.6H2.8V23H0V0zm2.8 2.8v12h7.6a1.6 1.6 0 000-3.2H5.6V9.6h4.8a1.6 1.6 0 100-3.2H2.8V2.8z" />
          </svg>
        </div>
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8">
          {t('services_page.branding.title')}
        </h3>
        <p className="font-inter text-jm-body text-sm leading-[1.625]">
          {t('services_page.branding.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1 text-left">
          {[
            t('services_page.branding.feature_1'),
            t('services_page.branding.feature_2'),
            t('services_page.branding.feature_3'),
          ].map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <svg className="w-3.5 h-3.5 text-jm-primary shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-inter text-jm-body text-xs">{feat}</span>
            </li>
          ))}
        </ul>
        <Link to="/portfolio" className="font-inter font-semibold text-jm-primary text-sm tracking-[0.05em] uppercase underline hover:text-jm-accent transition-colors">
          {t('services_page.branding.cta')}
        </Link>
      </div>
    </section>
  );
}
