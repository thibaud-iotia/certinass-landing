import { afterEach, describe, expect, it } from 'vitest';
import { CATALOG, format, getLocale, placeholders, resolveLocale, setLocale, t, type MessageKey } from '.';

afterEach(() => setLocale('fr'));

describe('resolveLocale', () => {
  it('le choix explicite l’emporte sur le navigateur', () => {
    expect(resolveLocale('en', ['fr-FR'])).toBe('en');
    expect(resolveLocale('fr', ['en-US'])).toBe('fr');
  });

  it('sans choix : première langue prise en charge, variantes régionales comprises', () => {
    expect(resolveLocale(null, ['fr-CA', 'en-US'])).toBe('fr');
    expect(resolveLocale(null, ['en-GB'])).toBe('en');
    expect(resolveLocale(null, ['de-DE', 'fr-FR'])).toBe('fr');
  });

  it('navigateur sans langue prise en charge : anglais ; aucune langue : français ; choix inconnu : ignoré', () => {
    expect(resolveLocale(null, ['de-DE', 'ja-JP'])).toBe('en');
    expect(resolveLocale(undefined, [])).toBe('fr');
    expect(resolveLocale('de', ['fr-FR'])).toBe('fr');
  });
});

describe('format', () => {
  it('remplace les repères ; paramètre absent : le repère reste visible', () => {
    expect(format('Activée sur « {device} »', { device: 'PC-Salon' })).toBe('Activée sur « PC-Salon »');
    expect(format('Payer {amount}')).toBe('Payer {amount}');
    expect(format('Payer {amount}', {})).toBe('Payer {amount}');
  });
});

describe('t', () => {
  it('traduit dans la langue courante, ou dans celle demandée', () => {
    expect(t('pricing.buy')).toBe('Obtenir ma clé bêta');
    setLocale('en');
    expect(getLocale()).toBe('en');
    expect(t('pricing.buy')).toBe('Get my beta key');
    expect(t('pricing.buy', undefined, 'fr')).toBe('Obtenir ma clé bêta');
  });

  it('clé inconnue : la clé elle-même', () => {
    expect(t('pricing.inconnue' as MessageKey)).toBe('pricing.inconnue');
  });
});

describe('CATALOG', () => {
  const domains = Object.entries(CATALOG) as [string, Record<'fr' | 'en', Record<string, string>>][];

  it('aucun message vide, et les mêmes repères dans les deux langues', () => {
    for (const [domain, { fr, en }] of domains) {
      for (const key of Object.keys(fr)) {
        expect(fr[key], `${domain}.${key} (fr)`).not.toBe('');
        expect(en[key], `${domain}.${key} (en)`).not.toBe('');
        expect(placeholders(en[key]), `${domain}.${key}`).toEqual(placeholders(fr[key]));
      }
    }
  });
});
