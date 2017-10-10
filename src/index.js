import io from 'socket.io-client'
import installKeys from './installKeys'
import store from './store'
import chooseSideInPopup from './chooseSideInPopup'
import updateGame from './updateGame'
import { defineMyXLimits } from './updateMe/getMyXVel';
require('./requestAnimationFramePolyfill')()
require('./createCanvas').default()

const socketUrl = ( // create-r-a sets NODE_ENV to production if run build/deploy
  process.env.NODE_ENV === 'production' ?
  'ploby-server.herokuapp.com' :
  'localhost:5000'
)
var socket = io(socketUrl);
updateGame.bindToSocket(socket)


socket.on(
  'connection established',
  async sideToPlay => {

    // sideToPlay = 'left'

    // server created new game, as 1st player i should choose side
    if (!sideToPlay) {
      sideToPlay = await chooseSideInPopup()
      socket.emit('player chose side', sideToPlay)
    }

    defineMyXLimits(sideToPlay)
    store.setMyInitialPosition(sideToPlay)
    installKeys()

    updateGame.runFrame()
  }
)


socket.on('message from enemy', data => {
  store.applyEnemyData(data)
})
