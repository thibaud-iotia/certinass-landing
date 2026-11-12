// Traduction du site : `t('domaine.cle', { param })` dans la langue courante, `useT()` dans les composants
// pour qu'ils se redessinent au changement de langue.
import { useSyncExternalStore } from 'react';
import { DEFAULT_LOCALE, format, isLocale, localeFromPath, localeHref, type Locale, type Params } from './core';
import { access, assistant, consent, faq, features, flow, footer, hero, legal, meta, nav, pricing, seo, signIn, turnKey } from './messages';

export * from './core';

/** Tous les messages, par domaine. */
export const CATALOG = { meta, seo, nav, hero, turnKey, assistant, features, pricing, faq, footer, legal, flow, signIn, access, consent };

type Catalog = typeof CATALOG;
export type MessageKey = { [NS in keyof Catalog]: `${NS & string}.${keyof Catalog[NS]['fr'] & string}` }[keyof Catalog];

// Choix du visiteur, gardé d'une visite à l'autre.
const STORAGE_KEY = 'certinass.langue';
/** `?lang=en` : ancien lien vers le site dans une langue donnée, redirigé vers la page de cette langue. */
const QUERY_PARAM = 'lang';

function stored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Stockage refusé (navigation privée, réglages du navigateur) : l'adresse décide.
    return null;
  }
}

/** Garde le choix du visiteur : sa prochaine visite sur l'autre page de langue l'y ramène. */
export function rememberLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Le choix vaut pour cette visite.
  }
}

const inBrowser = typeof window !== 'undefined';
// Chaque langue a sa page (`/` et `/en/`), que les moteurs de recherche indexent séparément : l'adresse fait foi.
let current: Locale = inBrowser ? localeFromPath(window.location.pathname) : DEFAULT_LOCALE;

/**
 * Envoie le visiteur sur la page de la langue demandée par `?lang=` ou choisie lors d'une visite précédente.
 * Jamais d'après la langue du navigateur : le robot de Google, en anglais, ne verrait plus la page française.
 * Renvoie vrai si la page change : inutile de l'afficher.
 */
export function redirectToChosenLocale(): boolean {
  if (!inBrowser) return false;
  const url = new URL(window.location.href);
  const asked = url.searchParams.get(QUERY_PARAM);
  if (isLocale(asked)) rememberLocale(asked);
  url.searchParams.delete(QUERY_PARAM);
  const wanted = isLocale(asked) ? asked : stored();
  if (isLocale(wanted) && wanted !== current) {
    window.location.replace(new URL(localeHref(wanted, current), url).href + url.search + url.hash);
    return true;
  }
  if (asked !== null) window.history.replaceState(null, '', url.href);
  return false;
}

const listeners = new Set<() => void>();

export function getLocale(): Locale {
  return current;
}

function lookup(key: string, locale: Locale): string | undefined {
  const dot = key.indexOf('.');
  const domain = CATALOG[key.slice(0, dot) as keyof Catalog] as Record<Locale, Record<string, string>> | undefined;
  const id = key.slice(dot + 1);
  return domain?.[locale][id] ?? domain?.[DEFAULT_LOCALE][id];
}

/** Texte traduit ; clé inconnue (ne compile pas, sauf clé calculée) : la clé elle-même, bien visible. */
export function t(key: MessageKey, params?: Params, locale: Locale = current): string {
  const message = lookup(key, locale);
  return message === undefined ? key : format(message, params);
}

/** Langue, titre et description du document : ce que lisent l'onglet, les lecteurs d'écran et les moteurs de recherche. */
export function syncDocument(): void {
  if (!inBrowser) return;
  document.documentElement.lang = current;
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
}

export function setLocale(locale: Locale): void {
  if (locale === current) return;
  current = locale;
  syncDocument();
  for (const notify of listeners) notify();
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, getLocale);
}

/** `t` de la langue courante ; le composant se redessine quand elle change. */
export function useT(): (key: MessageKey, params?: Params) => string {
  const locale = useLocale();
  return (key, params) => t(key, params, locale);
}
