import posthog from 'posthog-js';

// Mesure d'audience (PostHog, hébergé dans l'UE). Rien n'est envoyé avant le choix du visiteur (bandeau
// `ConsentBanner`) ; s'il refuse, les visites sont comptées sans rien enregistrer dans son navigateur (mode sans
// cookie, activé aussi dans les réglages du projet PostHog). Sans `VITE_POSTHOG_KEY` et `VITE_POSTHOG_HOST`, pas de
// mesure, pas de bandeau.

export type Consent = 'granted' | 'denied' | 'pending';

const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const host = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

const client = key && host ? posthog : null;

if (client) {
  client.init(key!, {
    api_host: host,
    defaults: '2026-05-30',
    cookieless_mode: 'on_reject',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    logs: {
      serviceName: 'certinass-landing',
      environment: import.meta.env.MODE,
    },
  });
} else if (import.meta.env.DEV) {
  console.info('PostHog désactivé : VITE_POSTHOG_KEY ou VITE_POSTHOG_HOST absent.');
}

export { client as posthog };

let consent: Consent = client?.get_explicit_consent_status() ?? 'denied';
/** Bandeau rouvert depuis le pied de page pour changer d'avis. */
let reviewing = false;
const listeners = new Set<() => void>();

function changed() {
  for (const notify of listeners) notify();
}

export function subscribeConsent(notify: () => void): () => void {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function getConsent(): Consent {
  return consent;
}

/** Le bandeau doit-il s'afficher ? Jamais sans PostHog configuré. */
export function isAskingConsent(): boolean {
  return client !== null && (consent === 'pending' || reviewing);
}

export function setConsent(granted: boolean): void {
  if (!client) return;
  if (granted) client.opt_in_capturing();
  else client.opt_out_capturing();
  consent = granted ? 'granted' : 'denied';
  reviewing = false;
  changed();
}

export function reviewConsent(): void {
  if (!client) return;
  reviewing = true;
  changed();
}

/** Déconnexion : nouvel identifiant anonyme. `reset()` efface aussi le choix du visiteur, qu'on lui rend aussitôt. */
export function forgetUser(): void {
  if (!client) return;
  client.reset();
  if (consent === 'granted') client.opt_in_capturing({ captureEventName: false });
  else if (consent === 'denied') client.opt_out_capturing();
}
