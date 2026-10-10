import { useState } from 'react';
import { signIn, type Provider } from '../account';
import { Logo } from '../components/Logo';
import { PURCHASE_STEPS } from '../components/Stepper';
import { useT } from '../i18n';
import { href } from '../route';
import { priceLabel } from '../site';

const PROVIDERS: { id: Provider; name: string; mark: string }[] = [
  { id: 'google', name: 'Google', mark: 'G' },
  { id: 'github', name: 'GitHub', mark: 'GH' },
];

/** Maquettes 1b (créer un compte) et 1c (se connecter) : même écran, seul le texte et l'accord aux CGU changent. */
export function SignIn({ mode }: { mode: 'compte' | 'connexion' }) {
  const t = useT();
  const creating = mode === 'compte';
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blocked = creating && !accepted;

  const connect = (provider: Provider) => {
    setError(null);
    signIn(provider).catch((cause: Error) => setError(cause.message));
  };

  return (
    <div className="auth">
      <aside className="auth-aside theme-dark">
        <Logo />
        <div className="auth-intro">
          <h1>{t(creating ? 'signIn.createTitle' : 'signIn.returnTitle')}</h1>
          <p>{t(creating ? 'signIn.createLead' : 'signIn.returnLead')}</p>
        </div>
        <ol className="auth-steps">
          {PURCHASE_STEPS.map((step, index) => (
            <li key={step.title} aria-current={index === 0 ? 'step' : undefined}>
              <span className="auth-step-num">{index + 1}</span>
              <div>
                <b>{t(step.title)}</b>
                <div>{t(step.detail)}</div>
              </div>
            </li>
          ))}
        </ol>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <div>
            {creating && <span className="auth-eyebrow">{t('signIn.eyebrow', { price: priceLabel() })}</span>}
            <h2>{t(creating ? 'signIn.welcome' : 'signIn.heading')}</h2>
          </div>
          <div className="providers">
            {PROVIDERS.map((provider) => (
              <button key={provider.id} type="button" className="provider" disabled={blocked} onClick={() => connect(provider.id)}>
                <span className={`provider-mark provider-${provider.id}`} aria-hidden="true">
                  {provider.mark}
                </span>
                {t('signIn.continueWith', { name: provider.name })}
              </button>
            ))}
          </div>
          {creating ? (
            <label className="consent">
              <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
              {t('signIn.consent')}
            </label>
          ) : (
            <div className="notice">
              <b>{t('signIn.noLicenceTitle')}</b>
              <br />
              {t('signIn.noLicence')}
            </div>
          )}
          {error && (
            <p className="flow-error" role="alert">
              {error}
            </p>
          )}
          <div className="auth-foot">
            {creating ? (
              <>
                {t('signIn.noPassword')}
                <br />
                {t('signIn.existing')} <a href={href('connexion')}>{t('signIn.signInLink')}</a>
              </>
            ) : (
              <>
                {t('signIn.noAccount')} <a href={href('compte')}>{t('signIn.createLink')}</a>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
