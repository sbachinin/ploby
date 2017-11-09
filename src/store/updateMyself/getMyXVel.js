// @flow

import xVelPipedFunctions from './xVelPipedFunctions';
import pipe from 'pipeduce';
import { getSetting } from '../../settings';
import type { State } from '../../types';

export default (state : State): number => {
  if (!state.canvasState || !state.keysState || !state.canvasState.myself) return [0, 0]
  const { leftKeyPressed, rightKeyPressed } = state.keysState
  const { position, velocity, leftLimit, rightLimit } = state.canvasState.myself
  if (!position || !velocity) return 0
  return pipe(
    xVelPipedFunctions,
    {
      leftKeyPressed,
      rightKeyPressed,
      myXVel: velocity[0],
      myXPos: position[0],
      leftLimit,
      rightLimit,
      playerSettings: getSetting('player')
    }
  )
};
