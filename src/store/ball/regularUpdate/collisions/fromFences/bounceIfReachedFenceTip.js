// @flow

import getBounceFromCircle from '../utils/getBounceFromCircle';
import { getAllSettings } from '../../../../../settings';
import pipe from 'pipeduce';

function bounceIfReachedFenceTip({
  fencesClosestY, xDiff, yDiff, ball
} : {
  fencesClosestY: number, xDiff: number, yDiff: number, ball: {}
}): ?Array<number> {
  return pipe(
    [
      exitIfBelowTip, // -> maybe exit
      getSumBounceFromTip, // { sumBounceVel }
      getBounceFromCircle, // -> {bounceVel}
      ({bounceVel}) => ({ pipeResult: { bounceVel } })
    ],
    {
      fencesClosestY, settings: getAllSettings(), xDiff, yDiff, ball
    }
  )
}


bounceIfReachedFenceTip.requiredProps = {
  fencesClosestY: 'number',
  xDiff: 'number',
  yDiff: 'number'
}

export default bounceIfReachedFenceTip


export function getSumBounceFromTip({
  ball, settings
} : {
  ball: {
    velocity: Array<number>
  },
  settings: {
    ball: { minBounceFromFenceTip: number }
  }
}) {
  let sumBounceVel = Math.sqrt(
    ball.velocity[0]*ball.velocity[0] + ball.velocity[1]*ball.velocity[1]
  ) / 3
  if (sumBounceVel < settings.ball.minBounceFromFenceTip) {
    return { sumBounceVel: settings.ball.minBounceFromFenceTip }
  }
  return { sumBounceVel }
};

function exitIfBelowTip({ fencesClosestY, settings }) {
  if (fencesClosestY < settings.fences.height) return { pipeResult: null }
}