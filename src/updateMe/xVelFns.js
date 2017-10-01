import { player as playerSettings } from '../gameSettings';

export default [
  accelerateIfKeyPressed,
  dampIfKeyReleased,
  stopIfReachedLimit,
  reduceVelBeforeLimit,
]



function accelerateIfKeyPressed({
  rightKeyPressed,
  leftKeyPressed,
  myXVel
}) {

  // acceleratedVel
  let newXVel
  if (rightKeyPressed) {
    if ((myXVel + playerSettings.xAcceleration) < playerSettings.maxXVel) {
      return { newXVel: myXVel + playerSettings.xAcceleration }
    } 
    return { newXVel: playerSettings.maxXVel }
  }
  if (leftKeyPressed) {
    if ((myXVel - playerSettings.Acceleration) > -playerSettings.maxXVel) {
      return { newXVel: myXVel - playerSettings.xAcceleration }
    } 
    return { newXVel: -playerSettings.maxXVel }
  }
}


function dampIfKeyReleased({
  rightKeyPressed,
  leftKeyPressed,
  myXVel // maybe accelarated, maybe not
}) {
  // dampedvel
  if (rightKeyPressed || leftKeyPressed) return
  if (Math.abs(myXVel) < playerSettings.xDamping) {
    return { newXVel: 0 }
  }
  if (myXVel > playerSettings.xDamping) {
    return { newXVel: myXVel - playerSettings.xDamping }
  }
  if (myXVel < -playerSettings.xDamping) {
    return { newXVel: myXVel + playerSettings.xDamping }
  }
}


function stopIfReachedLimit({
  rightLimit,
  leftLimit,
  myXVel,
  myXPos
}) {
  if (
    ((myXPos + 0.0001) >= rightLimit && myXVel > 0)
    ||
    ((myXPos - 0.0001) <= leftLimit && myXVel < 0)
  ) {
    return { newXVel: 0 }
  }
}


function reduceVelBeforeLimit({
  rightLimit,
  leftLimit,
  myXVel,
  myXPos
}) {
  // accelerated || damped || old
  const nextPos = myXPos + myXVel
  if (nextPos > rightLimit) {
    return { newXVel: rightLimit - myXPos }
  }
  if (nextPos < leftLimit) {
    return { newXVel: leftLimit - myXPos }
  }
}

