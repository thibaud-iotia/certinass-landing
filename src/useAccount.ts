import { useCallback, useEffect, useState } from 'react';
import { fetchBetaEnd, fetchLicence, supabase, type Licence, type Session } from './account';
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

export function useAccount(): Account {
  // `undefined` : pas encore chargé.
  const [session, setSession] = useState<Session | null | undefined>(supabase ? undefined : null);
  const [loaded, setLoaded] = useState<Loaded | undefined>(undefined);
  const userId = session?.user.id;

  useEffect(() => {
    if (!supabase) return;
    // Émet aussi la session initiale, une fois le retour de connexion (`?code=`) échangé.
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    // Une lecture en échec ne doit pas faire passer un compte pour un compte sans licence : on garde l'état connu.
    await load().then(setLoaded, (error) => console.error(error));
  }, []);

  useEffect(() => {
    setLoaded(undefined);
    if (!userId) return;
    let stale = false;
    load().then(
      (next) => !stale && setLoaded(next),
      (error) => {
        console.error(error);
        if (!stale) setLoaded({ licence: null, betaEndsAt: null });
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
