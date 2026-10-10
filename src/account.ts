// Backend du site (dossier `supabase/` du dépôt de l'application) : comptes, licence, paiement, installeurs.
import { createClient, type Session } from '@supabase/supabase-js';
import { getLocale, t } from './i18n';
import type { InstallerId } from './site';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** `null` tant que `.env` n'est pas renseigné : la page de présentation s'affiche, l'achat est indisponible. */
export const supabase = url && anonKey ? createClient(url, anonKey, { auth: { flowType: 'pkce' } }) : null;

function backend() {
  if (!supabase) throw new Error(t('flow.unavailable'));
  return supabase;
}

export type { Session };
export type Provider = 'google' | 'github';

export interface Licence {
  status: 'active' | 'refunded';
  /** Clé à saisir dans l'application ; null quelques secondes, le temps que le prestataire de paiement la transmette. */
  licence_key: string | null;
  receipt_url: string | null;
  total_cents: number;
  currency: string;
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

/** Vrai une seule fois, au retour d'une connexion lancée depuis le parcours d'achat. */
export function consumeResume(): boolean {
  const pending = sessionStorage.getItem(RESUME_KEY) !== null;
  sessionStorage.removeItem(RESUME_KEY);
  return pending;
}

export async function signOut(): Promise<void> {
  const { error } = await backend().auth.signOut();
  if (error) throw error;
}

/** Licence du compte connecté : la politique RLS ne laisse lire que la sienne. */
export async function fetchLicence(): Promise<Licence | null> {
  const { data, error } = await backend()
    .from('licences')
    .select('status, licence_key, receipt_url, total_cents, currency')
    .maybeSingle<Licence>();
  if (error) throw error;
  return data;
}

async function invoke(name: string, body?: object): Promise<string> {
  const { data, error } = await backend().functions.invoke<{ url: string }>(name, { body });
  if (error || !data) throw error ?? new Error(`Réponse vide de « ${name} »`);
  return data.url;
}

/** Adresse de la page de paiement ouverte pour le compte connecté, dans la langue du site. */
export function startCheckout(): Promise<string> {
  return invoke('checkout', { locale: getLocale() });
}

/** Libère la clé de l'ordinateur où elle est activée (poste perdu ou réinstallé) : elle peut être activée ailleurs. */
export async function releaseLicence(): Promise<void> {
  const { error } = await backend().functions.invoke('release');
  if (error) throw error;
}

/** Lien temporaire vers un installeur de la dernière version. */
export function downloadLink(installer: InstallerId): Promise<string> {
  return invoke('download', { installer });
}
