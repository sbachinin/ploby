// @flow

import bounceFromMe from './bounceFromMe'
import bounceFromFences from './fromFences/'
import bounceFromWalls from './bounceFromWalls'
import bounceFromGround from './bounceFromGround'
import type {State} from '../../store'
import type {Collision} from './CollisionType'
import pipe from 'pipeduce'

export default function({ball, myself, enemy}: State) : { collision: ?Collision } {

  const collision = pipe([
    isBallOnMySide,
    exitIfEnemySide,
    getFirstCollision
  ], {
    ball, myself, enemy
  })

  return { collision }
}


function isBallOnMySide({ ball, myself }) {
  return {
    ballOnMySide: (ball.position[0] > 50 && myself.sideToPlay === 'right') ||
    (ball.position[0] <= 50 && myself.sideToPlay === 'left')
  }
}

function exitIfEnemySide({ ballOnMySide, enemy }) {
  // if ball is on enemy's side,
  // wait for his messages
  // instead of searching for collisions myself 
  
  if (enemy && !ballOnMySide) return { pipeResult: null }
}


function getFirstCollision({ ball, myself }) : { pipeResult: ?Collision } {
  const fns = {
    wall: bounceFromWalls,
    player: bounceFromMe,
    fence: bounceFromFences,
    ground: bounceFromGround
  }
  const sources = Object.keys(fns)
  let i = 0
  while (sources[i]) {
    const velAfterCollision : ?Array<number> = fns[sources[i]](ball, myself)
    if (velAfterCollision) {
      return {
        pipeResult: {
          collisionSource: sources[i],
          velAfterCollision,
          ballLanded: sources[i] === 'ground'
        }
      }
    }
    i++
  }
  return { pipeResult: null }
}
