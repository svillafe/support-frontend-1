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
import { getTitle } from 'helpers/checkoutForm/checkoutForm'
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
  name: string,
  isSignedIn: boolean,
  form: Node,
  payment: Node,
  submitYourDetailsForm: SubmitYourDetailsGuestCheckoutParams => void,

};


// ----- Component ----- //

export default function ContributionsCheckout(props: PropTypes) {

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
        <YourDetails name={props.name} isSignedIn={props.isSignedIn}>
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
