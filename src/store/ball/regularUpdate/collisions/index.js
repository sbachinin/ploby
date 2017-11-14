// @flow

import bounceFromMe from './bounceFromMe'
import bounceFromFences from './fromFences/'
import bounceFromWalls from './bounceFromWalls'
import bounceFromGround from './bounceFromGround'
import type { Ball, Myself, Enemy } from '../../../../types'
import type {Collision} from './CollisionType'
import pipe from 'pipeduce'

export default function({ball, myself, enemy, mySide}: {
  ball: Ball, myself: Myself, enemy: Enemy, mySide: string
}) : { collision: ?Collision } {

  const collision = pipe([
    getFirstCollision
  ], {
    ball, myself, enemy, mySide
  })

  return { collision }
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
          velAfterCollision
        }
      }
    }
    i++
  }
  return { pipeResult: null }
}
