// Pré-rendu de la page de présentation (`scripts/prerender.mjs`, après `vite build`) : chaque langue reçoit un HTML
// complet, lisible par les moteurs de recherche et les aperçus de partage sans exécuter le JavaScript.
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { captures } from './captures';
import { setLocale, type Locale } from './i18n';
import { Landing } from './pages/Landing';
import { QUESTIONS } from './sections/Faq';
import { headTags } from './seo';
import { SITE_URL, VERSION } from './site';

export { robots, sitemap } from './seo';

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'", nbsp: ' ' };

/** Texte brut d'un fragment HTML : réponses de la FAQ pour les données structurées. */
export function plainText(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#?\w+);/g, (all, name: string) => ENTITIES[name] ?? all)
    .replace(/\s+/g, ' ')
    .trim();
}

/** Construit avec `--base=/` : les ressources commencent par `/assets/`, le script les rend relatives à chaque page. */
function absolute(asset: string): string {
  return SITE_URL + asset.replace(/^\.?\//, '');
}

export function render(locale: Locale): { head: string; html: string } {
  setLocale(locale);
  // Visiteur anonyme : le parcours de compte ne s'affiche qu'une fois l'application chargée.
  const html = renderToString(<Landing state="anonymous" />);
  const faq = QUESTIONS[locale].map(({ question, answer }) => ({
    question,
    answer: plainText(renderToStaticMarkup(<>{answer}</>)),
  }));
  const head = headTags({ locale, version: VERSION, faq, screenshot: absolute(captures.actionAValider) });
  return { head, html };
}
