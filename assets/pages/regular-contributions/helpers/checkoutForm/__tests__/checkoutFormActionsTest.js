// @flow
import {
  setEmailShouldValidate,
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setStage,
} from '../checkoutFormActions';


describe('Checkout form', () => {

  it('should create an action to set the shouldValidate on the checkout form email field', () => {
    const expectedAction = { type: 'SET_EMAIL_SHOULD_VALIDATE', shouldValidate: true };
    expect(setEmailShouldValidate(true)).toEqual(expectedAction);
  });

  it('should create an action to set the shouldValidate on the checkout form first name field', () => {
    const expectedAction = { type: 'SET_FIRST_NAME_SHOULD_VALIDATE', shouldValidate: true };
    expect(setFirstNameShouldValidate(true)).toEqual(expectedAction);
  });

  it('should create an action to set the shouldValidate on the checkout form last name field', () => {
    const expectedAction = { type: 'SET_LAST_NAME_SHOULD_VALIDATE', shouldValidate: true };
    expect(setLastNameShouldValidate(true)).toEqual(expectedAction);
  });

  it('should create an action to set the stage ', () => {
    const expectedAction = { type: 'SET_STAGE', stage: 'payment' };
    expect(setStage('payment')).toEqual(expectedAction);
  });

});
