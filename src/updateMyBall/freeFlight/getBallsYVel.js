import {
  ball
} from '../../gameSettings'

export default function({
  ball: {
    position: [xPos, yPos],
    velocity: [xVel, yVel]
  }
}, collisionYDiff) {

  const dir = getDirection(yVel)

  switch (dir) {
    case 'GOING_UP':
      return (yVel - ball.gravity) * ball.yDampingOnRaise
    case 'GOING_DOWN':
      return (yVel - ball.gravity) * ball.yAccelerationOnFall
    default: return yVel
  }

}


function getDirection(yVel) {
  if (yVel === 0) return 'RESTING'
  if (yVel > 0) return 'GOING_UP'
  return 'GOING_DOWN'
}
