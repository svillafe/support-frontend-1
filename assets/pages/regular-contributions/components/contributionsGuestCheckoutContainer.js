// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';

import ContributionsCheckout from 'components/contributionsCheckout/contributionsCheckout';

import { type PageState as State } from '../regularContributionsReducer';


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
  return {
    amount: state.page.regularContrib.amount,
    currencyId: state.common.internationalisation.currencyId,
    country: state.common.internationalisation.countryId,
    name: state.page.user.displayName,
    isSignedIn: state.page.user.isSignedIn,
  };
}


// ----- Exports ----- //

export default connect(mapStateToProps)(ContributionsGuestCheckout);
