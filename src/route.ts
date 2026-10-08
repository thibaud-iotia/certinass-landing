// Parcours d'achat (maquette « CertiNass Achat ») : 1b compte, 1c connexion, 1d paiement, 1e accès.
// Les écrans vivent derrière `#/…` ; tout autre fragment est une ancre de la page de présentation.

export type Route = 'landing' | 'compte' | 'connexion' | 'paiement' | 'confirmation' | 'acces';

/** Visiteur, compte sans licence, compte avec licence active. */
export type AccountState = 'anonymous' | 'unlicensed' | 'licensed';

const FLOW: Route[] = ['compte', 'connexion', 'paiement', 'confirmation', 'acces'];

export function parseRoute(hash: string): Route {
  const name = hash.startsWith('#/') ? hash.slice(2) : '';
  return FLOW.find((route) => route === name) ?? 'landing';
}

export function href(route: Route): string {
  return route === 'landing' ? '#top' : `#/${route}`;
}

/** Écran réellement affiché : chaque étape renvoie vers celle que l'état du compte autorise. */
export function resolveRoute(route: Route, state: AccountState): Route {
  switch (route) {
    case 'landing':
      return 'landing';
    case 'compte':
    case 'connexion':
      if (state === 'anonymous') return route;
      return state === 'licensed' ? 'acces' : 'paiement';
    case 'paiement':
      if (state === 'anonymous') return 'compte';
      return state === 'licensed' ? 'acces' : 'paiement';
    case 'confirmation':
      // Retour du paiement : la licence arrive par webhook, parfois quelques secondes après le visiteur.
      if (state === 'anonymous') return 'connexion';
      return state === 'licensed' ? 'acces' : 'confirmation';
    case 'acces':
      if (state === 'anonymous') return 'connexion';
      return state === 'licensed' ? 'acces' : 'paiement';
  }
}
