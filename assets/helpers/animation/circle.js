// @flow

export type CircleProperties = {
  x: number,
  y: number,
  radius: number,
  startAngle?: number,
  endAngle?: number,
  antiClockwise?: boolean,
  lineWidth?: number,
  strokeColour?: string,
  fillColour?: string,
}

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
}

// export function Circle(circleProperties: CircleProperties) {
//   const properties = circleProperties;
//   const draw = (context: CanvasRenderingContext2D) =>
//     drawThis(context, properties);
// }

// export class Circle {
//   draw: (context: CanvasRenderingContext2D, properties: CircleProperties) => void {
//     drawThis(context, properties);
//   };
//   // properties: CircleProperties;
//   // draw(context: CanvasRenderingContext2D): void {
//   //   drawThis(context, properties);
//   // }
//   //
//   // constructor(props: CircleProperties) {
//   //   this.properties = props;
//   // }
// }

