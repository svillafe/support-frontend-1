// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { Redirect } from 'react-router';

import { routes } from 'helpers/routes';
import StripePopUpButton from 'components/paymentButtons/stripePopUpButton/stripePopUpButton';
import ErrorMessage from 'components/errorMessage/errorMessage';
import type { ReferrerAcquisitionData } from 'helpers/tracking/acquisitions';
import type { Participations } from 'helpers/abTests/abtest';
import type { IsoCurrency } from 'helpers/internationalisation/currency';
import type { Status } from 'helpers/switch';
import { type UserFormFieldAttribute, formFieldIsValid } from 'helpers/checkoutForm/checkoutForm';
import postCheckout from '../helpers/ajax';
import { setFullNameShouldValidate, setEmailShouldValidate } from './contributionsCheckoutContainer/checkoutFormActions';

// ----- Types ----- //

type PropTypes = {|
  dispatch: Function,
  email: string,
  setShouldValidateFunctions: Array<() => void>,
  error: ?string,
  amount: number,
  referrerAcquisitionData: ReferrerAcquisitionData,
  abParticipations: Participations,
  currencyId: IsoCurrency,
  isTestUser: boolean,
  isPostDeploymentTestUser: boolean,
  stripeSwitchStatus: Status,
  paymentComplete: boolean,
  formFields: Array<UserFormFieldAttribute>
|};


// ----- Map State/Props ----- //

function mapStateToProps(state) {

  const fullName = {
    value: state.page.user.fullName,
    ...state.page.checkoutForm.fullName,
  };

  const email = {
    value: state.page.user.email,
    ...state.page.checkoutForm.email,
  };

  const fullNameFormField = {
    value: fullName.value,
    shouldValidate: state.page.checkoutForm.fullName.shouldValidate,
    isValid: formFieldIsValid(fullName),
  };
  const emailFormField = {
    value: email.value,
    shouldValidate: state.page.checkoutForm.email.shouldValidate,
    isValid: formFieldIsValid(email),
  };

  return {
    isTestUser: state.page.user.isTestUser || false,
    isPostDeploymentTestUser: state.page.user.isPostDeploymentTestUser,
    email: email.value,
    formFields: [emailFormField, fullNameFormField],
    error: state.page.oneoffContrib.error,
    amount: state.page.oneoffContrib.amount,
    referrerAcquisitionData: state.common.referrerAcquisitionData,
    abParticipations: state.common.abParticipations,
    currencyId: state.common.internationalisation.currencyId,
    stripeSwitchStatus: state.common.switches.oneOffPaymentMethods.stripe,
    paymentComplete: state.page.oneoffContrib.paymentComplete || false,
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    dispatch,
    setShouldValidateFunctions: [
      () => dispatch(setFullNameShouldValidate()),
      () => dispatch(setEmailShouldValidate()),
    ],
  };
}

// ----- Component ----- //

/*
 * WARNING: we are using the React context here to be able to pass the getState function
 * to the postCheckout function. PostCheckout requires this function to access to the
 * most recent user.
 * More information here:https://reactjs.org/docs/context.html
 * You should not use context for other purposes. Please use redux.
 */
function OneoffContributionsPayment(props: PropTypes, context) {
  return (
    <section className="oneoff-contribution-payment">
      { props.paymentComplete ? <Redirect to={{ pathname: routes.oneOffContribThankyou }} /> : null }
      <ErrorMessage message={props.error} />
      <StripePopUpButton
        email={props.email}
        callback={postCheckout(
          props.abParticipations,
          props.dispatch,
          props.amount,
          props.currencyId,
          props.referrerAcquisitionData,
          context.store.getState,
        )}
        formFieldsAreValid={(formFields: Array<UserFormFieldAttribute>) => formFields.every(f => f.isValid)}
        setShouldValidateOnFormFields={() => props.setShouldValidateFunctions.forEach(f => f())}
        currencyId={props.currencyId}
        isTestUser={props.isTestUser}
        isPostDeploymentTestUser={props.isPostDeploymentTestUser}
        amount={props.amount}
        switchStatus={props.stripeSwitchStatus}
        disable={false}
        formFields={props.formFields}
      />
    </section>
  );

}

// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(OneoffContributionsPayment);
