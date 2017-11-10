// @flow

import findCollision from './collisions/'
import getRoutineVel from './freeFlight/getBallsRoutineVel'
import type { State, Ball } from '../../types'
import pipe from 'pipeduce';
import _ from 'lodash';
// import { getSetting } from '../../settings';
import exitIfEnemyControl from './exitIfEnemyControl';
import getFlightZone from './getFlightZone';

export default function(state: State): Ball {
  const { ball, enemy, myself } = state.canvasState
  const { mySide } = state.generalState
  return pipe(
    [
      getFlightZone, // -> { flightZone }
      didBallJustLeftMySide, // { ?ballJustLeftMySide }
      // getFuturePositions,
      updateFlightHistory, // -> { flightHistory, ?justEnteredAbyss }
      exitIfEnemyControl,
      findCollision, // -> { collision?: { collisionSource, velAfterCollision } }
      defineVelocity, // -> velocity
      definePosition, // -> position
      getResult
    ],
    { ball, enemy, myself, mySide }
  )
}



function didBallJustLeftMySide({ flightZone, enemy, ball, mySide }) {
  if (!enemy) return // -> no transfer required
  return flightZone === 'abyss' &&
  _.last(ball.flightHistory) === mySide &&
  { ballJustLeftMySide: true }
}


function updateFlightHistory({ ball, flightZone }) {
  let fh = ball.flightHistory || []
  if (_.last(fh) !== flightZone) {
    return {
      flightHistory: fh.concat(flightZone),
    }
  }
  return { flightHistory: fh }
}


// function getFuturePositions({ ballJustLeftMySide, ball }) {
//   if (!ballJustLeftMySide) return
//   let futurePositions = []
//   let lastPos
//   _.times(20, () => {
//     getRoutineVel(ball)
//     lastPos = [

//     ]
//   })
// }


// getFutureVelocitiesForSmoothTransfer

function defineVelocity({ collision, ball, ballJustLeftMySide }) {
  return {
    velocity: getRoutineVel(
      {
        position: ball.position,
        velocity: collision ? collision.velAfterCollision : ball.velocity
      },
      ballJustLeftMySide || ball.transferInProcess // should i damp vel for smoother transfer?
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


function getResult({ ball, collision, velocity, position, flightHistory, ballJustLeftMySide }) {

  const newCollisionWith = collision && collision.collisionSource

  const kickedFirstTime = !!(
    ball.velocity[0] === 0 &&
    ball.velocity[1] === 0 &&
    collision
  )

  let newProps = {
    velocity,
    position,
    newCollisionWith,
    kickedFirstTime,
    flightHistory,
    controlledByEnemy: false,
    transferInProcess: ballJustLeftMySide ? true : ball.transferInProcess,
    landed: newCollisionWith === 'ground' ? true: ball.landed
  }
  
  return { pipeResult: { ...ball, ...newProps } }
}
