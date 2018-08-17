// @flow

// ----- Imports ----- //
import { emailRegexPattern } from 'helpers/utilities';
import { UserFormFieldAttribute } from 'helpers/user/userReducer';
import { type Action } from './contributionsCheckoutActions';

// ----- Types ----- //


export type CheckoutFormAttribute = {
  required: boolean,
  pattern: ?string,
  shouldValidate: boolean,
}

export type CheckoutForm = {
  emailField: CheckoutFormAttribute,
  firstNameField: CheckoutFormAttribute,
  lastName: CheckoutFormAttribute,
  fullName: CheckoutFormAttribute,
};

// ----- Setup ----- //

const defaultCheckoutFormFieldAttributeState = {
  required: true,
  shouldValidate: false,
};

const initialState: CheckoutForm = {
  firstName: { ...defaultCheckoutFormFieldAttributeState },
  email: { ...defaultCheckoutFormFieldAttributeState, pattern: emailRegexPattern },
  lastName: { ...defaultCheckoutFormFieldAttributeState },
  fullName: { ...defaultCheckoutFormFieldAttributeState },
};


// ----- Reducer ----- //

function contributionsCheckoutReducer(
  state: CheckoutForm = initialState,
  action: Action,
): User {

  switch (action.type) {
    case 'SET_FIRST_NAME_SHOULD_VALIDATE':
      return { ...state, firstName: { ...state.firstName, shouldValidate: true } };

    case 'SET_LAST_NAME_SHOULD_VALIDATE':
      return { ...state, lastName: { ...state.lastName, shouldValidate: true } };

    case 'SET_EMAIL_SHOULD_VALIDATE':
      return { ...state, email: { ...state.email, shouldValidate: true } };

    case 'SET_FULL_NAME_SHOULD_VALIDATE':
      return { ...state, fullName: { ...state.fullName, shouldValidate: true } };

    default:
      return state;
  }

}

export { contributionsCheckoutReducer };
