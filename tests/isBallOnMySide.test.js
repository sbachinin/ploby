import { isBallOnMySide } from '../src/createMessageToEnemy';

test('should check if ball is on player\'s side', () => {
  const ballXPos = 241,
        side = 'left',
        ballSettings = { radius: 40},
        fences = { leftX: 200, rightX: 400 }
  const result = isBallOnMySide(ballXPos, side, ballSettings, fences)
  expect(result).toBeFalsy()
})
