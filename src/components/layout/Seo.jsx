import { Helmet } from 'react-helmet-async';
import { site } from '../../data/site';
import { seoByPath, SITE_DEFAULT_DESCRIPTION } from '../../data/seoRoutes';
import { useLang } from '../../i18n/LangContext';

const DEFAULT_TITLE = 'Nuvō Business Solutions — Websites, Systems & AI Automation | Pune';

// `title` is the page-specific part; falls back to the route's entry in seoRoutes.js.
// Pass `noindex` for pages that should stay out of search results (e.g. 404).
export default function Seo({ title, description, path = '/', noindex = false }) {
  const { t, lang } = useLang();
  const route = seoByPath[path];
  const rawTitle = route?.title || (title ? `${title} | Nuvō Business Solutions` : DEFAULT_TITLE);
  const full = t(rawTitle);
  const desc = t(route?.description || description || SITE_DEFAULT_DESCRIPTION);
  const url = path === '/' ? site.url + '/' : site.url + path;
  const image = `${site.url}/og-image.jpg`;
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
