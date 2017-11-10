// @flow

export default function exitIfEnemyControl(
  { enemy, ball, mySide, flightZone, flightHistory, ballJustLeftMySide } : any
) {
  // I should update & send ball only if:
  // 1) ball is on my side or
  // 2) ball is over abyss & it's flying from enemy to me

  if (!enemy) return

  if (ballJustLeftMySide || ball.transferInProcess) return

  if (!isBallControlledByEnemy(flightZone, flightHistory, mySide)) return
  return {
    pipeResult: {
      ...ball,
      controlledByEnemy: true,
      flightHistory
    }
  }
}


function isBallControlledByEnemy(flightZone, flightHistory, mySide) {
  
  if (flightZone === mySide) return false
  
  if (flightZone.match(/left|right/)) return true // on enemy's side
  
  // --> abyss: controlled by enemy if ball last visited my side
  const flyingFromLeftPlayer = flightHistory.lastIndexOf('left') > flightHistory.lastIndexOf('right')
  if (flyingFromLeftPlayer && mySide === 'left') return true
  if (!flyingFromLeftPlayer && mySide === 'right') return true

}