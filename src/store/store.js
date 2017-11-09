// @flow

// import { getSetting, getPlayerInitialPos, definePlayerLimits } from './settings';
// import updateMe from './updateMe/updateMe'
// import updateMyBall from './updateMyBall/updateMyBall'
// import getNewBall from './updateMyBall/getNewBall';
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
  },

  setState(newData: {}) {
    state = {
      ...state,
      ...newData
    }
  },


  // updateState() {
  //   return state
  // },


  // addEnemy() {
  //   // should draw enemy and ball on ememy's side

  //   const enemySide = state.myself && state.myself.sideToPlay === 'left' ? 'right' : 'left'
    
  //   this.applyNewData({
  //     ball: getNewBall(enemySide),
  //     enemy: { position: getPlayerInitialPos(enemySide) }
  //   })
  // },


  // setBallOnMySide() {
  //   this.setBallOnSide(state.myself && state.myself.sideToPlay)
  // },


  // setBallOnSide(side: string) {
  //   this.applyNewData({
  //     ball: getNewBall(side)
  //   })
  // },


  // deleteEnemy() {
  //   this.applyNewData({
  //     enemy: null,
  //     ball: state.myself && getNewBall(state.myself.sideToPlay)
  //   })
  // },


  // setInitialState(sideToPlay?: string) {
  //   if (!sideToPlay) {
  //     if (!state.myself) return
  //     // case for resetting all after game over
  //     sideToPlay = state.myself.sideToPlay
  //   }

  //   const { leftX: leftFenceX, rightX: rightFenceX } = getSetting('fences')
  //   const limits = definePlayerLimits(sideToPlay)
  //   if (!limits) return

  //   this.applyNewData({
  //     myself: {
  //       sideToPlay,
  //       position: getPlayerInitialPos(sideToPlay),
  //       velocity: [0, 0],
  //       leftLimit: limits.leftLimit,
  //       rightLimit: limits.rightLimit
  //     },
  //     // when every new player enters game, the ball is put on his side
  //     ball: getNewBall(sideToPlay),
  //     enemy: null
  //   })
  // },


  // clearState() {
  //   state = {}
  // },


  // startJumping() {
  //   this.applyNewData({
  //     jumpKeyPressed: true
  //   })
  // },

  // stopJumping() {
  //   this.applyNewData({
  //     jumpKeyPressed: false
  //   })
  // },

  // startMovingLeft() {
  //   this.applyNewData({
  //     leftKeyPressed: true
  //   })
  // },
  // stopMovingLeft() {
  //   this.applyNewData({
  //     leftKeyPressed: false
  //   })
  // },
  // startMovingRight() {
  //   this.applyNewData({
  //     rightKeyPressed: true
  //   })
  // },
  // stopMovingRight() {
  //   this.applyNewData({
  //     rightKeyPressed: false
  //   })
  // },

  // isEmpty() {
  //   return !state.myself
  // },

  // updateMeAndBall() {
  //   this.applyNewData({
  //     myself: updateMe(state),
  //     ball: state.ball ? updateMyBall(state) : null
  //   })
  // },


  // applyNewData(newData: {
  //   // myself?: { position: Array<number>, velocity: Array<number> },
  //   // ball?: { position: Array<number>, velocity: Array<number> }
  // }) {
  //   state = {
  //     ...state,
  //     ...newData
  //   }
  // },


  // getState() {
  //   return state
  // }
}

export default store

window.getState = store.getState
