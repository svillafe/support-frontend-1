// @flow

// ----- Imports ----- //
import { emailRegexPattern } from 'helpers/utilities';

// ----- Types ----- //
export type UserFormFieldAttribute = {
  value: string,
  shouldValidate: boolean,
  required: boolean,
  pattern: ?string,
  setShouldValidate: () => void,
  setValue: (string) => void,
}

export type User = {
  id: ?string,
  email: string,
  displayName: ?string,
  firstName: string,
  lastName: string,
  isTestUser: ?boolean,
  isPostDeploymentTestUser: boolean,
  fullName: string,
  stateField?: string,
  gnmMarketing: boolean,
  isSignedIn: boolean,
};

// ----- Setup ----- //

const defaultUserFormFieldAttributeState = {
  value: '',
  shouldValidate: false,
  required: true,
};

const initialState: User = {
  id: '',
  firstName: { ...defaultUserFormFieldAttributeState },
  email: { ...defaultUserFormFieldAttributeState, pattern: emailRegexPattern },
  displayName: '',
  lastName: { ...defaultUserFormFieldAttributeState },
  fullName: { ...defaultUserFormFieldAttributeState },
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
