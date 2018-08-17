// @flow

// ----- Types ----- //

import { setSession } from 'helpers/storage';

export type Action =
  | { type: 'SET_EMAIL_SHOULD_VALIDATE' }
  | { type: 'SET_FIRST_NAME_SHOULD_VALIDATE' }
  | { type: 'SET_LAST_NAME_SHOULD_VALIDATE' }
  | { type: 'SET_FULL_NAME_SHOULD_VALIDATE' };


// ----- Actions Creators ----- //


export function contributionsCheckoutActions(): Object {
  return {
    setEmailShouldValidate(): Action {
      return { type: 'SET_EMAIL_SHOULD_VALIDATE' };
    },
    setFirstNameShouldValidate(): Action {
      return { type: 'SET_FIRST_NAME_SHOULD_VALIDATE' };
    },
    setLastNameShouldValidate(): Action {
      return { type: 'SET_LAST_NAME_SHOULD_VALIDATE' };
    },
    setFullNameShouldValidate(): Action {
      return { type: 'SET_FULL_NAME_SHOULD_VALIDATE' };
    },
  }
}





