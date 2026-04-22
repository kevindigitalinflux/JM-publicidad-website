import { useTranslation } from 'react-i18next';

const features = [
  {
    titleKey: 'precision.feature_1_title',
    bodyKey: 'precision.feature_1_body',
    iconBg: 'bg-jm-accent',
    // TODO: replace with final SVG asset
    icon: '⬡',
  },
  {
    titleKey: 'precision.feature_2_title',
    bodyKey: 'precision.feature_2_body',
    iconBg: 'bg-jm-primary',
    icon: '◈',
  },
] as const;

/** "The Precision Studio" — two-feature value proposition section */
export function PrecisionSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-bg-section px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section heading with divider */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-manrope font-extrabold text-jm-heading text-[30px] tracking-[-0.025em] leading-[36px] whitespace-nowrap">
            {t('precision.title')}
          </h2>
          <div className="flex-1 h-[2px] bg-jm-primary/20 rounded-full" />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((f) => (
            <div key={f.titleKey} className="flex flex-col gap-4">
              <div className={`${f.iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shrink-0`}>
                {f.icon}
              </div>
              <h3 className="font-manrope font-bold text-jm-heading text-xl leading-7">
                {t(f.titleKey)}
              </h3>
              <p className="font-inter font-normal text-jm-body text-base leading-[1.625]">
                {t(f.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
