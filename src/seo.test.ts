import { describe, expect, it } from 'vitest';
import { localeFromPath, localeHref } from './i18n';
import { plainText } from './prerender';
import { headTags, pageUrl, sitemap, structuredData, type PageInfo } from './seo';

const page = (locale: PageInfo['locale']): PageInfo => ({
  locale,
  version: '1.2.3',
  faq: [{ question: 'Q <1> ?', answer: 'R & co' }],
  screenshot: 'https://certinass.tcharb.fr/assets/capture.png',
});

describe('pages de langue', () => {
  it('l’adresse décide de la langue, sous un domaine comme sous un sous-dossier', () => {
    expect(localeFromPath('/')).toBe('fr');
    expect(localeFromPath('/index.html')).toBe('fr');
    expect(localeFromPath('/en/')).toBe('en');
    expect(localeFromPath('/en')).toBe('en');
    expect(localeFromPath('/en/index.html')).toBe('en');
    expect(localeFromPath('/certinass-landing/en/')).toBe('en');
    expect(localeFromPath('/certinass-landing/')).toBe('fr');
    expect(localeFromPath('/enfin/')).toBe('fr');
  });

  it('liens relatifs entre les pages de langue', () => {
    expect(localeHref('fr', 'fr')).toBe('./');
    expect(localeHref('en', 'fr')).toBe('./en/');
    expect(localeHref('fr', 'en')).toBe('../');
    expect(localeHref('en', 'en')).toBe('../en/');
  });
});

describe('balises de tête', () => {
  it('canonique, équivalents par langue et x-default', () => {
    const head = headTags(page('en'));
    expect(head).toContain('<link rel="canonical" href="https://certinass.tcharb.fr/en/" />');
    expect(head).toContain('hreflang="fr" href="https://certinass.tcharb.fr/"');
    expect(head).toContain('hreflang="en" href="https://certinass.tcharb.fr/en/"');
    expect(head).toContain('hreflang="x-default" href="https://certinass.tcharb.fr/"');
    expect(head).toContain('<meta property="og:image" content="https://certinass.tcharb.fr/og-en.png" />');
    expect(head).toContain('<meta property="og:locale" content="en_US" />');
    expect(head).toContain('<title>CertiNass — Synology NAS manager');
  });

  it('données structurées lisibles, aucun `<` qui refermerait le script', () => {
    const head = headTags(page('fr'));
    const json = head.match(/<script type="application\/ld\+json">(.*)<\/script>/)![1];
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual(structuredData(page('fr')));
    const graph = (structuredData(page('fr')) as { '@graph': { '@type': string }[] })['@graph'];
    expect(graph.map((node) => node['@type'])).toEqual(['WebSite', 'SoftwareApplication', 'FAQPage']);
  });

  it('plan du site : une entrée par langue, avec ses équivalents', () => {
    const xml = sitemap('2026-11-12');
    expect(xml.match(/<loc>/g)).toHaveLength(2);
    expect(xml).toContain(`<loc>${pageUrl('en')}</loc>`);
    expect(xml).toContain('<lastmod>2026-11-12</lastmod>');
  });

  it('texte brut des réponses de la FAQ', () => {
    expect(plainText('<p>Un <b>NAS</b> &amp; l&#x27;IA</p><p>Suite</p>')).toBe("Un NAS & l'IA Suite");
  });
});
