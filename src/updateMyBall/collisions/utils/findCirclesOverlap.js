// @flow

import pipe from '../../../utils/pipe.js';
import getMagnitude from './getMagnitude';

type BallType = {}
type Result = {
  xDiff: number,
  yDiff: number,
  distance: number,
  circlesOverlap?: boolean
}

const findCirclesOverlap = (
  {ballRadius, ball, circle2} : {
    ballRadius: Number,
    ball: BallType,
    circle2: {} }
) : Result => {
  return pipe(
    [
      getDiff,
      s => ({ distance: getMagnitude(s.xDiff, s.yDiff)}),
      findOverlap,
      getResult
    ],
    { ball, ballRadius, circle2 }
  )
};

findCirclesOverlap.requiredProps = {
  ballRadius: 'number',
  ball: 'object',
  circle2: 'object'
}



function getDiff({
  ball: { position: [c1x, c1y] },
  circle2: { position: [c2x, c2y] }
}) {
  return { xDiff: c1x - c2x, yDiff: c1y - c2y }
}


function findOverlap({
  ballRadius,
  circle2: { radius: c2radius },
  distance,
}) {
  if (distance < (ballRadius + c2radius)) {
    return { circlesOverlap: true }
  }
}

function getResult({xDiff, yDiff, circlesOverlap}) {
  return {
    pipeResult: {
      xDiff, yDiff, circlesOverlap
    }
  }
}


export default findCirclesOverlap