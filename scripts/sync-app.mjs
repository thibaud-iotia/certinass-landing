// Reprend la version et les captures de l'application. À lancer quand ce dépôt est le sous-module `landing/`
// du dépôt CertiNass : `npm run sync:app`, puis valider les fichiers modifiés.
import { copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(root, '../desktop');
const snapshots = resolve(desktop, 'e2e/ecrans.visual.ts-snapshots');
const captures = resolve(root, 'src/assets/captures');

if (!existsSync(snapshots)) {
  console.error(`Application introuvable : ${desktop}`);
  process.exit(1);
}

const { version } = JSON.parse(readFileSync(resolve(desktop, 'package.json'), 'utf8'));
writeFileSync(resolve(root, 'src/version.json'), `${JSON.stringify({ version }, null, 2)}\n`);

// Seules les captures déjà utilisées par la page sont mises à jour.
const files = readdirSync(captures).filter((file) => file.endsWith('.png'));
for (const file of files) copyFileSync(resolve(snapshots, file), resolve(captures, file));

console.log(`Version ${version} · ${files.length} captures`);
