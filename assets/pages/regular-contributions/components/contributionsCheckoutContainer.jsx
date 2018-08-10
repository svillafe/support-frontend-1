// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';

import ContributionsCheckout from 'components/contributionsCheckout/contributionsCheckout';

import { type PageState as State } from '../regularContributionsReducer';
import RegularContributionsPayment from './regularContributionsPayment';
import RegularInlineContributionsPayment from './regularInlineContributionsPayment';
import {Dispatch} from "redux";
import { contributionsCheckoutActions } from 'components/contributionsCheckout/contributionsCheckoutActions'
import {
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setEmailShouldValidate,
} from 'helpers/user/userActions'
// ----- State Maps ----- //


function mapStateToProps(state: State) {

  const inlineCardPaymentVariant = state.common.abParticipations.inlineStripeFlowCardPayment;

  return {
    amount: state.page.regularContrib.amount,
    currencyId: state.common.internationalisation.currencyId,
    country: state.common.internationalisation.countryId,
    inlineCardPaymentVariant,
    payment: inlineCardPaymentVariant === 'inline' ?
      <RegularInlineContributionsPayment /> :
      <RegularContributionsPayment />,
    name: state.page.user.displayName,
    isSignedIn: state.page.user.isSignedIn,
    stage: state.page.checkoutReducer.stage,
  };

}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return ({
    setStage: () => {
      dispatch(contributionsCheckoutActions().setStage('payment'));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(ContributionsCheckout);
