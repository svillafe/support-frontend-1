// @flow

import { draw } from 'helpers/animation/circle';

export type CanvasProperties = {
  containerId: ?string,
  canvasId: ?string,
  width: ?number,
  height: ?number,
  zIndex: ?number,
}

let canvasContext: CanvasRenderingContext2D;
let width: number;
let height: number;
const shapeDefs = [];

function addDrawableShape(shapeDefiniton) {
  shapeDefs.push(shapeDefiniton);
}

function render() {
  if (canvasContext) {
    canvasContext.clearRect(0, 0, width, height);
    shapeDefs.forEach(shape =>
      draw(canvasContext, shape),
    );
  }
}

function animate() {
  render();
  window.requestAnimationFrame(animate.bind(this));
}

// ----- Exports ----- //

export default function startCanvasAnimation(
  canvasProperties: CanvasProperties,
  drawables: Array<Object>,
) {
  width = canvasProperties.width || 100;
  height = canvasProperties.height || 100;
  const containerElement = document.getElementById(canvasProperties.containerId || 'canvas-container');
  if (containerElement) {
    const canvasElement = document.createElement('canvas');
    if (canvasElement) {
      canvasElement.id = canvasProperties.canvasId || 'canvas-element';
      canvasElement.width = canvasProperties.width || width;
      canvasElement.height = canvasProperties.height || height;
      canvasContext = canvasElement.getContext('2d');
      containerElement.appendChild(canvasElement);
    }
  }
  if (canvasContext && drawables) {
    drawables.forEach(shape =>
      addDrawableShape(shape),
    );
    animate();
  }
}
