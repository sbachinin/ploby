// @flow
import getRoutineVel from './freeFlight/getBallsRoutineVel';
import { getSetting } from '../../../settings';

let counter = 0

export default function defineVelocity({ collision, ball, ballJustLeftMySide }: any) {
  if (counter > (getSetting('kicksLimit') - 1)) { counter = 0 } else { counter++ }
  if (ballJustLeftMySide) counter === 0
  // when transition in process, update (decrease) vel only every 3nd time
  if (ball.transferInProcess && counter !== 2) return { velocity: ball.velocity }
  return {
    velocity: getRoutineVel(
      {
        position: ball.position,
        velocity: collision ? collision.velAfterCollision : ball.velocity
      }
    )
  }
}
