// @flow

import changeGeneralState from './generalState';
import changeCanvasState from './canvasState';
import changeKeysState from './keysState';
import getInitialState from './getInitialState';
import type { State } from '../types'

let state : State = getInitialState()

const store = {

  change(action: any) {
    state = {
      generalState: changeGeneralState(action, state.generalState),
      canvasState: changeCanvasState(action, state),
      keysState: changeKeysState(action, state.keysState)
    }
  },

  getState() {
    return state
  }

}

export default store

window.getState = store.getState
