// @flow

import type { KeysState } from '../types'

export default function(action: any, state?: KeysState) {
  if (!state) return {}
  switch (action.type) {
    case 'SET_GAME_KEY': {
      return {
        ...state,
        [action.keyName + 'KeyPressed']: action.event === 'keydown'
      }
    }
    default: return state
  }
}