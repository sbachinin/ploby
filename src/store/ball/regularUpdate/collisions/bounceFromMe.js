// @flow

import { getSetting } from '../../../../settings';
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
      dampVelIfOverKicked,
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
  if (ball.landed || ball.collisionsWithMeCount > getSetting('kicksLimit')) return { pipeResult: null }
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


function dampVelIfOverKicked({ bounceVel, ball }) {
  if (!bounceVel) return
  if (ball.collisionsWithMeCount >= getSetting('kicksLimit')) return ({
    pipeResult: [ bounceVel[0] / 3, bounceVel[1] / 3 ]
  })
}