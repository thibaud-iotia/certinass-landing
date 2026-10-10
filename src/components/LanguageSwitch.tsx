import { LOCALES, setLocale, useLocale, useT } from '../i18n';

/** Choix de la langue : chaque langue porte son propre code, lisible quelle que soit la langue affichée. */
export function LanguageSwitch() {
  const t = useT();
  const locale = useLocale();
  return (
    <div className="lang-switch" role="group" aria-label={t('meta.language')}>
      {LOCALES.map((item) => (
        <button key={item} type="button" lang={item} aria-pressed={item === locale} onClick={() => setLocale(item)}>
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
