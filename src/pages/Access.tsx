import { useEffect, useState } from 'react';
import { downloadLink, releaseLicence, signOut } from '../account';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Stepper } from '../components/Stepper';
import { useT } from '../i18n';
import { detectOs, DOWNLOADS, formatAmount, type InstallerId } from '../site';
import type { Account } from '../useAccount';

/** Maquette 1e : licence active, installeurs délivrés par lien temporaire. */
export function Access({ account }: { account: Account }) {
  const t = useT();
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
    if (!window.confirm(t('access.releaseConfirm'))) return;
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
        () => setError(t('access.downloadError')),
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
      <h1>{t('access.title')}</h1>
      <p className="access-lead">{t('access.lead')}</p>

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
                  {pending === installer.id ? t('access.preparing') : (installer.label ?? t('access.download'))}
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
          <b>{t('access.inApp')}</b>
          <ol className="access-steps">
            <li>{t('access.stepLaunch')}</li>
            <li>{t('access.stepPaste')}</li>
            <li>{t('access.stepActivate')}</li>
          </ol>
          <div className="licence-key">
            <code>{key ?? t('access.keyPending')}</code>
            <button type="button" className="link" disabled={!key} onClick={copy}>
              {copied ? t('access.copied') : t('access.copy')}
            </button>
          </div>
        </div>
        <div className="access-card">
          <b>{t('access.licence')}</b>
          {licence && <div>{t('access.lifetime', { amount: formatAmount(licence.total_cents, licence.currency) })}</div>}
          <div>{t('access.updates')}</div>
          <div>{t('access.oneComputer')}</div>
          {licence?.receipt_url && (
            <a href={licence.receipt_url} target="_blank" rel="noreferrer">
              {t('access.invoice')}
            </a>
          )}
          <button type="button" className="link" disabled={!key || release === 'busy'} onClick={free}>
            {t('access.release')}
          </button>
          {release === 'done' && <div role="status">{t('access.released')}</div>}
          {release === 'failed' && (
            <div className="flow-error" role="alert">
              {t('access.releaseError')}
            </div>
          )}
          <button type="button" className="link" onClick={() => void signOut()}>
            {t('flow.signOut')}
          </button>
        </div>
      </div>
      <p className="fine-print">{t('access.unsigned')}</p>
    </div>
  );
}
