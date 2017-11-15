// @flow

import Vue from 'vue/dist/vue.esm';
import store from '../../store/store';
import equal from 'deep-equal';
import type { State } from '../../types';

let vueState = store.getState()

export default {
  init() {
    new Vue({
      el: '#secondaryWindows',
      data: vueState
    })
  },
  applyData(state: State) {
    if (!this.shouldUpdate(vueState, state)) return
    Object.assign(vueState, state)
  },
  shouldUpdate(vueState: {}, state: State) {
    // 
    if (!equal(vueState.generalState, state.generalState)) return true
    const oldEnemy = vueState.canvasState.enemy
    const newEnemy = state.canvasState.enemy
    if (
      (!oldEnemy && newEnemy) ||
      (oldEnemy && !newEnemy) ||
      (oldEnemy && newEnemy && oldEnemy.absent !== newEnemy.absent)
    ) return true
  }
}

// function createMessages(state) {
//   let messages = []
//   if (!state.canvasState.enemy) messages.push('waiting for enemy...')
//   return messages
// }