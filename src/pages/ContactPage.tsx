import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget_range: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  budget_range: '',
};

const SERVICE_OPTIONS_EN = [
  'Outdoor Signage',
  'Vehicle Branding',
  'Digital Advertising',
  'Promotional Merch',
  'Printed Media',
  'Other',
];

const SERVICE_OPTIONS_ES = [
  'Señalización Exterior',
  'Rotulación de Vehículos',
  'Publicidad Digital',
  'Merchandising Promocional',
  'Medios Impresos',
  'Otro',
];

const BUDGET_OPTIONS_EN = [
  'Under €500',
  '€500 – €2,000',
  '€2,000 – €5,000',
  '€5,000 – €10,000',
  'Over €10,000',
];

const BUDGET_OPTIONS_ES = [
  'Menos de €500',
  '€500 – €2.000',
  '€2.000 – €5.000',
  '€5.000 – €10.000',
  'Más de €10.000',
];

/** Contact page with enquiry form wired to Supabase enquiries table */
export function ContactPage() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isES = i18n.language.startsWith('es');
  const serviceOptions = isES ? SERVICE_OPTIONS_ES : SERVICE_OPTIONS_EN;
  const budgetOptions = isES ? BUDGET_OPTIONS_ES : BUDGET_OPTIONS_EN;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('enquiries').insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      service: form.service || null,
      message: form.message,
      budget_range: form.budget_range || null,
      locale: i18n.language.startsWith('es') ? 'es' : 'en',
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm(INITIAL_FORM);
    }
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.name')} <span className="text-[#536049]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] placeholder-[#9e9c98] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.email')} <span className="text-[#536049]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] placeholder-[#9e9c98] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.company')}
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] placeholder-[#9e9c98] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.service')}
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]"
              >
                <option value="">—</option>
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.message')} <span className="text-[#536049]">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] placeholder-[#9e9c98] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049] resize-none"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-1 font-inter">
                {t('contact.budget')}
              </label>
              <select
                name="budget_range"
                value={form.budget_range}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]"
              >
                <option value="">—</option>
                {budgetOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm font-inter">{t('contact.error')}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#536049] hover:bg-[#6c7960] disabled:opacity-60 text-white font-inter font-semibold rounded-xl px-6 py-4 transition-colors duration-200"
            >
              {status === 'loading' ? '…' : t('contact.submit')}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
