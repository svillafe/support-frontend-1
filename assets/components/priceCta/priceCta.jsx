// @flow

// ----- Imports ----- //

import React from 'react';

import CtaLink from 'components/ctaLink/ctaLink';

import {
  currencies,
  type IsoCurrency,
} from 'helpers/internationalisation/currency';


// ----- Types ----- //

type PropTypes = {
  ctaText: string,
  price: string,
  currency: IsoCurrency,
  ctaId: string,
};


// ----- Component ----- //

export default function PriceCta(props: PropTypes) {

  return (
    <div className="component-price-cta">
      <CtaLink
        text={props.ctaText}
        accessibilityHint={props.ctaText}
        ctaId={props.ctaId}
      />
      <p className="component-price-cta__price">
        {currencies[props.currency].glyph}{props.price}
      </p>
    </div>
  );

}
