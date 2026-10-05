import { Assistant } from './sections/Assistant';
import { Download, Footer } from './sections/Download';
import { Everyday, LinkImport, MobileModules, PowerUsers, Sharing } from './sections/Features';
import { Hero } from './sections/Hero';
import { TurnKey } from './sections/TurnKey';
import { detectOs } from './site';

// Maquette « CertiNass Landing » : 1a (bureau, 1280 px) et 1b (mobile, 390 px) dans une seule page adaptative.

export function App() {
  const os = detectOs(navigator.userAgent);
  return (
    <>
      <Hero os={os} />
      <main>
        <TurnKey />
        <Assistant />
        <LinkImport />
        <Sharing />
        <PowerUsers />
        <MobileModules />
        <Everyday />
        <Download os={os} />
      </main>
      <Footer />
    </>
  );
}
