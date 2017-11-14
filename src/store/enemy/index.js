// @flow

import type { State, Enemy } from '../../types'

export default function(action: any, state: State) : Enemy {

  const { canvasState } = state

  switch (action.type) {

    case 'APPLY_ENEMY_DATA': {
      return Object.assign({}, canvasState.enemy, action.enemy)
    }

    case 'REMOVE_ENEMY': {
      return undefined
    }

    default: return canvasState.enemy
  }
}