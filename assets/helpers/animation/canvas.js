// @flow

import { draw } from 'helpers/animation/circle';

export type CanvasProperties = {
  containerId: ?string,
  canvasId: ?string,
  width?: number,
  height?: number,
  zIndex?: number,
}

let canvasContext: CanvasRenderingContext2D;
let width: number;
let height: number;
const shapeDefs = [];

function addDrawableShape(shapeDefiniton) {
  shapeDefs.push(shapeDefiniton);
}

function collide(shape) {
  let collided;
  for (collided = 0; collided < shapeDefs.length; collided += 1) {
    const candidate = shapeDefs[collided];
    if (candidate !== shape && candidate.circleType !== 'disruptor') {
      const dx = shape.x - candidate.x;
      const dy = shape.y - candidate.y;
      const distance = Math.sqrt((dx * dx) + (dy * dy));
      if (distance < shape.radius + candidate.radius) {
        candidate.vX = shape.vX;
        candidate.vY = shape.vY;
      }
    }
  }
}

function render() {
  if (canvasContext) {
    canvasContext.clearRect(0, 0, width, height);
    shapeDefs.forEach((shape) => {
      collide(shape);
      draw(canvasContext, shape);
    });
  }
}

function animate() {
  render();
  window.requestAnimationFrame(animate.bind(this));
}

/* eslint-disable no-param-reassign */
function randomiseStartPosition(shape) {
  shape.x = shape.x ? shape.x : (Math.random() * width) - shape.radius;
  shape.y = shape.y ? shape.y : (Math.random() * height) - shape.radius;
  return shape;
}
/* eslint-enable no-param-reassign */

// ----- Exports ----- //

export default function startCanvasAnimation(
  canvasProperties: CanvasProperties,
  drawables: Array<Object>,
) {
  let containerElem = null;
  let containerWidth = null;
  let containerHeight = null;
  if (canvasProperties.containerId) {
    containerElem = document.getElementById(canvasProperties.containerId);
    if (containerElem) {
      const boundingClientRect = containerElem.getBoundingClientRect();
      containerWidth = boundingClientRect.width || null;
      containerHeight = boundingClientRect.height || null;
    }
  }
  width = canvasProperties.width || containerWidth || window.innerWidth;
  height = canvasProperties.height || containerHeight || window.innerHeight;
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
      addDrawableShape(randomiseStartPosition(shape)),
    );
    animate();
  }
}
