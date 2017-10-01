import { ball } from '../../gameSettings'

export default function({
  ball: {
    velocity: [xVel]
  },
}) {
  return xVel * ball.xDamping
}

