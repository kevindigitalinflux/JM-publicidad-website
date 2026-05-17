import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

/** Site footer */
export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-jm-bg-section px-8 py-12 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <img src={logo} alt="JM Publicidad" className="h-10 w-auto opacity-80" />
        <p className="font-inter text-sm text-jm-body max-w-[220px] leading-5">
          {t('footer.tagline')}
        </p>
      </div>

      {/* Contact details */}
      <div className="flex flex-col items-center gap-3 text-center">
        <a
          href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
          className="font-inter text-sm text-jm-body/80 hover:text-jm-primary transition-colors"
        >
          {t('footer.phone')}
        </a>
        <a
          href={`mailto:${t('footer.email')}`}
          className="font-inter text-sm text-jm-body/80 hover:text-jm-primary transition-colors"
        >
          {t('footer.email')}
        </a>
        <p className="font-inter text-sm text-jm-body max-w-[260px] leading-5">
          {t('footer.address')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/privacy" className="font-inter text-sm text-jm-body underline hover:text-jm-primary transition-colors">
          {t('footer.privacy')}
        </Link>
        <Link to="/terms" className="font-inter text-sm text-jm-body underline hover:text-jm-primary transition-colors">
          {t('footer.terms')}
        </Link>
        <Link to="/specs" className="font-inter text-sm text-jm-body underline hover:text-jm-primary transition-colors">
          {t('footer.specs')}
        </Link>
      </div>

      <p className="font-inter text-xs text-jm-body/90">{t('footer.copyright')}</p>
    </footer>
  );
}
