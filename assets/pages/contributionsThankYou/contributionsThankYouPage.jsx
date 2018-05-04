// @flow

// ----- Imports ----- //

import React from 'react';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import Footer from 'components/footer/footer';
import CirclesIntroduction from 'components/introduction/circlesIntroduction';
import QuestionsContact from 'components/questionsContact/questionsContact';
import SpreadTheWord from 'components/spreadTheWord/spreadTheWord';
import { type Contrib } from 'helpers/contributions';

import EmailConfirmation from './components/emailConfirmation';
import MarketingConsentContainer from './components/marketingConsentContainer';
import DirectDebitDetails from './components/directDebitDetails';


// ---- Types ----- //

type PropTypes = {
  contributionType: Contrib,
  isDirectDebit: boolean,
  isDDGuaranteeOpen: boolean,
  accountNumber: string,
  accountHolderName: string,
  sortCodeArray: string[],
  openDDGuaranteeClicked: () => void,
  closeDDGuaranteeClicked: () => void,
};


// ----- Component ----- //

export default function ContributionsThankYouPage(props: PropTypes) {
  return (
    <div id="contributions-thank-you-page" className="gu-content">
      <SimpleHeader />
      <CirclesIntroduction
        headings={['Thank you', 'for a valuable', 'contribution']}
      />
      <hr className="multiline-divider" />
      <BodyCopy {...props} />
      <MarketingConsentContainer />
      <QuestionsContact />
      <SpreadTheWord />
      <Footer />
    </div>
  );
}


// ----- Auxiliary Components ----- //

function BodyCopy(props: PropTypes) {
  if (props.contributionType === 'ONE_OFF') {
    return null;
  } else if (props.isDirectDebit) {
    return <DirectDebitDetails {...props} />;
  }
  return <EmailConfirmation />;
}
