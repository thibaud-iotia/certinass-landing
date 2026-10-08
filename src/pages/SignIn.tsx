import { useState } from 'react';
import { signIn, type Provider } from '../account';
import { Logo } from '../components/Logo';
import { PURCHASE_STEPS } from '../components/Stepper';
import { href } from '../route';
import { PRICE_LABEL } from '../site';

const PROVIDERS: { id: Provider; name: string; mark: string }[] = [
  { id: 'google', name: 'Google', mark: 'G' },
  { id: 'github', name: 'GitHub', mark: 'GH' },
];

/** Maquettes 1b (créer un compte) et 1c (se connecter) : même écran, seul le texte et l'accord aux CGU changent. */
export function SignIn({ mode }: { mode: 'compte' | 'connexion' }) {
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
          <h1>{creating ? 'Créez votre compte pour commencer.' : 'Content de vous revoir.'}</h1>
          <p>
            {creating
              ? 'Votre licence est liée à votre compte : vous y retrouverez votre clé d’activation et vos téléchargements.'
              : 'Connectez-vous pour acheter ou retrouver votre licence.'}
          </p>
        </div>
        <ol className="auth-steps">
          {PURCHASE_STEPS.map((step, index) => (
            <li key={step.title} aria-current={index === 0 ? 'step' : undefined}>
              <span className="auth-step-num">{index + 1}</span>
              <div>
                <b>{step.title}</b>
                <div>{step.detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <div>
            {creating && <span className="auth-eyebrow">Étape 1 / 3 · Licence CertiNass · {PRICE_LABEL}</span>}
            <h2>{creating ? 'Bienvenue' : 'Connexion'}</h2>
          </div>
          <div className="providers">
            {PROVIDERS.map((provider) => (
              <button key={provider.id} type="button" className="provider" disabled={blocked} onClick={() => connect(provider.id)}>
                <span className={`provider-mark provider-${provider.id}`} aria-hidden="true">
                  {provider.mark}
                </span>
                Continuer avec {provider.name}
              </button>
            ))}
          </div>
          {creating ? (
            <label className="consent">
              <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
              J’accepte les CGU et la politique de confidentialité.
            </label>
          ) : (
            <div className="notice">
              <b>Compte sans licence ?</b>
              <br />
              Après connexion, vous serez redirigé vers le paiement.
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
                Aucun mot de passe. Nous ne publions rien sur votre compte.
                <br />
                Déjà client ? <a href={href('connexion')}>Se connecter</a>
              </>
            ) : (
              <>
                Pas encore de compte ? <a href={href('compte')}>Créer un compte</a>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
