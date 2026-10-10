import { href, type AccountState } from '../route';
import { Assistant } from '../sections/Assistant';
import { Faq } from '../sections/Faq';
import { Everyday, LinkImport, MobileModules, PowerUsers, Sharing } from '../sections/Features';
import { Hero } from '../sections/Hero';
import { Footer, Pricing } from '../sections/Pricing';
import { TurnKey } from '../sections/TurnKey';

// Maquette « CertiNass Achat » : 1a (bureau, 1280 px) et 1g (mobile, 390 px) dans une seule page adaptative.
// Bêta gratuite : le prix et le paiement de la maquette n'y figurent pas.

export function Landing({ state }: { state: AccountState }) {
  // Les boutons « Obtenir » ouvrent le parcours ; un compte connecté retrouve sa clé et ses téléchargements.
  const buyHref = href(state === 'anonymous' ? 'compte' : 'acces');
  return (
    <>
      <Hero buyHref={buyHref} signedIn={state !== 'anonymous'} />
      <main>
        <TurnKey />
        <Assistant />
        <LinkImport />
        <Sharing />
        <PowerUsers />
        <MobileModules />
        <Everyday />
        <Pricing buyHref={buyHref} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
