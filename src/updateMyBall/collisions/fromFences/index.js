import pipe, {log } from '../../../utils/pipe'
import tryBounceFromFenceTip from './tryBounceFromFenceTip';
import tryBounceFromFencePillar from './tryBounceFromFencePillar';
import { ball as ballSettings, fences, canvasSize } from '../../../gameSettings';

export default function(ball) {

  return pipe(
    [
      getHeightRelativeToFence, // -> { nearFenceTip, nearFencePillar } || exit
      // d => console.log(d.nearFenceTip, d.nearFencePillar),
      getClosestFenceX, // -> { closestFenceX }
      tryBounceFromFenceTip, // -> { bounceVel: [] } || undef
      tryBounceFromFencePillar, // -> { bounceVel: [] } || undef
      // log('bounceVel'),
      ({bounceVel}) => ({ pipeResult: bounceVel })
    ],
    { ball }
  )
}


function getHeightRelativeToFence({ ball }) {
  if (ball.position[1] > (fences.height + ballSettings.radius)) {
    return { pipeResult: null }
  }
  let nearFenceTip, nearFencePillar
  if (
    ball.position[1] < (fences.height + ballSettings.radius) &&
    ball.position[1] > (fences.height - ballSettings.radius)
  ) nearFenceTip = true
  if (ball.position[1] < fences.height) nearFencePillar = true
  return {
    nearFenceTip, nearFencePillar
  }
  // *** 'near pillar' & 'near tip' intentionally overlap.
  // Otherwise ball smtimes flies through the fence
}

function getClosestFenceX({ ball }) {
  return { closestFenceX: (
      ball.position[0] > canvasSize.width / 2
    ) ? fences.rightX : fences.leftX
  }
}



// MEASURING TIME BETWEEN FENCES:
  // if (ball.position[0] < fences.leftX && (ball.position[0] + ball.velocity[0] > fences.leftX)) {
  //   console.time('fence')
  // }
  // if (ball.position[0] < fences.rightX && (ball.position[0] + ball.velocity[0] > fences.rightX)) {
  //   console.timeEnd('fence')
  // }