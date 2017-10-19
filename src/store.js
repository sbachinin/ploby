// @flow

import { getSetting } from './settings';
import updateMe from './updateMe/updateMe'
import updateMyBall from './updateMyBall/updateMyBall'
import getNewBall from './updateMyBall/getNewBall';

let state : {
  ball?: { position: Array<number>, velocity: Array<number> },
  myself?: { position: Array<number>, velocity: Array<number>, sideToPlay: string },
  enemy?: { position: Array<number> },
  jumpKeyPressed?: boolean,
  leftKeyPressed?: boolean,
  rightKeyPressed?: boolean
} = {}


const store = {

  setBallOnEnemySide() {
    if (!state.myself) return
    const side = state.myself.sideToPlay === 'left' ? 'right' : 'left'
    this.applyNewData({
      ball: getNewBall(side)
    })
  },


  deleteEnemy() {
    this.applyNewData({
      enemy: null,
      ball: state.myself && getNewBall(state.myself.sideToPlay)
    })
  },


  setInitialState(sideToPlay: string) {
    // if server didn't tell the side,
    // choose it in modal window
    // then calculate inital position
    // and resolve promise to start drawing
    const player = getSetting('player')
    const { leftX: leftFenceX, rightX: rightFenceX } = getSetting('fences')
    const position = sideToPlay === 'left' ?
    [player.leftInitialX, player.radius] :
    [player.rightInitialX, player.radius]
    
    const leftLimit = sideToPlay === 'left' ?
    player.radius :
    (rightFenceX + player.radius)
    const rightLimit = sideToPlay === 'left' ?
    (leftFenceX - player.radius) :
    (100 - player.radius)

    this.applyNewData({
      myself: {
        sideToPlay,
        position,
        velocity: [0, 0],
        leftLimit,
        rightLimit
      },
      // when every new player enters game, the ball is put on his side
      ball: getNewBall(sideToPlay)
    })
  },


  startJumping() {
    this.applyNewData({
      jumpKeyPressed: true
    })
  },

  stopJumping() {
    this.applyNewData({
      jumpKeyPressed: false
    })
  },

  startMovingLeft() {
    this.applyNewData({
      leftKeyPressed: true
    })
  },
  stopMovingLeft() {
    this.applyNewData({
      leftKeyPressed: false
    })
  },
  startMovingRight() {
    this.applyNewData({
      rightKeyPressed: true
    })
  },
  stopMovingRight() {
    this.applyNewData({
      rightKeyPressed: false
    })
  },


  updateMeAndBall() {
    this.applyNewData({
      myself: updateMe(state),
      ball: state.ball ? updateMyBall(state) : null
    })
  },


  applyNewData(newData: {
    // myself?: { position: Array<number>, velocity: Array<number> },
    // ball?: { position: Array<number>, velocity: Array<number> }
  }) {
    state = {
      ...state,
      ...newData
    }
  },


  getState() {
    return state
  }
}

export default store

window.getState = store.getState
