import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://jm-publicidad-website.pages.dev';
const SITE_NAME = 'JM Publicidad';

interface Props {
  title: string;
  description: string;
  path?: string;
}

/** Drop-in SEO head manager — sets title, description, OG, canonical, and locale per page */
export function SEO({ title, description, path = '' }: Props) {
  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_EC" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
