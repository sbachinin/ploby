// @flow
import { getSetting } from '../../settings';

type Args = {
  position: Array<number>, velocity: Array<number>
}

export default function({
  position: [xPos, yPos],
  velocity: [xVel, yVel]
} : Args) {
  const belowGround = getSetting('ball.radius') - yPos
  if (belowGround < 0) return
  if (yVel === 0) return
  if (Math.abs(yVel) < 0.05) return [xVel, 0]
  if (yVel < 0) return [xVel, Math.abs(yVel) / 4]
}