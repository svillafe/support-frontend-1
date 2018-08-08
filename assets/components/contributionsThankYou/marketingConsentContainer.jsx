// @flow

// ----- Imports ----- //

import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { setGnmMarketing, type Action } from 'helpers/user/userActions';
import type { Csrf as CsrfState } from 'helpers/csrf/csrfReducer';
import MarketingConsent from 'components/marketingConsent/marketingConsent';

import { sendMarketingPreferencesToIdentity } from '../marketingConsent/helpers';

// ----- Component ----- //

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    onClick: (marketingPreferencesOptIn: boolean, email: string, csrf: CsrfState, context: string) => {
      sendMarketingPreferencesToIdentity(
        marketingPreferencesOptIn,
        email,
        dispatch,
        csrf,
        context,
      );
    },
    marketingPreferenceUpdate: (preference: boolean) => {
      dispatch(setGnmMarketing(preference));
    },
  };
}

function mapStateToProps(state) {
  return {
    email: state.page.user.email,
    marketingPreferencesOptIn: state.page.user.gnmMarketing,
    consentApiError: state.page.marketingConsent.error,
    confirmOptIn: state.page.marketingConsent.confirmOptIn,
    csrf: state.page.csrf,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingConsent);
