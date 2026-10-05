# CertiNass — page de présentation

Page de présentation et de téléchargement de CertiNass, le gestionnaire de NAS Synology pour Windows, macOS et Linux.
React 19 · TypeScript · Vite.

```bash
npm install
npm run dev      # http://127.0.0.1:5174
npm test
npm run build    # produit dist/
```

Un push sur `main` publie `dist/` sur GitHub Pages (`.github/workflows/pages.yml`).

## Version et captures

La version affichée (`src/version.json`) et les captures d'écran (`src/assets/captures/`) viennent de l'application.
Ce dépôt est le sous-module `landing/` du dépôt de l'application ; depuis celui-ci, `npm run sync:app` les met à jour.
