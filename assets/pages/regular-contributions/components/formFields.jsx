// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import TextInput from 'components/textInput/textInput';
import SelectInput from 'components/selectInput/selectInput';

import {
  setFirstName,
  setLastName,
  setEmail,
  setStateField,
  type Action as UserAction,
} from 'helpers/user/userActions';
import { setCountry, type Action as PageAction } from 'helpers/page/pageActions';
import { usStates, countries, caStates } from 'helpers/internationalisation/country';
import { countryGroups } from 'helpers/internationalisation/countryGroup';
import type { IsoCountry, UsState, CaState } from 'helpers/internationalisation/country';
import type { SelectOption } from 'components/selectInput/selectInput';
import type { CountryGroupId } from 'helpers/internationalisation/countryGroup';
import { type UserFormFieldAttribute, formFieldIsValid, shouldShowError } from 'helpers/checkoutForm/checkoutForm';
import {
  type Action as CheckoutAction,
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setEmailShouldValidate,
} from './contributionsCheckoutContainers/checkoutFormActions';


// ----- Types ----- //

type PropTypes = {
  stateUpdate: (value: UsState | CaState) => void,
  countryUpdate: (value: string) => void,
  firstName: UserFormFieldAttribute,
  lastName: UserFormFieldAttribute,
  email: UserFormFieldAttribute,
  setFirstName: (string) => void,
  setLastName: (string) => void,
  setEmail: (string) => void,
  setFirstNameShouldValidate: () => void,
  setLastNameShouldValidate: () => void,
  setEmailShouldValidate: () => void,
  countryGroup: CountryGroupId,
  country: IsoCountry,
};

// ----- Map State/Props ----- //

function mapStateToProps(state) {


  const firstName = {
    value: state.page.user.firstName,
    ...state.page.checkoutForm.firstName,
  };

  const lastName = {
    value: state.page.user.lastName,
    ...state.page.checkoutForm.lastName,
  };

  const email = {
    value: state.page.user.email,
    ...state.page.checkoutForm.email,
  };


  return {
    firstName: {
      value: firstName.value,
      shouldValidate: firstName.shouldValidate,
      isValid: formFieldIsValid(firstName),
    },
    lastName: {
      value: lastName.value,
      shouldValidate: lastName.shouldValidate,
      isValid: formFieldIsValid(lastName),
    },
    email: {
      value: email.value,
      shouldValidate: email.shouldValidate,
      isValid: formFieldIsValid(email),
    },
    countryGroup: state.common.internationalisation.countryGroupId,
    country: state.common.internationalisation.countryId,
  };

}

function mapDispatchToProps(dispatch: Dispatch<UserAction | PageAction | CheckoutAction>) {

  return {
    stateUpdate: (value: UsState | CaState) => {
      dispatch(setStateField(value));
    },
    countryUpdate: (value: IsoCountry) => {
      dispatch(setCountry(value));
    },
    setFirstNameShouldValidate: () => {
      dispatch(setFirstNameShouldValidate());
    },
    setFirstName: (firstName: string) => {
      dispatch(setFirstName(firstName));
    },
    setLastNameShouldValidate: () => {
      dispatch(setLastNameShouldValidate());
    },
    setLastName: (lastName: string) => {
      dispatch(setLastName(lastName));
    },
    setEmailShouldValidate: () => {
      dispatch(setEmailShouldValidate());
    },
    setEmail: (email: string) => {
      dispatch(setEmail(email));
    },
  };
}


// ----- Functions ----- //

function stateDropdown(countryGroup: CountryGroupId, stateUpdate: (UsState | CaState) => void) {

  if (countryGroup !== 'UnitedStates' && countryGroup !== 'Canada') {
    return null;
  }
  const states = countryGroup === 'Canada' ? caStates : usStates;
  const stateLabel = countryGroup === 'Canada' ? 'province/territory' : 'state';

  const options: SelectOption[] = Object.keys(states).map((stateCode: UsState | CaState) =>
    ({ value: stateCode, text: states[stateCode] }));

  // Sets the initial state to the first in the dropdown.
  stateUpdate(options[0].value);

  return (<SelectInput
    id="qa-state-dropdown"
    onChange={stateUpdate}
    options={options}
    label={`Select your ${stateLabel}`}
  />);
}

function countriesDropdown(
  countryGroup: CountryGroupId,
  countryUpdate: string => void,
  country: IsoCountry,
) {

  const askForCountryCountryGroups = ['EURCountries', 'International', 'NZDCountries', 'GBPCountries', 'AUDCountries'];

  if (!askForCountryCountryGroups.includes(countryGroup)) {
    return null;
  }

  const options: SelectOption[] =
    countryGroups[countryGroup].countries.map((countryCode: IsoCountry) =>
      ({
        value: countryCode,
        text: countries[countryCode],
        selected: countryCode === country,
      }));

  return (<SelectInput
    id="qa-country-dropdown"
    onChange={countryUpdate}
    options={options}
    label="Select your country"
  />);
}


// ----- Component ----- //

function NameForm(props: PropTypes) {
  return (
    <form className="regular-contrib__name-form">
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
        id="first-name"
        labelText="First name"
        placeholder="First name"
        value={props.firstName.value}
        onChange={props.setFirstName}
        onBlur={props.setFirstNameShouldValidate}
        modifierClasses={['first-name']}
        showError={shouldShowError(props.firstName)}
        errorMessage="Please enter a first name."
      />
      <TextInput
        id="last-name"
        labelText="Last name"
        placeholder="Last name"
        value={props.lastName.value}
        onChange={props.setLastName}
        onBlur={props.setLastNameShouldValidate}
        modifierClasses={['last-name']}
        showError={shouldShowError(props.lastName)}
        errorMessage="Please enter a last name."
      />
      {stateDropdown(props.countryGroup, props.stateUpdate)}
      {countriesDropdown(props.countryGroup, props.countryUpdate, props.country)}
    </form>
  );
}

// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
