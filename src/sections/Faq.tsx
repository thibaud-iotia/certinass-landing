import type { ReactNode } from 'react';
import { useLocale, useT, type Locale } from '../i18n';
import { priceLabel } from '../site';

interface Question {
  question: string;
  answer: ReactNode;
}

// Réponses mises en forme : chaque langue a sa liste, dans le même ordre.
const QUESTIONS: Record<Locale, (price: string) => Question[]> = {
  fr: (price) => [
    {
      question: 'Pourquoi les installeurs ne sont-ils pas signés ?',
      answer: (
        <>
          <p>
            Signer une application demande un certificat payant chez Microsoft et chez Apple, à renouveler chaque année.
            CertiNass est un projet indépendant vendu {price} une seule fois : ces certificats ne sont pas encore
            financés.
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
      question: 'Sur combien d’ordinateurs puis-je utiliser ma licence ?',
      answer: (
        <p>
          Une licence fonctionne sur un ordinateur à la fois. Pour en changer, désactivez-la dans{' '}
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
      question: 'Y a-t-il un abonnement ?',
      answer: (
        <p>
          Non. Vous payez une seule fois, les mises à jour de la version 1.x sont incluses, et vous êtes remboursé sur
          demande sous 14 jours.
        </p>
      ),
    },
  ],
  en: (price) => [
    {
      question: 'Why aren’t the installers signed?',
      answer: (
        <>
          <p>
            Signing an app requires a paid certificate from Microsoft and from Apple, renewed every year. CertiNass is
            an independent project sold for {price}, once: those certificates are not funded yet.
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
      question: 'On how many computers can I use my licence?',
      answer: (
        <p>
          A licence works on one computer at a time. To switch, deactivate it in <i>Settings › Licence</i>, or release
          it from your account if the computer is lost or reinstalled. The number of NAS devices is unlimited.
        </p>
      ),
    },
    {
      question: 'Do I need to install anything on the NAS?',
      answer: <p>No. CertiNass is installed on your computer and connects to a Synology NAS running DSM 7.</p>,
    },
    {
      question: 'Is there a subscription?',
      answer: (
        <p>
          No. You pay once, version 1.x updates are included, and you get a refund on request within 14 days.
        </p>
      ),
    },
  ],
};

export function Faq() {
  const t = useT();
  const questions = QUESTIONS[useLocale()](priceLabel());
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
