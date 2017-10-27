// @flow

import store from '../store';
import socket from '../socket';
import fixScore from './fixScore'

const gameOverWindow = document.getElementById('gameOverWindow')
const looserMessage = gameOverWindow && gameOverWindow.querySelector('#looserMessage')
const winnerMessage = gameOverWindow && gameOverWindow.querySelector('#winnerMessage')
let canHideGameOver = false

export function showGameOver(youWin: boolean) {
  if (!gameOverWindow) return
  const toShow = youWin ? winnerMessage : looserMessage
  const toHide = youWin ? looserMessage : winnerMessage
  toShow && toShow.classList.remove('hidden')
  toHide && toHide.classList.add('hidden')
  gameOverWindow.classList.remove('hidden')
  canHideGameOver = true
}

export function hideGameOver() {
  if (!canHideGameOver) return
  gameOverWindow && gameOverWindow.classList.add('hidden')
  canHideGameOver = false
  // store.setInitialState()
  socket.sendMessage({ returnedAfterGameOver: true })
  fixScore([0, 0])
}

document.addEventListener('click', hideGameOver)
document.addEventListener('keydown', hideGameOver)