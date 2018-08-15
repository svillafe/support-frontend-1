// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { UserFormFieldAttribute } from 'helpers/user/userReducer';
import ErrorMessage from 'components/errorMessage/errorMessage';

import TextInput from 'components/textInput/textInput';

// ----- Types ----- //

type PropTypes = {
  name: UserFormFieldAttribute,
  dispatch: Dispatch<*>
};


// ----- Component ----- //

const NameFormField = (props: PropTypes) => {
  const showError = props.name.shouldValidate && !props.name.value;
  const modifierClass = ['name'];
  if (showError) {
    modifierClass.push('error');
  }

  return (
    <div className="component-text-input__input--name__container">
      <TextInput
        id="name"
        placeholder="Full name"
        labelText="Full name"
        value={props.name.value}
        onChange={props.name.setValue(props.dispatch)}
        onBlur={props.name.setShouldValidate(props.dispatch)}
        modifierClasses={modifierClass}
        required
      />
      <ErrorMessage
        showError={showError}
        message="Please enter your name."
      />
    </div>
  );
};


// ----- Map State/Props ----- //

function mapStateToProps(state) {
  const { user } = state.page;
  return {
    name: user.fullName,
    isoCountry: state.common.internationalisation.countryId,
    isSignedIn: state.page.user.isSignedIn,
  };

}

function mapDispatchToProps(dispatch: Dispatch<*>) {

  return {
    dispatch,
  };

}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(NameFormField);
