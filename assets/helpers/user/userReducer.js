// @flow

// ----- Imports ----- //
import { emptyInputField, validateEmailAddress } from 'helpers/utilities';
import {
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setEmailShouldValidate,
  setFullNameShouldValidate,
  setEmail,
  setFirstName,
  setLastName,
  setFullName,
  type Action,
} from './userActions';

// ----- Types ----- //
export type UserFormFieldAttribute = {
  value: string,
  shouldValidate: boolean,
  isValid: (string) => boolean,
  setShouldValidate: (Function) => () => void,
  setValue: (Function) => (string) => void,
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

// We provide a fallback validation function as sometimes the field may not be present
// but the state will be - for example, if the user is signed in, their email address
// is stored in the state but there is no email form on the page
function formElementIsValid(elementId: string, fallbackValidation?: boolean = false) {
  const element = document && document.getElementById(elementId);
  if (element && element instanceof HTMLInputElement) {
    return element.validity.valid;
  }
  return fallbackValidation;
}

// ----- Setup ----- //

const initialState: User = {
  id: '',
  firstName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => formElementIsValid('first-name'),
    setShouldValidate: (dispatch: Function) => () => dispatch(setFirstNameShouldValidate()),
    setValue: (dispatch: Function) => (value: string) => dispatch(setFirstName(value)),
  },
  email: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => formElementIsValid('email', !emptyInputField(value) && validateEmailAddress(value)),
    setShouldValidate: (dispatch: Function) => () => dispatch(setEmailShouldValidate()),
    setValue: (dispatch: Function) => (value: string) => dispatch(setEmail(value)),
  },
  displayName: '',
  lastName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => formElementIsValid('last-name'),
    setShouldValidate: (dispatch: Function) => () => dispatch(setLastNameShouldValidate()),
    setValue: (dispatch: Function) => (value: string) => dispatch(setLastName(value)),
  },
  fullName: {
    value: '',
    shouldValidate: false,
    isValid: (value: string) => formElementIsValid('name'),
    setShouldValidate: (dispatch: Function) => () => dispatch(setFullNameShouldValidate()),
    setValue: (dispatch: Function) => (value: string) => dispatch(setFullName(value)),
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
      return { ...state, firstName: { ...state.firstName, value: action.name } };

    case 'SET_LAST_NAME':
      return { ...state, lastName: { ...state.lastName, value: action.name } };


    case 'SET_FULL_NAME':
      return { ...state, fullName: { ...state.fullName, value: action.name } };


    case 'SET_TEST_USER':
      return { ...state, isTestUser: action.testUser };

    case 'SET_POST_DEPLOYMENT_TEST_USER':
      return { ...state, isPostDeploymentTestUser: action.postDeploymentTestUser };

    case 'SET_EMAIL':
      return { ...state, email: { ...state.email, value: action.email } };


    case 'SET_STATEFIELD':
      return { ...state, stateField: action.stateField };

    case 'SET_GNM_MARKETING':
      return { ...state, gnmMarketing: action.preference };

    case 'SET_IS_SIGNED_IN':
      return { ...state, isSignedIn: action.isSignedIn };

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

export { userReducer };
