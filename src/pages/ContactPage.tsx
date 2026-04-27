import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { EnquiryForm } from '../components/EnquiryForm';

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

/** Contact page — holds enquiry form state and Supabase submit logic */
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
    <main className="min-h-screen bg-[#fbf9f5] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-manrope text-4xl font-extrabold text-[#1b1c1a] mb-3 text-center">
          {t('contact.title')}
        </h1>
        <p className="text-[#454840] text-center mb-12 font-inter">
          {t('contact.subheadline', 'We usually respond within one business day.')}
        </p>

        {status === 'success' ? (
          <div className="bg-[#536049] text-white rounded-2xl p-10 text-center">
            <p className="font-manrope text-xl font-bold">{t('contact.success')}</p>
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
    </main>
  );
}
