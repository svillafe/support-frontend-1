// @flow

// ----- Imports ----- //

import React, { type Node } from 'react';

import Page from 'components/page/page';
import TestUserBanner from 'components/testUserBanner/testUserBanner';
import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import Footer from 'components/footer/footer';
import CirclesIntroduction from 'components/introduction/circlesIntroduction';
import YourContribution from 'components/yourContribution/yourContribution';
import YourDetails from 'components/yourDetails/yourDetails';
import PageSection from 'components/pageSection/pageSection';
import LegalSectionContainer from 'components/legal/legalSection/legalSectionContainer';
import { type UserFormFieldAttribute } from 'helpers/checkoutForm/checkoutForm';

import { type Contrib as ContributionType } from 'helpers/contributions';
import { type IsoCurrency } from 'helpers/internationalisation/currency';
import { type IsoCountry } from 'helpers/internationalisation/country';
import { type SubmitYourDetailsGuestCheckoutParams } from './contributionsGuestCheckoutContainer';

// ----- Types ----- //

type PropTypes = {
  amount: number,
  currencyId: IsoCurrency,
  country: IsoCountry,
  contributionType: ContributionType,
  displayName: string,
  isSignedIn: boolean,
  form: Node,
  payment: Node,
  guestCheckout: boolean,
  setShouldValidateFunctions: Array<() => void>,
  submitYourDetailsForm: (SubmitYourDetailsGuestCheckoutParams) => void,
  formFields: Array<UserFormFieldAttribute>,
};


// ----- Functions ----- //

function getTitle(
  contributionType: ContributionType,
  country: IsoCountry,
): string {

  switch (contributionType) {
    case 'ANNUAL':
      return 'Make an annual';
    case 'MONTHLY':
      return 'Make a monthly';
    case 'ONE_OFF':
    default:
      return `Make a ${country === 'US' ? 'one-time' : 'one-off'}`;
  }

}


// ----- Component ----- //

export default function ContributionsCheckout(props: PropTypes) {

  const NextButton = () => {
    return (
      <CtaLink
        text={`Continue`}
        accessibilityHint={`Continue`}
        id="qa-contribute-button"
        onClick={() => {
            props.submitYourDetailsForm({
              formFields: props.formFields,
              setStage: props.setStage,
              setShouldValidateFunctions: props.setShouldValidateFunctions,
            });
          }
        }
        modifierClasses={['continue']}
      />
    )
  };


  const CheckoutStage = () => {
    switch (props.stage) {

      case 'payment':
        return (
          <PageSection heading={"Payment methods"} modifierClass="payment-methods">
            {props.payment}
          </PageSection>
        );

      case 'checkout':
      default:
        return (
          <YourDetails
            name={props.displayName}
            isSignedIn={props.isSignedIn}
            setStage={props.setStage}
            setFirstNameShouldValidate={props.setFirstNameShouldValidate}
            setLastNameShouldValidate={props.setLastNameShouldValidate}
            setEmailShouldValidate={props.setEmailShouldValidate}
          >
            {props.form}
            <NextButton />
          </YourDetails>
        );
    }
  };


    return (
    <div className="component-contributions-checkout">
      <Page
        header={[<TestUserBanner />, <SimpleHeader />]}
        footer={<Footer />}
      >
        <CirclesIntroduction
          headings={[getTitle(props.contributionType, props.country), 'contribution']}
          modifierClasses={['compact']}
        />
        <YourContribution
          contributionType={props.contributionType}
          country={props.country}
          amount={props.amount}
          currencyId={props.currencyId}
        />
        <YourDetails name={props.displayName} isSignedIn={props.isSignedIn}>
          {props.form}
        </YourDetails>
        <PageSection heading="Payment methods" modifierClass="payment-methods">
          {props.payment}
        </PageSection>
        <LegalSectionContainer />
      </Page>
    </div>
  );
}
