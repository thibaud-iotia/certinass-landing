import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { fetchBetaEnd, fetchLicence, supabase, type Licence, type Session } from './account';
import { forgetUser, getConsent, posthog, subscribeConsent } from './posthog';
import type { AccountState } from './route';

export interface Account {
  /** Session ou licence pas encore connues. */
  loading: boolean;
  state: AccountState;
  email: string | null;
  licence: Licence | null;
  /** Fin annoncée de la bêta (millisecondes) ; null tant qu'elle n'a pas d'échéance. */
  betaEndsAt: number | null;
  /** Relit la licence : l'ordinateur où elle est activée a pu changer. */
  refresh: () => Promise<void>;
}

/** La clé ouvre-t-elle l'application ? Une clé bêta ne compte plus une fois la bêta terminée. */
export function isUsable(licence: Licence | null, betaEndsAt: number | null, now: number): boolean {
  if (licence?.status !== 'active') return false;
  return licence.kind !== 'beta' || betaEndsAt === null || now < betaEndsAt;
}

interface Loaded {
  licence: Licence | null;
  betaEndsAt: number | null;
}

async function load(): Promise<Loaded> {
  const [licence, betaEndsAt] = await Promise.all([fetchLicence(), fetchBetaEnd()]);
  return { licence, betaEndsAt };
}

const accountLog = {
  info: (message: string, attributes: Record<string, string>) => posthog?.logger.info(message, { logger: 'account', ...attributes }),
  warn: (message: string, attributes: Record<string, string>) => posthog?.logger.warn(message, { logger: 'account', ...attributes }),
};

export function useAccount(): Account {
  // `undefined` : pas encore chargé.
  const [session, setSession] = useState<Session | null | undefined>(supabase ? undefined : null);
  const [loaded, setLoaded] = useState<Loaded | undefined>(undefined);
  const previousUserId = useRef<string | null | undefined>(undefined);
  const consent = useSyncExternalStore(subscribeConsent, getConsent);
  const userId = session?.user.id;

  useEffect(() => {
    if (!supabase) return;
    // Émet aussi la session initiale, une fois le retour de connexion (`?code=`) échangé.
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === undefined) return;
    const nextUserId = session?.user.id ?? null;
    // Déconnexion ou autre compte : les visites suivantes ne sont plus rattachées au compte précédent.
    if (previousUserId.current && previousUserId.current !== nextUserId) forgetUser();
    previousUserId.current = nextUserId;
    // Rattacher les visites au compte (identifiant seul, sans e-mail) suppose l'accord du visiteur.
    if (nextUserId && consent === 'granted') posthog?.identify(nextUserId);
  }, [session, consent]);

  const refresh = useCallback(async () => {
    // Une lecture en échec ne doit pas faire passer un compte pour un compte sans licence : on garde l'état connu.
    await load().then(
      (next) => {
        setLoaded(next);
        accountLog.info('account data refreshed', { operation: 'manual_refresh' });
      },
      (error) => {
        console.error(error);
        accountLog.warn('account data refresh failed', { operation: 'manual_refresh' });
      },
    );
  }, []);

  useEffect(() => {
    setLoaded(undefined);
    if (!userId) return;
    let stale = false;
    load().then(
      (next) => {
        if (stale) return;
        setLoaded(next);
        accountLog.info('account data loaded', { operation: 'session_load' });
      },
      (error) => {
        console.error(error);
        if (stale) return;
        setLoaded({ licence: null, betaEndsAt: null });
        accountLog.warn('account data load failed', { operation: 'session_load' });
      },
    );
    return () => {
      stale = true;
    };
  }, [userId]);

  const loading = session === undefined || (session !== null && loaded === undefined);
  const licence = loaded?.licence ?? null;
  const betaEndsAt = loaded?.betaEndsAt ?? null;
  const state: AccountState = !session ? 'anonymous' : isUsable(licence, betaEndsAt, Date.now()) ? 'licensed' : 'unlicensed';
  return { loading, state, email: session?.user.email ?? null, licence, betaEndsAt, refresh };
}
