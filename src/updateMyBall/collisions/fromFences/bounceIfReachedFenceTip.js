import getBounceFromCircle from '../utils/getBounceFromCircle';
import settings from '../../../gameSettings';
import pipe from '../../../utils/pipe';

function bounceIfReachedFenceTip({
  fencesClosestY, xDiff, yDiff, ball
}) {
  return pipe(
    [
      exitIfBelowTip, // -> maybe exit
      getSumBounceFromTip, // { sumBounceVel }
      getBounceFromCircle, // -> {bounceVel}
      ({bounceVel}) => ({ pipeResult: { bounceVel } })
    ],
    {
      fencesClosestY, settings, xDiff, yDiff, ball
    }
  )
}


bounceIfReachedFenceTip.requiredProps = {
  fencesClosestY: 'number',
  xDiff: 'number',
  yDiff: 'number'
}

export default bounceIfReachedFenceTip


export function getSumBounceFromTip({ ball, settings }) {
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