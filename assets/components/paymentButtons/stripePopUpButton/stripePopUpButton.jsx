// @flow

// ----- Imports ----- //

import React from 'react';

import type { Dispatch } from 'redux';
import SvgCreditCard from 'components/svgs/creditCard';
import Switchable from 'components/switchable/switchable';
import PaymentError from 'components/switchable/errorComponents/paymentError';
import type { Status } from 'helpers/switch';
import { type IsoCurrency } from 'helpers/internationalisation/currency';
import * as storage from 'helpers/storage';
import {
  setupStripeCheckout,
  openDialogBox,
} from 'helpers/paymentIntegrations/stripeCheckout';
import { classNameWithModifiers } from 'helpers/utilities';
import type { UserFormFieldAttribute } from 'helpers/user/userReducer';

// ---- Types ----- //

/* eslint-disable react/no-unused-prop-types */
type PropTypes = {|
  amount: number,
  callback: (token: string) => Promise<*>,
  closeHandler: () => void,
  currencyId: IsoCurrency,
  email: UserFormFieldAttribute,
  isTestUser: boolean,
  isPostDeploymentTestUser: boolean,
  switchStatus: Status,
  disable: boolean,
  formElements: Array<UserFormFieldAttribute>,
  formClassName: string,
  dispatch: Dispatch<*>
|};
/* eslint-enable react/no-unused-prop-types */


// ----- Functions ----- //

function isStripeSetup(): boolean {
  return window.StripeCheckout !== undefined;
}


// ----- Component ----- //

const StripePopUpButton = (props: PropTypes) => (
  <Switchable
    status={props.switchStatus}
    component={() => <Button {...props} />}
    fallback={() => <PaymentError paymentMethod="credit/debit card" />}
  />
);

// ----- Auxiliary Components ----- //

function Button(props: PropTypes) {

  if (!isStripeSetup()) {
    setupStripeCheckout(props.callback, props.closeHandler, props.currencyId, props.isTestUser);
  }

  const onClick = () => {
    // Don't open Stripe Checkout for automated tests, call the backend immediately
    if (props.isPostDeploymentTestUser) {
      const testTokenId = 'tok_visa';
      props.callback(testTokenId);
    } else if (props.formElements.every(el => el.isValid(el.value))) {
      storage.setSession('paymentMethod', 'Stripe');
      openDialogBox(props.amount, props.email.value);
    }
    props.formElements.forEach(f => f.setShouldValidate(props.dispatch)());
  };

  const baseClass = 'component-stripe-pop-up-button';
  const className: string = props.disable
    ? classNameWithModifiers(baseClass, ['disable'])
    : baseClass;

  return (
    <button
      id="qa-pay-with-card"
      className={className}
      onClick={onClick}
      disabled={props.disable}
    >
      Pay with debit/credit card <SvgCreditCard />
    </button>
  );

}


// ----- Default Props ----- //

StripePopUpButton.defaultProps = {
  closeHandler: () => {},
  switchStatus: 'On',
  formElements: [],
};


// ----- Exports ----- //

export default StripePopUpButton;
