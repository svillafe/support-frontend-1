// @flow

// ----- Imports ----- //

import { roundDp } from 'helpers/utilities';


// ----- Types ----- //

export type Contrib = 'ANNUAL' | 'MONTHLY' | 'ONE_OFF';

export type ContribError =
  | 'tooLittle'
  | 'tooMuch'
  | 'invalidEntry'
  ;

export type Amount = {
  value: string,
  userDefined: boolean,
};

export type Amounts = {
  annual: Amount,
  monthly: Amount,
  oneOff: Amount,
};

export type ParsedContrib = {
  amount: number,
  error: ?ContribError,
};

type Config = {
  [Contrib]: {
    min: number,
    max: number,
    default: number,
  }
}


// ----- Setup ----- //

export const CONFIG: Config = {
  ANNUAL: {
    min: 50,
    max: 5000,
    default: 75,
  },
  MONTHLY: {
    min: 5,
    max: 2000,
    default: 10,
  },
  ONE_OFF: {
    min: 1,
    max: 2000,
    default: 50,
  },
};


// ----- Functions ----- //

export function parse(input: ?string, contrib: Contrib): ParsedContrib {

  let error = null;
  const numericAmount = Number(input);

  if (input === undefined || input === null || input === '' || isNaN(numericAmount)) {
    error = 'invalidEntry';
  } else if (numericAmount < CONFIG[contrib].min) {
    error = 'tooLittle';
  } else if (numericAmount > CONFIG[contrib].max) {
    error = 'tooMuch';
  }

  const amount = error ? CONFIG[contrib].default : roundDp(numericAmount);

  return { error, amount };

}
