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
import { type UserFormFieldAttribute } from 'helpers/user/userReducer';
import postCheckout from '../helpers/ajax';

// ----- Types ----- //

type PropTypes = {|
  dispatch: Dispatch<*>,
  email: UserFormFieldAttribute,
  fullName: UserFormFieldAttribute,
  error: ?string,
  amount: number,
  referrerAcquisitionData: ReferrerAcquisitionData,
  abParticipations: Participations,
  currencyId: IsoCurrency,
  isTestUser: boolean,
  isPostDeploymentTestUser: boolean,
  stripeSwitchStatus: Status,
  paymentComplete: boolean,
|};


// ----- Map State/Props ----- //

function mapStateToProps(state) {
  return {
    isTestUser: state.page.user.isTestUser || false,
    isPostDeploymentTestUser: state.page.user.isPostDeploymentTestUser,
    email: state.page.user.email,
    fullName: state.page.user.fullName,
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
  return { dispatch };
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
        currencyId={props.currencyId}
        isTestUser={props.isTestUser}
        isPostDeploymentTestUser={props.isPostDeploymentTestUser}
        amount={props.amount}
        switchStatus={props.stripeSwitchStatus}
        disable={false}
        formElements={[props.fullName, props.email]}
        formClassName="oneoff-contrib__name-form"
        dispatch={props.dispatch}
      />
    </section>
  );

}

// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(OneoffContributionsPayment);
