# CertiNass — page de présentation

Page de présentation de CertiNass, le gestionnaire de NAS Synology pour Windows, macOS et Linux, et accès à sa bêta
gratuite.
React 19 · TypeScript · Vite.

```bash
npm install
npm run dev      # http://127.0.0.1:5174
npm test
npm run build    # produit dist/
```

Un push sur `main` publie `dist/` sur GitHub Pages (`.github/workflows/pages.yml`).

## Bêta

Le téléchargement demande un compte : `#/compte` ou `#/connexion` (Google, GitHub), puis `#/acces` (clé de licence et
installeurs). Chaque compte reçoit une clé bêta gratuite à sa première connexion ; aucun paiement. Comptes, clés et
liens de téléchargement viennent du backend Supabase, dossier `supabase/` du dépôt de l'application, où se règle aussi
la fin de la bêta. Sans `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (`.env.example`), la page s'affiche mais les
comptes sont indisponibles.

Le parcours d'achat (paiement Lemon Squeezy) est conservé sur la branche `archive/paiement-lemonsqueezy`.

## Langues

Le site est en français et en anglais (`src/i18n/`, calqué sur l'application). La langue suit le navigateur, puis le
choix du visiteur (sélecteur FR / EN, gardé dans le navigateur) ; `?lang=en` ou `?lang=fr` l'impose depuis un lien.
Les textes sont dans `src/i18n/messages.ts`, les réponses de la FAQ dans `src/sections/Faq.tsx`. Les captures d'écran
restent celles de l'application en français.

## Version et captures

La version affichée (`src/version.json`) et les captures d'écran (`src/assets/captures/`) viennent de l'application.
Ce dépôt est le sous-module `landing/` du dépôt de l'application ; depuis celui-ci, `npm run sync:app` les met à jour.
