// @flow

import { getSetting } from '../../../settings';

export default function(velocity: Array<number>, shouldDampForSmoothTransfer: boolean) : number {

  const yVel = velocity[1]
  const dir = getDirection(yVel)
  const gravity = getSetting('ball.gravity') / (
    shouldDampForSmoothTransfer ? 1.5 : 1
  )
  const yDampingOnRaise = getSetting('ball.yDampingOnRaise') + (
    shouldDampForSmoothTransfer ? 0.01 : 0
  )
  const yAccelerationOnFall = getSetting('ball.yAccelerationOnFall') - (
    shouldDampForSmoothTransfer ? 0.01 : 0
  )

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
