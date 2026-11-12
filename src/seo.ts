// Balises de tête de chaque page de langue, écrites dans le HTML au pré-rendu (`src/prerender.tsx`) : ce que lisent
// les moteurs de recherche, les aperçus de partage (Open Graph) et les données structurées (schema.org).
import { LOCALE_DIR, LOCALES, DEFAULT_LOCALE, t, type Locale } from './i18n';
import { SITE_URL } from './site';

export interface FaqEntry {
  question: string;
  /** Réponse en texte brut. */
  answer: string;
}

export interface PageInfo {
  locale: Locale;
  version: string;
  faq: FaqEntry[];
  /** Adresse absolue d'une capture de l'application. */
  screenshot: string;
}

const OG_LOCALE: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' };

/** Adresse canonique de la page d'une langue. */
export function pageUrl(locale: Locale): string {
  return SITE_URL + LOCALE_DIR[locale];
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** JSON lisible dans un `<script>` : aucun `</script>` ne peut le refermer. */
function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** Données structurées : le site, l'application (gratuite pendant la bêta) et la FAQ. */
export function structuredData({ locale, version, faq, screenshot }: PageInfo): object {
  const url = pageUrl(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#site`,
        name: 'CertiNass',
        url: SITE_URL,
        inLanguage: LOCALES,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}#app`,
        name: 'CertiNass',
        url,
        description: t('meta.description', undefined, locale),
        applicationCategory: 'UtilitiesApplication',
        applicationSubCategory: t('seo.category', undefined, locale),
        operatingSystem: 'Windows, macOS, Linux',
        softwareVersion: version,
        softwareRequirements: t('seo.requirements', undefined, locale),
        inLanguage: LOCALES,
        image: `${SITE_URL}og-${locale}.png`,
        screenshot,
        featureList: t('seo.features', undefined, locale),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
      },
    ],
  };
}

/** Contenu de `<head>` propre à la page d'une langue. */
export function headTags(page: PageInfo): string {
  const { locale } = page;
  const text = (key: Parameters<typeof t>[0]) => escapeHtml(t(key, undefined, locale));
  const image = `${SITE_URL}og-${locale}.png`;
  const others = LOCALES.filter((other) => other !== locale);
  return [
    `<title>${text('meta.title')}</title>`,
    `<meta name="description" content="${text('meta.description')}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${pageUrl(locale)}" />`,
    ...LOCALES.map((other) => `<link rel="alternate" hreflang="${other}" href="${pageUrl(other)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LOCALE)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="CertiNass" />',
    `<meta property="og:title" content="${text('meta.shareTitle')}" />`,
    `<meta property="og:description" content="${text('meta.description')}" />`,
    `<meta property="og:url" content="${pageUrl(locale)}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${text('meta.shareAlt')}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    ...others.map((other) => `<meta property="og:locale:alternate" content="${OG_LOCALE[other]}" />`),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${text('meta.shareTitle')}" />`,
    `<meta name="twitter:description" content="${text('meta.description')}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${text('meta.shareAlt')}" />`,
    `<script type="application/ld+json">${jsonForScript(structuredData(page))}</script>`,
  ].join('\n    ');
}

/** Plan du site : chaque page de langue, avec ses équivalents dans les autres langues. */
export function sitemap(lastmod: string): string {
  const alternates = [
    ...LOCALES.map((other) => `    <xhtml:link rel="alternate" hreflang="${other}" href="${pageUrl(other)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LOCALE)}" />`,
  ].join('\n');
  const urls = LOCALES.map(
    (locale) => `  <url>\n    <loc>${pageUrl(locale)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`;
}
