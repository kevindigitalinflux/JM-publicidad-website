import { useTranslation } from 'react-i18next';

export function PortfolioPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-16">
      <h1 className="text-4xl font-bold text-jm-dark mb-12 text-center">{t('nav.portfolio')}</h1>
      {/* TODO: Build portfolio gallery with client photography */}
    </main>
  );
}
