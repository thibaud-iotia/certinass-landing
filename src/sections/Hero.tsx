import { useState } from 'react';
import { captures } from '../captures';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { href } from '../route';
import { PRICE_LABEL, VERSION } from '../site';

const LINKS = [
  { href: '#assistant', label: 'Assistant IA' },
  { href: '#cle-en-main', label: 'Clé en main' },
  { href: '#import', label: 'Import', only: 'desktop' },
  { href: '#partages', label: 'Partages', only: 'desktop' },
  // Mobile : import et partages sont regroupés dans une seule section.
  { href: '#modules', label: 'Modules', only: 'mobile' },
  { href: '#tarif', label: 'Tarif' },
];

export function Hero({ buyHref, signedIn }: { buyHref: string; signedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="top" className="hero theme-dark">
      <div className="wrap">
        <nav className="nav" aria-label="Navigation principale">
          <Logo />
          <button
            type="button"
            className="nav-toggle only-mobile"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
          <div id="nav-links" className="nav-links" data-open={menuOpen || undefined}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className={link.only && `only-${link.only}`} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href={href(signedIn ? 'acces' : 'connexion')} className="nav-account" onClick={closeMenu}>
              {signedIn ? 'Mon compte' : 'Se connecter'}
            </a>
            <Button href={buyHref} size="sm" onClick={closeMenu}>
              Acheter · {PRICE_LABEL}
            </Button>
          </div>
        </nav>

        <div className="hero-copy">
          <span className="pill only-desktop">v{VERSION} · rien à installer sur le NAS</span>
          <h1>
            Votre NAS Synology, enfin agréable<span className="only-desktop"> à utiliser</span>.
          </h1>
          <p className="hero-lead only-desktop">
            CertiNass est une application de bureau pour gérer les fichiers de votre NAS Synology : navigation,
            recherche, édition, partage — et un assistant IA qui comprend le langage courant.
          </p>
          <p className="hero-lead only-mobile">
            Application de bureau pour gérer les fichiers de votre NAS Synology — avec un assistant IA en langage
            courant.
          </p>
          <div className="hero-actions">
            <Button href={buyHref} size="lg">
              <span className="only-desktop">Obtenir CertiNass · {PRICE_LABEL}</span>
              <span className="only-mobile">Obtenir · {PRICE_LABEL} une fois</span>
            </Button>
            <Button href="#cle-en-main" variant="secondary" size="lg" className="only-desktop">
              Voir comment ça marche
            </Button>
          </div>
          <div className="hero-note">
            Paiement unique, sans abonnement<span className="only-desktop"> · Windows · macOS · Linux · DSM 7 requis</span>
          </div>
        </div>

        <div className="hero-capture">
          <img
            src={captures.actionAValider}
            alt="L'assistant de CertiNass propose trois étapes à valider pour ranger des photos"
            width={1440}
            height={900}
          />
        </div>
      </div>
    </header>
  );
}
