// check if ball overlaps with SOME OTHER circle (e.g., player, fenceTip).
// If overlaps, get new ball's vel considering
// 1) angle of collision,
// 2) sum bounce vel for this type of collision

import pipe, { log } from '../../../utils/pipe';
import { ball as ballSettings } from '../../../gameSettings';

export default function bounceIfOverlap({ ball, circle2, sumBounceVel }) {
  return pipe(
    [
      getDiff, // -> xDiff, yDiff
      getDistance, // -> distance
      findOverlap, // -> overlapIsFound
      getBallsOverlappingQuarter,
      findOverlapAngle, // -> angle
      // log('angle'),
      getBounceVel
    ],
    {
      ball,
      circle2,
      sumBounceVel,
      ballRadius: ballSettings.radius
    }
  )
};


function getDiff({
  ball: { position: [c1x, c1y] },
  circle2: { position: [c2x, c2y] }
}) {
  return { xDiff: c1x - c2x, yDiff: c1y - c2y }
}

function getDistance({ xDiff, yDiff}) {
  return { distance: Math.sqrt(xDiff * xDiff + yDiff * yDiff) }
}

function findOverlap({
  ballRadius,
  circle2: { radius: c2radius },
  distance,
}) {
  if (distance > (ballRadius + c2radius)) {
    return { pipeResult: '' }
  }
}


// on which quarter of ball's surface is the point of contact?
function getBallsOverlappingQuarter({ xDiff, yDiff }) {
  if (xDiff >= 0 && yDiff >= 0) {
    return { overlappingQuarter: 'left-bottom'}
  } else if (xDiff >= 0 && yDiff <= 0) {
    return { overlappingQuarter: 'left-top'}
  } else if (xDiff <= 0 && yDiff >= 0) {
    return { overlappingQuarter: 'right-bottom'}
  }
  return { overlappingQuarter: 'right-top'}
}


function findOverlapAngle({ // angle to kick the ball in
  overlappingQuarter, xDiff, distance
}) {
  const smallAngle = Math.abs(Math.asin(xDiff / distance)) // unaware of up / down
  switch (overlappingQuarter) {
    // here angle should be translated from 90deg scale to 360
    case 'left-bottom': return { angle: smallAngle }
    case 'right-bottom': return { angle: Math.PI * 2 - smallAngle}
    case 'left-top': return { angle: Math.PI - smallAngle}
    case 'right-top': return { angle: Math.PI + smallAngle}
    default: return
  }
}

function getBounceVel({
  angle,
  sumBounceVel
}) {
  return { pipeResult: {
    bounceVel: [
      sumBounceVel * Math.sin(angle),
      sumBounceVel * Math.cos(angle),
    ]
  }}
}
