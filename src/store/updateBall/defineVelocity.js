// @flow
import getRoutineVel from './freeFlight/getBallsRoutineVel';
import { getSetting } from '../../settings';

let counter = 0

export default function defineVelocity({ collision, ball }: any) {
  if (counter >= (getSetting('kicksLimit') - 1)) { counter = 0 } else { counter++ }
  // when transition in process, update (decrease) vel only every 3nd time
  if (ball.transferInProcess && (counter !== 0)) return { velocity: ball.velocity }
  return {
    velocity: getRoutineVel(
      {
        position: ball.position,
        velocity: collision ? collision.velAfterCollision : ball.velocity
      }
    )
  }
}
