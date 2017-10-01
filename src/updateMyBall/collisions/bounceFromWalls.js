import { ball } from '../../gameSettings'

export default function({
  position: [xPos],
  velocity: [xVel, yVel]
}) {
  if (xPos >= ball.rightLimit || xPos <= ball.leftLimit) {
    return [-xVel, yVel]
  }
}