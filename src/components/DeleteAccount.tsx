import { useState } from 'react';
import { deleteAccount } from '../account';
import { useT } from '../i18n';
import { posthog } from '../posthog';
import { ConfirmDialog } from './ConfirmDialog';
import { notify } from './Toast';

/** Suppression du compte (droit à l'effacement). `licensed` : la confirmation détaille ce que devient la clé. */
export function DeleteAccount({ licensed }: { licensed: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'busy' | 'failed'>('idle');

  const remove = () => {
    setState('busy');
    posthog?.capture('account_deletion_requested');
    deleteAccount().then(
      // L'écran a déjà changé : le message s'affiche sur la page de présentation.
      () => notify('flow.deleted'),
      () => setState('failed'),
    );
  };

  return (
    <>
      <button type="button" className="link account-delete" onClick={() => setOpen(true)}>
        {t('flow.deleteAccount')}
      </button>
      <ConfirmDialog
        open={open}
        title={t('flow.deleteTitle')}
        confirmLabel={t('flow.deleteAction')}
        busy={state === 'busy'}
        busyLabel={t('flow.deleting')}
        error={state === 'failed' ? t('flow.deleteError') : null}
        onConfirm={remove}
        onClose={() => {
          setOpen(false);
          setState('idle');
        }}
      >
        <p>{t('flow.deleteBody')}</p>
        {licensed && (
          <ul>
            <li>{t('flow.deleteLicence')}</li>
            <li>{t('flow.deleteApp')}</li>
          </ul>
        )}
        <p>
          <b>{t('flow.deleteIrreversible')}</b>
        </p>
      </ConfirmDialog>
    </>
  );
}
