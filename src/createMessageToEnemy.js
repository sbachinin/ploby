// @flow
import { getSetting } from './settings';
import store from './store';

export default function createMessageToEnemy() : ?{
  playerData?: { posPercentage: Array<number> },
  ballData?: { posPercentage: Array<number>, velPercentage: Array<number> }
} {
  let result = {}
  const { myself, ball } = store.getState()

  if (!myself) return
  const { position: [myXPos, myYPos] } = myself
  result.playerData = {
    posPercentage: [myXPos, myYPos]
  }
  // if (ball &&
  //    isBallOnMySide(ball.position[0], myself.sideToPlay, getSetting('ball'), getSetting('fences'))
  // ) {
  //   const {
  //     position: [ballXPos, ballYPos],
  //     velocity: [ballXVel, ballYVel]
  //   } = ball
    // result.ballData = {
    //   posPercentage: [ballXPos, ballYPos],
    //   velPercentage: [ballXVel, ballYVel]
    // }
  // }
  return result
}


export function isBallOnMySide(
  ballXPos: number,
  side: string,
  ballSettings: { radius: number},
  fences: { leftX: number, rightX: number }
) : boolean {
  if (
    side === 'left' &&
    ballXPos <= (fences.leftX + ballSettings.radius)
  ) return true
  if (
    side === 'right' &&
    ballXPos >= (fences.rightX - ballSettings.radius)
  ) return true
  return false
}
