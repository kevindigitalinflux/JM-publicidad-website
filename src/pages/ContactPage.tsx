import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { EnquiryForm } from '../components/EnquiryForm';
import { SEO } from '../components/SEO';

/** Figma asset — Elena Rodriguez portrait (expires 7 days; replace with hosted asset) */
const ELENA_IMG = 'https://www.figma.com/api/mcp/asset/524e9cee-b4d9-4e80-b1f9-850e92acb8df';
const MAP_IMG   = 'https://www.figma.com/api/mcp/asset/67504cc5-7436-42e4-8eeb-4a2223f30fbc';

interface FormState {
  name: string; email: string; company: string;
  service: string; message: string; budget_range: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', company: '', service: '', message: '', budget_range: '' };

const SERVICE_OPTIONS = {
  en: ['Outdoor Signage', 'Vehicle Branding', 'Digital Advertising', 'Promotional Merch', 'Printed Media', 'Other'],
  es: ['Señalización Exterior', 'Rotulación de Vehículos', 'Publicidad Digital', 'Merchandising Promocional', 'Medios Impresos', 'Otro'],
};

const BUDGET_OPTIONS = {
  en: ['Under €500', '€500 – €2,000', '€2,000 – €5,000', '€5,000 – €10,000', 'Over €10,000'],
  es: ['Menos de €500', '€500 – €2.000', '€2.000 – €5.000', '€5.000 – €10.000', 'Más de €10.000'],
};

/** Studio Specs — contact details in spec-sheet style */
function StudioSpecs() {
  const { t } = useTranslation();

  const rows = [
    { label: t('contact.headquarters_label'), value: t('contact.headquarters_value') },
    { label: t('contact.phone_label'),         value: t('contact.phone_value') },
    { label: t('contact.email_label'),         value: t('contact.email_value') },
    { label: t('contact.connect_label'),       value: null },
  ];

  return (
    <section className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl">
      <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8 mb-8">
        {t('contact.studio_specs_title')}
      </h3>
      <div className="flex flex-col gap-6">
        {rows.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[140px_1fr] items-start border-b border-[#e4e2df] pb-4">
            <span className="font-inter text-jm-primary text-sm tracking-[1.4px] uppercase leading-5">{label}</span>
            {label === t('contact.connect_label') ? (
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer"
                  className="font-inter text-jm-primary text-base leading-6 hover:text-jm-accent transition-colors">
                  Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                  className="font-inter text-jm-primary text-base leading-6 hover:text-jm-accent transition-colors">
                  LinkedIn
                </a>
              </div>
            ) : (
              <span className="font-inter text-jm-heading text-base leading-6 whitespace-pre-line">{value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Contact page — hero, enquiry form, studio specs, map, testimonial */
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

    if (error) { setStatus('error'); } else { setStatus('success'); setForm(INITIAL_FORM); }
  }

  return (
    <main className="bg-jm-bg min-h-screen pt-[60px]">
      <SEO
        title="Contact Us — Get a Quote | JM Publicidad"
        description="Contact JM Publicidad for a quote on outdoor signage, vehicle branding, print production, or digital advertising. Studio located in Madrid's Design District."
        path="/contact"
      />

      {/* Hero */}
      <section className="px-6 pt-10 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <h1 className="font-manrope font-extrabold text-jm-primary text-[56px] leading-[56px] tracking-[-1.4px] mb-4">
          {t('contact.title')}
        </h1>
        <p className="font-inter text-jm-body text-base leading-6">
          {t('contact.subheadline')}
        </p>
      </section>

      {/* Form */}
      <section className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl">
        <div className="bg-jm-bg-section rounded-lg px-8 pt-8 pb-12">
          {status === 'success' ? (
            <div className="bg-jm-primary text-white rounded-lg p-10 text-center">
              <p className="font-manrope font-bold text-xl">{t('contact.success')}</p>
            </div>
          ) : (
            <EnquiryForm
              form={form}
              serviceOptions={SERVICE_OPTIONS[lang]}
              budgetOptions={BUDGET_OPTIONS[lang]}
              status={status}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>

      <StudioSpecs />

      {/* Map */}
      <section className="relative h-64 overflow-hidden mb-12">
        <img src={MAP_IMG} alt="JM Publicidad studio location — Design District, Madrid, Spain" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-jm-primary/10 mix-blend-multiply" />
      </section>

      {/* Testimonial */}
      <section className="px-6 pb-20 max-w-lg mx-auto lg:max-w-3xl">
        <div className="bg-[#e4e2df] border-l-4 border-jm-primary rounded-lg pl-9 pr-8 pt-12 pb-8 flex flex-col gap-4">
          <svg className="w-6 h-[18px] text-jm-body" viewBox="0 0 25 18" fill="currentColor" aria-hidden="true">
            <path d="M0 18V10.8C0 7.62 .82 5.02 2.46 3 4.1 .98 6.4 0 9.36 0l.72 1.44C8.28 1.68 7.1 2.36 6.18 3.48 5.26 4.6 4.8 5.88 4.8 7.32h4.56V18H0zm14.4 0V10.8c0-3.18.82-5.78 2.46-7.8C18.5.98 20.8 0 23.76 0l.72 1.44c-1.8.24-2.98.92-3.9 2.04-.92 1.12-1.38 2.4-1.38 3.84h4.56V18H14.4z" />
          </svg>
          <p className="font-manrope font-bold text-jm-heading text-xl leading-[25px]">
            {t('contact.testimonial_quote')}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
              <img src={ELENA_IMG} alt={t('contact.testimonial_name')} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-manrope font-bold text-jm-heading text-base leading-6">{t('contact.testimonial_name')}</p>
              <p className="font-inter text-jm-body text-xs tracking-[1.2px] uppercase leading-4">{t('contact.testimonial_role')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
