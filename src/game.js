// @flow

import { setSettings } from './settings';
import store from './store/store';
import { regularUpdate, applyConnection } from './store/actions';
import sendRegularMessage from './connection/sendRegularMessage';
import render from './render/'
import initCanvas from './render/canvas/initCanvas'
import { runWithIntervals } from './devUtils'
import type { Settings } from './settings';

export function startFrames(
  { gameSettings, sideToPlay } :
  { gameSettings: Settings, sideToPlay?: 'left' | 'right' | void }
) {

  applyConnection(sideToPlay)

  setSettings(gameSettings)
  initCanvas(gameSettings)
  runFrame()
}


export function runFrame() {

  runWithIntervals(_ => {
    regularUpdate()
    const state = store.getState()
    render(state)
    sendRegularMessage(state)
  })

  requestAnimationFrame(runFrame)
}

