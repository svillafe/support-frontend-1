// @flow

// ----- Imports ----- //

import React from 'react';

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

// ---- Types ----- //

/* eslint-disable react/no-unused-prop-types */
type PropTypes = {|
  amount: number,
  callback: (token: string) => Promise<*>,
  closeHandler: () => void,
  currencyId: IsoCurrency,
  email: string,
  isTestUser: boolean,
  isPostDeploymentTestUser: boolean,
  switchStatus: Status,
  disable: boolean,
  setShouldValidateFunctions: Array<() => void>,
  formClassName: string,
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

function formIsValid(formClassName: string) {
  const form = document.getElementsByClassName(formClassName);
  let isValid = true;
  if (form && form.length > 0) {
    const formElements = [...form[0].getElementsByTagName('input')];
    isValid = formElements && formElements.reduce((acc, el) => acc && el.validity.valid, true);
  }
  return isValid;
}

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
    } else if (formIsValid(props.formClassName)) {
      storage.setSession('paymentMethod', 'Stripe');
      openDialogBox(props.amount, props.email);
    }
    props.setShouldValidateFunctions.forEach(f => f());
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
  setShouldValidateFunctions: [],
};


// ----- Exports ----- //

export default StripePopUpButton;
