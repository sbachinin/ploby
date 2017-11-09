// @flow

import { getSetting } from '../../../settings';
import bounceIfOverlap from './utils/bounceIfOverlap';
import pipe from 'pipeduce';

let collisionInProcess = false
// check if collision happened
// if so, return new ball's vel

export default function(ball: {}, myself: {}) : Array<number> {
  return pipe(
    [
      quitIfBallLanded,
      prepareCircle2, // -> { circle1, circle2 }
      bounceIfOverlap, // -> { bounceVel: [] }
      ensureSingleCollision,
      _ => {
        if (_.bounceVel) {
          console.log('new collision')
        }
      },
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

function ensureSingleCollision({ bounceVel }) {
  // first collide
  if (bounceVel && !collisionInProcess) {
    collisionInProcess = true
    return
  }
  // next frame - still colliding
  if (bounceVel && collisionInProcess) return { pipeResult: null }
  if (!bounceVel) collisionInProcess = false
}