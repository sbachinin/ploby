// @flow

import store from '../store/store';
import { exitGameOver, exitHelloWindow } from '../store/actions';
import { handleChooseSideInputs } from './chooseSide';
import { handleGameInputs } from './game';

export function initKeys() {
  document.addEventListener('click', handle)
  document.addEventListener('keydown', handle)
  document.addEventListener('keyup', handle)
}

function handle(e: Event): void {
  const phase = store.getState().generalState.appPhase
  switch(phase) {
    case 'hello window unlocked': exitHelloWindow(); break
    case 'choose side': handleChooseSideInputs(e); break
    case 'playing': handleGameInputs(e); break
    case 'game over win':
    case 'game over loose': exitGameOver(); break
    default: return
  }
}

