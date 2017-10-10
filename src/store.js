import { canvasSize, player } from './gameSettings'
import updateMe from './updateMe/updateMe'
import updateMyBall from './updateMyBall/updateMyBall'

let state = { myself: {}, enemy: {} }

const store = {

  setMyInitialPosition(sideToPlay) {
    // if server didn't tell the side,
    // choose it in modal window
    // then calculate inital position
    // and resolve promise to start drawing

    const position = sideToPlay === 'left' ?
      [player.leftInitialX, player.radius] :
      [player.rightInitialX, player.radius]

    this.applyNewData({
      myself: {
        sideToPlay,
        position,
        velocity: [0, 0]
      }
    })
  },


  applyEnemyData(data) {
    state.enemy.position = [
      canvasSize.width / 100 * data.playerPositionPercentage[0],
      canvasSize.height / 100 * data.playerPositionPercentage[1] 
    ]
    state.ball = data.ball
  },

  createMessageToEnemy() {
    const { myself: { position }, ball } = state
    return {
      playerPositionPercentage: [
        (position[0] / canvasSize.width * 100).toFixed(4),
        (position[1] / canvasSize.height * 100).toFixed(4)
      ],
      ball
      // ballPosition: state.ball.position
    }
  },


  startJumping() {
    state.jumpKeyPressed = true
  },

  stopJumping() {
    state.jumpKeyPressed = false
  },

  startMovingLeft() {
    state.leftKeyPressed = true
  },
  stopMovingLeft() {
    state.leftKeyPressed = false
  },
  startMovingRight() {
    state.rightKeyPressed = true
  },
  stopMovingRight() {
    state.rightKeyPressed = false
  },


  updateMeAndBall() {
    this.applyNewData({
      myself: updateMe(state),
      ball: updateMyBall(state)
    })
    return state
  },


  applyNewData(newData) {
    state = {
      ...state,
      ...newData
    }
  },


  getState() {
    return state;
  }
}

export default store

window.getState = store.getState
