import type { ReactNode } from 'react';
import type { Locale } from '../i18n';
import { CONTACT_EMAIL } from '../site';

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

// Conditions d'utilisation de la bêta gratuite. Le préavis de fin de bêta promis ici (30 jours) doit être respecté en
// posant `beta_ends_at` (supabase/README.md, « Terminer la bêta »). Jamais de clé « à vie ».
export const TERMS: Record<Locale, ReactNode> = {
  fr: (
    <>
      <h2>1. Objet</h2>
      <p>
        Ces conditions encadrent l’utilisation du site CertiNass et de l’application CertiNass pendant sa bêta
        gratuite. Créer un compte vaut acceptation de ces conditions.
      </p>

      <h2>2. Bêta gratuite</h2>
      <p>
        Pendant la bêta, CertiNass est gratuit : aucun paiement ni moyen de paiement n’est demandé. La bêta prendra fin
        à une date annoncée <b>au moins 30 jours à l’avance</b>, sur le site et dans l’application. À cette date, les
        clés bêta cesseront d’ouvrir l’application. CertiNass pourra alors devenir payant ; rien ne vous obligera à
        l’acheter.
      </p>
      <p>
        La clé bêta n’est pas une licence perpétuelle et n’a aucune valeur après la fin de la bêta. Elle ne donne droit
        à aucune licence payante gratuite ou à prix réduit, sauf annonce contraire.
      </p>

      <h2>3. Compte et clé</h2>
      <p>
        Le compte se crée avec un compte Google ou GitHub. Il est personnel. Chaque compte reçoit une clé, utilisable
        sur un ordinateur à la fois ; pour changer d’ordinateur, désactivez-la dans l’application ou libérez-la depuis
        votre compte. La clé ne peut être ni vendue, ni cédée, ni partagée.
      </p>
      <p>
        Vous pouvez supprimer votre compte à tout moment depuis la page de votre compte ; votre clé est alors supprimée
        et l’application se ferme sur l’ordinateur où elle était activée.
      </p>

      <h2>4. Utilisation de l’application</h2>
      <p>
        CertiNass agit sur vos NAS Synology avec les droits de votre compte DSM : il peut déplacer, modifier et
        supprimer des fichiers, et exécuter des commandes dans le terminal. Vous restez responsable de ces actions et de
        la sauvegarde de vos données. <b>Gardez une sauvegarde de vos fichiers importants.</b>
      </p>
      <p>
        <b>Assistant IA.</b> Il fonctionne avec votre propre clé API Claude ; son usage est facturé par Anthropic selon
        ses conditions, que vous acceptez auprès d’elle. Les actions proposées par l’assistant doivent être validées par
        vous ; relisez-les avant de les accepter.
      </p>
      <p>
        <b>Import depuis un lien.</b> N’importez que des contenus que vous avez le droit de copier : vous êtes seul
        responsable du respect des droits d’auteur et des conditions des sites d’origine.
      </p>
      <p>
        Il est interdit de contourner le système de licence, de décompiler l’application pour le contourner, ou
        d’utiliser le site d’une manière qui en perturbe le fonctionnement. En cas d’abus, la clé ou le compte concerné
        peut être révoqué.
      </p>

      <h2>5. Logiciel fourni en l’état</h2>
      <p>
        Une bêta peut comporter des erreurs. CertiNass est fourni gratuitement et en l’état, sans garantie de
        disponibilité, de compatibilité avec chaque NAS ou de continuité du service. Les fonctions peuvent évoluer, être
        modifiées ou retirées.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        Dans les limites permises par la loi, l’éditeur n’est pas responsable des dommages indirects, ni de la perte de
        données résultant de l’utilisation de CertiNass, notamment en l’absence de sauvegarde. Rien dans ces conditions
        ne limite la responsabilité de l’éditeur en cas de faute lourde ou intentionnelle, ni les droits que vous tenez
        de la loi.
      </p>

      <h2>7. Propriété intellectuelle</h2>
      <p>
        L’application et le site restent la propriété de l’éditeur. La clé vous donne un droit d’usage personnel et non
        exclusif de l’application pendant la bêta, sans autre transfert de droits.
      </p>

      <h2>8. Données personnelles</h2>
      <p>
        Leur traitement est décrit dans la <a href="#/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>9. Modification des conditions</h2>
      <p>
        Ces conditions peuvent évoluer, notamment à la fin de la bêta. Un changement important vous sera signalé sur le
        site ; continuer à utiliser CertiNass ensuite vaut acceptation des nouvelles conditions. Vous pouvez à tout
        moment cesser de l’utiliser et supprimer votre compte.
      </p>

      <h2>10. Droit applicable et contact</h2>
      <p>
        Ces conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant
        toute action ; à défaut, les tribunaux compétents sont ceux désignés par la loi. Pour toute question : {mail}.
      </p>
    </>
  ),
  en: (
    <>
      <h2>1. Purpose</h2>
      <p>
        These terms govern the use of the CertiNass website and the CertiNass app during its free beta. Creating an
        account means accepting these terms.
      </p>

      <h2>2. Free beta</h2>
      <p>
        During the beta, CertiNass is free: no payment or payment method is requested. The beta will end on a date
        announced <b>at least 30 days in advance</b>, on the website and in the app. On that date, beta keys will stop
        opening the app. CertiNass may then become a paid product; you will be under no obligation to buy it.
      </p>
      <p>
        The beta key is not a perpetual licence and has no value after the beta ends. It does not entitle you to a free
        or discounted paid licence, unless announced otherwise.
      </p>

      <h2>3. Account and key</h2>
      <p>
        Accounts are created with a Google or GitHub account and are personal. Each account receives one key, usable on
        one computer at a time; to switch computers, deactivate it in the app or release it from your account. The key
        may not be sold, transferred or shared.
      </p>
      <p>
        You can delete your account at any time from your account page; your key is then deleted and the app closes on
        the computer where it was activated.
      </p>

      <h2>4. Using the app</h2>
      <p>
        CertiNass acts on your Synology NAS devices with the permissions of your DSM account: it can move, edit and
        delete files, and run commands in the terminal. You remain responsible for these actions and for backing up your
        data. <b>Keep a backup of your important files.</b>
      </p>
      <p>
        <b>AI assistant.</b> It works with your own Claude API key; its usage is billed by Anthropic under its terms,
        which you accept with Anthropic. Actions suggested by the assistant must be approved by you; review them before
        accepting.
      </p>
      <p>
        <b>Import from a link.</b> Only import content you have the right to copy: you alone are responsible for
        respecting copyright and the terms of the source websites.
      </p>
      <p>
        You may not circumvent the licensing system, decompile the app to circumvent it, or use the website in a way
        that disrupts its operation. In case of abuse, the key or account concerned may be revoked.
      </p>

      <h2>5. Software provided as is</h2>
      <p>
        A beta may contain errors. CertiNass is provided free of charge and as is, with no guarantee of availability,
        compatibility with every NAS, or continuity of service. Features may change, be modified or be removed.
      </p>

      <h2>6. Liability</h2>
      <p>
        To the extent permitted by law, the publisher is not liable for indirect damage, or for data loss resulting from
        the use of CertiNass, in particular where no backup was kept. Nothing in these terms limits the publisher’s
        liability for gross negligence or wilful misconduct, or the rights you hold under the law.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The app and the website remain the property of the publisher. The key grants you a personal, non-exclusive right
        to use the app during the beta, with no other transfer of rights.
      </p>

      <h2>8. Personal data</h2>
      <p>
        Its processing is described in the <a href="#/confidentialite">privacy policy</a>.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        These terms may change, in particular when the beta ends. Any significant change will be announced on the
        website; continuing to use CertiNass afterwards means accepting the new terms. You may stop using it and delete
        your account at any time.
      </p>

      <h2>10. Governing law and contact</h2>
      <p>
        These terms are governed by French law. In the event of a dispute, an amicable solution will be sought before
        any legal action; failing that, the competent courts are those designated by law. For any question: {mail}.
      </p>
    </>
  ),
};
