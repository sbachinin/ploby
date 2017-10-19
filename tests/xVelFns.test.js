import fns from '../src/updateMe/xVelPipedFunctions';
import { getSetting } from '../src/settings';

const [
  relaxIfStanding,
  stopIfReachedLimit,
  accelerateIfKeyPressed,
  dampIfKeyReleased,
  reduceVelBeforeLimit,
  getResult
] = fns


test('should return 0 if reached limit', () => {
  const result = stopIfReachedLimit({
    myXPos: 200,
    rightLimit: 200,
    myXVel: 1
  })
  expect(result).toBeDefined();
  expect(result).toEqual({pipeResult: 0})
});

test('should accelerate if key pressed', () => {
  const data = {
    rightKeyPressed: true,
    myXVel: 4,
    getSetting('player')
  }
  const result = accelerateIfKeyPressed(data)
  expect(result).toBeDefined()
  expect(result.acceleratedXVel).toBeGreaterThan(data.myXVel)
})


test('should reduce vel before limit', () => {
  const data = {
    acceleratedXVel: 10,
    myXPos: 190.313123,
    rightLimit: 196
  }
  const result = reduceVelBeforeLimit(data)
  expect(result.lastXVelBeforeLimit).toBeLessThan(data.acceleratedXVel)
})

