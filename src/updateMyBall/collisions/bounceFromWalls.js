// @flow
import { getSetting } from '../../settings';

type Args = {
  position: Array<number>, velocity: Array<number>
}

export default function({
  position: [xPos],
  velocity: [xVel, yVel]
} : Args) {
  if (
    xPos >= getSetting('ball.rightLimit') ||
    xPos <= getSetting('ball.leftLimit')
  ) {
    return [-xVel, yVel]
  }
}