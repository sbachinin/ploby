// @flow

import store from './store'
import type { Ball, Enemy } from '../types';

export function saveSizes(sizes: {}) {
  store.change({ type: 'SAVE_SIZES', sizes })
}


export function unlockHello() {
  store.change({ type: 'UNLOCK_HELLO' })
}

export function exitHelloWindow() {
  store.change({ type: 'EXIT_HELLO_WINDOW' })
}

export function submitSide(mySide?: 'left' | 'right') {
  store.change({
    type: 'SUBMIT_SIDE',
    mySide
  })
}

export function setMySide(mySide?: 'left' | 'right') {
  store.change({
    type: 'SET_MY_SIDE',
    mySide
  })
}


export function setGameKey(data: { keyName: string, event: string }) {
  store.change({
    type: 'SET_GAME_KEY',
    ...data
  })
}


export function regularUpdate() {
  store.change({ type: 'REGULAR_UPDATE' })
}

export function applyEnemyData(data: {
  ball?: Ball, enemy?: Enemy
}) {
  store.change({
    type: 'APPLY_ENEMY_DATA',
    ...data
  })
}

export function removeEnemy() {
  store.change({ type: 'REMOVE_ENEMY'})
}

export function applyEnemyEntered() {
  store.change({ type: 'ENEMY_ENTERED'})
}

export function applyConnection(mySide?: 'left' | 'right') {
  unlockHello()
  mySide && setMySide(mySide)
}

export function applyScoreChanged(data: {
  score: Array<number>, looserSide: 'left' | 'right', gameOver: boolean
}) {
  if (!data) return
  store.change({
    type: 'APPLY_SCORE_CHANGED',
    ...data
  })
}

export function startReconnect() {
  store.change({ type: 'START_RECONNECT' })
}
export function endReconnect() {
  store.change({ type: 'END_RECONNECT' })
}

export function exitGameOver() {
  store.change({ type: 'EXIT_GAME_OVER' })
}