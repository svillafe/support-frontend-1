// @flow

// ----- Imports ----- //

import * as React from 'react';


// ----- Types ----- //

type PropTypes = {
  id: ?string,
  onChange: (preference: boolean) => void,
  checked: boolean,
  labelTitle?: string,
  labelCopy?: string,
};


// ----- Component ----- //

const CheckboxInput = (props: PropTypes): React.Node => {
  let labelTitle = '';
  let labelCopy = '';

  if (props.labelTitle) {
    labelTitle = <p className="component-checkbox-input__title">{props.labelTitle}</p>;
  }
  if (props.labelCopy) {
    labelCopy = <p className="component-checkbox-input__copy">{props.labelCopy}</p>;
  }

  return (
    <span className="component-checkbox-input">
      {labelTitle}
      <label htmlFor={props.id}>
        <input
          className="component-checkbox-input__checkbox"
          id={props.id}
          type="checkbox"
          onChange={e => props.onChange(e.target.checked)}
          checked={props.checked}
        />
        {labelCopy}
      </label>
    </span>
  );
};


// ----- Default Props ----- //

CheckboxInput.defaultProps = {
  labelCopy: '',
  labelTitle: '',
};


// ----- Exports ----- //

export default CheckboxInput;
