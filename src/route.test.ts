import { describe, expect, it } from 'vitest';
import { parseRoute, resolveRoute } from './route';

describe('parseRoute', () => {
  it('reconnaît les écrans du parcours', () => {
    expect(parseRoute('#/compte')).toBe('compte');
    expect(parseRoute('#/acces')).toBe('acces');
  });

  it('laisse les ancres et les fragments inconnus à la page de présentation', () => {
    expect(parseRoute('')).toBe('landing');
    expect(parseRoute('#tarif')).toBe('landing');
    expect(parseRoute('#/inconnu')).toBe('landing');
  });
});

describe('resolveRoute', () => {
  it('demande un compte avant le paiement et le téléchargement', () => {
    expect(resolveRoute('paiement', 'anonymous')).toBe('compte');
    expect(resolveRoute('acces', 'anonymous')).toBe('connexion');
    expect(resolveRoute('confirmation', 'anonymous')).toBe('connexion');
  });

  it('envoie un compte sans licence au paiement', () => {
    expect(resolveRoute('compte', 'unlicensed')).toBe('paiement');
    expect(resolveRoute('connexion', 'unlicensed')).toBe('paiement');
    expect(resolveRoute('acces', 'unlicensed')).toBe('paiement');
  });

  it('attend la licence au retour du paiement', () => {
    expect(resolveRoute('confirmation', 'unlicensed')).toBe('confirmation');
    expect(resolveRoute('confirmation', 'licensed')).toBe('acces');
  });

  it('ne fait pas payer deux fois', () => {
    expect(resolveRoute('compte', 'licensed')).toBe('acces');
    expect(resolveRoute('paiement', 'licensed')).toBe('acces');
  });
});
