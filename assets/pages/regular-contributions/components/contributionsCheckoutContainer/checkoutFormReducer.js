// @flow

// ----- Imports ----- //
import { emailRegexPattern } from 'helpers/utilities';
import { UserFormFieldAttribute } from 'helpers/user/userReducer';
import { type Action } from 'helpers/checkoutForm/checkoutFormActions';

// ----- Types ----- //


export type CheckoutFormAttribute = {
  shouldValidate: boolean,
}

export type RegularContributionsCheckoutFormState = {
  emailField: CheckoutFormAttribute,
  firstNameField: CheckoutFormAttribute,
  lastNameField: CheckoutFormAttribute,
};

// ----- Setup ----- //

const initialState: RegularContributionsCheckoutFormState = {
  firstName: { shouldValidate: false },
  email: { shouldValidate: false },
  lastName: { shouldValidate: false },
};


// ----- Reducer ----- //

function checkoutFormReducer(
  state: RegularContributionsCheckoutFormState = initialState,
  action: Action,
): User {

  switch (action.type) {
    case 'SET_FIRST_NAME_SHOULD_VALIDATE':
      return { ...state, firstName: { shouldValidate: true } };

    case 'SET_LAST_NAME_SHOULD_VALIDATE':
      return { ...state, lastName: { shouldValidate: true } };

    case 'SET_EMAIL_SHOULD_VALIDATE':
      return { ...state, email: { shouldValidate: true } };

    case 'SET_FULL_NAME_SHOULD_VALIDATE':
      return { ...state, fullName: { shouldValidate: true } };

    default:
      return state;
  }

}

export { checkoutFormReducer };
