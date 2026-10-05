import type { ReactNode } from 'react';
import { captures } from '../captures';
import { Button } from '../components/Button';
import { Capture } from '../components/Capture';
import { ASSISTANT_DOC_URL } from '../site';

function Check({ children }: { children: ReactNode }) {
  return (
    <li>
      <span className="check" aria-hidden="true">
        ✓
      </span>
      {children}
    </li>
  );
}

export function Assistant() {
  return (
    <section id="assistant" className="section assistant theme-dark">
      <div className="wrap split">
        <div className="assistant-copy">
          <span className="pill only-desktop">Propulsé par Claude</span>
          <h2 className="title-xl">Parlez à votre NAS.</h2>
          <p className="quote only-desktop">« Qu’est-ce qui prend de la place ? »</p>

          <div className="action-card only-mobile">
            <b>Action à valider</b>
            <br />☑ Créer /photos/2026-07
            <br />☑ Déplacer 142 fichiers
            <br />☐ Supprimer les doublons
          </div>

          <ul className="checks only-desktop">
            <Check>L’IA propose, vous validez — étapes décochables</Check>
            <Check>Journal 90 jours et bouton Annuler</Check>
            <Check>Permissions : Toujours / Demander / Jamais</Check>
            <Check>Contenu envoyé seulement avec votre accord</Check>
          </ul>
          <ul className="checks only-mobile">
            <Check>Vous validez</Check>
            <Check>Annulable 90 jours</Check>
            <Check>Permissions fines</Check>
          </ul>

          <div className="fine-print">Utilise votre clé API Claude · désactivé par défaut</div>
          <Button href={ASSISTANT_DOC_URL} variant="secondary" className="only-desktop">
            Ajouter à Claude Desktop (MCP)
          </Button>
        </div>
        <div className="assistant-captures only-desktop">
          <Capture src={captures.assistant} alt="L'onglet Assistant : analyse de l'espace occupé, par famille de fichiers" />
          <Capture src={captures.journal} alt="Le journal des actions, chacune avec son bouton Annuler" />
        </div>
      </div>
    </section>
  );
}
