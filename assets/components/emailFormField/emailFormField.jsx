// @flow

// ----- Imports ----- //

import React from 'react';
import TextInput from 'components/textInput/textInput';
import ErrorMessage from 'components/errorMessage/errorMessage';
import { emailRegexPattern, UserFormFieldAttribute } from 'helpers/checkoutForm/checkoutForm';

// ----- Types ----- //

type PropTypes = {
  email: UserFormFieldAttribute,
  isSignedIn: boolean,
};

// ----- Component ----- //


const EmailFormField = (props: PropTypes) => {
  const emailValue = props.email.value;

  if (props.isSignedIn) {
    return null;
  }

  const modifierClass = ['email'];

  if (props.email.showError) {
    modifierClass.push('error');
  }

  return (
    <div className="component-email-form-field">
      <TextInput
        id="email"
        value={emailValue}
        labelText="Email"
        placeholder="Email"
        onChange={props.email.setValue}
        onBlur={props.email.setShouldValidate}
        modifierClasses={modifierClass}
        type="email"
        pattern={emailRegexPattern}
        required
      />
      <ErrorMessage
        showError={props.email.showError}
        message="Please enter a valid email address."
      />
    </div>
  );

};

// ----- Exports ----- //

export default EmailFormField;
