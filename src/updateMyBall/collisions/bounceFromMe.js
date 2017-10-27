// @flow

import { getSetting } from '../../settings';
import bounceIfOverlap from './utils/bounceIfOverlap';
import pipe from 'pipeduce';

// check if collision happened
// if so, return new ball's vel

export default function(ball: {}, myself: {}) : Array<number> {
  return pipe(
    [
      quitIfBallLanded,
      prepareCircle2, // -> { circle1, circle2 }
      bounceIfOverlap, // -> { bounceVel: [] }
      ({bounceVel}) => ({ pipeResult: bounceVel })
    ],
    {
      ball,
      myself,
      sumBounceVel: getSetting('ball.reboundFromPlayer'),
      playerRadius: getSetting('player.radius')
    }
  )
}


function quitIfBallLanded({ ball }) {
  if (ball.landed) return { pipeResult: null }
}

function prepareCircle2({ myself }) {
  return {
    circle2: { position: myself.position, radius: getSetting('player.radius')}
  }
}