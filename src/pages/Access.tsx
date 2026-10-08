import { useEffect, useState } from 'react';
import { downloadLink, releaseLicence, signOut } from '../account';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Stepper } from '../components/Stepper';
import { detectOs, DOWNLOADS, formatAmount, type InstallerId } from '../site';
import type { Account } from '../useAccount';

/** Maquette 1e : licence active, installeurs délivrés par lien temporaire. */
export function Access({ account }: { account: Account }) {
  const os = detectOs(navigator.userAgent);
  const [pending, setPending] = useState<InstallerId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { licence, refresh } = account;
  const key = licence?.licence_key ?? null;
  const [copied, setCopied] = useState(false);
  const [release, setRelease] = useState<'idle' | 'busy' | 'done' | 'failed'>('idle');

  // La clé arrive par un second webhook, parfois quelques secondes après la licence.
  useEffect(() => {
    if (key) return;
    const poll = setInterval(() => void refresh(), 3000);
    return () => clearInterval(poll);
  }, [key, refresh]);

  const copy = () => {
    if (!key) return;
    void navigator.clipboard.writeText(key).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const free = () => {
    if (!window.confirm('Libérer votre licence ? CertiNass se fermera sur l’ordinateur où elle est activée, et vous pourrez l’activer sur un autre.')) return;
    setRelease('busy');
    releaseLicence().then(
      () => setRelease('done'),
      () => setRelease('failed'),
    );
  };

  const download = (installer: InstallerId) => {
    setPending(installer);
    setError(null);
    downloadLink(installer)
      .then(
        (url) => window.location.assign(url),
        () => setError('Le téléchargement n’a pas pu démarrer. Réessayez dans un instant.'),
      )
      .finally(() => setPending(null));
  };

  return (
    <div className="access theme-dark">
      <div className="flow-bar">
        <Logo />
        <Stepper current={3} />
      </div>
      <span className="access-check" aria-hidden="true">
        ✓
      </span>
      <h1>Paiement confirmé. Bienvenue !</h1>
      <p className="access-lead">
        Votre licence est active. Téléchargez l’application puis activez-la avec votre clé de licence.
      </p>

      <div className="download-grid">
        {DOWNLOADS.map((item) => (
          <div key={item.os} className="download-card">
            <b>{item.name}</b>
            <div className="formats">{item.formats}</div>
            <div className="download-actions">
              {item.installers.map((installer, index) => (
                <Button
                  key={installer.id}
                  variant={item.os === os && index === 0 ? 'primary' : 'secondary'}
                  block
                  disabled={pending !== null}
                  onClick={() => download(installer.id)}
                >
                  {pending === installer.id ? 'Préparation…' : installer.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="flow-error" role="alert">
          {error}
        </p>
      )}

      <div className="access-details">
        <div className="access-card">
          <b>Dans l’application</b>
          <ol className="access-steps">
            <li>Lancez CertiNass</li>
            <li>Collez votre clé de licence</li>
            <li>Cliquez sur « Activer » — c’est tout</li>
          </ol>
          <div className="licence-key">
            <code>{key ?? 'Clé en cours de création…'}</code>
            <button type="button" className="link" disabled={!key} onClick={copy}>
              {copied ? 'Copiée ✓' : 'Copier'}
            </button>
          </div>
        </div>
        <div className="access-card">
          <b>Licence</b>
          {licence && <div>À vie · {formatAmount(licence.total_cents, licence.currency)} payés</div>}
          <div>Mises à jour 1.x incluses</div>
          <div>Un ordinateur à la fois : pour en changer, désactivez-la dans Paramètres › Licence.</div>
          {licence?.receipt_url && (
            <a href={licence.receipt_url} target="_blank" rel="noreferrer">
              Télécharger ma facture →
            </a>
          )}
          <button type="button" className="link" disabled={!key || release === 'busy'} onClick={free}>
            Ordinateur perdu ou réinstallé ? Libérer ma licence
          </button>
          {release === 'done' && <div role="status">Licence libérée : vous pouvez l’activer sur un autre ordinateur.</div>}
          {release === 'failed' && (
            <div className="flow-error" role="alert">
              La licence n’a pas pu être libérée. Réessayez dans un instant.
            </div>
          )}
          <button type="button" className="link" onClick={() => void signOut()}>
            Se déconnecter
          </button>
        </div>
      </div>
      <p className="fine-print">
        Installeurs non signés : Windows ou macOS peut afficher un avertissement au premier lancement.
      </p>
    </div>
  );
}
