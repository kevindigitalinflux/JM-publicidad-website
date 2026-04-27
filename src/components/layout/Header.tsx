import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

/** Top navigation bar — frosted glass, fixed position */
export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px] bg-[rgba(251,249,245,0.85)] border-b border-[rgba(83,96,73,0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="md:hidden w-[18px] h-[12px] flex flex-col justify-between">
            <span className="block h-[2px] bg-jm-primary rounded-full" />
            <span className="block h-[2px] bg-jm-primary rounded-full w-3/4" />
            <span className="block h-[2px] bg-jm-primary rounded-full" />
          </div>
          <span className="font-inter font-semibold text-jm-primary text-xl tracking-[-0.04em]">
            JM Publicidad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-inter text-sm tracking-wide transition-colors ${
                location.pathname === path
                  ? 'text-jm-primary font-semibold'
                  : 'text-jm-body hover:text-jm-primary'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleLang}
            className="font-inter text-sm font-medium text-jm-primary border border-jm-primary/30 rounded px-3 py-1 hover:bg-jm-primary hover:text-white transition-colors"
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-[2px] bg-jm-heading rounded-full" />
          <span className="block w-5 h-[2px] bg-jm-heading rounded-full" />
          <span className="block w-5 h-[2px] bg-jm-heading rounded-full" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-jm-bg border-t border-[rgba(83,96,73,0.08)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="font-inter text-base text-jm-body hover:text-jm-primary transition-colors"
            >
              {label}
            </Link>
          ))}
          <button onClick={toggleLang} className="text-left font-inter text-sm font-medium text-jm-primary">
            {i18n.language === 'en' ? 'Switch to Español' : 'Switch to English'}
          </button>
        </div>
      )}
    </header>
  );
}
