// Parcours de la bêta (maquette « CertiNass Achat », sans son étape de paiement) : 1b compte, 1c connexion, 1e accès.
// Les écrans vivent derrière `#/…` ; tout autre fragment est une ancre de la page de présentation.

export type Route = 'landing' | 'compte' | 'connexion' | 'acces';

/** Visiteur ; compte sans clé utilisable (bêta terminée) ; compte dont la clé ouvre l'application. */
export type AccountState = 'anonymous' | 'unlicensed' | 'licensed';

const FLOW: Route[] = ['compte', 'connexion', 'acces'];

export function parseRoute(hash: string): Route {
  const name = hash.startsWith('#/') ? hash.slice(2) : '';
  return FLOW.find((route) => route === name) ?? 'landing';
}

export function href(route: Route): string {
  return route === 'landing' ? '#top' : `#/${route}`;
}

/** Écran réellement affiché : un compte connecté va droit à son accès, un visiteur passe par la connexion. */
export function resolveRoute(route: Route, state: AccountState): Route {
  switch (route) {
    case 'landing':
      return 'landing';
    case 'compte':
    case 'connexion':
      return state === 'anonymous' ? route : 'acces';
    case 'acces':
      return state === 'anonymous' ? 'connexion' : 'acces';
  }
}
