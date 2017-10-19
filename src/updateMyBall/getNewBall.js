// @flow

import { getSetting } from '../settings';

export default function(side : string) {
  return {
    velocity: [ 0, 0 ],
    position: (
      side === 'right' ?
      getSetting('ball.rightInitialPos') :
      getSetting('ball.leftInitialPos')
    )
  }
}
