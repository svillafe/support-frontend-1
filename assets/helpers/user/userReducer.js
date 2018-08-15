// @flow

// ----- Imports ----- //
import type { Action } from './userActions';
import { emptyInputField, validateEmailAddress } from 'helpers/utilities';

// ----- Types ----- //
export type UserFormFieldAttribute = {
  value: string,
  shouldValidate: boolean,
  isValid: (string) => boolean,
}


export type User = {
  id: ?string,
  email: UserFormFieldAttribute,
  displayName: ?string,
  firstName: UserFormFieldAttribute,
  lastName: UserFormFieldAttribute,
  isTestUser: ?boolean,
  isPostDeploymentTestUser: boolean,
  fullName: UserFormFieldAttribute,
  stateField?: string,
  gnmMarketing: boolean,
  isSignedIn: boolean,
};

// ----- Setup ----- //

const initialState: User = {
  id: '',
  email: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => !emptyInputField(value) && validateEmailAddress(value),
  },
  displayName: '',
  firstName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => !emptyInputField(value),
  },
  lastName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => !emptyInputField(value),
  },
  fullName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => !emptyInputField(value),
  },
  isTestUser: null,
  isPostDeploymentTestUser: false,
  gnmMarketing: false,
  isSignedIn: false,
};


// ----- Reducer ----- //

function userReducer(
  state: User = initialState,
  action: Action,
): User {

  switch (action.type) {
    case 'SET_USER_ID':
      return Object.assign({}, state, { id: action.id });

    case 'SET_DISPLAY_NAME':
      return { ...state, displayName: action.name };

    case 'SET_FIRST_NAME':
      return {
        ...state,
        firstName: {
          value: action.name,
          shouldValidate: state.firstName.shouldValidate,
          isValid: state.firstName.isValid,
        }
      };

    case 'SET_LAST_NAME':
      return {
        ...state,
        lastName: {
          value: action.name,
          shouldValidate: state.lastName.shouldValidate,
          isValid: state.lastName.isValid,
        }
      };

    case 'SET_FULL_NAME':
      return {
        ...state,
        fullName: {
          value: action.name,
          shouldValidate: state.fullName.shouldValidate,
          isValid: state.fullName.isValid,
        }
      };

    case 'SET_TEST_USER':
      return { ...state, isTestUser: action.testUser };

    case 'SET_POST_DEPLOYMENT_TEST_USER':
      return { ...state, isPostDeploymentTestUser: action.postDeploymentTestUser };

    case 'SET_EMAIL':
      return {
        ...state,
        email: {
          value: action.email,
          shouldValidate: state.email.shouldValidate,
          isValid: state.email.isValid,
        }
      };

    case 'SET_STATEFIELD':
      return { ...state, stateField: action.stateField };

    case 'SET_GNM_MARKETING':
      return { ...state, gnmMarketing: action.preference };

    case 'SET_IS_SIGNED_IN':
      return { ...state, isSignedIn: action.isSignedIn };

    case 'SET_FIRST_NAME_SHOULD_VALIDATE':
      return { ...state, firstName: { value: state.firstName.value, shouldValidate: true } };

    case 'SET_LAST_NAME_SHOULD_VALIDATE':
      return { ...state, lastName: { value: state.lastName.value, shouldValidate: true } };

    case 'SET_EMAIL_SHOULD_VALIDATE':
      return { ...state, email: { value: state.email.value, shouldValidate: true } };

    case 'SET_FULL_NAME_SHOULD_VALIDATE':
      return { ...state, fullName: { value: state.fullName.value, shouldValidate: true } };

    default:
      return state;

  }

}

export { userReducer };
