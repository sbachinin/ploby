// @flow

import findCollision from './collisions/'
import type { State, Ball } from '../../../types'
import pipe from 'pipeduce';
import _ from 'lodash';
import exitIfEnemyControl from './exitIfEnemyControl';
import getFlightZone from './getFlightZone';
import defineVelocity from './defineVelocity';

export default function(state: State): Ball {
  const { ball, enemy, myself } = state.canvasState
  const { mySide } = state.generalState
  return pipe(
    [
      getFlightZone, // -> { flightZone }
      didBallJustLeftMySide, // -> { ?ballJustLeftMySide }
      updateFlightHistory, // -> { flightHistory, ?justEnteredAbyss }
      exitIfEnemyControl,
      findCollision, // -> { collision?: { collisionSource, velAfterCollision } }
      defineVelocity, // -> ?velocity
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


function definePosition({ ball, velocity, ballJustLeftMySide }) {
  // when transition in process, sum only 1/3 of new velocity
  let vel = velocity
  if (ballJustLeftMySide || ball.transferInProcess) vel = [
    velocity[0] / 3, velocity[1] / 3
  ]
  return {
    position: [
      ball.position[0] + (vel[0] || 0),
      ball.position[1] + (vel[1] || 0)
    ]
  }
}


function getResult({ ball, collision, velocity, position, flightHistory, ballJustLeftMySide }) {

  const newCollisionWith = collision && collision.collisionSource

  let collisionsWithMeCount = ball.collisionsWithMeCount || 0
  if (newCollisionWith === 'player') collisionsWithMeCount++
  if (ballJustLeftMySide) collisionsWithMeCount = 0

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
    collisionsWithMeCount,
    controlledByEnemy: false,
    transferInProcess: ballJustLeftMySide ? true : ball.transferInProcess,
    landed: newCollisionWith === 'ground' ? true: ball.landed
  }
  
  return { pipeResult: { ...ball, ...newProps } }
}
