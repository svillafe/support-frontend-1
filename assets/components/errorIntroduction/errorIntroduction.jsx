// @flow

// ----- Imports ----- //

import React from 'react';

import Highlights from 'components/highlights/highlights';


// ----- Types ----- //

type PropTypes = {
  headings: string[],
  highlights?: ?string[],
};


// ----- Component ----- //

function ErrorIntroduction(props: PropTypes) {
  return (
    <section className="component-error-introduction">
      <div className="component-error-introduction__content gu-content-margin">
        <Highlights highlights={props.highlights} />
        <h1 className="component-error-introduction__heading">
          {props.headings.map(heading =>
            <span className="component-error-introduction__heading-line">{heading}</span>)}
        </h1>
      </div>
    </section>
  );
}


// ----- Default Props ----- //

ErrorIntroduction.defaultProps = {
  highlights: null,
};


// ----- Exports ----- //

export default ErrorIntroduction;
