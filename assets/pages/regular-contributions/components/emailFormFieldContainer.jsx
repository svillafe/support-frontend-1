// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';

import { type Action as CheckoutFormAction, checkoutFormActions } from "helpers/checkoutForm/checkoutFormActions";
import {type Action as UserAction, userActions } from 'helpers/user/userActions'
import { UserFormFieldAttribute, showFormFieldError, emailRegexPattern } from 'helpers/checkoutForm/checkoutForm'
import EmailFormField from 'components/emailFormField/emailFormField';
import { Dispatch } from 'redux';

// ----- State/Action Maps ----- //

function mapStateToProps(state) {
  const emailFormField = {
    value: state.page.user.email,
    ...state.page.checkoutForm.email,
  };
  return {
    stateEmail: emailFormField,
    isSignedIn: state.page.user.isSignedIn,
  };

}

function mapDispatchToProps(dispatch: Dispatch<CheckoutFormAction | UserAction >) {
  return {
    setShouldValidate: () => {
      dispatch(checkoutFormActions.setEmailShouldValidate());
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
    showError: showFormFieldError(stateProps.stateEmail.value, true, emailRegexPattern)
  };

  return {
    ...ownProps,
    email,
  }
}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EmailFormField);
