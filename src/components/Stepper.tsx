import { useT, type MessageKey } from '../i18n';

export const FLOW_STEPS: { title: MessageKey; detail: MessageKey }[] = [
  { title: 'flow.account', detail: 'flow.accountDetail' },
  { title: 'flow.access', detail: 'flow.accessDetail' },
];

/** Étapes du parcours, en ligne : `current` est l'étape en cours (0 ou 1), les précédentes sont cochées. */
export function Stepper({ current }: { current: number }) {
  const t = useT();
  return (
    <ol className="stepper" aria-label={t('flow.steps')}>
      {FLOW_STEPS.map((step, index) => (
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
