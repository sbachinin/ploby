// @flow

import io from 'socket.io-client'
import installKeys from './installKeys'
import store from './store'
import chooseSideInPopup from './chooseSideInPopup'
import updateGame from './updateGame'
import { setSettings } from './settings';
import { createCanvas } from './canvas/';
require('./requestAnimationFramePolyfill')()

const socketUrl = ( // create-r-a sets NODE_ENV to production if run build/deploy
  process.env.NODE_ENV === 'production' ?
  'ploby-server.herokuapp.com' :
  'localhost:5000'
)
var socket = io(/*socketUrl*/'localhost:5000');
updateGame.bindToSocket(socket)


socket.on(
  'connection established',
  async ({ gameSettings, sideToPlay }) => {
    // server created new game, as 1st player i should choose side
    setSettings(gameSettings)
    installKeys()
    createCanvas()

    if (!sideToPlay) {
      sideToPlay = await chooseSideInPopup()
      socket.emit('player chose side', sideToPlay)
    }

    store.setInitialState(sideToPlay)

    updateGame.runFrame()
  }
)

socket.on('enemy entered', _ => {
  store.setBallOnEnemySide()
})


socket.on('enemy gone', _ => {
  store.deleteEnemy()
})


socket.on('message from enemy', data => {
  store.applyEnemyData(data)
})
