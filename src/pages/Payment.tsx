import { useEffect, useState } from 'react';
import { signOut, startCheckout } from '../account';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Stepper } from '../components/Stepper';
import { useT } from '../i18n';
import { formatAmount, PRICE } from '../site';
import type { Account } from '../useAccount';

function AccountBadge({ email }: { email: string | null }) {
  const t = useT();
  return (
    <div className="account-badge">
      <span className="account-avatar" aria-hidden="true">
        {email?.[0]?.toUpperCase()}
      </span>
      <span className="account-email">{email}</span>
      <button type="button" className="link" onClick={() => void signOut()}>
        {t('flow.signOut')}
      </button>
    </div>
  );
}

/**
 * Maquette 1d. Le formulaire de carte n'est pas dans la page : Lemon Squeezy, marchand officiel, encaisse
 * sur sa propre page (carte, Apple Pay, PayPal, code promo, TVA du pays) puis renvoie sur `#/confirmation`.
 */
export function Payment({ account }: { account: Account }) {
  const t = useT();
  const amount = formatAmount(PRICE * 100, 'EUR');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = () => {
    setBusy(true);
    setError(null);
    startCheckout().then(
      (url) => window.location.assign(url),
      () => {
        setBusy(false);
        setError(t('payment.error'));
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
        <h1>{t('payment.title')}</h1>
        <p className="lead">{t('payment.lead')}</p>
        <Button size="lg" block disabled={busy} onClick={pay}>
          {busy ? t('payment.opening') : t('payment.pay', { amount })}
        </Button>
        {error && (
          <p className="flow-error" role="alert">
            {error}
          </p>
        )}
        <div className="pay-note">{t('payment.note')}</div>
      </main>

      <aside className="pay-summary">
        <b className="pay-summary-title">{t('payment.summary')}</b>
        <div className="pay-item">
          <div>
            <b>{t('payment.product')}</b>
            <div>{t('payment.productDetail')}</div>
          </div>
          <b className="mono">{amount}</b>
        </div>
        <div className="pay-total">
          <span>{t('payment.total')}</span>
          <span>{amount}</span>
        </div>
        <div className="pay-tax">{t('payment.tax')}</div>
        <ul className="pay-checks">
          <li>{t('payment.checkRefund')}</li>
          <li>{t('payment.checkNoSubscription')}</li>
          <li>{t('payment.checkInvoice')}</li>
        </ul>
        <div className="pay-legal">{t('payment.legal')}</div>
      </aside>
    </div>
  );
}

const POLL_MS = 2000;
const PATIENCE_MS = 60_000;

/** Retour du paiement : la licence est activée par le webhook du prestataire, on l'attend. */
export function Confirmation({ account }: { account: Account }) {
  const t = useT();
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
      <h1>{t('payment.confirming')}</h1>
      <p>{t(late ? 'payment.confirmingLate' : 'payment.confirmingSoon')}</p>
      {late && (
        <Button href="#/paiement" variant="secondary">
          {t('payment.notPaid')}
        </Button>
      )}
    </div>
  );
}
