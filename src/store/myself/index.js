// @flow

import type { State, Myself } from '../../types'
import getInitialPlayer from './getInitialPlayer';
import update from './regularUpdate/'

export default function(action: any, state: State) : Myself {

  const { canvasState, generalState } = state

  switch (action.type) {

    case 'SUBMIT_SIDE':
    // if side is submitted by click, chosen side is passed in action.mySide.
    // If it's submitted by ENTER, no side is passed, should just confirm the side that is already in generalState.mySide
    case 'SET_MY_SIDE': {
      const mySide = action.mySide || generalState.mySide
      return getInitialPlayer(mySide)
    }
    case 'REGULAR_UPDATE': return update(state)

    default: return canvasState.myself
  }
}