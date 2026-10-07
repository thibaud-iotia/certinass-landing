import { useState } from 'react';
import { captures } from '../captures';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { downloadUrl, osName, REPO_URL, VERSION, type Os } from '../site';

const LINKS = [
  { href: '#assistant', label: 'Assistant IA' },
  { href: '#cle-en-main', label: 'Clé en main' },
  { href: '#import', label: 'Import', only: 'desktop' },
  { href: '#partages', label: 'Partages', only: 'desktop' },
  // Mobile : import et partages sont regroupés dans une seule section.
  { href: '#modules', label: 'Modules', only: 'mobile' },
  { href: REPO_URL, label: 'GitHub' },
];

export function Hero({ os }: { os: Os }) {
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
            <Button href="#telecharger" size="sm" onClick={closeMenu}>
              Télécharger
            </Button>
          </div>
        </nav>

        <div className="hero-copy">
          <span className="pill only-desktop">v{VERSION} · rien à installer sur le NAS</span>
          <h1>
            Votre NAS Synology, enfin agréable<span className="only-desktop"> à utiliser</span>.
          </h1>
          <p className="hero-lead">
            Trouvez votre NAS, connectez-vous, gérez vos fichiers. <span className="only-desktop">Et parlez-lui</span>
            <span className="only-mobile">Parlez-lui</span> en langage courant.
          </p>
          <div className="hero-actions">
            <Button href={downloadUrl(os)} size="lg">
              <span className="only-desktop">Télécharger pour {osName(os)}</span>
              <span className="only-mobile">Télécharger · v{VERSION}</span>
            </Button>
            <Button href="#telecharger" variant="secondary" size="lg" className="only-desktop">
              Autres systèmes
            </Button>
          </div>
          <div className="hero-note only-desktop">Windows · macOS · Linux — DSM 7 requis</div>
          <div className="hero-note only-mobile">
            {osName(os)} · <a href="#telecharger">Autres systèmes</a>
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
