// @flow

import io from 'socket.io-client'
import handleMessagesFromServer from './handleMessagesFromServer';

const socketUrl = (
  process.env.NODE_ENV === 'production' ?
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

