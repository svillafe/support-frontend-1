// @flow

// ----- Imports ----- //

import {
  validateContribution,
  parseContribution,
  getMinContribution,
} from '../contributions';


// ----- Tests ----- //

describe('contributions', () => {

  describe('validateContribution', () => {

    it('should return "TooLittle" for contributions below the minimum', () => {
      [
        [1, 'MONTHLY', 'GBPCountries'],
        [5, 'ANNUAL', 'AUDCountries'],
        [0.5, 'ONE_OFF', 'EURCountries'],
      ].forEach(a => expect(validateContribution(...a)).toBe('TooLittle'));
    });

    it('should return "TooMuch" for contributions above the maximum', () => {
      [
        [200, 'MONTHLY', 'UnitedStates'],
        [2030, 'ANNUAL', 'International'],
        [2030, 'ONE_OFF', 'Canada'],
      ].forEach(a => expect(validateContribution(...a)).toBe('TooMuch'));
    });

    it('should return null for contributions that are OK', () => {
      [
        [100, 'MONTHLY', 'NZDCountries'],
        [100, 'ANNUAL', 'UnitedStates'],
        [100, 'ONE_OFF', 'GBPCountries'],
      ].forEach(a => expect(validateContribution(...a)).toBeNull());
    });

  });

  describe('parseContribution', () => {

    it('should parse and format contribution strings that are valid', () => {
      expect(parseContribution('22.5')).toEqual({ valid: true, amount: 22.50 });
      expect(parseContribution('0.4')).toEqual({ valid: true, amount: 0.40 });
      expect(parseContribution('9.555')).toEqual({ valid: true, amount: 9.56 });
    });

    it('should return an error for invalid contribution strings', () => {
      expect(parseContribution('a word')).toEqual({ error: 'ParseError' });
    });

  });

  describe('getMinContribution', () => {
    it('should retrieve the minimum contribution', () => {
      expect(getMinContribution('ONE_OFF', 'GBPCountries')).toBe(1);
    });
  });

});
