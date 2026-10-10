import type { ReactNode } from 'react';
import { PRICE_LABEL } from '../site';

const QUESTIONS: { question: string; answer: ReactNode }[] = [
  {
    question: 'Pourquoi les installeurs ne sont-ils pas signés ?',
    answer: (
      <>
        <p>
          Signer une application demande un certificat payant chez Microsoft et chez Apple, à renouveler chaque année.
          CertiNass est un projet indépendant vendu {PRICE_LABEL} une seule fois : ces certificats ne sont pas encore
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
        <i>Paramètres › Licence</i>, ou libérez-la depuis votre compte si l’ordinateur est perdu ou réinstallé. Le nombre
        de NAS n’est pas limité.
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
];

export function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="wrap">
        <div className="eyebrow only-desktop">FAQ</div>
        <h2 className="title">Questions fréquentes</h2>
        <div className="faq-list">
          {QUESTIONS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
