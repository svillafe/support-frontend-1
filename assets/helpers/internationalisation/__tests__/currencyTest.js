// @flow

// ----- Imports ----- //

import { detect, GBP, USD, EUR, AUD, IsoCurrency } from '../currency';

let mockCurrency: ?IsoCurrency = null;

jest.mock('helpers/url', () => ({
  getQueryParameter: () => mockCurrency,
}));

// ----- Tests ----- //

describe('detect currency', () => {

  it('should return the currency for the supplied country group if there is no query parameter set (GBP)', () => {
    mockCurrency = null;
    expect(detect('GBPCountries')).toEqual(GBP);
  });

  it('should return the currency for the supplied country group if there is no query parameter set (USD)', () => {
    mockCurrency = null;
    expect(detect('UnitedStates')).toEqual(USD);
  });

  it('should return GBP if the country group is not recognised', () => {
    mockCurrency = null;
    expect(detect('ZZ')).toEqual(GBP);
  });

  it('should return the currency from the query parameter (USD)', () => {
    mockCurrency = 'USD';
    expect(detect('GBPCountries')).toEqual(USD);
  });

  it('should return the currency from the query parameter (GBP)', () => {
    mockCurrency = 'GBP';
    expect(detect('UnitedStates')).toEqual(GBP);
  });

  it('should return the currency from the query parameter (AUD)', () => {
    mockCurrency = 'AUD';
    expect(detect('UnitedStates')).toEqual(AUD);
  });

  it('should return the currency for the supplied country group if there is no query parameter set (AUDCountries)', () => {
    mockCurrency = null;
    expect(detect('AUDCountries')).toEqual(AUD);
  });

  it('should return the currency from the query parameter (EUR)', () => {
    mockCurrency = 'EUR';
    expect(detect('UnitedStates')).toEqual(EUR);
  });

  it('should return the currency for the supplied country group if there is no query parameter set (EURCountries)', () => {
    mockCurrency = null;
    expect(detect('EURCountries')).toEqual(EUR);
  });

});
