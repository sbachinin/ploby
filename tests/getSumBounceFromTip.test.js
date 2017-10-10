import { getSumBounceFromTip } from '../src/updateMyBall/collisions/fromFences/bounceIfReachedFenceTip';

test('should return proper bounce vel', () => {
  const data = {
    ball: { velocity: [ -14, 5 ] },
    settings: { ball: { minBounceFromFenceTip: 3 } }
  }
  const result = getSumBounceFromTip(data)
  expect(typeof result.sumBounceVel).toBe('number')
})
