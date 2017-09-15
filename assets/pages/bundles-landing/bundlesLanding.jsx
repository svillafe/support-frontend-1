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
  let row;
  let col;
  const circleRadius = 20; // Math.random() * 50;
  const padding = 60;

  // set up the crowd
  for (row = 0; row < 3; row += 1) {
    for (col = 0; col < 15; col += 1) {
      const cx = (col * circleRadius * 4) + padding;
      const cy = (row * circleRadius * 3) + padding;
      const target: CircleProperties = {
        circleType: 'rigidBody',
        x: cx, // zero x and y components are replaced with randomised values by canvas
        y: cy,
        mass: 1,
        vX: 0,
        vY: 0,
        radius: circleRadius,
        strokeColour: neutral1,
        fillColour: neutral1,
      };
      drawableObjects.push(target);
    }
  }

  // set up and activate the disruptor
  const cx = 0 - circleRadius;
  const cy = circleRadius * 3;
  const disruptor: CircleProperties = {
    circleType: 'disruptor',
    x: cx, // zero x and y components are replaced with randomised values by canvas
    y: cy,
    mass: 10,
    vX: 8,
    vY: 1,
    radius: circleRadius,
    strokeColour: multimediaMain2,
    fillColour: multimediaMain2,
  };
  drawableObjects.push(disruptor);

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
