import findCirclesOverlap from '../src/updateMyBall/collisions/utils/findCirclesOverlap';

test('should tell if circles overlap + xDiff + yDiff', () => {
  const data = {
    ball: {
      position: [ 100, 100 ]
    },
    circle2: {
      position: [100, 120],
      radius: 15
    },
    ballRadius: 40
  }

  const result = findCirclesOverlap(data)
  expect(result.circlesOverlap).toBe(true)
  expect(typeof result.xDiff).toBe('number')
  expect(typeof result.yDiff).toBe('number')
})
