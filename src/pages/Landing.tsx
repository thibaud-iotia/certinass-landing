import { href, type AccountState } from '../route';
import { Assistant } from '../sections/Assistant';
import { Faq } from '../sections/Faq';
import { Everyday, LinkImport, MobileModules, PowerUsers, Sharing } from '../sections/Features';
import { Hero } from '../sections/Hero';
import { Footer, Pricing } from '../sections/Pricing';
import { TurnKey } from '../sections/TurnKey';

// Maquette « CertiNass Achat » : 1a (bureau, 1280 px) et 1g (mobile, 390 px) dans une seule page adaptative.

export function Landing({ state }: { state: AccountState }) {
  // Les boutons d'achat ouvrent le parcours ; un compte déjà titulaire d'une licence retrouve ses téléchargements.
  const buyHref = href(state === 'licensed' ? 'acces' : 'compte');
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
