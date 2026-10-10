import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useT } from '../i18n';
import { Button } from './Button';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  /** Libellé de l'action confirmée : un verbe précis (« Supprimer définitivement »), pas « OK ». */
  confirmLabel: string;
  /** Action en cours : les boutons sont inactifs et la fenêtre ne se ferme pas. */
  busy?: boolean;
  busyLabel?: string;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Confirmation d'une action sensible, dans un `<dialog>` modal : le navigateur garde le focus dans la fenêtre,
 * la ferme sur Échap et le rend à l'élément d'origine. « Annuler » vient en premier, il reçoit donc le focus.
 */
export function ConfirmDialog({ open, title, confirmLabel, busy = false, busyLabel, error, onConfirm, onClose, children }: ConfirmDialogProps) {
  const t = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Échap : la fermeture passe par `open`, et attend la fin d'une action en cours.
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        // Clic sur le fond : seule la zone hors du cadre a le `<dialog>` lui-même pour cible.
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      {open && (
        <div className="dialog-body">
          <span className="dialog-icon" aria-hidden="true">
            !
          </span>
          <h2 id={titleId}>{title}</h2>
          <div className="dialog-text">{children}</div>
          {error && (
            <p className="flow-error" role="alert">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            <Button variant="secondary" disabled={busy} onClick={onClose}>
              {t('flow.cancel')}
            </Button>
            <Button disabled={busy} onClick={onConfirm}>
              {busy ? (busyLabel ?? confirmLabel) : confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
