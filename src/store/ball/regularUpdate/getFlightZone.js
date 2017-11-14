// @flow
import { getSetting } from '../../../settings';
import type { Ball } from '../../../types';

export default function getFlightZone({ ball }: { ball: Ball }) {

  let flightZone = 'abyss'
  const rad = getSetting('ball.radius')
  if ((ball.position[0] - rad) < getSetting('fences.leftX')) {
    flightZone = 'left'
  }
  if ((ball.position[0] + rad) > getSetting('fences.rightX')) {
    flightZone = 'right'
  }

  return { flightZone }
}
