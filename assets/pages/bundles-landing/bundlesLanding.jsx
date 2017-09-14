// @flow

// ----- Imports ----- //

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import SimpleFooter from 'components/footers/simpleFooter/simpleFooter';

import { init as pageInit } from 'helpers/page/page';
import { setIntCmp } from 'helpers/page/pageActions';

import type { CircleProperties } from 'helpers/animation/circle';
import type { CanvasProperties } from 'helpers/animation/canvas';
import startCanvasAnimation from 'helpers/animation/canvas';

import Introduction from './components/Introduction';
import Bundles from './components/Bundles';
import WhySupport from './components/WhySupport';
import WaysOfSupport from './components/WaysOfSupport';
import reducer from './reducers/reducers';
import { trackOphan } from '../../helpers/abtest';


// ----- Redux Store ----- //

const store = pageInit(reducer);


// ----- Setup ----- //

let intCmp = store.getState().common.intCmp;

if (!intCmp) {
  intCmp = 'gdnwb_copts_bundles_landing_default';
  store.dispatch(setIntCmp(intCmp));
}

const participations = store.getState().common.abParticipations;
if (participations.addAnnualContributions) {
  trackOphan('addAnnualContributions', participations.addAnnualContributions);
}


// ----- Render ----- //

const drawableObjects: Array<Object> = [];
const canvasProperties: CanvasProperties = {
  containerId: 'canvas-container',
  canvasId: 'canvas-el',
  height: 300,
  zIndex: 100,
};

function animate() {
  const multimediaMain2 = '#ffbb00';
  const neutral1 = '#333333';
  let c = 0;
  for (c = 0; c < 20; c += 1) {
    const colour = Math.random() * 100 > 49 ? multimediaMain2 : neutral1;
    const rad = Math.random() * 50;
    const circleProperties: CircleProperties = {
      x: 0, // zero x and y components are replaced with randomised values by canvas
      y: 0,
      radius: rad,
      strokeColour: colour,
      fillColour: colour,
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
      {store.getState().common.campaign === 'baseline_test' ? '' : <WaysOfSupport />}
      <SimpleFooter />
    </div>
  </Provider>
);

ReactDOM.render(content, document.getElementById('bundles-landing-page'), animate);
