import store from './store'
import {draw} from './canvas/'
import throttle from 'lodash.throttle'
import { runWithIntervals } from './devUtils'
import createMessageToEnemy from './createMessageToEnemy';

// 1) calc new my ball & own position,
// 2) draw all game state (incl. enemy) on canvas
// 3) notify enemy about my ball & own position

let socket

function runFrame(socket) {

  runWithIntervals(_ => {
    store.updateMeAndBall()
    draw(store.getState())
    // socket.sendRegularMessageToEnemy()
    throttledSendMessage()
  })

  requestAnimationFrame(runFrame)
}


const throttledSendMessage = throttle(
  _ => {
    socket.emit('message from player', createMessageToEnemy())
  },
  1000  / 30
)

function bindToSocket(s) {
  socket = s
}


export default {
  bindToSocket,
  runFrame
}
