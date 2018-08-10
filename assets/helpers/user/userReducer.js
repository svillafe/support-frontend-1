// @flow

// ----- Imports ----- //
import type { Action } from './userActions';


// ----- Types ----- //
export type UserDetail = {
  value: ?string,
  shouldValidate: boolean,
}


export type User = {
  id: ?string,
  email: UserDetail,
  displayName: ?string,
  firstName: UserDetail,
  lastName: UserDetail,
  isTestUser: ?boolean,
  isPostDeploymentTestUser: boolean,
  fullName?: UserDetail,
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
  },
  displayName: '',
  firstName: {
    value: '',
    shouldValidate: false,
  },
  lastName: {
    value: '',
    shouldValidate: false,
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
      return { ...state, displayName: action.name};

    case 'SET_FIRST_NAME':
      return { ...state, firstName: { value: action.name, shouldValidate: state.firstName.shouldValidate} };

    case 'SET_LAST_NAME':
      return { ...state, lastName: { value: action.name, shouldValidate: state.lastName.shouldValidate} };

    case 'SET_FULL_NAME':
      return { ...state, fullName: { value: action.name, shouldValidate: state.fullName.shouldValidate} };

    case 'SET_TEST_USER':
      return { ...state, isTestUser: action.testUser};

    case 'SET_POST_DEPLOYMENT_TEST_USER':
      return { ...state, isPostDeploymentTestUser: action.postDeploymentTestUser};

    case 'SET_EMAIL':
      return { ...state, email: { value: action.email, shouldValidate: state.email.shouldValidate} };

    case 'SET_STATEFIELD':
      return { ...state, stateField: action.stateField};

    case 'SET_GNM_MARKETING':
      return { ...state, gnmMarketing: action.preference};

    case 'SET_IS_SIGNED_IN':
      return { ...state, isSignedIn: action.isSignedIn};

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
