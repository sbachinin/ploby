// @flow
const helloScreen = document.getElementById('helloOverlay')
const preloader = document.getElementById('preloaderWrapper')

export default {
  hidePreloader() {
    preloader && (preloader.innerHTML = '<span>press any key or click</span>')
  },
  remove() {
    helloScreen && helloScreen.remove()
  }
}