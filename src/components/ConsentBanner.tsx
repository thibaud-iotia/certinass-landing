import { useSyncExternalStore } from 'react';
import { useT } from '../i18n';
import { isAskingConsent, setConsent, subscribeConsent } from '../posthog';
import { href } from '../route';
import { Button } from './Button';

// Choix du visiteur pour la mesure d'audience : refuser est aussi simple qu'accepter, et le choix se change depuis le
// lien « Cookies » du pied de page.
export function ConsentBanner() {
  const t = useT();
  const asking = useSyncExternalStore(subscribeConsent, isAskingConsent);
  if (!asking) return null;
  return (
    <section className="consent theme-dark" aria-label={t('consent.label')}>
      <p>
        {t('consent.text')} <a href={href('confidentialite')}>{t('consent.more')}</a>
      </p>
      <div className="consent-actions">
        <Button variant="secondary" size="sm" onClick={() => setConsent(false)}>
          {t('consent.refuse')}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setConsent(true)}>
          {t('consent.accept')}
        </Button>
      </div>
    </section>
  );
}
