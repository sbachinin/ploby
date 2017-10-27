// @dflow

const chooseSideWindow = document.getElementById('chooseSideWindow')
const leftBut = chooseSideWindow && chooseSideWindow.querySelector('button:first-of-type')
const rightBut = chooseSideWindow && chooseSideWindow.querySelector('button:last-of-type')
let windowShown = false

export const dumbMediator =  {
  on(fn) {
    this.fnToFire = fn
  },
  emit(arg) {this.fnToFire && this.fnToFire(arg) }
}

export function chooseSide() {
  windowShown = true
  // display the popup and collect the chosen side
  return new Promise(async (resolve, reject) => {
    chooseSideWindow.classList.remove('hidden')
    dumbMediator.on(side => {
      chooseSideWindow.classList.add('hidden')
      resolve(side)
    })
  })
}

export function selectLeftButton() {
  leftBut.classList.add('active')
  rightBut.classList.remove('active')
}
export function selectRightButton() {
  rightBut.classList.add('active')
  leftBut.classList.remove('active')
}
export function getSelectedButton() {
  return rightBut.classList.contains('active') ? 'right' : 'left'
}
export function chooseSideIsShown() {
  return windowShown
}