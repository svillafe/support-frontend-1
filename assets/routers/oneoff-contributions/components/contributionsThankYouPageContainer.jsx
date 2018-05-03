// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';

import ContributionsThankYouPage from 'pages/contributionsThankYou/contributionsThankYouPage';

// ----- Map State/Props ----- //

function mapStateToProps() {
  return {
    contributionType: 'ONE_OFF',
    isDirectDebit: false,
  };
}

export default connect(mapStateToProps)(ContributionsThankYouPage);
