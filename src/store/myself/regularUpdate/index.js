// @flow

import getMyVel from './getMyVel'
import type { State, Myself } from '../../../types';

export default function(state: State): Myself {

  const { myself } = state.canvasState

  const velocity = getMyVel(state)

  return {
    ...myself,
    velocity,
    position: [
      myself.position[0] + (velocity[0] || 0),
      myself.position[1] + (velocity[1] || 0)
    ]
  }
}
