import {ball as ballSettings, player as playerSettings} from '../../gameSettings'
import bounceIfOverlap from './utils/bounceIfOverlap';
import pipe from '../../utils/pipe';

// check if collision happened
// if so, return new ball's vel

export default function(ball, myself) {
  return pipe(
    [
      prepareCircle2, // -> { circle1, circle2 }
      bounceIfOverlap, // -> { bounceVel: [] }
      ({bounceVel}) => ({ pipeResult: bounceVel })
    ],
    {
      ball,
      myself,
      sumBounceVel: ballSettings.reboundFromPlayer
    }
  )
}

function prepareCircle2({ myself }) {
  return {
    circle2: { position: myself.position, radius: playerSettings.radius}
  }
}