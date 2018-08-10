// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';

import ContributionsCheckout from 'components/contributionsCheckout/contributionsCheckout';

import { type PageState as State } from '../oneOffContributionsReducer';
import OneoffContributionsPayment from './oneoffContributionsPayment';
import OneoffInlineContributionsPayment from './oneoffInlineContributionsPayment';
import {Dispatch} from "redux";
import {
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setEmailShouldValidate,
} from 'helpers/user/userActions'

// ----- State Maps ----- //

function mapStateToProps(state: State) {

  const inlineCardPaymentVariant = state.common.abParticipations.inlineStripeFlowCardPayment;

  return {
    amount: state.page.oneoffContrib.amount,
    currencyId: state.common.internationalisation.currencyId,
    country: state.common.internationalisation.countryId,
    inlineCardPaymentVariant,
    payment: inlineCardPaymentVariant === 'inline' ?
      <OneoffInlineContributionsPayment /> :
      <OneoffContributionsPayment />,
    name: state.page.user.displayName,
    isSignedIn: state.page.user.isSignedIn,
    stage: state.page.stage,
  };

}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return ({
    setEmailShouldValidate: () => {
      dispatch(setEmailShouldValidate());
    },
    setFirstNameShouldValidate: () => {
      dispatch(setFirstNameShouldValidate());
    },
    setLastNameShouldValidate: () => {
      dispatch(setLastNameShouldValidate());
    },
  });
}



// ----- Exports ----- //

export default connect(mapStateToProps)(ContributionsCheckout);
