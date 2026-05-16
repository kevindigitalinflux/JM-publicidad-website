import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

/** Site footer */
export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-jm-bg-section px-8 py-12 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <img src={logo} alt="JM Publicidad" className="h-10 w-auto opacity-80" />
        <p className="font-inter text-sm text-jm-body/70 max-w-[200px] leading-5">
          {t('footer.tagline')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/privacy" className="font-inter text-sm text-jm-body/70 underline hover:text-jm-primary transition-colors">
          {t('footer.privacy')}
        </Link>
        <Link to="/terms" className="font-inter text-sm text-jm-body/70 underline hover:text-jm-primary transition-colors">
          {t('footer.terms')}
        </Link>
        <Link to="/specs" className="font-inter text-sm text-jm-body/70 underline hover:text-jm-primary transition-colors">
          {t('footer.specs')}
        </Link>
      </div>

      <p className="font-inter text-xs text-jm-body/50">{t('footer.copyright')}</p>
    </footer>
  );
}
