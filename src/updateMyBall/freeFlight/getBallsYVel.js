// @flow

import { getSetting } from '../../settings';

export default function(
  { ball } : { ball: { velocity: Array<number> } }, 
  collisionYDiff : number
) : number {

  const yVel = ball.velocity[1]
  const dir = getDirection(yVel)
  const { gravity, yDampingOnRaise, yAccelerationOnFall } = getSetting('ball')

  switch (dir) {
    case 'GOING_UP':
      return (yVel - gravity) * yDampingOnRaise
    case 'GOING_DOWN':
      return (yVel - gravity) * yAccelerationOnFall
    default: return yVel
  }

}


function getDirection(yVel) {
  if (yVel === 0) return 'RESTING'
  if (yVel > 0) return 'GOING_UP'
  return 'GOING_DOWN'
}
