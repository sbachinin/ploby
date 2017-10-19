// @flow

import xVelPipedFunctions from './xVelPipedFunctions';
import pipe from '../utils/pipe';
import { getSetting } from '../settings';

type Args = { leftKeyPressed: boolean,
  rightKeyPressed: boolean,
  myself: {
    velocity: Array<number>,
    position: Array<number>,
    leftLimit: number,
    rightLimit: number
  } }

export default ({
  leftKeyPressed,
  rightKeyPressed,
  myself: {
    velocity: [myXVel],
    position: [myXPos],
    leftLimit,
    rightLimit
  }
} : Args) => {
  return pipe(
    xVelPipedFunctions,
    { leftKeyPressed,
      rightKeyPressed,
      myXVel,
      myXPos,
      leftLimit,
      rightLimit,
      playerSettings: getSetting('player')
    }
  )
};
