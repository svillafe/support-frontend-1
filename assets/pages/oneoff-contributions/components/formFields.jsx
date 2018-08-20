// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import TextInput from 'components/textInput/textInput';
import {
  setFullName,
  setEmail,
  type Action as UserAction,
} from 'helpers/user/userActions';
import { type UserFormFieldAttribute, formFieldIsValid, shouldShowError } from 'helpers/checkoutForm/checkoutForm';
import {
  type Action as CheckoutAction,
  setFullNameShouldValidate,
  setEmailShouldValidate,
} from './contributionsCheckoutContainer/checkoutFormActions';


// ----- Types ----- //

type PropTypes = {
  fullName: UserFormFieldAttribute,
  email: UserFormFieldAttribute,
  setFullName: (string) => void,
  setEmail: (string) => void,
  setFullNameShouldValidate: () => void,
  setEmailShouldValidate: () => void,
};

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

  return {
    fullName: {
      value: fullName.value,
      shouldValidate: fullName.shouldValidate,
      isValid: formFieldIsValid(fullName),
    },
    email: {
      value: email.value,
      shouldValidate: email.shouldValidate,
      isValid: formFieldIsValid(email),
    },
  };

}

function mapDispatchToProps(dispatch: Dispatch<UserAction | CheckoutAction>) {

  return {
    setFullNameShouldValidate: () => {
      dispatch(setFullNameShouldValidate());
    },
    setFullName: (fullName: string) => {
      dispatch(setFullName(fullName));
    },
    setEmailShouldValidate: () => {
      dispatch(setEmailShouldValidate());
    },
    setEmail: (email: string) => {
      dispatch(setEmail(email));
    },
  };
}

// ----- Component ----- //

function NameForm(props: PropTypes) {
  return (
    <form className="oneoff-contrib__name-form">
      <TextInput
        id="email"
        value={props.email.value}
        labelText="Email"
        placeholder="Email"
        onChange={props.setEmail}
        onBlur={props.setEmailShouldValidate}
        modifierClasses={['email']}
        showError={shouldShowError(props.email)}
        errorMessage="Please enter a valid email address."
      />
      <TextInput
        id="name"
        placeholder="Full name"
        labelText="Full name"
        value={props.fullName.value}
        onChange={props.setFullName}
        onBlur={props.setFullNameShouldValidate}
        modifierClasses={['name']}
        showError={shouldShowError(props.fullName)}
        errorMessage="Please enter your name."
      />
    </form>
  );
}

// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
