// @flow

export type CircleType =
  | 'rigidBody'
  | 'disruptor';

export type CircleProperties = {
  circleType: CircleType,
  radius: number,
  x: number,
  y: number,
  mass: number,
  startAngle?: number,
  endAngle?: number,
  antiClockwise?: boolean,
  lineWidth?: number,
  strokeColour?: string,
  fillColour?: string,
  vX?: number,
  vY?: number,
}

function isVisible(circle: CircleProperties, context: CanvasRenderingContext2D) {
  return circle.x && circle.x + circle.radius > 0 &&
    circle.y && circle.y + circle.radius > 0 &&
    circle.x && circle.x + circle.radius < context.canvas.width &&
    circle.y && circle.y + circle.radius < context.canvas.height;
}

/* eslint-disable no-param-reassign */
export function draw(context: CanvasRenderingContext2D, circle: CircleProperties) {

  if (context && isVisible(circle, context)) {
    context.beginPath();
    context.arc(
      circle.x,
      circle.y,
      circle.radius,
      circle.startAngle || 0,
      circle.endAngle || 2 * Math.PI,
      circle.antiClockwise || false,
    );
    context.fillStyle = circle.fillColour || '#FFFFFF';
    context.fill();
    context.lineWidth = circle.lineWidth || 1;
    context.strokeStyle = circle.strokeColour || '#000000';
    context.stroke();
  }

}
/* eslint-enable no-param-reassign */

