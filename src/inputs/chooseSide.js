// @flow

import { setMySide, submitSide } from '../store/actions';
import { sendChosenSide } from '../connection/socket';

export function handleChooseSideInputs(e: any) {
  if (e.type === 'click' && e.target.tagName === 'BUTTON') {
    submit(e.target.id === 'leftSideButton' ? 'left' : 'right')
  }
  if (e.type !== 'keydown') return
  if (e.which === 37) setMySide('left')
  if (e.which === 39) setMySide('right')
  if (e.which === 13) submit()
}

function submit(side) {
  sendChosenSide(side)
  submitSide(side)
}