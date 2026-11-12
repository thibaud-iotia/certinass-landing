import type { MouseEvent } from 'react';
import { LOCALES, localeHref, rememberLocale, useLocale, useT, type Locale } from '../i18n';

/**
 * Choix de la langue : un lien vers la page de chaque langue (`/`, `/en/`), que les moteurs de recherche suivent.
 * Chaque langue porte son propre code, lisible quelle que soit la langue affichée.
 */
export function LanguageSwitch() {
  const t = useT();
  const locale = useLocale();

  const go = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    event.preventDefault();
    if (target === locale) return;
    rememberLocale(target);
    // L'écran du parcours (`#/acces`…) ou la section affichée suit le visiteur dans l'autre langue.
    window.location.assign(event.currentTarget.href.split('#')[0] + window.location.hash);
  };

  return (
    <div className="lang-switch" role="group" aria-label={t('meta.language')}>
      {LOCALES.map((item) => (
        <a
          key={item}
          href={localeHref(item, locale)}
          hrefLang={item}
          lang={item}
          aria-current={item === locale ? 'page' : undefined}
          onClick={(event) => go(event, item)}
        >
          {item.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
