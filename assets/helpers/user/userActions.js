// @flow

// ----- Types ----- //

import { setSession } from 'helpers/storage';

export type Action =
  | { type: 'SET_USER_ID', id: string }
  | { type: 'SET_DISPLAY_NAME', name: string }
  | { type: 'SET_FIRST_NAME', name: string }
  | { type: 'SET_LAST_NAME', name: string }
  | { type: 'SET_FULL_NAME', name: string }
  | { type: 'SET_EMAIL', email: string }
  | { type: 'SET_STATEFIELD', stateField: string }
  | { type: 'SET_TEST_USER', testUser: boolean }
  | { type: 'SET_POST_DEPLOYMENT_TEST_USER', postDeploymentTestUser: boolean }
  | { type: 'SET_GNM_MARKETING', preference: boolean }
  | { type: 'SET_IS_SIGNED_IN', isSignedIn: boolean };


// ----- Actions Creators ----- //


export function userActions(): Object {
  return {
    setId(id: string): Action {
      return { type: 'SET_USER_ID', id };
    },
    setDisplayName(name: string): Action {
      return { type: 'SET_DISPLAY_NAME', name };
    },
    setFirstName(name: string): Action {
      return { type: 'SET_FIRST_NAME', name };
    },
    setLastName(name: string): Action {
      return { type: 'SET_LAST_NAME', name };
    },
    setFullName(name: string): Action {
      return { type: 'SET_FULL_NAME', name };
    },
    setIsSignedIn(isSignedIn: boolean): Action {
      return { type: 'SET_IS_SIGNED_IN', isSignedIn };
    },
    setEmail(email: string): Action {
      setSession('gu.email', email);
      return { type: 'SET_EMAIL', email };
    },
    setStateField(stateField: string): Action {
      return { type: 'SET_STATEFIELD', stateField };
    },
    setTestUser(testUser: boolean): Action {
      return { type: 'SET_TEST_USER', testUser };
    },
    setPostDeploymentTestUser(postDeploymentTestUser: boolean): Action {
      return { type: 'SET_POST_DEPLOYMENT_TEST_USER', postDeploymentTestUser };
    },
    setGnmMarketing(preference: boolean): Action {
      return { type: 'SET_GNM_MARKETING', preference };
    },
  }
}





