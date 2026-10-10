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

  it('ne connaît plus les écrans de paiement', () => {
    expect(parseRoute('#/paiement')).toBe('landing');
    expect(parseRoute('#/confirmation')).toBe('landing');
  });
});

describe('resolveRoute', () => {
  it('demande un compte avant le téléchargement', () => {
    expect(resolveRoute('acces', 'anonymous')).toBe('connexion');
    expect(resolveRoute('compte', 'anonymous')).toBe('compte');
    expect(resolveRoute('connexion', 'anonymous')).toBe('connexion');
  });

  it('mène un compte connecté droit à son accès', () => {
    expect(resolveRoute('compte', 'licensed')).toBe('acces');
    expect(resolveRoute('connexion', 'licensed')).toBe('acces');
    expect(resolveRoute('acces', 'licensed')).toBe('acces');
  });

  it('bêta terminée : le compte garde son écran d’accès, qui le lui dit', () => {
    expect(resolveRoute('compte', 'unlicensed')).toBe('acces');
    expect(resolveRoute('acces', 'unlicensed')).toBe('acces');
  });
});
