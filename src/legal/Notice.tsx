import type { ReactNode } from 'react';
import type { Locale } from '../i18n';
import { CONTACT_EMAIL } from '../site';

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

// Mentions légales (LCEN, art. 6). Éditeur particulier, à titre non professionnel : son identité est communiquée à
// l'hébergeur et n'est pas publiée (art. 6, III, 2). À compléter (statut, SIRET) si CertiNass devient payant.
export const NOTICE: Record<Locale, ReactNode> = {
  fr: (
    <>
      <h2>Éditeur</h2>
      <p>
        CertiNass est édité par un particulier, à titre non professionnel. Conformément à l’article 6, III, 2 de la loi
        n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), son nom et son adresse ont été
        communiqués à l’hébergeur et ne sont pas publiés.
      </p>
      <p>Contact : {mail}</p>

      <h2>Hébergement</h2>
      <p>
        <b>Site</b> : GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107,
        États-Unis — <a href="https://github.com">github.com</a>.
      </p>
      <p>
        <b>Comptes et clés de licence</b> : Supabase, Inc., 970 Toa Payoh North #07-04, Singapour 318992 — données
        stockées dans la région Union européenne (Irlande) — <a href="https://supabase.com">supabase.com</a>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’application CertiNass, ce site, leurs textes, captures d’écran et éléments graphiques sont protégés par le
        droit d’auteur. Toute reproduction sans autorisation est interdite, sauf usage privé ou courte citation.
      </p>
      <p>
        CertiNass est un projet indépendant, non affilié à Synology Inc. ni approuvé par elle. Synology et DSM sont des
        marques de Synology Inc. Claude est une marque d’Anthropic PBC. Google et GitHub sont des marques de leurs
        propriétaires respectifs.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les données traitées par le site et par l’application sont décrites dans la{' '}
        <a href="#/confidentialite">politique de confidentialité</a>.
      </p>
    </>
  ),
  en: (
    <>
      <h2>Publisher</h2>
      <p>
        CertiNass is published by a private individual, on a non-professional basis. In accordance with Article 6,
        III, 2 of French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), their name and
        address have been provided to the host and are not published.
      </p>
      <p>Contact: {mail}</p>

      <h2>Hosting</h2>
      <p>
        <b>Website</b>: GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107,
        United States — <a href="https://github.com">github.com</a>.
      </p>
      <p>
        <b>Accounts and licence keys</b>: Supabase, Inc., 970 Toa Payoh North #07-04, Singapore 318992 — data stored in
        the European Union region (Ireland) — <a href="https://supabase.com">supabase.com</a>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The CertiNass app, this website, their text, screenshots and graphics are protected by copyright. Any
        reproduction without permission is prohibited, except for private use or short quotation.
      </p>
      <p>
        CertiNass is an independent project, neither affiliated with nor endorsed by Synology Inc. Synology and DSM are
        trademarks of Synology Inc. Claude is a trademark of Anthropic PBC. Google and GitHub are trademarks of their
        respective owners.
      </p>

      <h2>Personal data</h2>
      <p>
        The data processed by the website and the app is described in the <a href="#/confidentialite">privacy policy</a>.
      </p>
    </>
  ),
};
