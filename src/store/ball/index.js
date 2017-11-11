// @flow

import type { State, Ball } from '../../types'
import getNewBall from './getNewBall'
import update from './regularUpdate/'
import tryApplyEnemyBall from './tryApplyEnemyBall'


export default function(action: any, state: State) : Ball {

  const { canvasState, generalState } = state

  switch (action.type) {

    case 'SUBMIT_SIDE':
    case 'SET_MY_SIDE': {
      const mySide = action.mySide || generalState.mySide
      const enemySide = mySide === 'left' ? 'right' : 'left'
      return getNewBall(canvasState.enemy ? enemySide : mySide)
    }

    case 'REGULAR_UPDATE': return update(state)
    case 'APPLY_ENEMY_DATA': return tryApplyEnemyBall(canvasState.ball, action.ball)
    case 'ENEMY_ENTERED': return getNewBall(generalState.mySide)

    case 'APPLY_SCORE_CHANGED': {
      // if playing alone, return ball to your side
      // if not alone, set ball to winner's side
      let side
      if (!canvasState.enemy) {
        side = generalState.mySide
      } else {
        side = action.looserSide === 'left' ? 'right' : 'left'
      }
      return getNewBall(side)
    }

    default: return canvasState.ball
  }
}