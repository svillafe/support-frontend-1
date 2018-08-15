// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';

import EmailFormField from 'components/emailFormField/emailFormField';
import { type Dispatch } from 'redux';

// ----- State/Action Maps ----- //

function mapStateToProps(state) {

  return {
    email: state.page.user.email,
    isSignedIn: state.page.user.isSignedIn,
  };

}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    dispatch,
  };
}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormField);
