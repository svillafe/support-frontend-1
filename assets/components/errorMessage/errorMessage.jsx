// @flow

// ----- Imports ----- //

import React from 'react';
import { SvgExclamation } from 'components/svg/svg';


// ---- Types ----- //

type PropTypes = {
  message: string,
};


// ----- Component ----- //


export default function ErrorMessage(props: PropTypes) {
  return (
    <div className="component-error-message">
      <SvgExclamation /><span>{props.message}</span>
    </div>
  );
}
