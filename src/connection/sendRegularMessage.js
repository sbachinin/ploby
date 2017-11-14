// @flow

import { sendMessage } from './socket';
import type { State } from '../types';
import _ from 'lodash';

export default (state: State) => {

  let message: { enemy: {}, ball?: {} } = {
    enemy: {
      position: state.canvasState.myself.position,
      absent: state.generalState.appPhase !== 'playing'
    }
  }

  if (!state.canvasState.ball.controlledByEnemy && !state.canvasState.ball.transferInProcess) {
    message.ball = _.pick(
      state.canvasState.ball,
      ['velocity', 'position', 'newCollisionWith', 'kickedFirstTime']
    )
  }

  sendMessage(message)
}
