import pipe from '../../../utils/pipe'
import compareHeight from './compareHeight';
import tryBounceFromFenceTip from './tryBounceFromFenceTip';
import tryBounceFromFencePillar from './tryBounceFromFencePillar';
import { ball as ballSettings, fences, canvasSize } from '../../../gameSettings';

export default function(ball) {

  const result = pipe(
    [
      getHeightRelativeToFence,
      getClosestFenceX,
      tryBounceFromFenceTip,
      _ => console.log(_)
      // tryBounceFromFencePillar
    ],
    { ball }
  )
  .bounceVel
}

  // const closestFenceX = (
  //   ball.position[0] > canvasSize.width / 2
  // ) ? fences.rightX : fences.leftX
  // switch (height) {
  //   case 'near fence tip':
  //     return bounceFromFenceTip(ball, closestFenceX)
  //   case 'below fence tip':
  //     return bounceFromFencePillar(ball, closestFenceX)
  //   default: return
  // }


function getHeightRelativeToFence({ ball }) {
  if (ball.position[1] < fences.height) {
    return { heightRelativeToFence: 'below fence tip'}
  }
  if (
    ball.position[1] < (fences.height + ballSettings.radius) &&
    ball.position[1] > fences.height
  ) { return { heightRelativeToFence: 'near fence tip' } }
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