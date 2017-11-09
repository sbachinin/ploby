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
      updateFlightHistory,
      exitIfEnemyControl,
      findCollision, // -> { collision?: { collisionSource, velAfterCollision } }
      defineVelocity, // -> velocity
      definePosition, // -> position
      getResult
    ],
    { ball, enemy, myself, mySide }
  )
}


function updateFlightHistory({ ball, flightZone }) {
  let fh = ball.flightHistory || []
  if (_.last(fh) !== flightZone) {
    return { flightHistory: fh.concat(flightZone)}
  }
  return { flightHistory: fh }
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


function getResult({ ball, collision, velocity, position, flightHistory }) {

  const newCollisionWith = collision && collision.collisionSource

  const kickedFirstTime = !!(
    ball.velocity[0] === 0 &&
    ball.velocity[1] === 0 &&
    collision
  )
  let newProps = {
    flightHistory,
    velocity,
    position,
    newCollisionWith,
    kickedFirstTime,
    controlledByEnemy: false
  }
  
  if (newCollisionWith === 'ground') newProps.landed = true

  return { pipeResult: { ...ball, ...newProps } }
}
