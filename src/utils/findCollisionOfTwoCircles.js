// check if 2 circles' positions overlap
// provide new velocity to circles that should bounce

// *** this assumes that bouncing vel depends only on:
// 1) angle of collision,
// 2) bounce vel that is hardcoded for this circle

// each circle should have: position, radius, sumVelAfterCollision
// should return bounce data: { circle: { bounceVel: [ x, y ] } }

import pipe from './pipe';

export default function findCollisionOfTwoCircles(circles) {
  return pipe(
    [
      getDiff,
      getDistance,
      findOverlap
    ],
    circles
  )
};


function getDiff({
  circle1: { position: [c1x, c1y] },
  circle2: { position: [c2x, c2y] }
}) {
  return {
    xDiff: c1x - c2x,
    yDiff: c1y - c2y
  }
}

function getDistance({
  xDiff, yDiff
}) {
  return { distance: Math.sqrt(xDiff * xDiff + yDiff * yDiff) }
}

function findOverlap({
  circle1: { radius: c1radius },
  circle2: { radius: c2radius },
  distance,
}) {
  return { collisionIsFound: distance < (c1radius + c2radius) }
}
