// @flow

import findCollision from './collisions/'
import getRoutineVel from './freeFlight/getBallsRoutineVel'
import { type State } from '../store'
import socket from '../socket';
import getNewBall from './getNewBall';
import pipe from 'pipeduce';
let shouldResetBall = false

export default function({ ball, enemy, myself }: State) {
  
  return pipe(
    [
      resetBallIfLanded, // maybe exit with pipeResult = new ball
      findCollision, // -> { collision } (maybe === null)
      defineVelocity, // -> velocity
      definePosition, // -> position
      sendCollisionToServer,
      setTimeoutIfBallLanded,
      getResult
    ],
    { ball, enemy, myself }
  )
}

function resetBallIfLanded({ myself }) {
  // when playing alone, should not listen to server to reset ball BUT just draw it locally
  if (shouldResetBall) {
    shouldResetBall = false
    return { pipeResult :getNewBall(myself && myself.sideToPlay) }
  }
}

function defineVelocity({ collision, ball }) {
  return {
    velocity: getRoutineVel(
      collision ? { ...ball, velocity: collision.velAfterCollision } : ball
    )
  }
}

function definePosition({ ball, velocity }) {
  return {
    position: [
      ball.position[0] + (velocity[0] || 0),
      ball.position[1] + (velocity[1] || 0)
    ]
  }
}

function sendCollisionToServer({ collision, enemy, ball, velocity, position }) {
  if (collision && enemy) {
    socket.sendMessage({
      ball: {
        velocity,
        position,
        landed: ball.landed // when ball hits the ground again, server should not update score
      },
      collisionSource: collision.collisionSource,
    })
  }
}


function setTimeoutIfBallLanded({ collision, enemy, ball }) {
  if (collision && collision.collisionSource === 'ground' && !enemy && !ball.landed) {
    setTimeout(_ => {
      shouldResetBall = true
    }, 1000)
  }
}

function getResult({ ball, collision, velocity, position }) {
  return {
    pipeResult: {
      ...ball,
      velocity,
      position,
      landed: (collision && collision.ballLanded) || ball.landed
    }
  }
}
