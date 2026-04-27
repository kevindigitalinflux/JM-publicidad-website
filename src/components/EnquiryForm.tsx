import { useTranslation } from 'react-i18next';

const INPUT_CLASS = 'w-full rounded-xl border border-[#d6d3ce] bg-white px-4 py-3 text-[#1b1c1a] placeholder-[#9e9c98] font-inter focus:outline-none focus:ring-2 focus:ring-[#536049]';
const LABEL_CLASS = 'block text-sm font-medium text-[#1b1c1a] mb-1 font-inter';

interface Props {
  form: { name: string; email: string; company: string; service: string; message: string; budget_range: string };
  serviceOptions: string[];
  budgetOptions: string[];
  status: 'idle' | 'loading' | 'success' | 'error';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** Enquiry form fields — rendered inside ContactPage, driven by parent state */
export function EnquiryForm({ form, serviceOptions, budgetOptions, status, onChange, onSubmit }: Props) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className={LABEL_CLASS}>{t('contact.name')} <span className="text-[#536049]">*</span></label>
        <input type="text" name="name" required maxLength={100} value={form.name} onChange={onChange} className={INPUT_CLASS} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.email')} <span className="text-[#536049]">*</span></label>
        <input type="email" name="email" required maxLength={254} value={form.email} onChange={onChange} className={INPUT_CLASS} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.company')}</label>
        <input type="text" name="company" maxLength={100} value={form.company} onChange={onChange} className={INPUT_CLASS} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.service')}</label>
        <select name="service" value={form.service} onChange={onChange} className={INPUT_CLASS}>
          <option value="">—</option>
          {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.message')} <span className="text-[#536049]">*</span></label>
        <textarea name="message" required rows={5} maxLength={2000} value={form.message} onChange={onChange}
          className={`${INPUT_CLASS} resize-none`} />
      </div>

      <div>
        <label className={LABEL_CLASS}>{t('contact.budget')}</label>
        <select name="budget_range" value={form.budget_range} onChange={onChange} className={INPUT_CLASS}>
          <option value="">—</option>
          {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm font-inter">{t('contact.error')}</p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-[#536049] hover:bg-[#6c7960] disabled:opacity-60 text-white font-inter font-semibold rounded-xl px-6 py-4 transition-colors duration-200">
        {status === 'loading' ? '…' : t('contact.submit')}
      </button>
    </form>
  );
}
