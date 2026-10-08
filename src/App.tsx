import { useEffect, useSyncExternalStore } from 'react';
import { consumeResume } from './account';
import { Access } from './pages/Access';
import { Landing } from './pages/Landing';
import { Confirmation, Payment } from './pages/Payment';
import { SignIn } from './pages/SignIn';
import { href, parseRoute, resolveRoute } from './route';
import { useAccount } from './useAccount';

function subscribeToHash(notify: () => void) {
  window.addEventListener('hashchange', notify);
  return () => window.removeEventListener('hashchange', notify);
}

export function App() {
  const account = useAccount();
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash);
  const requested = parseRoute(hash);
  const route = account.loading ? requested : resolveRoute(requested, account.state);

  // Retour de Google ou GitHub : le parcours reprend là où l'état du compte le mène.
  useEffect(() => {
    if (account.loading || account.state === 'anonymous') return;
    if (consumeResume()) window.location.replace(href('paiement'));
  }, [account.loading, account.state]);

  useEffect(() => {
    if (route !== requested) window.location.replace(href(route));
  }, [route, requested]);

  // Chaque écran du parcours repart du haut ; les ancres de la page de présentation gardent leur défilement.
  useEffect(() => {
    if (route !== 'landing') window.scrollTo(0, 0);
  }, [route]);

  if (route === 'landing') return <Landing state={account.state} />;
  if (account.loading) return <div className="flow-wait theme-dark" role="status" aria-label="Chargement" />;
  switch (route) {
    case 'compte':
    case 'connexion':
      return <SignIn mode={route} />;
    case 'paiement':
      return <Payment account={account} />;
    case 'confirmation':
      return <Confirmation account={account} />;
    case 'acces':
      return <Access account={account} />;
  }
}
