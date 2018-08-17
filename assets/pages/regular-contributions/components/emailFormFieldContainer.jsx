// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';

import { type Action as CheckoutAction, contributionsCheckoutActions } from "./contributionsCheckoutContainer/contributionsCheckoutActions";
import {type Action as UserAction, userActions } from 'helpers/user/userActions'
import { contributionsCheckoutActions } from "./contributionsCheckoutContainer/contributionsCheckoutActions";
import { UserFormFieldAttribute, showFormFieldError } from 'helpers/checkouts'
import { Dispatch } from 'redux';

// ----- State/Action Maps ----- //

function mapStateToProps(state) {
  const emailFormField = {
    value: state.page.user.email,
    ...state.page.checkoutFormFields.email,
  };
  return {
    stateEmail: emailFormField,
    isSignedIn: state.page.user.isSignedIn,
  };

}

function mapDispatchToProps(dispatch: Dispatch<CheckoutAction | UserAction >) {
  return {
    setShouldValidate: () => {
      dispatch(contributionsCheckoutActions.setEmailShouldValidate());
    },
    setValue: (email: string) => {
      dispatch(userActions.setEmail(email));
    },

  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {

  const email: UserFormFieldAttribute = {
    ...stateProps.stateEmail,
    ...dispatchProps,
  };

  return {
    email,
    emailError: showFormFieldError(email),
  }
}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EmailFormField);
