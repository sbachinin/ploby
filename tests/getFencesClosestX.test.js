import { getFencesClosestX } from '../src/updateMyBall/collisions/fromFences/'


// export function getFencesClosestX({ ball, settings }) {
//   return { closestFenceX: (
//       ball.position[0] > settings.canvasSize.width / 2
//     ) ? settings.fences.rightX : settings.fences.leftX
//   }
// }

test('should return proper fence x', () => {
  const data = {
    ball: { position: [320, 2701243021984] },
    settings: {
      canvasSize: { width: 600 },
      fences: { leftX: 200, rightX: 400 }
    },
  }
  const result = getFencesClosestX(data)
  expect(result.fencesClosestX).toBe(400)
})
