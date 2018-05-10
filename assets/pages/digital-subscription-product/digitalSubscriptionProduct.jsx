// @flow

// ----- Imports ----- //

import React from 'react';
import { Provider } from 'react-redux';

// React components
import Footer from 'components/footer/footer';
import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';

import { init as pageInit } from 'helpers/page/page';
import { renderPage } from 'helpers/render';


// ----- Setup ----- //

// ----- Redux Store ----- //

/* eslint-disable no-underscore-dangle */
const store = pageInit(
  {},
  null,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */


// ----- Render ----- //

const content = (
  <Provider store={store}>
    <div>
      <SimpleHeader />
      <Footer disclaimer privacyPolicy />
    </div>
  </Provider>
);

renderPage(content, 'digital-subscription-product-page');
