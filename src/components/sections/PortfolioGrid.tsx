import { useTranslation } from 'react-i18next';

/**
 * Figma MCP asset URLs — temporary (7 days). Replace with hosted client photos
 * from the Google Drive albums linked in CLAUDE.md.
 */
const IMG_PROJECT_1 = 'https://www.figma.com/api/mcp/asset/d25b0b2a-937f-4f63-b635-b088ebdfd2ba';
const IMG_PROJECT_2 = 'https://www.figma.com/api/mcp/asset/e4c89ed9-49ac-4cf0-a41a-387cacf7965f';
const IMG_PROJECT_3 = 'https://www.figma.com/api/mcp/asset/e294558b-fb0a-4047-ad53-b7c7d056c5f3';
const IMG_PROJECT_4 = 'https://www.figma.com/api/mcp/asset/87d3c280-a84b-4086-882b-99678a15874a';

interface ProjectCardProps {
  img: string;
  category?: string;
  title: string;
  client: string;
  imageHeight?: string;
}

function ProjectCard({ img, category, title, client, imageHeight = 'h-48' }: ProjectCardProps) {
  return (
    <div className="bg-jm-bg-section rounded-lg overflow-hidden flex flex-col">
      <div className={`relative ${imageHeight} shrink-0 overflow-hidden`}>
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col gap-1">
        {category && (
          <span className="font-inter font-semibold text-jm-primary text-[12px] tracking-[1.2px] uppercase leading-4">
            {category}
          </span>
        )}
        <h3 className="font-manrope font-bold text-jm-heading text-2xl leading-8 pt-1">{title}</h3>
        <p className="font-inter text-jm-body text-sm leading-5">{client}</p>
      </div>
    </div>
  );
}

/** Asymmetric portfolio grid — large featured + two-column + full-width */
export function PortfolioGrid() {
  const { t } = useTranslation();

  return (
    <section className="px-6 pb-12 max-w-lg mx-auto lg:max-w-3xl flex flex-col gap-8">

      {/* Project 1 — large featured */}
      <ProjectCard
        img={IMG_PROJECT_1}
        category={t('portfolio.project_1_category')}
        title={t('portfolio.project_1_title')}
        client={t('portfolio.project_1_client')}
        imageHeight="h-[427px]"
      />

      {/* Projects 2 & 3 — two column */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-jm-bg-section rounded-lg overflow-hidden flex flex-col">
          <div className="relative h-40 overflow-hidden shrink-0">
            <img src={IMG_PROJECT_2} alt={t('portfolio.project_2_title')} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-4 flex flex-col gap-1">
            <p className="font-manrope font-bold text-jm-heading text-sm leading-5">{t('portfolio.project_2_title')}</p>
            <p className="font-inter text-jm-body text-xs leading-4">{t('portfolio.project_2_client')}</p>
          </div>
        </div>
        <div className="bg-jm-bg-section rounded-lg overflow-hidden flex flex-col">
          <div className="relative h-40 overflow-hidden shrink-0">
            <img src={IMG_PROJECT_3} alt={t('portfolio.project_3_title')} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-4 flex flex-col gap-1">
            <p className="font-manrope font-bold text-jm-heading text-sm leading-5">{t('portfolio.project_3_title')}</p>
            <p className="font-inter text-jm-body text-xs leading-4">{t('portfolio.project_3_client')}</p>
          </div>
        </div>
      </div>

      {/* Project 4 — full-width landscape */}
      <ProjectCard
        img={IMG_PROJECT_4}
        category={t('portfolio.project_4_category')}
        title={t('portfolio.project_4_title')}
        client={t('portfolio.project_4_client')}
        imageHeight="h-48"
      />
    </section>
  );
}
