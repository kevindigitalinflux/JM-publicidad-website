import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { EnquiryForm } from '../components/EnquiryForm';
import { SEO } from '../components/SEO';
import { SchemaOrg } from '../components/SchemaOrg';

interface FormState {
  name: string; email: string; company: string;
  service: string; message: string; budget_range: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', company: '', service: '', message: '', budget_range: '' };

const SERVICE_OPTIONS = ['Publicidad Exterior', 'Brandeo Vehicular', 'Publicidad Digital', 'Souvenirs Publicitarios', 'Medios Impresos', 'Otro'];

const BUDGET_OPTIONS = {
  en: ['Under $200', '$200 – $500', '$500 – $1,000', '$1,000 – $3,000', 'Over $3,000'],
  es: ['Menos de $200', '$200 – $500', '$500 – $1.000', '$1.000 – $3.000', 'Más de $3.000'],
};

/** Location and contact details */
function StudioSpecs() {
  const { t } = useTranslation();

  const emailValue = t('contact.email_value') || null;
  const phoneValue = t('contact.phone_value') || null;

  const rows = [
    { label: t('contact.location_label'), value: t('contact.location_value'), href: null },
    { label: t('contact.phone_label'),    value: phoneValue, href: phoneValue ? `tel:${phoneValue.replace(/\s/g, '')}` : null },
    { label: t('contact.email_label'),    value: emailValue, href: emailValue ? `mailto:${emailValue}` : null },
  ].filter(r => r.value);

  return (
    <section className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl">
      <dl className="flex flex-col gap-6">
        {rows.map(({ label, value, href }) => (
          <div key={label} className="grid grid-cols-[140px_1fr] items-start border-b border-[#e4e2df] pb-4">
            <dt className="font-inter text-jm-primary text-sm tracking-[1.4px] uppercase leading-5">{label}</dt>
            <dd className="font-inter text-jm-heading text-base leading-6">
              {href ? (
                <a href={href} className="hover:text-jm-primary transition-colors underline-offset-2 hover:underline">
                  {value}
                </a>
              ) : value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://jm-publicidad-website.pages.dev/' },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://jm-publicidad-website.pages.dev/contact' },
  ],
};

/** Contact page — hero, enquiry form, location details */
export function ContactPage() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { setStatus('error'); return; }
    if (form.name.trim().length < 2) { setStatus('error'); return; }
    if (form.message.trim().length < 5) { setStatus('error'); return; }
    setStatus('loading');

    const { error } = await supabase.from('enquiries').insert({
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 254),
      company: form.company ? form.company.trim().slice(0, 100) : null,
      service: form.service || null,
      message: form.message.trim().slice(0, 2000),
      budget_range: form.budget_range || null,
      locale: lang,
    });

    if (error) { setStatus('error'); return; }

    // Forward enquiry to jmpublicidad@outlook.es via Web3Forms
    const w3Key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (w3Key) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: w3Key,
          subject: `Nueva consulta — ${form.service || 'JM Publicidad'}`,
          name: form.name.trim(),
          email: form.email.trim(),
          empresa: form.company || '—',
          servicio: form.service || '—',
          mensaje: form.message.trim(),
          presupuesto: form.budget_range || '—',
        }),
      }).catch(() => {}); // non-blocking — record is already in Supabase
    }

    setStatus('success');
    setForm(INITIAL_FORM);
  }

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Contacto — Pide tu Presupuesto | JM Publicidad"
        description="Contáctanos para un presupuesto de publicidad exterior, brandeo vehicular, producción impresa o publicidad digital. JM Publicidad, Quito, Ecuador."
        path="/contact"
      />
      <SchemaOrg schema={CONTACT_SCHEMA} />

      {/* Hero */}
      <section className="px-6 pt-10 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <h1 className="font-manrope font-extrabold text-jm-primary text-[36px] leading-[40px] tracking-[-0.9px] mb-4 sm:text-[56px] sm:leading-[56px] sm:tracking-[-1.4px]">
          {t('contact.title')}
        </h1>
        <p className="font-inter text-jm-body text-base leading-6">
          {t('contact.subheadline')}
        </p>
      </section>

      {/* Form */}
      <section className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <div className="bg-jm-bg-section rounded-lg px-5 pt-8 pb-12 sm:px-8">
          {status === 'success' ? (
            <div className="bg-jm-primary text-white rounded-lg p-10 text-center">
              <p className="font-manrope font-bold text-xl">{t('contact.success')}</p>
            </div>
          ) : (
            <EnquiryForm
              form={form}
              serviceOptions={SERVICE_OPTIONS}
              budgetOptions={BUDGET_OPTIONS[lang]}
              status={status}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>

      <StudioSpecs />
    </main>
  );
}
