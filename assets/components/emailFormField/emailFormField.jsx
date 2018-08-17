// @flow

// ----- Imports ----- //

import React from 'react';
import TextInput from 'components/textInput/textInput';
import ErrorMessage from 'components/errorMessage/errorMessage';
import { emailRegexPattern } from 'helpers/utilities';
import type { UserFormFieldAttribute } from 'helpers/user/userReducer';
import type { Dispatch } from 'redux';

// ----- Types ----- //

type PropTypes = {
  email: UserFormFieldAttribute,
  isSignedIn: boolean,
};

// ----- Component ----- //


const EmailFormField = (props: PropTypes) => {
  const emailValue = props.email.value;
  const showEmailError = props.email.shouldValidate && !props.email.isValid(emailValue);

  if (props.isSignedIn) {
    return null;
  }

  const modifierClass = ['email'];

  if (showEmailError) {
    modifierClass.push('error');
  }

  return (
    <div className="component-email-form-field">
      <TextInput
        id="email"
        value={emailValue}
        labelText="Email"
        placeholder="Email"
        onChange={props.onChange}
        onBlur={props.onBlur}
        modifierClasses={modifierClass}
        type="email"
        pattern={emailRegexPattern}
        required
      />
      <ErrorMessage
        showError={showEmailError}
        message="Please enter a valid email address."
      />
    </div>
  );

};

// ----- Exports ----- //

export default EmailFormField;
