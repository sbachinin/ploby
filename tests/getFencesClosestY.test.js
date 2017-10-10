import { getFencesClosestY } from '../src/updateMyBall/collisions/fromFences/'

test('should break the pipe if too high', () => {
  const data = {
    ball: { position: [319823, 150] },
    settings: {
      fences: { height: 120 },
      ball: { radius: 25 }
    },
  }
  const result = getFencesClosestY(data)
  expect(result.fencesClosestY).toBeUndefined()
})

test('should return ball\'s height if lower than tip', () => {
  const data = {
    ball: { position: [319823, 75] },
    settings: {
      fences: { height: 120 },
      ball: { radius: 25 }
    },
  }
  const result = getFencesClosestY(data)
  expect(result.fencesClosestY).toBe(75)
})