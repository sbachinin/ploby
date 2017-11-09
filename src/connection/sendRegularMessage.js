// @flow

import { sendMessage } from './socket';
import type { State } from '../types';
import pick from 'lodash.pick';

export default (state: State) => {

  let message: { enemy: {}, ball?: {} } = {
    enemy: {
      position: state.canvasState.myself.position,
      absent: state.generalState.appPhase !== 'playing'
    }
  }

  if (!state.canvasState.ball.controlledByEnemy) {
    message.ball = pick(
      state.canvasState.ball,
      ['velocity', 'position', 'newCollisionWith', 'kickedFirstTime']
    )
  }

  sendMessage(message)
}
