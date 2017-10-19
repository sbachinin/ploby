// @flow

import io from 'socket.io-client'
import installKeys from './installKeys'
import { setSettings } from './settings';
import { createCanvas } from './canvas/';
import store from './store'
import chooseSideInPopup from './chooseSideInPopup'
import updateGame from './updateGame'

const socketUrl = ( // create-r-a sets NODE_ENV to production if run build/deploy
  process.env.NODE_ENV === 'production' ?
  'ploby-server.herokuapp.com' :
  'localhost:5000'
)

let socket

export default {
  
  start() {
    socket = io(/*socketUrl*/'localhost:5000');

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


    socket.on('message', data => {
      store.applyNewData(data)
    })

  },


  sendMessage(message: {
    player?: { position: Array<number> },
    ball?: { position: Array<number>, velocity: Array<number> }
  }) {
    socket.emit('message', message)
  },

}