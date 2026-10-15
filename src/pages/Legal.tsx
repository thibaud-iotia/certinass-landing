import type { ReactNode } from 'react';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { Logo } from '../components/Logo';
import { INTL_LOCALE, useLocale, useT, type Locale, type MessageKey } from '../i18n';
import { NOTICE } from '../legal/Notice';
import { PRIVACY } from '../legal/Privacy';
import { TERMS } from '../legal/Terms';
import { href, LEGAL, type LegalRoute } from '../route';
import { Footer } from '../sections/Pricing';
import { LEGAL_UPDATED } from '../site';

export const LEGAL_PAGES: Record<LegalRoute, { label: MessageKey; title: MessageKey; body: Record<Locale, ReactNode> }> = {
  'mentions-legales': { label: 'legal.notice', title: 'legal.noticeTitle', body: NOTICE },
  confidentialite: { label: 'legal.privacy', title: 'legal.privacyTitle', body: PRIVACY },
  conditions: { label: 'legal.terms', title: 'legal.termsTitle', body: TERMS },
};

/** Mentions légales, politique de confidentialité, conditions d'utilisation : une page de texte, mêmes barre et pied. */
export function Legal({ page }: { page: LegalRoute }) {
  const t = useT();
  const locale = useLocale();
  const { title, body } = LEGAL_PAGES[page];
  const updated = new Date(`${LEGAL_UPDATED}T12:00:00`).toLocaleDateString(INTL_LOCALE[locale], { dateStyle: 'long' });
  return (
    <>
      <header className="legal-bar theme-dark">
        <div className="wrap">
          <Logo />
          <LanguageSwitch />
          <a href={href('landing')}>{t('legal.back')}</a>
        </div>
      </header>
      <main className="legal wrap">
        <article>
          <h1>{t(title)}</h1>
          <p className="legal-updated">{t('legal.updated', { date: updated })}</p>
          {body[locale]}
        </article>
        <nav className="legal-other" aria-label={t('legal.other')}>
          {LEGAL.filter((other) => other !== page).map((other) => (
            <a key={other} href={href(other)}>
              {t(LEGAL_PAGES[other].label)}
            </a>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
