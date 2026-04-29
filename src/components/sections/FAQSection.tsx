import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

/** Expandable FAQ accordion for Services page — feeds Google People Also Ask */
export function FAQSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="px-6 pb-16 max-w-lg mx-auto lg:max-w-3xl">
      <h2 className="font-manrope font-extrabold text-jm-heading text-[28px] leading-[34px] tracking-[-0.7px] mb-8">
        {t('services_page.faq.title')}
      </h2>
      <dl className="flex flex-col divide-y divide-[#e4e2df]">
        {FAQ_KEYS.map((key) => {
          const q = t(`services_page.faq.${key}`);
          const a = t(`services_page.faq.a${key.slice(1)}`);
          const isOpen = open === key;
          return (
            <div key={key}>
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-manrope font-bold text-jm-heading text-base leading-6">{q}</span>
                  <svg
                    className={`w-4 h-4 text-jm-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  >
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </dt>
              {isOpen && (
                <dd className="pb-5">
                  <p className="font-inter text-jm-body text-sm leading-[1.625]">{a}</p>
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
