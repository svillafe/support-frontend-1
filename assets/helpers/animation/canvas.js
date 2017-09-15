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

/* eslint-disable no-param-reassign */

function addDrawableShape(shapeDefiniton) {
  shapeDefs.push(shapeDefiniton);
}

function update(shape) {
  shape.x += shape.vX;
  shape.y += shape.vY;
}

function isMoving(shape) {
  return shape.vX !== 0 || shape.vY !== 0;
}

function resolveCollision(shape1, shape2) {
  if (!isMoving(shape1) && !isMoving(shape2)) {
    return;
  }

  // Basic motion transference algorithm
  // from https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769)

  // a = shape1.vX * (shape1.mass - shape2.mass)
  // b = (2 * shape2.mass * shape2.vX)
  // c = (shape1.mass + shape2.mass)
  //
  // newVelX = (a + b) / c;

  // d = shape1.vY * (shape1.mass - shape2.mass)
  // e = (2 * shape2.mass * shape2.vY)
  // f = (shape1.mass + shape2.mass)
  //
  // newVelY = (d + e) / f;

  const newVelX1 = ((shape1.vX * (shape1.mass - shape2.mass)) +
    (2 * shape2.mass * shape2.vX)) /
    (shape1.mass + shape2.mass);
  const newVelY1 = ((shape1.vY * (shape1.mass - shape2.mass)) +
    (2 * shape2.mass * shape2.vY)) /
    (shape1.mass + shape2.mass);
  const newVelX2 = ((shape2.vX * (shape2.mass - shape1.mass)) +
    (2 * shape1.mass * shape1.vX)) /
    (shape1.mass + shape2.mass);
  const newVelY2 = ((shape2.vY * (shape2.mass - shape1.mass)) +
    (2 * shape1.mass * shape1.vY)) /
    (shape1.mass + shape2.mass);

  if (shape1.circleType === 'rigidBody') {
    shape1.vX = newVelX1;
    shape1.vY = newVelY1;
    update(shape1);
  }

  if (shape2.circleType === 'rigidBody') {
    shape2.vX = newVelX2;
    shape2.vY = newVelY2;
    update(shape2);
  }
}

function boundaryCheck(shape) {
  if (shape.circleType !== 'rigidBody') {
    return;
  }

  if (shape.vX && shape.vX !== 0) {
    if ((shape.x + shape.vX + shape.radius > canvasContext.canvas.width) ||
      (shape.x - shape.vX - shape.radius < 0)) {
      shape.vX *= -1;
      shape.vX *= 0.7;
    }
  }

  if (shape.vY && shape.vY !== 0) {
    if ((shape.y + shape.vY + shape.radius > canvasContext.canvas.height) ||
      (shape.y - shape.vY - shape.radius < 0)) {
      shape.vY *= -1;
      shape.vY *= 0.7;
    }
  }
}

function collide(shape) {
  let i;
  for (i = 0; i < shapeDefs.length; i += 1) {
    if (shapeDefs[i] !== shape) {
      const candidate = shapeDefs[i];
      const dx = shape.x - candidate.x;
      const dy = shape.y - candidate.y;
      const distance = Math.sqrt((dx * dx) + (dy * dy));

      if (distance <= shape.radius + candidate.radius) {
        resolveCollision(shape, candidate);
      }
    }
  }
}

function render() {
  if (canvasContext) {
    canvasContext.clearRect(0, 0, width, height);
    shapeDefs.forEach((shape) => {
      boundaryCheck(shape);
      collide(shape);
      update(shape);
    });
    shapeDefs.forEach((shape) => {
      draw(canvasContext, shape);
    });
  }
}

function animate() {
  render();
  window.requestAnimationFrame(animate.bind(this));
}

function randomiseStartPosition(shape) {
  shape.x = shape.x ? shape.x : (Math.random() * width) - shape.radius;
  shape.y = shape.y ? shape.y : (Math.random() * height) - shape.radius;
  return shape;
}

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

/* eslint-enable no-param-reassign */
