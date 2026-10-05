import app from './version.json';

export const VERSION = app.version;

// Dépôt public des installeurs : le dépôt du code est privé, ses liens renvoient une 404 aux visiteurs.
export const REPO_URL = 'https://github.com/thibaud-iotia/certinass-releases';
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const ASSISTANT_DOC_URL = `${REPO_URL}/blob/main/docs/features/v0.7.0-assistant-ia.md`;

export type Os = 'windows' | 'macos' | 'linux';

export interface Download {
  os: Os;
  name: string;
  formats: string;
}

export const DOWNLOADS: Download[] = [
  { os: 'windows', name: 'Windows', formats: '.exe · x64 · ARM64' },
  { os: 'macos', name: 'macOS', formats: '.dmg · Intel · Apple Silicon' },
  { os: 'linux', name: 'Linux', formats: '.AppImage · .deb · x64' },
];

/**
 * Système proposé par le bouton principal. Windows par défaut, y compris sur mobile :
 * CertiNass est une application de bureau, Android (« Linux ») et iOS (« Mac OS X ») ne comptent pas.
 */
export function detectOs(userAgent: string): Os {
  if (/Android|iPhone|iPad|iPod/i.test(userAgent)) return 'windows';
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macos';
  if (/Linux|X11|CrOS/i.test(userAgent)) return 'linux';
  return 'windows';
}

export function osName(os: Os): string {
  return DOWNLOADS.find((download) => download.os === os)!.name;
}
