// @flow

import {
  startReconnect,
  endReconnect,
  applyEnemyData,
  removeEnemy,
  applyEnemyEntered,
  applyScoreChanged
} from '../store/actions';


export default (socket: any) => {
  socket.on('enemy entered', applyEnemyEntered)
  socket.on('message', applyEnemyData)
  socket.on('enemy gone', removeEnemy)
  socket.on('score changed', applyScoreChanged)
  socket.on('reconnect_attempt', startReconnect)
  socket.on('reconnect', endReconnect)
}