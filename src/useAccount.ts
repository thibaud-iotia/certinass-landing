import { useCallback, useEffect, useState } from 'react';
import { fetchLicence, supabase, type Licence, type Session } from './account';
import type { AccountState } from './route';

export interface Account {
  /** Session ou licence pas encore connues. */
  loading: boolean;
  state: AccountState;
  email: string | null;
  licence: Licence | null;
  /** Relit la licence : elle arrive par webhook, après le retour du paiement. */
  refresh: () => Promise<void>;
}

export function useAccount(): Account {
  // `undefined` : pas encore chargé.
  const [session, setSession] = useState<Session | null | undefined>(supabase ? undefined : null);
  const [licence, setLicence] = useState<Licence | null | undefined>(undefined);
  const userId = session?.user.id;

  useEffect(() => {
    if (!supabase) return;
    // Émet aussi la session initiale, une fois le retour de connexion (`?code=`) échangé.
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    // Une lecture en échec ne doit pas faire passer un client pour un compte sans licence : on garde l'état connu.
    await fetchLicence().then(setLicence, (error) => console.error(error));
  }, []);

  useEffect(() => {
    setLicence(undefined);
    if (!userId) return;
    let stale = false;
    fetchLicence().then(
      (next) => !stale && setLicence(next),
      (error) => {
        console.error(error);
        if (!stale) setLicence(null);
      },
    );
    return () => {
      stale = true;
    };
  }, [userId]);

  const loading = session === undefined || (session !== null && licence === undefined);
  const state: AccountState = !session ? 'anonymous' : licence?.status === 'active' ? 'licensed' : 'unlicensed';
  return { loading, state, email: session?.user.email ?? null, licence: licence ?? null, refresh };
}
