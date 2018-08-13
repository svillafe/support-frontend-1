// @flow

// ----- Imports ----- //

import React from 'react';
import TextInput from 'components/textInput/textInput';
import ErrorMessage from 'components/errorMessage/errorMessage';
import { validateEmailAddress } from 'helpers/utilities';
import type { UserDetail } from 'helpers/user/userReducer'

// ----- Types ----- //

type PropTypes = {
  emailUpdate: (email: string) => void,
  email: UserDetail,
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

  // Copied from
  // https://github.com/playframework/playframework/blob/38abd1ca6d17237950c82b1483057c5c39929cb4/framework/src/play/
  // src/main/scala/play/api/data/validation/Validation.scala#L80
  // but with minor modification (last * becomes +) to enforce at least one dot in domain.  This is
  // for compatibility with Stripe
  const emailRegexPattern =  "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$";


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
