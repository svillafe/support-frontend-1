// @flow

export type CircleProperties = {
  radius: number,
  x: number,
  y: number,
  startAngle?: number,
  endAngle?: number,
  antiClockwise?: boolean,
  lineWidth?: number,
  strokeColour?: string,
  fillColour?: string,
  vX?: number,
  vY?: number,
}

function randomVelocity() {
  const speed = Math.random() * 0.75;
  return Math.random() * 100 > 49 ? speed : speed * -1;
}

/* eslint-disable no-param-reassign */
export function draw(context: CanvasRenderingContext2D, properties: CircleProperties) {
  const myContext = context;
  if (myContext) {
    myContext.beginPath();
    myContext.arc(
      properties.x,
      properties.y,
      properties.radius,
      properties.startAngle || 0,
      properties.endAngle || 2 * Math.PI,
      properties.antiClockwise || false,
    );
    myContext.fillStyle = properties.fillColour || '#FFFFFF';
    myContext.fill();
    myContext.lineWidth = properties.lineWidth || 1;
    myContext.strokeStyle = properties.strokeColour || '#000000';
    myContext.stroke();
  }
  if (properties.vX) {
    if (properties.vX > 0) {
      if (properties.x + properties.vX + properties.radius > context.canvas.width) {
        properties.vX *= -1;
      }
    }
    if (properties.vX < 0) {
      if (properties.x - properties.vX - properties.radius < 0) {
        properties.vX *= -1;
      }
    }
  } else {
    properties.vX = randomVelocity();
  }

  if (properties.vY) {
    if (properties.vY > 0) {
      if (properties.y + properties.vY + properties.radius > context.canvas.height) {
        properties.vY *= -1;
      }
    }
    if (properties.vY < 0) {
      if (properties.y - properties.vY - properties.radius < 0) {
        properties.vY *= -1;
      }
    }
  } else {
    properties.vY = randomVelocity();
  }

  properties.x += properties.vX;
  properties.y += properties.vY;
}
/* eslint-enable no-param-reassign */

