// @flow

import vueApp from './secondaryWindows/vueApp';
import type { State } from '../types';
import { draw } from './canvas/draw';

export default function(state: State) {
  vueApp.applyData(state)
  draw(state.canvasState)
}