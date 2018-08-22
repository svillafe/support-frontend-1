// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ContributionsGuestCheckout from 'components/contributionsCheckout/contributionsGuestCheckout';
import { type UserFormFieldAttribute, formFieldIsValid, shouldShowError } from 'helpers/checkoutForm/checkoutForm';

import { type PageState as State } from '../../regularContributionsReducer';
import {
  setEmailShouldValidate,
  setFirstNameShouldValidate,
  setLastNameShouldValidate,
  setStage,
  type Action,
} from './checkoutFormActions';
import { type Stage } from './checkoutFormReducer';


export type SubmitYourDetailsGuestCheckoutParams = {
  formFields: Array<UserFormFieldAttribute>,
  setStage: () => void,
  setShouldValidateFunctions: Array<() => void>
}

const submitYourDetailsForm = (params: SubmitYourDetailsGuestCheckoutParams) => {
  const formIsValid = params.formFields.every(el => el.isValid);
  if(formIsValid) {
    setStage('payment');
  } else {
    params.setShouldValidateFunctions.forEach(f => f());
  }
};


// ----- State Maps ----- //

function mapStateToProps(state: State) {


  const firstName = {
    value: state.page.user.firstName,
    shouldValidate: state.page.checkoutForm.firstName.shouldValidate,
  };

  const lastName = {
    value: state.page.user.lastName,
    ...state.page.checkoutForm.lastName,
  };

  const email = {
    value: state.page.user.email,
    ...state.page.checkoutForm.email,
  };

  const formFields = [
    {
      value: firstName.value,
      shouldValidate: firstName.shouldValidate,
      isValid: formFieldIsValid(firstName),
    },
    {
      value: lastName.value,
      shouldValidate: lastName.shouldValidate,
      isValid: formFieldIsValid(lastName),
    },
    {
      value: email.value,
      shouldValidate: email.shouldValidate,
      isValid: formFieldIsValid(email),
    },
  ];

  return {
    amount: state.page.regularContrib.amount,
    currencyId: state.common.internationalisation.currencyId,
    country: state.common.internationalisation.countryId,
    displayName: state.page.user.displayName,
    formFields,
    isSignedIn: state.page.user.isSignedIn,
    submitYourDetailsForm,
  };
}


function mapDispatchToProps(dispatch: Dispatch<Action>) {

  return {
    setShouldValidateFunctions: [
      () => {
        dispatch(setFirstNameShouldValidate());
      },
      () => {
        dispatch(setLastNameShouldValidate());
      },
      () => {
        dispatch(setEmailShouldValidate());
      }
    ],
    setStage: (stage: Stage) => dispatch(setStage(stage))
  };
}

// ----- Exports ----- //

export default connect(mapStateToProps)(ContributionsGuestCheckout);
