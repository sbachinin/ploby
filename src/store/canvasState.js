// @flow

import type { State, CanvasState } from '../types'
import getUpdatedBall from './ball/'
import getUpdatedMyself from './myself/'
import getUpdatedEnemy from './enemy/'

export default function(action: any, state: State) : CanvasState {
  return {
    myself: getUpdatedMyself(action,state),
    ball: getUpdatedBall(action, state),
    enemy: getUpdatedEnemy(action, state),
  }
}