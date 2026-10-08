export const PURCHASE_STEPS = [
  { title: 'Compte', detail: 'Une seule identité, dans le site et dans l’app' },
  { title: 'Paiement', detail: 'Carte bancaire, remboursé sous 14 jours' },
  { title: 'Accès', detail: 'Téléchargement et clé activés automatiquement' },
];

/** Étapes du parcours d'achat, en ligne : `current` est l'étape en cours (0 à 2), les précédentes sont cochées. */
export function Stepper({ current }: { current: number }) {
  return (
    <ol className="stepper" aria-label="Étapes de l'achat">
      {PURCHASE_STEPS.map((step, index) => (
        <li
          key={step.title}
          data-state={index < current ? 'done' : index === current ? 'current' : 'todo'}
          aria-current={index === current ? 'step' : undefined}
        >
          <span className="stepper-num">{index < current ? '✓' : index + 1}</span>
          {step.title}
        </li>
      ))}
    </ol>
  );
}
