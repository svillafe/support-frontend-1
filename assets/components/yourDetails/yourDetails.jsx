// @flow

// ----- Imports ----- //

import React, { type Node } from 'react';

import PageSection from 'components/pageSection/pageSection';
import Signout from 'components/signout/signout';
import DisplayName from 'components/displayName/displayName';
import CtaLink from 'components/ctaLink/ctaLink';
import { setStage } from  'components/contributionsCheckout/contributionsCheckoutActions';
import {Dispatch} from "redux";
import {contributionsCheckoutReducerFor} from "../contributionsCheckout/contributionsCheckoutReducer";
import {setEmailShouldValidate, setLastNameShouldValidate} from "../../helpers/user/userActions";


// ----- Types ----- //

type PropTypes = {
  name: string,
  isSignedIn: boolean,
  children: Node,
  setStage:  () => void,
  setFirstNameShouldValidate: () => void,
  setLastNameShouldValidate: () => void,
  setEmailShouldValidate: () => void,
};




function submitYourDetailsForm(props: PropTypes) {
  const formElements = [... document.getElementsByClassName('regular-contrib__name-form')[0].getElementsByTagName('input')];

  const formIsValid = formElements.reduce((acc, el) => acc && el.validity.valid);

  if(formIsValid) {
    props.setStage();
  } else {
    props.setFirstNameShouldValidate();
    props.setLastNameShouldValidate();
    props.setEmailShouldValidate();
  }
}

// ----- Component ----- //

function YourDetails(props: PropTypes) {

  const NextButton = () => {
    return (
      <CtaLink
        text={`Continue`}
        accessibilityHint={`Continue`}
        id="qa-contribute-button"
        onClick={() => submitYourDetailsForm(props) }
        modifierClasses={['continue']}
      />
    )
  };

  return (
    <div className="component-your-details">
      <PageSection heading="Your details" headingChildren={<Signout />}>
        <DisplayName name={props.name} isSignedIn={props.isSignedIn} />
        {props.children}
        <p className="component-your-details__info">
          <small>All fields are required.</small>
        </p>
        <NextButton />
      </PageSection>
    </div>
  );

}

export default YourDetails
