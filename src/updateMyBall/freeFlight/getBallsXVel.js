// @flow

import { getSetting } from '../../settings';

export default function({ ball } : {
  ball: { velocity: Array<number> }
}) {
  return ball.velocity[0] * getSetting('ball.xDamping')
}

