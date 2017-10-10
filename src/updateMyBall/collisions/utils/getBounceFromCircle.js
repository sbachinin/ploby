import pipe from '../../../utils/pipe';
import getMagnitude from './getMagnitude';

export default getBounceFromCircle

function getBounceFromCircle({
  xDiff, yDiff, sumBounceVel
}) {
  return pipe(
    [
      getBallsOverlappingQuarter, // -> { overlappingQuarter }
      findOverlapAngle, // -> { angle }
      getResult
    ],
    { xDiff, yDiff, sumBounceVel }
  )
};


getBounceFromCircle.requiredProps = {
  xDiff: 'number',
  yDiff: 'number',
  sumBounceVel: 'number'
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
  overlappingQuarter, xDiff, yDiff
}) {
  const smallAngle = Math.abs(Math.asin(
    xDiff / getMagnitude(xDiff, yDiff)
  )) // unaware of up / down
  switch (overlappingQuarter) {
    // here angle should be translated from 90deg scale to 360
    case 'left-bottom': return { angle: smallAngle }
    case 'right-bottom': return { angle: Math.PI * 2 - smallAngle}
    case 'left-top': return { angle: Math.PI - smallAngle}
    case 'right-top': return { angle: Math.PI + smallAngle}
    default: return
  }
}

function getResult({
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