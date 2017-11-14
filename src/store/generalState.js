// @flow

import type { GeneralState } from '../types'

export default function(action: any, state: GeneralState): GeneralState {
  switch (action.type) {

    case 'SAVE_SIZES': {
      return { ...state, sizes: action.sizes }
    }

    case 'UNLOCK_HELLO': {
      return { ...state, appPhase: 'hello window unlocked' }
    }

    case 'EXIT_HELLO_WINDOW': {
      if (state.mySide) {
        // side is given by server, should just start playing
        return { ...state, appPhase: 'playing' }
      } else {
        // show choose window & set left as default selected button
        return { ...state, appPhase: 'choose side', mySide: 'left'}
      }
    }

    case 'SET_MY_SIDE': { // r/l button clicked
      return { ...state, mySide: action.mySide || state.mySide }
    }

    case 'SUBMIT_SIDE': {
      // if button clicked, chosen side is passed in action.side.
      // If pressed enter, submit the side that's already in state.mySide
      return { 
        ...state,
        mySide: action.mySide || state.mySide,
        appPhase: 'playing'
      }
    }

    case 'ENEMY_ENTERED': {
      return { ...state, score: [0, 0] }
    }

    case 'APPLY_SCORE_CHANGED': {
      return {
        ...state,
        score: action.gameOver ? [0, 0] : action.score,
        appPhase: action.gameOver && state.appPhase === 'playing' ?
          ( action.looserSide === state.mySide ? 'game over loose' : 'game over win' ) :
          state.appPhase
      }
    }

    case 'START_RECONNECT': {
      return { ...state, reconnect: true }
    }

    case 'END_RECONNECT': {
      return { ...state, reconnect: false }
    }

    case 'EXIT_GAME_OVER': {
      return { ...state, appPhase: 'playing' }
    }

    default: return state
  }
}
