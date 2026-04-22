import { useTranslation } from 'react-i18next';

export function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-16">
      <h1 className="text-4xl font-bold text-jm-dark mb-12 text-center">{t('contact.title')}</h1>
      {/* TODO: Build contact form wired to Supabase enquiries table */}
    </main>
  );
}
