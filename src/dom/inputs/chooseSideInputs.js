// @flow

import {
  dumbMediator,
  selectRightButton,
  selectLeftButton,
  getSelectedButton
} from '../chooseSideWindow';
import { installGameKeys } from './gameKeys';

let canChooseSide = false
export function enableChooseSide() {
  canChooseSide = true
}

document.addEventListener('click', chooseSide)
document.addEventListener('keydown', chooseSide)

function chooseSide(e) {
  if (!canChooseSide) return
  if (e.type === 'click' && e.target.tagName === 'BUTTON') {
    submitSide(e.target.id === 'leftSideButton' ? 'left' : 'right')
  }
  if (e.type !== 'keydown') return
  if (e.which === 37) selectLeftButton()
  if (e.which === 39) selectRightButton()
  if (e.which === 13) {
    submitSide(getSelectedButton())
  }
}

function submitSide(side) {
  dumbMediator.emit(side)
  installGameKeys()
}
