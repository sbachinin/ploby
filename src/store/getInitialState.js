// @flow

import { getInitialPlayer } from './updateMyself/';
import getNewBall from './updateBall/getNewBall'
import type { State } from '../types';

export default function(): State {
  return {
    generalState: {
      appPhase: 'hello window locked',
      score: [0, 0],
      mySide: '', // should be set for Vue
      sizes: { abyssWidth: 0, abyssHeight: 0, canvasWidth: 0, canvasHeight: 0 }
    },
    canvasState: {
      myself: getInitialPlayer('left'),
      ball: getNewBall()
    },
    keysState: {}
  }
}
