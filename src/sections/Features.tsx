import { captures } from '../captures';
import { Capture } from '../components/Capture';
import { useT, type MessageKey } from '../i18n';

export function LinkImport() {
  const t = useT();
  return (
    <section id="import" className="section only-desktop">
      <div className="wrap split">
        <Capture src={captures.importLien} alt={t('features.importAlt')} />
        <div className="stack">
          <div className="eyebrow">{t('features.importEyebrow')}</div>
          <h2 className="title">{t('features.importTitle')}</h2>
          <p className="lead">{t('features.importLead')}</p>
        </div>
      </div>
    </section>
  );
}

export function Sharing() {
  const t = useT();
  return (
    <section id="partages" className="section sharing theme-dark only-desktop">
      <div className="wrap split">
        <div className="stack">
          <div className="eyebrow">{t('features.sharingEyebrow')}</div>
          <h2 className="title">{t('features.sharingTitle')}</h2>
          <p className="lead">{t('features.sharingLead')}</p>
          <div className="chips">
            <span className="chip">{t('features.sharingRead')}</span>
            <span className="chip">{t('features.sharingWrite')}</span>
          </div>
        </div>
        <Capture src={captures.partagesRecus} alt={t('features.sharingAlt')} />
      </div>
    </section>
  );
}

export function PowerUsers() {
  const t = useT();
  return (
    <section className="section power only-desktop">
      <div className="wrap">
        <h2 className="title">{t('features.powerTitle')}</h2>
        <div className="power-grid">
          <figure>
            <Capture src={captures.editeur} alt={t('features.editorAlt')} />
            <figcaption>{t('features.editorCaption')}</figcaption>
          </figure>
          <figure>
            <Capture src={captures.terminal} alt={t('features.terminalAlt')} />
            <figcaption>{t('features.terminalCaption')}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Mobile (1b) : import, partages, éditeur et terminal tiennent en une section, captures à faire défiler. */
export function MobileModules() {
  const t = useT();
  return (
    <section id="modules" className="section modules only-mobile">
      <div className="wrap">
        <h2 className="title">{t('features.modulesTitle')}</h2>
        <div className="capture-strip">
          <Capture src={captures.importLien} alt={t('features.importAlt')} small />
          <Capture src={captures.partagesRecus} alt={t('features.sharingAlt')} small />
          <Capture src={captures.editeur} alt={t('features.editorAlt')} small />
          <Capture src={captures.terminal} alt={t('features.terminalAlt')} small />
        </div>
      </div>
    </section>
  );
}

const EVERYDAY: { label: MessageKey; mobileLabel?: MessageKey; mobile?: boolean }[] = [
  { label: 'features.tileViews', mobile: true },
  { label: 'features.tilePreviews', mobileLabel: 'features.tilePreviewsMobile', mobile: true },
  { label: 'features.tileTransfers' },
  { label: 'features.tileDragDrop' },
  { label: 'features.tileTags', mobileLabel: 'features.tileTagsMobile', mobile: true },
  { label: 'features.tileTrash' },
  { label: 'features.tileTheme' },
  { label: 'features.tileLanguages', mobile: true },
];

export function Everyday() {
  const t = useT();
  return (
    <section className="section everyday">
      <div className="wrap">
        <h2 className="title only-desktop">{t('features.everydayTitle')}</h2>
        <ul className="tiles">
          {EVERYDAY.map((item) => (
            <li key={item.label} className={item.mobile ? undefined : 'only-desktop'}>
              {item.mobileLabel ? (
                <>
                  <span className="only-desktop">{t(item.label)}</span>
                  <span className="only-mobile">{t(item.mobileLabel)}</span>
                </>
              ) : (
                t(item.label)
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
