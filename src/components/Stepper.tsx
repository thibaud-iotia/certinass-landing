import { useT, type MessageKey } from '../i18n';

export const PURCHASE_STEPS: { title: MessageKey; detail: MessageKey }[] = [
  { title: 'flow.account', detail: 'flow.accountDetail' },
  { title: 'flow.payment', detail: 'flow.paymentDetail' },
  { title: 'flow.access', detail: 'flow.accessDetail' },
];

/** Étapes du parcours d'achat, en ligne : `current` est l'étape en cours (0 à 2), les précédentes sont cochées. */
export function Stepper({ current }: { current: number }) {
  const t = useT();
  return (
    <ol className="stepper" aria-label={t('flow.steps')}>
      {PURCHASE_STEPS.map((step, index) => (
        <li
          key={step.title}
          data-state={index < current ? 'done' : index === current ? 'current' : 'todo'}
          aria-current={index === current ? 'step' : undefined}
        >
          <span className="stepper-num">{index < current ? '✓' : index + 1}</span>
          {t(step.title)}
        </li>
      ))}
    </ol>
  );
}
