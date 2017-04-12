// ----- Imports ----- //

import React from 'react';


// ----- Component ----- //

export default function RadioToggle(props) {

  const radioButtons = props.radios.map((radio, idx) => {

    const radioId = `${props.name}-${idx}`;

    return (
      <span>
        <input
          type="radio"
          name={props.name}
          value={radio.value}
          id={radioId}
          onChange={props.toggleAction(radio.value)}
          checked={radio.value === props.checked}
        />
        <label htmlFor={radioId}>{radio.text}</label>
      </span>
    );

  });

  return <div className="component-radio-toggle">{radioButtons}</div>;

}


// ----- Proptypes ----- //

RadioToggle.propTypes = {
  radios: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string,
    text: React.PropTypes.string,
  })).isRequired,
  checked: React.PropTypes.string.isRequired,
};