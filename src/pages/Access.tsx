import { useState } from 'react';
import { downloadLink, releaseLicence, signOut } from '../account';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DeleteAccount } from '../components/DeleteAccount';
import { Logo } from '../components/Logo';
import { Stepper } from '../components/Stepper';
import { getLocale, INTL_LOCALE, useT } from '../i18n';
import { detectOs, DOWNLOADS, type InstallerId } from '../site';
import { posthog } from '../posthog';
import type { Account } from '../useAccount';

function formatDate(time: number): string {
  return new Date(time).toLocaleDateString(INTL_LOCALE[getLocale()], { dateStyle: 'long' });
}

/** Compte dont la clé n'ouvre plus l'application : la bêta est terminée. */
function BetaEnded() {
  const t = useT();
  return (
    <div className="access theme-dark">
      <div className="flow-bar">
        <Logo />
      </div>
      <h1>{t('access.endedTitle')}</h1>
      <p className="access-lead">{t('access.endedLead')}</p>
      <div className="access-card">
        <button type="button" className="link" onClick={() => void signOut()}>
          {t('flow.signOut')}
        </button>
        <DeleteAccount licensed={false} />
      </div>
    </div>
  );
}

/** Maquette 1e : clé de licence du compte, installeurs délivrés par lien temporaire. */
export function Access({ account }: { account: Account }) {
  const t = useT();
  const os = detectOs(navigator.userAgent);
  const [pending, setPending] = useState<InstallerId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { licence, betaEndsAt, refresh } = account;
  const [copied, setCopied] = useState(false);
  const [release, setRelease] = useState<'idle' | 'confirm' | 'busy' | 'done' | 'failed'>('idle');

  if (account.state !== 'licensed' || !licence) return <BetaEnded />;
  const key = licence.licence_key;
  const beta = licence.kind === 'beta';

  const copy = () => {
    void navigator.clipboard.writeText(key).then(() => {
      posthog?.capture('licence_key_copied');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const free = () => {
    setRelease('busy');
    posthog?.capture('licence_release_requested');
    releaseLicence().then(
      () => {
        posthog?.capture('licence_released');
        setRelease('done');
        void refresh();
      },
      () => setRelease('failed'),
    );
  };

  const download = (installer: InstallerId) => {
    setPending(installer);
    setError(null);
    posthog?.capture('installer_download_requested', { installer, operating_system: os });
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
        <Stepper current={2} />
      </div>
      <span className="access-check" aria-hidden="true">
        ✓
      </span>
      <h1>{t(beta ? 'access.title' : 'access.titlePaid')}</h1>
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
            <code className="ph-no-capture">{key}</code>
            <button type="button" className="link" onClick={copy}>
              {copied ? t('access.copied') : t('access.copy')}
            </button>
          </div>
        </div>
        <div className="access-card">
          <b>{t('access.licence')}</b>
          {beta && <div>{t('access.free')}</div>}
          {beta && <div>{betaEndsAt === null ? t('access.betaOpen') : t('access.betaEnds', { date: formatDate(betaEndsAt) })}</div>}
          <div>{t('access.oneComputer')}</div>
          {licence.device_name && <div>{t('access.activatedOn', { device: licence.device_name })}</div>}
          <button type="button" className="link" onClick={() => setRelease('confirm')}>
            {t('access.release')}
          </button>
          {release === 'done' && <div role="status">{t('access.released')}</div>}
          <ConfirmDialog
            open={release === 'confirm' || release === 'busy' || release === 'failed'}
            title={t('access.releaseTitle')}
            confirmLabel={t('access.releaseAction')}
            busy={release === 'busy'}
            busyLabel={t('access.releasing')}
            error={release === 'failed' ? t('access.releaseError') : null}
            onConfirm={free}
            onClose={() => setRelease('idle')}
          >
            <p>{t('access.releaseConfirm')}</p>
          </ConfirmDialog>
          <button type="button" className="link" onClick={() => void signOut()}>
            {t('flow.signOut')}
          </button>
          <DeleteAccount licensed />
        </div>
      </div>
      <p className="fine-print">{t('access.unsigned')}</p>
    </div>
  );
}
