// @flow

import socket from './socket'
import store from './store'
import {draw} from './canvas/'
import throttle from 'lodash.throttle'
import { runWithIntervals } from './devUtils'

// 1) calc new my ball & own position,
// 2) draw all game state (incl. enemy) on canvas
// 3) notify enemy about my ball & own position

function runFrame() {

  runWithIntervals(_ => {
    store.updateMeAndBall()
    const state = store.getState()
    draw(state)
    throttledSendMessage(state)
  })

  requestAnimationFrame(runFrame)
}


const throttledSendMessage = throttle(
  state => {
    socket.sendMessage({
      enemy: { position: state.myself.position }
    })
  },
  1000  / 30
)


export default {
  runFrame
}
