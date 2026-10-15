import type { ReactNode } from 'react';
import type { Locale } from '../i18n';
import { CONTACT_EMAIL } from '../site';

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

// Politique de confidentialité : reprend le tableau « Données réellement traitées » de docs/MISE-EN-PRODUCTION.md.
// Toute nouvelle donnée collectée (outil d'audience, télémétrie, paiement) doit d'abord figurer ici.
export const PRIVACY: Record<Locale, ReactNode> = {
  fr: (
    <>
      <p>
        Cette politique décrit les données personnelles traitées par le site CertiNass et par l’application CertiNass,
        pourquoi, combien de temps, et vos droits. CertiNass est en bêta gratuite : aucune donnée de paiement n’est
        collectée.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        L’éditeur de CertiNass (voir les <a href="#/mentions-legales">mentions légales</a>), joignable à {mail}.
      </p>

      <h2>Données traitées</h2>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Données</th>
              <th>Pourquoi</th>
              <th>Base légale</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Adresse e-mail, nom, photo de profil et identifiant de votre compte Google ou GitHub</td>
              <td>Créer votre compte et vous y reconnecter</td>
              <td>Exécution des conditions d’utilisation</td>
              <td>Jusqu’à la suppression du compte</td>
            </tr>
            <tr>
              <td>Clé de licence, dates de création, d’activation et de dernière vérification</td>
              <td>Délivrer la clé bêta, vérifier qu’elle est valide, compter les utilisateurs actifs</td>
              <td>Exécution des conditions ; intérêt légitime (mesure d’usage)</td>
              <td>Jusqu’à la suppression du compte</td>
            </tr>
            <tr>
              <td>Nom de l’ordinateur où la clé est activée</td>
              <td>Vous montrer où votre clé est utilisée (une clé, un ordinateur à la fois)</td>
              <td>Exécution des conditions</td>
              <td>Jusqu’à la libération de la clé ou la suppression du compte</td>
            </tr>
            <tr>
              <td>Téléchargements : installeur, version, date</td>
              <td>Mesurer l’usage de la bêta</td>
              <td>Intérêt légitime</td>
              <td>Liés au compte jusqu’à sa suppression, puis conservés sans lien avec vous</td>
            </tr>
            <tr>
              <td>Adresse IP, dans les journaux techniques</td>
              <td>Sécurité et bon fonctionnement du site et des comptes</td>
              <td>Intérêt légitime</td>
              <td>Durée de conservation des journaux de l’hébergeur, quelques jours en général</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Le nom de l’ordinateur est celui choisi dans votre système ; s’il contient votre prénom, celui-ci nous est
        transmis. Vous pouvez renommer l’ordinateur avant d’activer la clé.
      </p>

      <h2>Ce que fait l’application</h2>
      <p>
        L’application ne contient aucune télémétrie ni outil de mesure. Elle contacte nos serveurs uniquement pour
        activer et revérifier votre clé (au lancement puis toutes les 6 heures : clé, identifiant d’activation, nom de
        l’ordinateur) et pour savoir si une nouvelle version existe (aucune donnée envoyée).
      </p>
      <p>
        <b>Vos NAS et vos fichiers ne nous sont jamais transmis.</b> L’application se connecte directement à vos NAS ;
        vos identifiants DSM et vos clés restent sur votre ordinateur, chiffrés par le système.
      </p>
      <p>
        <b>Assistant IA (désactivé par défaut).</b> Si vous l’activez avec votre propre clé API Claude, vos demandes et,
        avec votre accord explicite, le contenu de fichiers sont envoyés directement à Anthropic PBC, sans passer par
        nos serveurs. Ce traitement relève de votre relation avec Anthropic et de sa propre politique de
        confidentialité.
      </p>
      <p>
        <b>Import depuis un lien.</b> L’application télécharge le contenu depuis le site du lien que vous collez (par
        exemple YouTube), directement depuis votre ordinateur.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <p>Vos données ne sont ni vendues, ni louées, ni utilisées à des fins publicitaires. Elles sont traitées par :</p>
      <ul>
        <li>
          <b>Supabase, Inc.</b> — hébergement des comptes, des clés et des téléchargements, dans l’Union européenne
          (Irlande) ;
        </li>
        <li>
          <b>GitHub, Inc.</b> — hébergement du site (GitHub Pages) et des installeurs, aux États-Unis ;
        </li>
        <li>
          <b>Google LLC</b> ou <b>GitHub, Inc.</b> — connexion à votre compte, selon le service que vous choisissez.
        </li>
      </ul>
      <p>
        Supabase, GitHub et Google sont des sociétés américaines : un accès depuis les États-Unis est possible. Ces
        transferts sont encadrés par le Data Privacy Framework UE–États-Unis et par les clauses contractuelles types de
        la Commission européenne.
      </p>

      <h2>Cookies et stockage</h2>
      <p>
        Le site n’utilise aucun cookie publicitaire ni outil de mesure d’audience. Il enregistre dans votre navigateur
        uniquement votre session de connexion et votre choix de langue, nécessaires à son fonctionnement : aucun
        consentement n’est donc requis.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de
        portabilité de vos données. Vous pouvez supprimer votre compte à tout moment depuis la page de votre compte
        (« Supprimer mon compte ») : votre compte et votre clé sont effacés immédiatement. Pour tout autre droit,
        écrivez à {mail} ; une réponse vous sera apportée sous un mois.
      </p>
      <p>
        Vous pouvez aussi adresser une réclamation à la CNIL :{' '}
        <a href="https://www.cnil.fr/fr/plaintes">www.cnil.fr/fr/plaintes</a>.
      </p>

      <h2>Modifications</h2>
      <p>
        Cette politique peut évoluer, notamment à la fin de la bêta. La date de dernière mise à jour figure en haut de
        cette page ; un changement important vous sera signalé sur le site.
      </p>
    </>
  ),
  en: (
    <>
      <p>
        This policy describes the personal data processed by the CertiNass website and the CertiNass app, why, for how
        long, and your rights. CertiNass is in a free beta: no payment data is collected.
      </p>

      <h2>Data controller</h2>
      <p>
        The publisher of CertiNass (see the <a href="#/mentions-legales">legal notice</a>), reachable at {mail}.
      </p>

      <h2>Data processed</h2>
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Why</th>
              <th>Legal basis</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email address, name, profile picture and identifier of your Google or GitHub account</td>
              <td>Create your account and let you sign back in</td>
              <td>Performance of the terms of use</td>
              <td>Until the account is deleted</td>
            </tr>
            <tr>
              <td>Licence key, dates of creation, activation and last check</td>
              <td>Issue the beta key, check that it is valid, count active users</td>
              <td>Performance of the terms; legitimate interest (usage measurement)</td>
              <td>Until the account is deleted</td>
            </tr>
            <tr>
              <td>Name of the computer where the key is activated</td>
              <td>Show you where your key is in use (one key, one computer at a time)</td>
              <td>Performance of the terms</td>
              <td>Until the key is released or the account is deleted</td>
            </tr>
            <tr>
              <td>Downloads: installer, version, date</td>
              <td>Measure beta usage</td>
              <td>Legitimate interest</td>
              <td>Linked to the account until it is deleted, then kept with no link to you</td>
            </tr>
            <tr>
              <td>IP address, in technical logs</td>
              <td>Security and proper operation of the website and accounts</td>
              <td>Legitimate interest</td>
              <td>The host’s log retention period, usually a few days</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The computer name is the one set in your operating system; if it contains your first name, that name is sent to
        us. You can rename the computer before activating the key.
      </p>

      <h2>What the app does</h2>
      <p>
        The app contains no telemetry or analytics. It contacts our servers only to activate and recheck your key (at
        launch, then every 6 hours: key, activation identifier, computer name) and to find out whether a new version
        exists (no data sent).
      </p>
      <p>
        <b>Your NAS devices and files are never sent to us.</b> The app connects directly to your NAS devices; your DSM
        credentials and keys stay on your computer, encrypted by the operating system.
      </p>
      <p>
        <b>AI assistant (off by default).</b> If you turn it on with your own Claude API key, your requests and, with your
        explicit consent, file contents are sent directly to Anthropic PBC, without going through our servers. This
        processing falls under your relationship with Anthropic and its own privacy policy.
      </p>
      <p>
        <b>Import from a link.</b> The app downloads content from the website of the link you paste (YouTube, for
        example), directly from your computer.
      </p>

      <h2>Recipients and processors</h2>
      <p>Your data is never sold, rented or used for advertising. It is processed by:</p>
      <ul>
        <li>
          <b>Supabase, Inc.</b> — hosting of accounts, keys and downloads, in the European Union (Ireland);
        </li>
        <li>
          <b>GitHub, Inc.</b> — hosting of the website (GitHub Pages) and the installers, in the United States;
        </li>
        <li>
          <b>Google LLC</b> or <b>GitHub, Inc.</b> — signing in to your account, depending on the service you choose.
        </li>
      </ul>
      <p>
        Supabase, GitHub and Google are US companies: access from the United States is possible. These transfers are
        covered by the EU–US Data Privacy Framework and by the European Commission’s standard contractual clauses.
      </p>

      <h2>Cookies and storage</h2>
      <p>
        The website uses no advertising cookies and no audience measurement. It stores only your sign-in session and
        your language choice in your browser, which it needs to work: no consent is therefore required.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, rectify, erase, restrict, object to and port your data. You can delete your
        account at any time from your account page (“Delete my account”): your account and your key are erased
        immediately. For any other request, write to {mail}; you will receive a reply within one month.
      </p>
      <p>
        You may also lodge a complaint with the CNIL, the French data protection authority:{' '}
        <a href="https://www.cnil.fr/en/complaints">www.cnil.fr/en/complaints</a>.
      </p>

      <h2>Changes</h2>
      <p>
        This policy may change, in particular when the beta ends. The last-updated date is shown at the top of this page;
        any significant change will be announced on the website.
      </p>
    </>
  ),
};
