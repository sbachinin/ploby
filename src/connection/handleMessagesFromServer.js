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
  
  // ({ score, looserSide, gameOver }) => {
  
  //   // save new score to game && give winner a ball
  //   // or reset game (setInitial state) && switch to gameOver
  //   fixScore(score);
  
  //   if (gameOver) {
  //     store.setInitialState()
  //     showGameOver(looserSide !== (store.getState().myself || {}).sideToPlay)
  //     return
  //   }
  
  //   if (!store.getState().enemy) { // maybe i play alone
  //     store.setBallOnMySide()
  //   } else store.setBallOnSide(looserSide)
  // })
};

