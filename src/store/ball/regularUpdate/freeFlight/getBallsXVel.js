// @flow

import { getSetting } from '../../../../settings';
import type { Ball } from '../../../../types'

export default function(ball: Ball): number {
  const xD = getSetting('ball.xDamping')
  const ballRadius = getSetting('ball.radius')
  if (Math.abs(ball.velocity[0]) < 0.03) return 0
  if (ball.position[1] <= ballRadius) return ball.velocity[0] * Math.pow(xD, 4)
  return ball.velocity[0] * xD
}

