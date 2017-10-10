import getBounceFromCircle from '../src/updateMyBall/collisions/utils/getBounceFromCircle';

test('should return an array of two numbers', () => {
  const data = {
    xDiff: 10,
    yDiff: 20,
    distance: Math.sqrt(50),
    sumBounceVel: 50
  }
  const result = getSumBounce(data)
  expect(result.bounceVel.length).toBe(2)
  expect(typeof result.bounceVel[1]).toBe('number')
})