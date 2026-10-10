import { getLocale, INTL_LOCALE, type Locale } from './i18n';
import app from './version.json';

export const VERSION = app.version;

/** Licence à vie, paiement unique, en euros TTC. */
export const PRICE = 39;

/** Prix affiché, sans centimes : « 39 € » / « €39 ». */
export function priceLabel(locale: Locale = getLocale()): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(PRICE);
}

export function formatAmount(cents: number, currency: string, locale: Locale = getLocale()): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { style: 'currency', currency }).format(cents / 100);
}

export const REPO_URL = 'https://github.com/thibaud-iotia/certinass-releases';
export const ASSISTANT_DOC_URL = `${REPO_URL}/blob/main/docs/features/v0.7.0-assistant-ia.md`;

export type Os = 'windows' | 'macos' | 'linux';

/** Identifiants d'installeur compris par la fonction `download` du backend (`supabase/functions/download`). */
export type InstallerId = 'windows' | 'macos-arm64' | 'macos-x64' | 'linux-appimage' | 'linux-deb';

export interface Installer {
  id: InstallerId;
  /** Absent : un seul installeur pour ce système, le bouton dit « Télécharger ». */
  label?: string;
}

export interface Download {
  os: Os;
  name: string;
  formats: string;
  installers: Installer[];
}

// Les installeurs ne sont plus publics : le backend délivre un lien temporaire aux comptes qui ont une licence.
export const DOWNLOADS: Download[] = [
  // Un seul installeur NSIS pour x64 et ARM64.
  { os: 'windows', name: 'Windows', formats: '.exe · x64 · ARM64', installers: [{ id: 'windows' }] },
  // Deux .dmg, et le navigateur ne dit pas de façon fiable Intel ou Apple Silicon : le visiteur choisit.
  {
    os: 'macos',
    name: 'macOS',
    formats: '.dmg · Intel · Apple Silicon',
    installers: [
      { id: 'macos-arm64', label: 'Apple Silicon' },
      { id: 'macos-x64', label: 'Intel' },
    ],
  },
  {
    os: 'linux',
    name: 'Linux',
    formats: '.AppImage · .deb · x64',
    installers: [
      { id: 'linux-appimage', label: '.AppImage' },
      { id: 'linux-deb', label: '.deb' },
    ],
  },
];

/**
 * Système mis en avant sur la page de téléchargement. Windows par défaut, y compris sur mobile :
 * CertiNass est une application de bureau, Android (« Linux ») et iOS (« Mac OS X ») ne comptent pas.
 */
export function detectOs(userAgent: string): Os {
  if (/Android|iPhone|iPad|iPod/i.test(userAgent)) return 'windows';
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macos';
  if (/Linux|X11|CrOS/i.test(userAgent)) return 'linux';
  return 'windows';
}
