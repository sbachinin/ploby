import {ball as ballSettings, player as playerSettings} from '../../gameSettings'
import findCollision from '../../utils/findCollisionOfTwoCircles';
import getVelAfterCollision from '../../utils/getVelAfterCollision';
// check if collision happened
// if so, return new ball's vel

export default function(myPos, ballPos) {

  const {
    xDiff, yDiff, distance, collisionIsFound
  } = findCollision({
    circle1: { position: ballPos, radius: ballSettings.radius},
    circle2: { position: myPos, radius: playerSettings.radius},
  })

  if (collisionIsFound) {
    return getVelAfterCollision(
      xDiff,
      yDiff,
      distance,
      ballSettings.reboundFromPlayer)
  }
}
