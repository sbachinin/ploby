// @flow
import { getSetting } from '../../settings';
import type { Ball } from '../../types';
import _ from 'lodash';

export default function getFlightZone({ ball }: { ball: Ball }) {
  
  // if (ball.flightHistory && ball.flightHistory[0] && ball.position[1] <= getSetting('fences.height')) {
  //   console.log('setting to prev: ', _.last(ball.flightHistory))
  //   return { flightZone: _.last(ball.flightHistory) }
  // }

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
