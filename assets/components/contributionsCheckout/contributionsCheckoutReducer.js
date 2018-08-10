// @flow

// ----- Imports ----- //

import { type CommonState } from 'helpers/page/page';

import { type Action } from './contributionsCheckoutActions';


// ----- Types ----- //

export type Stage = 'checkout' | 'payment';

type PageState = {
  stage: Stage;
};

// ----- Reducer ----- //

const initialState = {
  stage: 'checkout',
};

function contributionsCheckoutReducerFor(): Function {
  function contributionsCheckoutReducer(state: PageState = initialState, action: Action): PageState {

    switch (action.type) {

      case 'SET_STAGE':
        return {...state, stage: action.stage, scope: action.scope};

      default:
        return state;

    }
  }

  return contributionsCheckoutReducer;

}


// ----- Export ----- //

export { contributionsCheckoutReducerFor };
