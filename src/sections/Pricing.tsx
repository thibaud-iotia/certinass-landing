import { Button } from '../components/Button';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { useT, type MessageKey } from '../i18n';
import { priceLabel, REPO_URL, VERSION } from '../site';

const INCLUDED: { label: MessageKey; mobileLabel?: MessageKey }[] = [
  { label: 'pricing.includedFeatures', mobileLabel: 'pricing.includedFeaturesMobile' },
  { label: 'pricing.includedNas' },
  { label: 'pricing.includedUpdates', mobileLabel: 'pricing.includedUpdatesMobile' },
  { label: 'pricing.includedPlatforms' },
];

const STEPS: MessageKey[] = ['pricing.stepAccount', 'pricing.stepPay', 'pricing.stepDownload'];

export function Pricing({ buyHref }: { buyHref: string }) {
  const t = useT();
  return (
    <section id="tarif" className="section pricing theme-dark">
      <div className="wrap">
        <div className="eyebrow only-desktop">{t('pricing.eyebrow')}</div>
        <h2 className="title-xl">{t('pricing.title')}</h2>
        <p className="lead only-desktop">{t('pricing.lead')}</p>

        <div className="price-card">
          <div className="price-offer">
            <b className="only-desktop">{t('pricing.product')}</b>
            <div className="price">
              <span className="price-amount">{priceLabel()}</span>
              <span className="price-terms">
                <span className="only-desktop">{t('pricing.taxIncluded')} · </span>
                {t('pricing.once')}
              </span>
            </div>
            <Button href={buyHref} size="lg" block>
              {t('pricing.buy')}
            </Button>
            <div className="fine-print only-desktop">{t('pricing.guarantee')}</div>
          </div>
          <ul className="price-included">
            {INCLUDED.map((item) => (
              <li key={item.label} className={item.mobileLabel ? undefined : 'only-desktop'}>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
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
            <li className="only-mobile">
              <span className="check" aria-hidden="true">
                ✓
              </span>
              {t('pricing.refund')}
            </li>
          </ul>
        </div>

        <ol className="price-steps only-desktop">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="price-step-num">{index + 1}</span>
              {t(step)}
            </li>
          ))}
        </ol>
        <p className="fine-print only-desktop">
          {t('pricing.unsigned')} <a href="#faq">{t('pricing.why')}</a>
        </p>
        <p className="price-path only-mobile">{t('pricing.path')}</p>
      </div>
    </section>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="wrap">
        <b className="only-desktop">CertiNass</b>
        <span>v{VERSION}</span>
        <a href={REPO_URL}>GitHub</a>
        <LanguageSwitch />
        <span className="disclaimer">
          <span className="only-desktop">{t('footer.disclaimer')}</span>
          <span className="only-mobile">{t('footer.disclaimerMobile')}</span>
        </span>
      </div>
    </footer>
  );
}
