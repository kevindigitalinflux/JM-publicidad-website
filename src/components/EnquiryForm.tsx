import { useTranslation } from 'react-i18next';

/** Bottom-bordered input matching Figma design */
const INPUT_CLASS =
  'w-full bg-jm-bg-card border-b-2 border-[#c5c8bd] px-0 pt-3 pb-4 text-jm-heading font-inter text-base placeholder-[#c5c8bd] focus:outline-none focus:border-jm-primary transition-colors';
const LABEL_CLASS =
  'block font-inter text-jm-primary text-[12px] tracking-[1.2px] uppercase leading-4 mb-1';

interface Props {
  form: { name: string; email: string; company: string; service: string; message: string; budget_range: string };
  serviceOptions: string[];
  budgetOptions: string[];
  status: 'idle' | 'loading' | 'success' | 'error';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** Enquiry form — Figma-styled bottom-bordered inputs, driven by ContactPage state */
export function EnquiryForm({ form, serviceOptions, budgetOptions, status, onChange, onSubmit }: Props) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div>
        <label className={LABEL_CLASS}>{t('contact.name')}</label>
        <input type="text" name="name" required maxLength={100} value={form.name} onChange={onChange}
          placeholder="Your Name" className={INPUT_CLASS} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.email')}</label>
        <input type="email" name="email" required maxLength={254} value={form.email} onChange={onChange}
          placeholder="hello@studio.com" className={INPUT_CLASS} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.service')}</label>
        <div className="relative">
          <select name="service" value={form.service} onChange={onChange}
            className={`${INPUT_CLASS} appearance-none pr-8 cursor-pointer`}>
            <option value="">Architectural Signage</option>
            {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-jm-body pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.message')}</label>
        <textarea name="message" required rows={4} maxLength={2000} value={form.message} onChange={onChange}
          placeholder="Tell us about your project requirements..."
          className={`${INPUT_CLASS} resize-none`} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.budget')}</label>
        <select name="budget_range" value={form.budget_range} onChange={onChange}
          className={`${INPUT_CLASS} appearance-none cursor-pointer`}>
          <option value="">—</option>
          {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {status === 'error' && (
        <p className="font-inter text-red-600 text-sm">{t('contact.error')}</p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-jm-primary hover:bg-jm-accent disabled:opacity-60 text-white font-manrope font-bold text-base py-5 rounded transition-colors">
        {status === 'loading' ? '…' : t('contact.submit')}
      </button>
    </form>
  );
}
