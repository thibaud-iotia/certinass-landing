import { useEffect, useState } from 'react';
import { signOut, startCheckout } from '../account';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Stepper } from '../components/Stepper';
import { formatAmount, PRICE } from '../site';
import type { Account } from '../useAccount';

const AMOUNT = formatAmount(PRICE * 100, 'EUR');

function AccountBadge({ email }: { email: string | null }) {
  return (
    <div className="account-badge">
      <span className="account-avatar" aria-hidden="true">
        {email?.[0]?.toUpperCase()}
      </span>
      <span className="account-email">{email}</span>
      <button type="button" className="link" onClick={() => void signOut()}>
        Se déconnecter
      </button>
    </div>
  );
}

/**
 * Maquette 1d. Le formulaire de carte n'est pas dans la page : Lemon Squeezy, marchand officiel, encaisse
 * sur sa propre page (carte, Apple Pay, PayPal, code promo, TVA du pays) puis renvoie sur `#/confirmation`.
 */
export function Payment({ account }: { account: Account }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = () => {
    setBusy(true);
    setError(null);
    startCheckout().then(
      (url) => window.location.assign(url),
      () => {
        setBusy(false);
        setError('Le paiement n’a pas pu être ouvert. Réessayez dans un instant.');
      },
    );
  };

  return (
    <div className="pay">
      <main className="pay-main">
        <div className="flow-bar">
          <Logo />
          <AccountBadge email={account.email} />
        </div>
        <Stepper current={1} />
        <h1>Paiement</h1>
        <p className="lead">
          Le règlement se fait sur la page sécurisée de notre prestataire de paiement, Lemon Squeezy : carte bancaire,
          Apple Pay ou PayPal. Un code promo se saisit sur cette page.
        </p>
        <Button size="lg" block disabled={busy} onClick={pay}>
          {busy ? 'Ouverture du paiement…' : `Payer ${AMOUNT}`}
        </Button>
        {error && (
          <p className="flow-error" role="alert">
            {error}
          </p>
        )}
        <div className="pay-note">🔒 Paiement chiffré · Paiement unique, sans renouvellement.</div>
      </main>

      <aside className="pay-summary">
        <b className="pay-summary-title">Récapitulatif</b>
        <div className="pay-item">
          <div>
            <b>Licence CertiNass</b>
            <div>Paiement unique · mises à jour 1.x incluses</div>
          </div>
          <b className="mono">{AMOUNT}</b>
        </div>
        <div className="pay-total">
          <span>Total aujourd’hui</span>
          <span>{AMOUNT}</span>
        </div>
        <div className="pay-tax">TVA incluse, calculée selon votre pays.</div>
        <ul className="pay-checks">
          <li>Remboursé sous 14 jours</li>
          <li>Aucun abonnement ni renouvellement</li>
          <li>Facture envoyée par e-mail</li>
        </ul>
        <div className="pay-legal">
          Les paiements sont traités par un prestataire certifié PCI-DSS. CertiNass ne stocke aucun numéro de carte.
        </div>
      </aside>
    </div>
  );
}

const POLL_MS = 2000;
const PATIENCE_MS = 60_000;

/** Retour du paiement : la licence est activée par le webhook du prestataire, on l'attend. */
export function Confirmation({ account }: { account: Account }) {
  const [late, setLate] = useState(false);
  const { refresh } = account;

  useEffect(() => {
    const poll = setInterval(() => void refresh(), POLL_MS);
    const patience = setTimeout(() => setLate(true), PATIENCE_MS);
    return () => {
      clearInterval(poll);
      clearTimeout(patience);
    };
  }, [refresh]);

  return (
    <div className="flow-wait theme-dark" role="status">
      <Logo />
      <h1>Confirmation du paiement…</h1>
      <p>
        {late
          ? 'La confirmation tarde. Si vous avez bien payé, votre accès s’ouvrira ici dès qu’elle arrive : inutile de payer à nouveau.'
          : 'Votre accès s’ouvre dans quelques secondes.'}
      </p>
      {late && (
        <Button href="#/paiement" variant="secondary">
          Je n’ai pas payé : revenir au paiement
        </Button>
      )}
    </div>
  );
}
