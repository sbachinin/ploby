// @flow

import type { State, CanvasState } from '../types'
import updateMyself, { getInitialPlayer } from './updateMyself/';
import getNewBall from './updateBall/getNewBall';
import updateBall from './updateBall/';
import _ from 'lodash'

export default function(action: any, state: State) : CanvasState {

  const { canvasState, generalState } = state

  // return {
  //   myself:
  //   ball:
  //   enemy:
  // }

  switch (action.type) {

    case 'SUBMIT_SIDE':
    // if side is submitted by click, chosen side is passed in action.mySide.
    // If it's submitted by ENTER, no side is passed, should just confirm the side that is already in generalState.mySide
    case 'SET_MY_SIDE': {
      const mySide = action.mySide || generalState.mySide
      const enemySide = mySide === 'left' ? 'right' : 'left'
      return {
        ...canvasState,
        myself: getInitialPlayer(mySide),
        ball: getNewBall(canvasState.enemy ? enemySide : mySide),
      }
    }
    case 'REGULAR_UPDATE': {
      return {
        ...canvasState,
        myself: updateMyself(state),
        ball: updateBall(state)
      }
    }
    case 'APPLY_ENEMY_DATA': {
      return {
        ...canvasState,
        enemy: Object.assign({}, canvasState.enemy, action.enemy),
        ball: Object.assign({}, canvasState.ball, action.ball)
      }
    }

    case 'REMOVE_ENEMY': {
      return _.omit(canvasState, ['enemy'])
    }

    case 'ENEMY_ENTERED': {
      return {
        ...canvasState,
        ball: getNewBall(generalState.mySide)
      }
    }


    case 'APPLY_SCORE_CHANGED': {
      // if playing alone, return ball to your side
      // if not alone, set ball to winner's side
      let side
      if (!canvasState.enemy) {
        side = generalState.mySide
      } else {
        side = action.looserSide === 'left' ? 'right' : 'left'
      }
      return {
        ...canvasState,
        ball: getNewBall(side),
        enemy: { ...canvasState.enemy, absent: true }
      }
    }


    default: return canvasState
  }
}