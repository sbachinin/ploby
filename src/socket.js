// @flow

import io from 'socket.io-client'
import { setSettings } from './settings';
import { createCanvas } from './canvas/';
import store from './store'
import { chooseSide } from './dom/chooseSideWindow'
import enableExitFromHello from './dom/enableExitFromHello';
import helloScreen from './dom/helloScreen';
import updateGame from './updateGame'
import fixScore from './dom/fixScore'
import { showGameOver } from './dom/gameOverWindow';
import type { Collision } from './updateMyBall/collisions/CollisionType';

const reconnectMessage = document.getElementById('reconnectMessage')

const socketUrl = ( // create-r-a sets NODE_ENV to production if run build/deploy
  process.env.NODE_ENV === 'production' ?
  'https://ploby-server.herokuapp.com' :
  'localhost:5000'
)

let socket

export default {
  
  start() {
    socket = io(socketUrl);

    socket.on(
      'connection established',
      async ({ gameSettings, sideToPlay }) => {
        store.applyNewData({
          gameState: 'can close hello window'
        })
        // server created new game, as 1st player i should choose side
        setSettings(gameSettings)
        createCanvas()
        if (!sideToPlay) {
          sideToPlay = await chooseSide()
          socket.emit('player chose side', sideToPlay)
        }

        store.setInitialState(sideToPlay)
        updateGame.startFrames()
      }
    )

    socket.on('enemy entered', _ => {
      fixScore([0,0])
      store.addEnemy()
    })


    socket.on('reconnect_attempt', () => {
      reconnectMessage && (reconnectMessage.innerText = 'reconnecting...')
    })


    socket.on('reconnect', () => {
      store.clearState()
      reconnectMessage && (reconnectMessage.innerText = '')
    })


    socket.on('enemy gone', _ => {
      store.deleteEnemy()
    })


    socket.on('message', data => {
      if (data.returnedAfterGameOver) {
        store.addEnemy()
        return
      }
      store.applyNewData(data)
    })

    socket.on('score changed', ({ score, winnerSide, gameOver }) => {
      fixScore(score);

      if (gameOver) {
        store.setInitialState()
        showGameOver(winnerSide === (store.getState().myself || {}).sideToPlay)
        return
      }

      if (!store.getState().enemy) { // maybe i play alone
        store.setBallOnMySide()
      } else store.setBallOnSide(winnerSide)
    })

  },


  sendMessage(message:
    { enemy?: {position: Array<number>} }
    |
    Collision
    |
    { returnedAfterGameOver: boolean }
  ) {
    socket.emit('message', message)
  }
}