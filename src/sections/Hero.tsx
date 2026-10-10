import { useState } from 'react';
import { captures } from '../captures';
import { Button } from '../components/Button';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { Logo } from '../components/Logo';
import { useT, type MessageKey } from '../i18n';
import { href } from '../route';
import { priceLabel, VERSION } from '../site';

const LINKS: { href: string; label: MessageKey; only?: 'desktop' | 'mobile' }[] = [
  { href: '#assistant', label: 'nav.assistant' },
  { href: '#cle-en-main', label: 'nav.turnKey' },
  { href: '#import', label: 'nav.linkImport', only: 'desktop' },
  { href: '#partages', label: 'nav.sharing', only: 'desktop' },
  // Mobile : import et partages sont regroupés dans une seule section.
  { href: '#modules', label: 'nav.modules', only: 'mobile' },
  { href: '#tarif', label: 'nav.pricing' },
];

export function Hero({ buyHref, signedIn }: { buyHref: string; signedIn: boolean }) {
  const t = useT();
  const price = priceLabel();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="top" className="hero theme-dark">
      <div className="wrap">
        <nav className="nav" aria-label={t('nav.label')}>
          <Logo />
          <button
            type="button"
            className="nav-toggle only-mobile"
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
          <div id="nav-links" className="nav-links" data-open={menuOpen || undefined}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className={link.only && `only-${link.only}`} onClick={closeMenu}>
                {t(link.label)}
              </a>
            ))}
            <LanguageSwitch />
            <a href={href(signedIn ? 'acces' : 'connexion')} className="nav-account" onClick={closeMenu}>
              {t(signedIn ? 'nav.account' : 'nav.signIn')}
            </a>
            <Button href={buyHref} size="sm" onClick={closeMenu}>
              {t('nav.buy', { price })}
            </Button>
          </div>
        </nav>

        <div className="hero-copy">
          <span className="pill only-desktop">{t('hero.pill', { version: VERSION })}</span>
          <h1>
            <span className="only-desktop">{t('hero.title')}</span>
            <span className="only-mobile">{t('hero.titleMobile')}</span>
          </h1>
          <p className="hero-lead only-desktop">{t('hero.lead')}</p>
          <p className="hero-lead only-mobile">{t('hero.leadMobile')}</p>
          <div className="hero-actions">
            <Button href={buyHref} size="lg">
              <span className="only-desktop">{t('hero.get', { price })}</span>
              <span className="only-mobile">{t('hero.getMobile', { price })}</span>
            </Button>
            <Button href="#cle-en-main" variant="secondary" size="lg" className="only-desktop">
              {t('hero.how')}
            </Button>
          </div>
          <div className="hero-note">
            {t('hero.note')}
            <span className="only-desktop"> · Windows · macOS · Linux · {t('hero.requirement')}</span>
          </div>
        </div>

        <div className="hero-capture">
          <img src={captures.actionAValider} alt={t('hero.captureAlt')} width={1440} height={900} />
        </div>
      </div>
    </header>
  );
}
