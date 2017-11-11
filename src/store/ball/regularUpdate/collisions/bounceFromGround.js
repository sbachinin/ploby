// @flow
import { getSetting } from '../../../../settings';
import type { Ball } from '../../../../types';

export default function({
  position: [xPos, yPos],
  velocity: [xVel, yVel]
}: Ball): ?Array<number> {
  const belowGround = getSetting('ball.radius') - yPos
  if (belowGround < 0) return
  if (yVel === 0) return
  if (Math.abs(yVel) < 0.02) return [xVel, 0]
  if (yVel < 0) return [xVel, Math.abs(yVel) / 4]
}