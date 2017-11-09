// @flow

import { getSetting } from '../../settings';
import type { Ball } from '../../types';

export default function(side?: string): Ball {
  let position
  if (side === 'right') {
    position = getSetting('ball.rightInitialPos')
  } else if (side === 'left') {
    position = getSetting('ball.leftInitialPos')
  } else {
    position = getSetting('ball.neutralPos')
  }
  return {
    velocity: [ 0, 0 ],
    position,
    landed: false
  }
}
