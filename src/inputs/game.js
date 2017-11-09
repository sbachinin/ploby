// @flow

import { setGameKey } from '../store/actions'

export function handleGameInputs(e: {}) {

  if (e.type !== 'keydown' && e.type !== 'keyup') return

  let keyName

  if (e.which === 37) keyName = 'left'
  if (e.which === 39) keyName = 'right'
  if (e.which === 38) keyName = 'jump'

  if (!keyName) return

  setGameKey({
    keyName,
    event: e.type
  })

}