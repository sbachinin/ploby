import pipe from '../../../utils/pipe';
import { ball as ballSettings, fences } from '../../../gameSettings'
import findCirclesCollision from '../../../utils/findCollisionOfTwoCircles';
import getVelAfterCollision from '../../../utils/getVelAfterCollision';

export default ({ ball, closestFenceX }) =>  {
  const bounceVel = pipe(
    [
      prepareTwoCircles, // -> { circle1, circle2 }
      findCirclesCollision, // -> { collisionIsFound: t/f, xDiff, yDiff, distance }
      getVelAfterCollision // -> { bounceVel } || undefined
    ],
    { ball, closestFenceX }
  )
  .bounceVel
  return { bounceVel }
}

function prepareTwoCircles({ ball, closestFenceX }) {
  return {
    circle1: { position: ball.position, radius: ballSettings.radius},
    circle2: {
      position: [
        closestFenceX, fences.height
      ],
      radius: fences.width / 2
    }
  }
}

//   const {
//     xDiff, yDiff, distance, collisionIsFound
//   } = findCirclesCollision({
//     circle1: { position: ball.position, radius: ballSettings.radius},
//     circle2: {
//       position: [
//         closestFenceX, fences.height
//       ],
//       radius: fences.width / 2
//     }
//   })
//   return collisionIsFound && {
//     bounceVel: getVelAfterCollision(
//       xDiff,
//       yDiff,
//       distance,
//       ballSettings.reboundFromFenceTip)
//     }
// };
