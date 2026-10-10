// Noyau de la traduction du site, calqué sur celui de l'application (`desktop/src/shared/i18n/core.ts`).

export type Locale = 'fr' | 'en';

export const LOCALES: readonly Locale[] = ['fr', 'en'];
/** Langue de repli : le site d'origine est en français. */
export const DEFAULT_LOCALE: Locale = 'fr';
/** Langue d'un navigateur qui n'est ni en français ni en anglais. */
export const FOREIGN_LOCALE: Locale = 'en';

/** Balise BCP 47 pour `Intl`. */
export const INTL_LOCALE: Record<Locale, string> = { fr: 'fr-FR', en: 'en-US' };

export type Params = Record<string, string | number>;

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/**
 * Langue affichée : celle choisie, sinon la première langue du navigateur prise en charge (« fr-CA » → fr,
 * « en-GB » → en), sinon l'anglais (navigateur en allemand, japonais…). Liste vide : français.
 */
export function resolveLocale(preference: string | null | undefined, languages: readonly string[]): Locale {
  if (isLocale(preference)) return preference;
  for (const tag of languages) {
    const base = tag.toLowerCase().split(/[-_]/)[0];
    if (isLocale(base)) return base;
  }
  return languages.length ? FOREIGN_LOCALE : DEFAULT_LOCALE;
}

/** Remplace `{nom}` par les paramètres. Paramètre absent : le repère reste visible. */
export function format(message: string, params?: Params): string {
  if (!params) return message;
  return message.replace(/\{(\w+)\}/g, (all, name: string) => {
    const value = params[name];
    return value === undefined ? all : String(value);
  });
}

/** Repères `{nom}` d'un message : les deux langues doivent avoir les mêmes. */
export function placeholders(message: string): string[] {
  return [...new Set([...message.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))].sort();
}

/**
 * Déclare les messages d'un domaine dans les deux langues : les clés anglaises sont vérifiées par TypeScript
 * (clé manquante ou en trop = erreur de compilation), les repères `{nom}` par les tests.
 */
export function defineMessages<F extends Record<string, string>>(fr: F, en: { [K in keyof F]: string }): Record<Locale, Record<keyof F, string>> {
  return { fr, en };
}
