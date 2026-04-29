import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://jm-publicidad-website.pages.dev';
const SITE_NAME = 'JM Publicidad';

interface Props {
  title: string;
  description: string;
  path?: string;
}

/** Drop-in SEO head manager — sets title, description, OG, and canonical per page */
export function SEO({ title, description, path = '' }: Props) {
  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
