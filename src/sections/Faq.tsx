import type { ReactNode } from 'react';
import { useLocale, useT, type Locale } from '../i18n';

export interface Question {
  question: string;
  answer: ReactNode;
}

// Réponses mises en forme : chaque langue a sa liste, dans le même ordre.
export const QUESTIONS: Record<Locale, Question[]> = {
  fr: [
    {
      question: 'Quelle différence avec File Station et Synology Drive ?',
      answer: (
        <>
          <p>
            File Station s’utilise dans le navigateur, à l’intérieur de DSM. Synology Drive demande d’installer le
            paquet Drive Server sur le NAS et sert d’abord à synchroniser des dossiers.
          </p>
          <p>
            CertiNass est un gestionnaire de NAS Synology sous forme d’application de bureau, pour Windows, macOS et
            Linux. Il se connecte directement à l’API Web de DSM 7, sans rien installer sur le NAS, et réunit
            explorateur de fichiers, recherche sur tous vos NAS, aperçus, éditeur de texte, terminal SSH, partages
            privés et assistant IA.
          </p>
        </>
      ),
    },
    {
      question: 'Que fait l’assistant IA ?',
      answer: (
        <>
          <p>
            Vous décrivez ce que vous voulez en langage courant : « Qu’est-ce qui prend de la place ? », « Range les
            photos de juillet », « Supprime les doublons ». L’assistant analyse le NAS et propose des actions, que
            vous validez étape par étape.
          </p>
          <p>
            Chaque action reste annulable pendant 90 jours depuis le journal. L’assistant, propulsé par Claude, utilise
            votre propre clé API ; il est désactivé par défaut et n’envoie le contenu de vos fichiers qu’avec votre
            accord.
          </p>
        </>
      ),
    },
    {
      question: 'Quels NAS sont compatibles ?',
      answer: (
        <p>
          Les NAS Synology sous DSM 7. CertiNass détecte ceux de votre réseau local et se connecte aussi à un NAS
          distant, avec double authentification. Le nombre de NAS n’est pas limité.
        </p>
      ),
    },
    {
      question: 'Pourquoi les installeurs ne sont-ils pas signés ?',
      answer: (
        <>
          <p>
            Signer une application demande un certificat payant chez Microsoft et chez Apple, à renouveler chaque année.
            CertiNass est un projet indépendant, gratuit pendant sa bêta : ces certificats ne sont pas encore financés.
          </p>
          <p>
            L’avertissement de Windows ou de macOS signale donc l’absence de signature, pas un problème détecté dans
            l’application. Téléchargez toujours l’installeur depuis votre compte CertiNass.
          </p>
        </>
      ),
    },
    {
      question: 'Comment lancer l’application malgré l’avertissement ?',
      answer: (
        <>
          <p>
            <b>Windows</b> : dans la fenêtre « Windows a protégé votre ordinateur », cliquez sur{' '}
            <i>Informations complémentaires</i>, puis <i>Exécuter quand même</i>.
          </p>
          <p>
            <b>macOS</b> : après un premier lancement refusé, ouvrez <i>Réglages Système › Confidentialité et sécurité</i>,
            puis cliquez sur <i>Ouvrir quand même</i>.
          </p>
          <p>
            <b>Linux</b> : aucun avertissement.
          </p>
        </>
      ),
    },
    {
      question: 'Sur combien d’ordinateurs puis-je utiliser ma clé ?',
      answer: (
        <p>
          Une clé fonctionne sur un ordinateur à la fois. Pour en changer, désactivez-la dans{' '}
          <i>Paramètres › Licence</i>, ou libérez-la depuis votre compte si l’ordinateur est perdu ou réinstallé. Le
          nombre de NAS n’est pas limité.
        </p>
      ),
    },
    {
      question: 'Faut-il installer quelque chose sur le NAS ?',
      answer: <p>Non. CertiNass s’installe sur votre ordinateur et se connecte à un NAS Synology sous DSM 7.</p>,
    },
    {
      question: 'CertiNass est-il gratuit ?',
      answer: (
        <>
          <p>
            Oui, pendant la bêta : aucun paiement, aucune carte bancaire. Un compte Google ou GitHub suffit pour
            recevoir votre clé.
          </p>
          <p>
            La bêta prendra fin à une date annoncée à l’avance, sur ce site et dans l’application. CertiNass pourra
            alors devenir payant, et les clés bêta cesseront d’ouvrir l’application.
          </p>
        </>
      ),
    },
  ],
  en: [
    {
      question: 'How is it different from File Station and Synology Drive?',
      answer: (
        <>
          <p>
            File Station runs in the browser, inside DSM. Synology Drive requires installing the Drive Server package
            on the NAS and is mainly built for syncing folders.
          </p>
          <p>
            CertiNass is a Synology NAS manager in the form of a desktop app for Windows, macOS and Linux. It connects
            straight to the DSM 7 Web API, with nothing to install on the NAS, and brings together a file explorer,
            search across all your NAS devices, previews, a text editor, an SSH terminal, private sharing and an AI
            assistant.
          </p>
        </>
      ),
    },
    {
      question: 'What does the AI assistant do?',
      answer: (
        <>
          <p>
            You describe what you want in plain language: “What’s taking up space?”, “Sort the July photos”, “Delete
            the duplicates”. The assistant analyses the NAS and suggests actions, which you approve step by step.
          </p>
          <p>
            Every action can be undone for 90 days from the log. The assistant, powered by Claude, uses your own API
            key; it is off by default and only sends the content of your files with your consent.
          </p>
        </>
      ),
    },
    {
      question: 'Which NAS devices are supported?',
      answer: (
        <p>
          Synology NAS devices running DSM 7. CertiNass discovers the ones on your local network and also connects to
          a remote NAS, with two-factor authentication. The number of NAS devices is unlimited.
        </p>
      ),
    },
    {
      question: 'Why aren’t the installers signed?',
      answer: (
        <>
          <p>
            Signing an app requires a paid certificate from Microsoft and from Apple, renewed every year. CertiNass is
            an independent project, free during its beta: those certificates are not funded yet.
          </p>
          <p>
            The Windows or macOS warning therefore points to the missing signature, not to a problem found in the app.
            Always download the installer from your CertiNass account.
          </p>
        </>
      ),
    },
    {
      question: 'How do I launch the app despite the warning?',
      answer: (
        <>
          <p>
            <b>Windows</b>: in the “Windows protected your PC” window, click <i>More info</i>, then <i>Run anyway</i>.
          </p>
          <p>
            <b>macOS</b>: after a first blocked launch, open <i>System Settings › Privacy &amp; Security</i>, then click{' '}
            <i>Open Anyway</i>.
          </p>
          <p>
            <b>Linux</b>: no warning.
          </p>
        </>
      ),
    },
    {
      question: 'On how many computers can I use my key?',
      answer: (
        <p>
          A key works on one computer at a time. To switch, deactivate it in <i>Settings › Licence</i>, or release
          it from your account if the computer is lost or reinstalled. The number of NAS devices is unlimited.
        </p>
      ),
    },
    {
      question: 'Do I need to install anything on the NAS?',
      answer: <p>No. CertiNass is installed on your computer and connects to a Synology NAS running DSM 7.</p>,
    },
    {
      question: 'Is CertiNass free?',
      answer: (
        <>
          <p>
            Yes, during the beta: no payment, no card. A Google or GitHub account is all you need to receive your key.
          </p>
          <p>
            The beta will end on a date announced in advance, on this site and in the app. CertiNass may then become a
            paid product, and beta keys will stop opening the app.
          </p>
        </>
      ),
    },
  ],
};

export function Faq() {
  const t = useT();
  const questions = QUESTIONS[useLocale()];
  return (
    <section id="faq" className="section faq">
      <div className="wrap">
        <div className="eyebrow only-desktop">{t('faq.eyebrow')}</div>
        <h2 className="title">{t('faq.title')}</h2>
        <div className="faq-list">
          {questions.map((item, index) => (
            // Clé par rang : une question ouverte le reste au changement de langue.
            <details key={index}>
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
