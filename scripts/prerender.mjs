// Après `vite build` et la construction serveur de `src/prerender.tsx` (dans `dist-ssr/`) : écrit la page française
// (`dist/index.html`), la page anglaise (`dist/en/index.html`), `robots.txt` et `sitemap.xml`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = `${root}dist/`;
const ssrDir = `${root}dist-ssr/`;

const ssr = await import(pathToFileURL(`${ssrDir}prerender.js`).href);
const template = await readFile(`${dist}index.html`, 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html : repères <!--app-head--> ou <!--app-html--> introuvables.');
}

/** Dossier de chaque page sous `dist/` et chemin de cette page vers la racine du site (ressources relatives). */
const PAGES = [
  { locale: 'fr', dir: '', up: './' },
  { locale: 'en', dir: 'en/', up: '../' },
];

for (const { locale, dir, up } of PAGES) {
  const { head, html } = ssr.render(locale);
  // `base: './'` : le HTML de Vite pointe vers `./assets/…`, à corriger pour une page dans un sous-dossier.
  const page = template
    .replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
    .replace(/(src|href)="\.\//g, `$1="${up}`)
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html.replaceAll('"/assets/', `"${up}assets/`));
  await mkdir(`${dist}${dir}`, { recursive: true });
  await writeFile(`${dist}${dir}index.html`, page);
  console.log(`Pré-rendu : dist/${dir}index.html (${locale})`);
}

await writeFile(`${dist}robots.txt`, ssr.robots());
await writeFile(`${dist}sitemap.xml`, ssr.sitemap(new Date().toISOString().slice(0, 10)));
await rm(ssrDir, { recursive: true, force: true });
console.log('Pré-rendu : robots.txt, sitemap.xml');
