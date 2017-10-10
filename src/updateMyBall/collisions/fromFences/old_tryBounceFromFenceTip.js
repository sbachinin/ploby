import { ball as ballSettings, fences } from '../../../gameSettings'
import bounceIfOverlap from '../utils/bounceIfOverlap';
import pipe from '../../../utils/pipe';

// should return { bounceVel: [] }
export default function({ nearFenceTip, ball, fencesClosestX }) {
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
      fencesClosestX,
      sumBounceVel: ballSettings.reboundFromFenceTip
    }
  )
}

function checkBallHeight({ nearFenceTip }) {
  if (!nearFenceTip) return { pipeResult: null }
}

function prepareCircle2({ fencesClosestX }) {
  return {
    circle2: {
      position: [
        fencesClosestX, fences.height
      ],
      radius: 0
    }
  }
}
