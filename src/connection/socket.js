// @flow

import io from 'socket.io-client'
import handleMessagesFromServer from './handleMessagesFromServer';
// import { chooseSide } from './dom/chooseSideWindow'
// import enableExitFromHello from './dom/enableExitFromHello';
// import helloScreen from './dom/helloScreen';
// import updateGame from './updateGame'
// import fixScore from './dom/fixScore'
// import { showGameOver } from './dom/gameOverWindow';
// import type { Collision } from './updateMyBall/collisions/CollisionType';

// const reconnectMessage = document.getElementById('reconnectMessage')

let shit = 'rod'

const socketUrl = ( // create-r-a sets NODE_ENV to production if run build/deploy
  // process.env.NODE_ENV === 'production' ?
  shit === 'prod' ?
  'https://ploby-server.herokuapp.com' :
  'localhost:5000'
)

let socket

export function connect() : Promise<any> {
  socket = io(socketUrl);
  handleMessagesFromServer(socket)
  return new Promise(
    (resolve, reject) => {
      socket.on(
        'connection established',
        resolve
      )
    }
  )
}


export function sendMessage(data: {}) {
  socket.emit('message', data)
}

export function sendChosenSide(side?: 'left' | 'right') {
  socket.emit('player chose side', side)
}

export function sendStartPlayingMessage() {
  socket.emit('message', { enemy: { absent: false }})
}


  // if (data.returnedAfterGameOver) {
  //   store.addEnemy()
  //   return
  // }
  

  //   socket.on('enemy entered', _ => {
  //     fixScore([0,0])
  //     store.addEnemy()
  //   })


  //   socket.on('reconnect_attempt', () => {
  //     reconnectMessage && (reconnectMessage.innerText = 'reconnecting...')
  //   })


  //   socket.on('reconnect', () => {
  //     store.clearState()
  //     reconnectMessage && (reconnectMessage.innerText = '')
  //   })







  //   socket.on('score changed', ({ score, looserSide, gameOver }) => {
  //     fixScore(score);

  //     if (gameOver) {
  //       store.setInitialState()
  //       showGameOver(looserSide === (store.getState().myself || {}).sideToPlay)
  //       return
  //     }

  //     if (!store.getState().enemy) { // maybe i play alone
  //       store.setBallOnMySide()
  //     } else store.setBallOnSide(looserSide)
  //   })

  // },


  // sendMessage(message:
  //   { enemy?: {position: Array<number>} }
  //   |
  //   Collision
  //   |
  //   { returnedAfterGameOver: boolean }
  // ) {
  //   socket.emit('message', message)
  // }
