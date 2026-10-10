// Backend du site (dossier `supabase/` du dépôt de l'application) : comptes, clés de licence, installeurs.
import { createClient, type Session } from '@supabase/supabase-js';
import { t } from './i18n';
import { href } from './route';
import type { InstallerId } from './site';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** `null` tant que `.env` n'est pas renseigné : la page de présentation s'affiche, les comptes sont indisponibles. */
export const supabase = url && anonKey ? createClient(url, anonKey, { auth: { flowType: 'pkce' } }) : null;

function backend() {
  if (!supabase) throw new Error(t('flow.unavailable'));
  return supabase;
}

export type { Session };
export type Provider = 'google' | 'github';

export interface Licence {
  status: 'active' | 'revoked';
  /** `beta` : clé gratuite, valable jusqu'à la fin de la bêta ; `paid` : licence achetée. */
  kind: 'beta' | 'paid';
  /** Clé à saisir dans l'application. */
  licence_key: string;
  /** Ordinateur où la clé est activée ; null quand elle est libre. */
  device_name: string | null;
}

// Le fournisseur renvoie à la racine du site, sans fragment : ce témoin fait reprendre le parcours au retour.
const RESUME_KEY = 'certinass.achat';

export async function signIn(provider: Provider): Promise<void> {
  sessionStorage.setItem(RESUME_KEY, '1');
  const { error } = await backend().auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin + window.location.pathname },
  });
  if (error) throw error;
}

/** Vrai une seule fois, au retour d'une connexion lancée depuis le parcours. */
export function consumeResume(): boolean {
  const pending = sessionStorage.getItem(RESUME_KEY) !== null;
  sessionStorage.removeItem(RESUME_KEY);
  return pending;
}

export async function signOut(): Promise<void> {
  const { error } = await backend().auth.signOut();
  if (error) throw error;
}

async function readLicence(): Promise<Licence | null> {
  const { data, error } = await backend().from('licences').select('status, kind, licence_key, device_name').maybeSingle<Licence>();
  if (error) throw error;
  return data;
}

/**
 * Licence du compte connecté (la politique RLS ne laisse lire que la sienne). Un compte qui n'en a pas reçoit sa clé
 * bêta ici, à sa première visite ; `null` seulement si la bêta est terminée.
 */
export async function fetchLicence(): Promise<Licence | null> {
  const licence = await readLicence();
  if (licence) return licence;
  const { error } = await backend().rpc('claim_beta_key');
  if (error) throw error;
  return readLicence();
}

/** Fin annoncée de la bêta, en millisecondes ; `null` tant qu'elle n'a pas d'échéance. */
export async function fetchBetaEnd(): Promise<number | null> {
  const { data, error } = await backend().from('app_config').select('beta_ends_at').maybeSingle<{ beta_ends_at: string | null }>();
  if (error) throw error;
  return data?.beta_ends_at ? Date.parse(data.beta_ends_at) : null;
}

/** Libère la clé de l'ordinateur où elle est activée (poste perdu ou réinstallé) : elle peut être activée ailleurs. */
export async function releaseLicence(): Promise<void> {
  const { error } = await backend().rpc('release_licence');
  if (error) throw error;
}

/** Supprime le compte connecté et sa clé de licence : irréversible. */
export async function deleteAccount(): Promise<void> {
  const { error } = await backend().functions.invoke('delete-account');
  if (error) throw error;
  // Retour à la page de présentation avant la déconnexion, qui renverrait sinon vers l'écran de connexion.
  window.location.replace(href('landing'));
  // Le compte n'existe plus côté serveur : seule la session de ce navigateur reste à effacer.
  await backend().auth.signOut({ scope: 'local' });
}

/** Lien temporaire vers un installeur de la dernière version. */
export async function downloadLink(installer: InstallerId): Promise<string> {
  const { data, error } = await backend().functions.invoke<{ url: string }>('download', { body: { installer } });
  if (error || !data) throw error ?? new Error('Réponse vide de « download »');
  return data.url;
}
