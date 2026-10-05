import { captures } from '../captures';
import { Capture } from '../components/Capture';

const STEPS = [
  { title: 'Détecter', capture: captures.appareils, alt: 'Les NAS du réseau local détectés par CertiNass' },
  { title: 'Se connecter', capture: captures.doubleAuthentification, alt: 'Connexion au compte DSM avec double authentification' },
  { title: 'Parcourir', capture: captures.grille, alt: 'Les fichiers du NAS affichés en grille' },
];

export function TurnKey() {
  return (
    <section id="cle-en-main" className="section turnkey">
      <div className="wrap">
        <div className="eyebrow only-desktop">Clé en main</div>
        <h2 className="title">
          <span className="only-desktop">Du téléchargement aux fichiers en une minute</span>
          <span className="only-mobile">En une minute</span>
        </h2>
        <p className="lead only-desktop">Rien à installer sur le NAS — l’API Web de DSM 7 suffit.</p>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <div className="step-title">
                <span className="step-num">{index + 1}</span>
                {step.title}
              </div>
              <Capture src={step.capture} alt={step.alt} small className="only-desktop" />
            </li>
          ))}
        </ol>
        <Capture src={captures.grille} alt="Les fichiers du NAS affichés en grille" small className="only-mobile" />
        <div className="chips only-desktop">
          <span className="chip">NAS en onglets</span>
          <span className="chip">Recherche sur tous les NAS</span>
          <span className="chip">NAS distant</span>
        </div>
      </div>
    </section>
  );
}
