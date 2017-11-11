// @flow

export default [
  relaxIfStanding,
  stopIfReachedLimit,
  accelerateIfKeyPressed,
  dampIfKeyReleased,
  reduceVelBeforeLimit,
  getResult
]


function relaxIfStanding({
  myXVel, leftKeyPressed, rightKeyPressed
}: any) {
  if (myXVel === 0 && !leftKeyPressed && !rightKeyPressed) return {
    pipeResult: 0
  }
}


function stopIfReachedLimit({
  rightLimit,
  leftLimit,
  myXPos,
  leftKeyPressed,
  rightKeyPressed
}: any) {
  if (
    ((myXPos + 0.0001) >= rightLimit && !leftKeyPressed)
    ||
    ((myXPos - 0.0001) <= leftLimit && !rightKeyPressed)
  ) {
    return { pipeResult: 0 }
  }
}


function accelerateIfKeyPressed({
  rightKeyPressed,
  leftKeyPressed,
  myXVel,
  playerSettings
}: any) {
  if (rightKeyPressed) {
    if ((myXVel + playerSettings.xAcceleration) < playerSettings.maxXVel) {
      return { acceleratedXVel: myXVel + playerSettings.xAcceleration }
    } 
    return { acceleratedXVel: playerSettings.maxXVel }
  }
  if (leftKeyPressed) {
    if ((myXVel - playerSettings.Acceleration) > -playerSettings.maxXVel) {
      return { acceleratedXVel: myXVel - playerSettings.xAcceleration }
    } 
    return { acceleratedXVel: -playerSettings.maxXVel }
  }
}


function dampIfKeyReleased({
  rightKeyPressed,
  leftKeyPressed,
  myXVel,
  playerSettings
}: any) {
  if (rightKeyPressed || leftKeyPressed) return
  if (Math.abs(myXVel) < playerSettings.xDamping) {
    return { dampedXVel: 0 }
  }
  if (myXVel > playerSettings.xDamping) {
    return { dampedXVel: myXVel - playerSettings.xDamping }
  }
  if (myXVel < -playerSettings.xDamping) {
    return { dampedXVel: myXVel + playerSettings.xDamping }
  }
}


function reduceVelBeforeLimit({
  acceleratedXVel,
  dampedXVel,
  myXPos,
  leftLimit,
  rightLimit
}: any) {
  let vel = acceleratedXVel || dampedXVel || 0
  const nextPos = myXPos + vel
  if (nextPos > rightLimit) {
    return { lastXVelBeforeLimit: rightLimit - myXPos }
  }
  if (nextPos < leftLimit) {
    return { lastXVelBeforeLimit: leftLimit - myXPos }
  }
}


function getResult({
  lastXVelBeforeLimit,
  acceleratedXVel,
  dampedXVel
}: any) {
  return {
    pipeResult: lastXVelBeforeLimit ||
      acceleratedXVel ||
      dampedXVel ||
      0
  }
}