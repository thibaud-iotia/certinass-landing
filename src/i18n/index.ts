// Traduction du site : `t('domaine.cle', { param })` dans la langue courante, `useT()` dans les composants
// pour qu'ils se redessinent au changement de langue.
import { useSyncExternalStore } from 'react';
import { DEFAULT_LOCALE, format, isLocale, resolveLocale, type Locale, type Params } from './core';
import { access, assistant, faq, features, flow, footer, hero, meta, nav, payment, pricing, signIn, turnKey } from './messages';

export * from './core';

/** Tous les messages, par domaine. */
export const CATALOG = { meta, nav, hero, turnKey, assistant, features, pricing, faq, footer, flow, signIn, payment, access };

type Catalog = typeof CATALOG;
export type MessageKey = { [NS in keyof Catalog]: `${NS & string}.${keyof Catalog[NS]['fr'] & string}` }[keyof Catalog];

// Choix du visiteur, gardé d'une visite à l'autre.
const STORAGE_KEY = 'certinass.langue';
/** `?lang=en` : lien vers le site dans une langue donnée. */
const QUERY_PARAM = 'lang';

function stored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Stockage refusé (navigation privée, réglages du navigateur) : la langue du navigateur décide.
    return null;
  }
}

function remember(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Le choix vaut pour cette visite.
  }
}

function detect(): Locale {
  const asked = new URLSearchParams(window.location.search).get(QUERY_PARAM);
  // Le retour de Google ou GitHub perd `?lang=` : le choix du lien est gardé comme celui du sélecteur.
  if (isLocale(asked)) remember(asked);
  return resolveLocale(isLocale(asked) ? asked : stored(), navigator.languages);
}

const inBrowser = typeof window !== 'undefined';
let current: Locale = inBrowser ? detect() : DEFAULT_LOCALE;
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
  if (inBrowser) remember(locale);
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
