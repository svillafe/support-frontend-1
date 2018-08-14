// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { UserFormFieldAttribute } from 'helpers/user/userReducer';
import ErrorMessage from 'components/errorMessage/errorMessage';

import TextInput from 'components/textInput/textInput';
import { setFullName, setFullNameShouldValidate, type Action } from 'helpers/user/userActions';

// ----- Types ----- //

type PropTypes = {
  nameUpdate: (name: string) => void,
  name: UserFormFieldAttribute,
  setFullNameShouldValidate: () => void,
};


// ----- Component ----- //

const NameFormField = (props: PropTypes) => {
  const showError = props.name.shouldValidate && !props.name.value;
  const modifierClass = ['name'];
  if (showError) {
    modifierClass.push('error');
  }

  return (
    <div>
      <TextInput
        id="name"
        placeholder="Full name"
        labelText="Full name"
        value={props.name.value}
        onChange={props.nameUpdate}
        onBlur={props.setFullNameShouldValidate}
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {

  return {
    nameUpdate: (name: string) => {
      dispatch(setFullName(name));
    },
    setFullNameShouldValidate: () => {
      dispatch(setFullNameShouldValidate());
    },
  };

}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(NameFormField);
