// @flow

// ----- Imports ----- //

import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { detect as detectCountryGroup } from 'helpers/internationalisation/countryGroup';
import * as user from 'helpers/user/user';
import { init as pageInit } from 'helpers/page/page';
import { renderPage } from 'helpers/render';
import { routes } from 'helpers/routes';
import { getAmount } from 'helpers/checkouts';
import * as cookie from 'helpers/cookie';
import getBaseDomain from 'helpers/url'

import ContributionsThankYouPage from 'components/contributionsThankYou/contributionsThankYouPage';

import reducer from './oneOffContributionsReducer';
import ContributionsCheckoutContainer from './components/contributionsCheckoutContainer';
import FormFields from './components/formFields';


// ----- Page Startup ----- //

const countryGroup = detectCountryGroup();

const store = pageInit(reducer(getAmount('ONE_OFF', countryGroup)), true);

const ONE_OFF_CONTRIBUTION_COOKIE = "gu.contributions.contrib-timestamp";



const currentTime = new Date().getTime() / 1000;

user.init(store.dispatch);

const router = (
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Route
          exact
          path={routes.oneOffContribCheckout}
          render={() => (
            <ContributionsCheckoutContainer
              contributionType="ONE_OFF"
              form={<FormFields />}
            />
          )}
        />
        <Route
          exact
          path={routes.oneOffContribThankyou}
          render={() => {
              cookie.set(
                ONE_OFF_CONTRIBUTION_COOKIE,
                currentTime,
                null,
                "hello"
              );
              return (<ContributionsThankYouPage contributionType="ONE_OFF" directDebit={null}/>)
            }
          }
        />
      </div>
    </Provider>
  </BrowserRouter>
);

renderPage(router, 'oneoff-contributions-page');
