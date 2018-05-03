// @flow

// ----- Imports ----- //

import React from 'react';

import PageSection from 'components/pageSection/pageSection';
import SvgDirectDebitSymbolAndText from 'components/svgs/directDebitSymbolAndText';


// ----- Types ----- //

type PropTypes = {
  accountHolderName: string,
  accountNumber: string,
  sortCodeArray: string[],
}


// ----- Functions ----- //

function mask(s: string): string {
  return `******${s.substring(6)}`;
}


// ----- Component ----- //

export default function DirectDebitPaymentMethodDetails(props: PropTypes) {
  return (
    <div className="component-direct-debit-payment-method-details">
      <PageSection modifierClass="email-confirmation" heading="Your contribution">
        <SvgDirectDebitSymbolAndText />
        <p className="component-direct-debit-payment-method-details__email-confirmation">
          Look out for an email confirming your recurring payment.
        </p>
        <ul className="component-direct-debit-payment-method-details__details">
          <DirectDebitItem name="Payment Method:" value="Direct Debit" />
          <DirectDebitItem name="Account Name:" value={props.accountHolderName} />
          <DirectDebitItem name="Account number:" value={mask(props.accountNumber)} />
          <DirectDebitItem name="Sort Code:" value={`${props.sortCodeArray[0]}-${props.sortCodeArray[1]}-${props.sortCodeArray[2]}`} />
        </ul>
      </PageSection>
    </div>
  );
}


// ----- Auxiliary Components ----- //

function DirectDebitItem(props: {name: string, value: string}) {
  return (
    <li className="component-direct-debit-payment-method-details__item">
      <div className="component-direct-debit-payment-method-details__item-name">{props.name}</div>
      <div className="component-direct-debit-payment-method-details__item-value">{props.value}</div>
    </li>
  );
}
