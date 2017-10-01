import store from './store'
import draw from './draw'
import throttle from 'lodash.throttle'
import { runWithIntervals } from './devUtils'

// 1) calc new my ball & own position,
// 2) draw all game state (incl. enemy) on canvas
// 3) notify enemy about my ball & own position

let socket

function runFrame(socket) {

  runWithIntervals(_ => {
    draw(store.updateMeAndBall())
    throttledSendMessage()
  })

  requestAnimationFrame(runFrame)
}


const throttledSendMessage = throttle(
  _ => {
    socket.emit('message from player', store.createMessageToEnemy())
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
