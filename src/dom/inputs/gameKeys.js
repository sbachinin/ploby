import store from '../../store'

export function installGameKeys() {

  document.addEventListener('keydown', e => {
    if (e.which === 37) {
      store.startMovingLeft()
    }
    if (e.which === 39) {
      store.startMovingRight()
    }
    if (e.which === 38) {
      store.startJumping()
    }
  })

  document.addEventListener('keyup', e => {
    if (e.which === 37) {
      store.stopMovingLeft()
    }
    if (e.which === 39) {
      store.stopMovingRight()
    }
    if (e.which === 38) {
      store.stopJumping()
    }
  })
}