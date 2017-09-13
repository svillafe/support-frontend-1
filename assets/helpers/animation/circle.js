// @flow

export type CircleProperties = {
  x: number,
  y: number,
  maxTravelX: number,
  maxTravelY: number,
  radius: number,
  startAngle?: number,
  endAngle?: number,
  antiClockwise?: boolean,
  lineWidth?: number,
  strokeColour?: string,
  fillColour?: string,
  vX?: number,
  vY?: number,
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
    properties.vX = Math.random() * 100 > 49 ? 1 : -1;
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
    properties.vY = Math.random() * 100 > 49 ? 1 : -1;
  }

  properties.x += properties.vX;
  properties.y += properties.vY;
}
/* eslint-enable no-param-reassign */

