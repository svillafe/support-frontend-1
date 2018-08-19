// @flow

// ----- Types ----- //

export type Action =
  | { type: 'SET_FULL_NAME_SHOULD_VALIDATE' }
  | { type: 'SET_EMAIL_SHOULD_VALIDATE' }


// ----- Actions Creators ----- //


export function checkoutFormActions(): Object {
  return {
    setEmailShouldValidate(): Action {
      return { type: 'SET_EMAIL_SHOULD_VALIDATE' };
    },
    setFullNameShouldValidate(): Action {
      return { type: 'SET_FULL_NAME_SHOULD_VALIDATE' };
    },
  };
}
