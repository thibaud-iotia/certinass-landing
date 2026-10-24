import app from './version.json';

export const VERSION = app.version;

/** Adresse de contact publiée sur le site (mentions légales, pied de page). */
export const CONTACT_EMAIL = 'contact@certinass.fr';

/** Date de la dernière mise à jour des pages légales, au format ISO. */
export const LEGAL_UPDATED = '2026-10-24';

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

// Les installeurs ne sont pas publics : le backend délivre un lien temporaire aux comptes qui ont une clé de licence.
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
