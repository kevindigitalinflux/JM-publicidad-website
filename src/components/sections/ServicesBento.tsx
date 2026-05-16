import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/** Checkmark bullet used across all service cards */
function Bullet({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <svg className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${dark ? 'text-white/70' : 'text-jm-primary'}`} viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className={`font-inter text-xs ${dark ? 'text-white/90' : 'text-jm-body'}`}>{text}</span>
    </li>
  );
}

/** Four bento-style service cards for the Services page */
export function ServicesBento() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl flex flex-col gap-6">

      {/* Card 1: Publicidad Exterior — dark green gradient */}
      <div className="card rounded-lg p-8 flex flex-col gap-3 shadow-xl" style={{ background: 'linear-gradient(135deg, #536049 0%, #6c7960 100%)' }}>
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-5 h-5 text-white/80" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="font-inter font-semibold text-white/70 text-[10px] tracking-[0.15em] uppercase">
            {t('services_page.label')}
          </span>
        </div>
        <h3 className="font-manrope font-bold text-white text-2xl leading-8">
          {t('services_page.exterior.title')}
        </h3>
        <p className="font-inter text-white/90 text-sm leading-[1.625]">
          {t('services_page.exterior.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1">
          {[
            t('services_page.exterior.feature_1'),
            t('services_page.exterior.feature_2'),
            t('services_page.exterior.feature_3'),
            t('services_page.exterior.feature_4'),
          ].map((feat) => <Bullet key={feat} text={feat} dark />)}
        </ul>
        <Link to="/portfolio" className="mt-2 bg-white text-jm-primary font-inter font-semibold text-sm px-6 py-4 rounded text-center flex items-center justify-center gap-2 hover:bg-jm-bg transition-colors">
          {t('services_page.exterior.cta')} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Card 2: Publicidad Digital — light card */}
      <div className="card bg-jm-bg-section border border-[rgba(197,200,189,0.3)] rounded-lg p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <svg className="w-6 h-6 text-jm-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" strokeLinecap="round" />
          </svg>
          <span className="bg-jm-primary/10 text-jm-primary font-inter font-semibold text-[10px] px-2 py-1 rounded-sm tracking-wide uppercase">
            Digital
          </span>
        </div>
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8 pt-1">
          {t('services_page.digital.title')}
        </h3>
        <p className="font-inter text-jm-body text-sm leading-[1.625]">
          {t('services_page.digital.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1">
          {[
            t('services_page.digital.feature_1'),
            t('services_page.digital.feature_2'),
            t('services_page.digital.feature_3'),
            t('services_page.digital.feature_4'),
          ].map((feat) => <Bullet key={feat} text={feat} />)}
        </ul>
        <Link to="/contact" className="mt-2 bg-jm-primary text-white font-inter font-semibold text-sm px-6 py-3 rounded text-center hover:bg-jm-accent transition-colors">
          {t('services_page.digital.cta')}
        </Link>
      </div>

      {/* Card 3: Souvenirs Publicitarios — card bg */}
      <div className="card bg-jm-bg-card border border-[#e4e2df] rounded-lg p-6 flex flex-col gap-3">
        <div className="bg-jm-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-1">
          <svg className="w-6 h-6 text-jm-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8">
          {t('services_page.souvenirs.title')}
        </h3>
        <p className="font-inter text-jm-body text-sm leading-[1.625]">
          {t('services_page.souvenirs.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1">
          {[
            t('services_page.souvenirs.feature_1'),
            t('services_page.souvenirs.feature_2'),
            t('services_page.souvenirs.feature_3'),
            t('services_page.souvenirs.feature_4'),
          ].map((feat) => <Bullet key={feat} text={feat} />)}
        </ul>
        <Link to="/contact" className="mt-2 bg-jm-primary text-white font-inter font-semibold text-sm px-6 py-3 rounded text-center hover:bg-jm-accent transition-colors">
          {t('services_page.souvenirs.cta')}
        </Link>
      </div>

      {/* Card 4: Medios Impresos — white centered */}
      <div className="card bg-white border border-[#e4e2df] rounded-lg p-6 flex flex-col items-center gap-4 text-center">
        <div className="bg-jm-bg-card w-16 h-16 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-jm-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8">
          {t('services_page.print.title')}
        </h3>
        <p className="font-inter text-jm-body text-sm leading-[1.625]">
          {t('services_page.print.description')}
        </p>
        <ul className="flex flex-col gap-2 py-1 text-left">
          {[
            t('services_page.print.feature_1'),
            t('services_page.print.feature_2'),
            t('services_page.print.feature_3'),
          ].map((feat) => <Bullet key={feat} text={feat} />)}
        </ul>
        <Link to="/contact" className="font-inter font-semibold text-jm-primary text-sm tracking-[0.05em] uppercase underline hover:text-jm-accent transition-colors">
          {t('services_page.print.cta')}
        </Link>
      </div>

    </section>
  );
}
