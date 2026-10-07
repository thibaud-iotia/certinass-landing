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
  url: string;
}

// Fichier d'une version publiée : le nom suit `artifactName` de desktop/electron-builder.yml.
function asset(file: string): string {
  return `${REPO_URL}/releases/download/v${VERSION}/${file}`;
}

export const DOWNLOADS: Download[] = [
  // Un seul installeur NSIS pour x64 et ARM64 : le nom ne porte pas d'architecture.
  { os: 'windows', name: 'Windows', formats: '.exe · x64 · ARM64', url: asset(`CertiNass-${VERSION}-win.exe`) },
  // Deux .dmg, et le navigateur ne dit pas de façon fiable Intel ou Apple Silicon : le visiteur choisit.
  { os: 'macos', name: 'macOS', formats: '.dmg · Intel · Apple Silicon', url: RELEASES_URL },
  { os: 'linux', name: 'Linux', formats: '.AppImage · .deb · x64', url: asset(`CertiNass-${VERSION}-linux-x86_64.AppImage`) },
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

export function downloadUrl(os: Os): string {
  return DOWNLOADS.find((download) => download.os === os)!.url;
}
