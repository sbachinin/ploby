// @flow
import type { Ball } from '../../types';

export default (stateBall: Ball, ballFromMessage: Ball) =>  {

  if (!ballFromMessage) return stateBall

  if (stateBall.transferInProcess &&
    !enemysBallOvertookMyBall(stateBall, ballFromMessage)
  ) return stateBall

  return {
    ...stateBall,
    ...ballFromMessage,
    transferInProcess: false
  }

};


function enemysBallOvertookMyBall(stateBall, ballFromMessage) {
  return (
    (
      // going right, ball from message is further right
      stateBall.velocity[0] >= 0 &&
      stateBall.position[0] < ballFromMessage.position[0]
    )
    ||
    (
      // going left, ball from message is further left
      stateBall.velocity[0] < 0 &&
      stateBall.position[0] > ballFromMessage.position[0]
    )
  )
}
