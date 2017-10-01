let frameInterval = 1
let frameCounter = 1

// when requestAF fires, run game updates only once in N cases
export function runWithIntervals(fn) {
  // fires run when counter is smth
  if (frameCounter >= frameInterval) {
    fn()
    frameCounter = 1
  } else {
    frameCounter++
  }
}

const delay = document.getElementById('delay')
document.addEventListener('keypress', e => {
  if (e.which === 97) frameInterval += 1
  if (e.which === 113 && frameInterval > 1) frameInterval -= 1
  delay.innerText = 'delay: ' + frameInterval
  return true
})