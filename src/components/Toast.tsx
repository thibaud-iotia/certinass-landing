import { useEffect, useSyncExternalStore } from 'react';
import { useT, type MessageKey } from '../i18n';

// Message bref affiché au-dessus de n'importe quel écran : il survit au changement d'écran que l'action provoque.
const VISIBLE_MS = 6000;

let current: MessageKey | null = null;
const listeners = new Set<() => void>();

function set(message: MessageKey | null) {
  current = message;
  for (const notify of listeners) notify();
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function notify(message: MessageKey): void {
  set(message);
}

export function Toaster() {
  const t = useT();
  const message = useSyncExternalStore(subscribe, () => current);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => set(null), VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [message]);

  // La zone reste dans la page : un lecteur d'écran n'annonce que ce qui change dans une zone déjà présente.
  return (
    <div className="toast-region" role="status">
      {message && (
        <div className="toast">
          <span className="toast-check" aria-hidden="true">
            ✓
          </span>
          {t(message)}
        </div>
      )}
    </div>
  );
}
