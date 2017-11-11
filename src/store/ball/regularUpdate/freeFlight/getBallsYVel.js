// @flow

import { getSetting } from '../../../../settings';

export default function(velocity: Array<number>) : number {

  const yVel = velocity[1]
  const dir = getDirection(yVel)
  const gravity = getSetting('ball.gravity')
  const yDampingOnRaise = getSetting('ball.yDampingOnRaise')
  const yAccelerationOnFall = getSetting('ball.yAccelerationOnFall')

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
