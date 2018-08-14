// @flow

// ----- Imports ----- //

import React from 'react';
import TextInput from 'components/textInput/textInput';
import ErrorMessage from 'components/errorMessage/errorMessage';
import { validateEmailAddress, emailRegexPattern } from 'helpers/utilities';
import type { UserFormFieldAttribute } from 'helpers/user/userReducer';

// ----- Types ----- //

type PropTypes = {
  emailUpdate: (email: string) => void,
  email: UserFormFieldAttribute,
  isSignedIn: boolean,
  setEmailShouldValidate: () => void,
};

// ----- Component ----- //


const EmailFormField = (props: PropTypes) => {

  const showEmailError = props.email.shouldValidate && !validateEmailAddress(props.email.value);

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
        value={props.email.value}
        labelText="Email"
        placeholder="Email"
        onChange={props.emailUpdate}
        onBlur={props.setEmailShouldValidate}
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
