// @flow

// ----- Imports ----- //

import { type Stage } from './contributionsCheckoutReducer';


// ----- Types ----- //

export type Action = { type: 'SET_STAGE', stage: Stage };


// ----- Action Creators ----- //

function contributionsCheckoutActions(): Object {

  return {
    submitForm(): Action {
      return { type: 'SUBMIT_FORM' };
    },
    setStage(stage: Stage): Action {
      return { type: 'SET_STAGE', stage};
    },
  };
}



// ----- Exports ----- //

export { contributionsCheckoutActions };