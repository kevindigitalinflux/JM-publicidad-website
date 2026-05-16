import { useTranslation } from 'react-i18next';
import precisionPrint  from '../../assets/sections/precision-print.jpg';
import precisionFinish from '../../assets/sections/precision-finish.jpg';

const features = [
  {
    titleKey: 'precision.feature_1_title',
    bodyKey:  'precision.feature_1_body',
    iconBg:   'bg-jm-accent',
    icon:     '⬡',
    image:    precisionPrint,
    imageAlt: 'Maquinaria de impresión gran formato en el estudio de JM Publicidad',
  },
  {
    titleKey: 'precision.feature_2_title',
    bodyKey:  'precision.feature_2_body',
    iconBg:   'bg-jm-primary',
    icon:     '◈',
    image:    precisionFinish,
    imageAlt: 'Roll ups terminados con acabado profesional producidos por JM Publicidad',
  },
] as const;

/** "Producción que se nota" — two-feature value proposition with reference images */
export function PrecisionSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-jm-bg-section px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
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
              {/* Reference photo */}
              <div className="mt-2 rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
