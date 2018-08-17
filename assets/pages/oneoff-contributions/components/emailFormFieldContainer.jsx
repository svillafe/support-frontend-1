// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {type Action as UserAction, userActions } from 'helpers/user/userActions'
import { UserFormFieldAttribute, formFieldError, emailRegexPattern } from 'helpers/checkoutForm'
import EmailFormField from 'components/emailFormField/emailFormField';
import { type Action as CheckoutFormAction, checkoutFormActions } from './contributionsCheckoutContainer/checkoutFormActions';

// ----- State/Action Maps ----- //

function mapStateToProps(state) {
  const emailFormField = {
    value: state.page.user.email,
    shouldValidate: state.page.checkoutForm.email.shouldValidate,
  };
  return {
    stateEmail: emailFormField,
    isSignedIn: state.page.user.isSignedIn,
  };

}

function mapDispatchToProps(dispatch: Dispatch<CheckoutFormAction | UserAction >) {
  return {
    setShouldValidate: () => {
      dispatch(checkoutFormActions().setEmailShouldValidate());
    },
    setValue: (email: string) => {
      dispatch(userActions().setEmail(email));
    },
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {

  const email: UserFormFieldAttribute = {
    ...stateProps.stateEmail,
    ...dispatchProps,
    isValid: formFieldError(stateProps.stateEmail.value, true, emailRegexPattern)
  };

  return {
    isSignedIn: stateProps.isSignedIn,
    email,
  }
}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EmailFormField);
