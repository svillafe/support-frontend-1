// @flow

// ----- Imports ----- //
import { emailRegexPattern } from 'helpers/utilities';
import { UserFormFieldAttribute } from 'helpers/user/userReducer';
import { type Action } from './checkoutFormActions';

// ----- Types ----- //


export type CheckoutFormAttribute = {
  shouldValidate: boolean,
}

export type OneOffContributionsCheckoutFormState = {
  emailField: CheckoutFormAttribute,
  fullName: CheckoutFormAttribute,
};

// ----- Setup ----- //

const initialState: OneOffContributionsCheckoutFormState = {
  email: { shouldValidate: false },
  fullName: { shouldValidate: false },
};


// ----- Reducer ----- //

function checkoutFormReducer(
  state: OneOffContributionsCheckoutFormState = initialState,
  action: Action,
): User {

  switch (action.type) {
    case 'SET_EMAIL_SHOULD_VALIDATE':
      return { ...state, email: { shouldValidate: true } };

    case 'SET_FULL_NAME_SHOULD_VALIDATE':
      return { ...state, fullName: { shouldValidate: true } };

    default:
      return state;
  }

}

export { checkoutFormReducer };
