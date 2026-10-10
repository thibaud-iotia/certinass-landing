import type { ReactNode } from 'react';
import { captures } from '../captures';
import { Button } from '../components/Button';
import { Capture } from '../components/Capture';
import { useT } from '../i18n';
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
  const t = useT();
  return (
    <section id="assistant" className="section assistant theme-dark">
      <div className="wrap split">
        <div className="assistant-copy">
          <span className="pill only-desktop">{t('assistant.pill')}</span>
          <h2 className="title-xl">{t('assistant.title')}</h2>
          <p className="quote only-desktop">{t('assistant.quote')}</p>

          <div className="action-card only-mobile">
            <b>{t('assistant.actionTitle')}</b>
            <br />☑ {t('assistant.actionCreate')}
            <br />☑ {t('assistant.actionMove')}
            <br />☐ {t('assistant.actionDelete')}
          </div>

          <ul className="checks only-desktop">
            <Check>{t('assistant.checkValidate')}</Check>
            <Check>{t('assistant.checkJournal')}</Check>
            <Check>{t('assistant.checkPermissions')}</Check>
            <Check>{t('assistant.checkContent')}</Check>
          </ul>
          <ul className="checks only-mobile">
            <Check>{t('assistant.checkValidateMobile')}</Check>
            <Check>{t('assistant.checkJournalMobile')}</Check>
            <Check>{t('assistant.checkPermissionsMobile')}</Check>
          </ul>

          <div className="fine-print">{t('assistant.finePrint')}</div>
          <Button href={ASSISTANT_DOC_URL} variant="secondary" className="only-desktop">
            {t('assistant.mcp')}
          </Button>
        </div>
        <div className="assistant-captures only-desktop">
          <Capture src={captures.assistant} alt={t('assistant.captureAlt')} />
          <Capture src={captures.journal} alt={t('assistant.journalAlt')} />
        </div>
      </div>
    </section>
  );
}
