// @flow

import bounceFromMe from './bounceFromMe'
import bounceFromFences from './fromFences/'
import bounceFromWalls from './bounceFromWalls'
import socket from '../../socket';

export default function(state: { ball: {
  position: Array<number>, velocity: Array<number>
}, myself: { sideToPlay: string }}) {

  const { ball, myself } = state

  if (!ballOnMySide(ball.position[0], myself.sideToPlay)) return

  // Return new ball's vel ([x,y])
  // if collision is found in one of this cases.
  // Otherwise, return nothing
  const velAfterCollision = (
    bounceFromWalls(ball) ||
    bounceFromMe(ball, myself) ||
    bounceFromFences(ball)
  )

  if (!velAfterCollision) return

  socket.sendMessage({
    ball: {
      velocity: velAfterCollision,
      position: ball.position // adjusted or not?
    }
  })

  return velAfterCollision
}


function ballOnMySide(ballX, mySide) {
  return (
    (ballX > 50 && mySide === 'right') ||
    (ballX <= 50 && mySide === 'left')
  )
}