// @flow

import pipe from 'pipeduce'
import bounceIfReachedFenceTip from './bounceIfReachedFenceTip';
import bounceIfReachedFencePillar from './bounceIfReachedFencePillar';
import { getAllSettings, getSetting } from '../../../settings';
import findCirclesOverlap from '../utils/findCirclesOverlap';

let collisionInProcess = false

export default function(ball: {}) : Array<number> {
  
  return pipe(
    [
      getFencesClosestY, // -> { fencesClosestY } or exit & colInProcess = false
      getFencesClosestX, // -> { fencesClosestX }
      prepareSecondCircle, // -> { circle2 }
      findCirclesOverlap, // -> { xDiff, yDiff, circlesOverlap }
      exitIfNoOverlap, // maybe exit & colInProcess = false
      bounceIfReachedFenceTip, // -> { bounceVel } || nothing
      bounceIfReachedFencePillar, // -> { bounceVel } || nothing
      ensureSingleCollision, // (collisionInProcess = t/f) & maybe exit
      ({bounceVel}) => ({ pipeResult: bounceVel })
    ],
    {
      ball,
      ballRadius: getSetting('ball.radius'),
      settings: getAllSettings(),
    }
  )
}


export function getFencesClosestY({
  ball: { position: [xPos, yPos] },
  settings: {
    fences: { height: fHeight },
    ball: { radius: bRadius }
  },
}: {
  ball: { position: Array<number> },
  settings: { fences: { height: number }, ball: { radius: number }}
}) {
  if (
    yPos < -bRadius ||
    yPos > fHeight + bRadius
  ) {
    collisionInProcess = false
    return { pipeResult: null }
  } 
  if (yPos > fHeight) return { fencesClosestY: fHeight }
  return { fencesClosestY: yPos }
}

function prepareSecondCircle({
  fencesClosestX, fencesClosestY
}) {
  // second circle is just a closest point on circle
  // to use circle-circle collision method
  return {
    circle2: { position: [ fencesClosestX, fencesClosestY ], radius: 0 }
  }
}

export function getFencesClosestX({
  ball, settings
} : {
  ball: { position: Array<number> }, settings: { fences: { leftX: number, rightX: number } }
}) {
  return { fencesClosestX: (
      ball.position[0] > 50
    ) ? settings.fences.rightX : settings.fences.leftX
  }
}


function exitIfNoOverlap({ circlesOverlap }) {
  if (!circlesOverlap) {
    collisionInProcess = false
    return { pipeResult: null }
  }
}

function ensureSingleCollision({ bounceVel }) {
  // This prevents getting the ball stuck in the fence
  // Initial bounce vel may be not enough to entirely break from fence
  // So only the first collision frame should provide the bounce vel
  if (bounceVel && collisionInProcess) {
    return { pipeResult: null }
  }
  if (bounceVel && !collisionInProcess) collisionInProcess = true
}



// MEASURING TIME BETWEEN FENCES:
  // if (ball.position[0] < fences.leftX && (ball.position[0] + ball.velocity[0] > fences.leftX)) {
  //   console.time('fence')
  // }
  // if (ball.position[0] < fences.rightX && (ball.position[0] + ball.velocity[0] > fences.rightX)) {
  //   console.timeEnd('fence')
  // }