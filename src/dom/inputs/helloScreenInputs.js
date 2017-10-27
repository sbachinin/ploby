// @flow

import { enableChooseSide } from './chooseSideInputs'
import { chooseSideIsShown } from '../chooseSideWindow';
import { installGameKeys } from './gameKeys';
import helloScreen from '../helloScreen';

let canExitFromHello = false
export function enableHelloInputs() {
  canExitFromHello = true
}

document.addEventListener('click', exitFromHello)
document.addEventListener('keydown', exitFromHello)
function exitFromHello() {
  if (!canExitFromHello) return
  helloScreen.remove()
  document.removeEventListener('click', exitFromHello)
  document.removeEventListener('keydown', exitFromHello)
  setTimeout(() => {
    if (chooseSideIsShown()) {
      enableChooseSide()
    } else installGameKeys()
  })
}