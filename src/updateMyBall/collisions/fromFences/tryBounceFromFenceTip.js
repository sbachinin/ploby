import { ball as ballSettings, fences } from '../../../gameSettings'
import bounceIfOverlap from '../utils/bounceIfOverlap';
import pipe from '../../../utils/pipe';

// should return { bounceVel: [] }
export default function({ nearFenceTip, ball, closestFenceX }) {
  return pipe(
    [
      checkBallHeight, // -> ballIsNear
      prepareCircle2, // -> { circle1, circle2 }
      bounceIfOverlap, // -> { bounceVel: [] }
      ({bounceVel}) => ({ pipeResult: { bounceVel } })
    ],
    {
      nearFenceTip,
      ball,
      closestFenceX,
      sumBounceVel: ballSettings.reboundFromFenceTip
    }
  )
}

function checkBallHeight({ nearFenceTip }) {
  if (!nearFenceTip) return { pipeResult: null }
}

function prepareCircle2({ closestFenceX }) {
  return {
    circle2: {
      position: [
        closestFenceX, fences.height
      ],
      radius: 0
    }
  }
}
