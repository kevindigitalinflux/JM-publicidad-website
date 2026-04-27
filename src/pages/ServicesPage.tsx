import { useTranslation } from 'react-i18next';

/** Services page — all 6 service categories with descriptions (EN/ES) */
export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-16">
      <h1 className="text-4xl font-bold text-jm-dark mb-12 text-center">{t('services.title')}</h1>
      {/* TODO: Build service category cards from Figma design */}
    </main>
  );
}
