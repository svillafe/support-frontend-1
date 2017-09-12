// @flow

// ----- Imports ----- //

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import SimpleFooter from 'components/footers/simpleFooter/simpleFooter';

import pageStartup from 'helpers/pageStartup';
import { getQueryParameter } from 'helpers/url';

import type { CircleProperties } from 'helpers/animation/circle';
import type { CanvasProperties } from 'helpers/animation/canvas';
import startCanvasAnimation from 'helpers/animation/canvas';

import Introduction from './components/Introduction';
import Bundles from './components/Bundles';
import WhySupport from './components/WhySupport';
import WaysOfSupport from './components/WaysOfSupport';
import reducer from './reducers/reducers';


// ----- Page Startup ----- //

const participation = pageStartup.start();


// ----- Redux Store ----- //

const store = createStore(reducer, {
  intCmp: getQueryParameter('INTCMP', 'gdnwb_copts_bundles_landing_default'),
});

store.dispatch({ type: 'SET_AB_TEST_PARTICIPATION', payload: participation });


// ----- Render ----- //

const drawableObjects: Array<Object> = [];
const canvasProperties: CanvasProperties = {
  containerId: 'canvas-container',
  canvasId: 'canvas-el',
  width: 600,
  height: 200,
  zIndex: 100,
  strokeColour: '#ffffff',
  fillColour: '#ff0000',
};

function animate() {
  const maxDim = canvasProperties.width || 100;
  let c = 0;
  for (c = 0; c < 10; c += 1) {
    const circleProperties: CircleProperties = {
      x: Math.random() * (canvasProperties.width || maxDim),
      y: Math.random() * (canvasProperties.height || maxDim),
      radius: Math.random() * 50,
    };
    drawableObjects.push(circleProperties);
  }
  startCanvasAnimation(canvasProperties, drawableObjects);
}

const content = (
  <Provider store={store}>
    <div>
      <SimpleHeader />
      <Introduction />
      <Bundles />
      <WhySupport />
      <WaysOfSupport />
      <SimpleFooter />
    </div>
  </Provider>
);

ReactDOM.render(content, document.getElementById('bundles-landing-page'), animate);
