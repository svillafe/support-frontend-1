// @flow

// ----- Imports ----- //

import React from 'react';

import RadioToggle from 'components/radioToggle/radioToggle';
import NumberInput from 'components/numberInput/numberInput';
import ErrorMessage from 'components/errorMessage/errorMessage';

import { errorMessage as contributionsErrorMessage } from 'helpers/contributions';

import type { IsoCountry } from 'helpers/internationalisation/country';
import type { Currency } from 'helpers/internationalisation/currency';
import type {
  Contrib as ContributionType,
  ContribError as ContributionError,
} from 'helpers/contributions';

import {
  getContributionTypeRadios,
  getContributionAmountRadios,
  getCustomAmountA11yHint,
} from './helpers';


// ----- Props ----- //

type PropTypes = {
  country: IsoCountry,
  currency: Currency,
  contributionType: ContributionType,
  setContributionType: string => void,
  setAmount: string => void,
  setCustomAmount: string => void,
  onKeyPress: void => void,
  error: ContributionError,
};


// ----- Component ----- //

function ContributionSelection(props: PropTypes) {

  return (
    <div className="component-contribution-selection">
      <div className="component-contribution-selection__type">
        <RadioToggle
          name="contribution-type-toggle"
          radios={getContributionTypeRadios(props.country)}
          checked={props.contributionType}
          toggleAction={props.setContributionType}
        />
      </div>
      <div className="component-contribution-selection__amount">
        <RadioToggle
          name="contribution-amount-toggle"
          radios={getContributionAmountRadios(props.contributionType, props.currency)}
          checked={props.selectedAmount.value}
          toggleAction={props.setAmount}
        />
      </div>
      <CustomAmountInput {...props} />
    </div>
  );

}


// ----- Auxiliary Components ----- //

function Error(props: {
  error: ContributionError,
  currency: Currency,
  contributionType: ContributionType,
}) {

  let message = null;

  if (props.error) {
    message = contributionsErrorMessage(props.error, props.currency, props.contributionType);
  }

  return <ErrorMessage message={message} />;

}

function CustomAmountInput(props: {
  setCustomAmount: string => void,
  onKeyPress: void => void,
  currency: Currency,
  contributionType: ContributionType,
  country: IsoCountry,
  error: ContributionError,
}) {

  return (
    <div className="component-contribution-selection__custom-amount">
      <NumberInput
        onFocus={props.setCustomAmount}
        onInput={props.setCustomAmount}
        selected={props.selectedAmount.userDefined}
        placeholder="Other amount"
        onKeyPress={props.onKeyPress}
        ariaDescribedBy="component-contribution-selection__custom-amount-a11y"
        labelText={props.currency.glyph}
      />
      <p className="accessibility-hint" id="component-contribution-selection__custom-amount-a11y">
        {getCustomAmountA11yHint(props.contributionType, props.country, props.currency)}
      </p>
      <Error
        error={props.error}
        currency={props.currency}
        contributionType={props.contributionType}
      />
    </div>
  );

}


// ----- Exports ----- //

export default ContributionSelection;
