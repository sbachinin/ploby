// @flow

import getBallsXVel from './getBallsXVel'
import getBallsYVel from './getBallsYVel'
import type { Ball } from '../../../types'

// return ball's vel considering just normal 'physics'
export default function(ball: Ball) {
  return [
    getBallsXVel(ball),
    getBallsYVel(ball.velocity)
  ]
}

