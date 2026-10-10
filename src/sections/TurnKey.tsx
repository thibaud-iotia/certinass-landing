import { captures } from '../captures';
import { Capture } from '../components/Capture';
import { useT, type MessageKey } from '../i18n';

const STEPS: { title: MessageKey; capture: string; alt: MessageKey }[] = [
  { title: 'turnKey.detect', capture: captures.appareils, alt: 'turnKey.detectAlt' },
  { title: 'turnKey.connect', capture: captures.doubleAuthentification, alt: 'turnKey.connectAlt' },
  { title: 'turnKey.browse', capture: captures.grille, alt: 'turnKey.browseAlt' },
];

export function TurnKey() {
  const t = useT();
  return (
    <section id="cle-en-main" className="section turnkey">
      <div className="wrap">
        <div className="eyebrow only-desktop">{t('turnKey.eyebrow')}</div>
        <h2 className="title">
          <span className="only-desktop">{t('turnKey.title')}</span>
          <span className="only-mobile">{t('turnKey.titleMobile')}</span>
        </h2>
        <p className="lead only-desktop">{t('turnKey.lead')}</p>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <div className="step-title">
                <span className="step-num">{index + 1}</span>
                {t(step.title)}
              </div>
              <Capture src={step.capture} alt={t(step.alt)} small className="only-desktop" />
            </li>
          ))}
        </ol>
        <Capture src={captures.grille} alt={t('turnKey.browseAlt')} small className="only-mobile" />
        <div className="chips only-desktop">
          <span className="chip">{t('turnKey.chipTabs')}</span>
          <span className="chip">{t('turnKey.chipSearch')}</span>
          <span className="chip">{t('turnKey.chipRemote')}</span>
        </div>
      </div>
    </section>
  );
}
