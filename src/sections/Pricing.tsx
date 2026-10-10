import { Button } from '../components/Button';
import { PRICE_LABEL, REPO_URL, VERSION } from '../site';

const INCLUDED = [
  { label: 'Toutes les fonctions : IA, éditeur, terminal, import, partages', mobileLabel: 'Toutes les fonctions' },
  { label: 'NAS illimités, une licence pour un ordinateur' },
  { label: 'Mises à jour de la version 1.x incluses', mobileLabel: 'Mises à jour 1.x incluses' },
  { label: 'Windows, macOS et Linux' },
];

const STEPS = ['Créez un compte', 'Payez', 'Téléchargez et connectez-vous'];

export function Pricing({ buyHref }: { buyHref: string }) {
  return (
    <section id="tarif" className="section pricing theme-dark">
      <div className="wrap">
        <div className="eyebrow only-desktop">Tarif</div>
        <h2 className="title-xl">Achetez une fois. Gardez-le.</h2>
        <p className="lead only-desktop">Pas d’abonnement, pas de renouvellement.</p>

        <div className="price-card">
          <div className="price-offer">
            <b className="only-desktop">Licence CertiNass</b>
            <div className="price">
              <span className="price-amount">{PRICE_LABEL}</span>
              <span className="price-terms">
                <span className="only-desktop">TTC · </span>une seule fois
              </span>
            </div>
            <Button href={buyHref} size="lg" block>
              Acheter maintenant
            </Button>
            <div className="fine-print only-desktop">Remboursé sous 14 jours · Paiement par carte sécurisé</div>
          </div>
          <ul className="price-included">
            {INCLUDED.map((item) => (
              <li key={item.label} className={item.mobileLabel ? undefined : 'only-desktop'}>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                {item.mobileLabel ? (
                  <>
                    <span className="only-desktop">{item.label}</span>
                    <span className="only-mobile">{item.mobileLabel}</span>
                  </>
                ) : (
                  item.label
                )}
              </li>
            ))}
            <li className="only-mobile">
              <span className="check" aria-hidden="true">
                ✓
              </span>
              Remboursé sous 14 jours
            </li>
          </ul>
        </div>

        <ol className="price-steps only-desktop">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="price-step-num">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="fine-print only-desktop">
          Installeurs non signés : Windows ou macOS peut afficher un avertissement au premier lancement.{' '}
          <a href="#faq">Pourquoi ?</a>
        </p>
        <p className="price-path only-mobile">1 · Compte → 2 · Paiement → 3 · Téléchargement</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <b className="only-desktop">CertiNass</b>
        <span>v{VERSION}</span>
        <a href={REPO_URL}>GitHub</a>
        <span className="disclaimer">
          <span className="only-desktop">Projet indépendant, non affilié à Synology.</span>
          <span className="only-mobile">Non affilié à Synology</span>
        </span>
      </div>
    </footer>
  );
}
