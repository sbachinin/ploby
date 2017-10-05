import { ball as ballSettings } from '../../../gameSettings';
// import { log } from '../../../utils/pipe';

export default [
  checkBallHeight, // maybe exit
  getXDiffFromBallCenter, // -> { xFromBallCenter }
  getXDiffFromBallSurface, // -> { xFromBallSurface }
  isTouchingFence, // -> { isTouchingFence } || undefined
  isFlyingTowardsFence, // -> { towardsFence } || undefined
  willCollide, // -> { willCollide } || undefined
  getBounceXVel, // -> { pipeResult: { bounceVel } || undefined }
]


function checkBallHeight({ nearFencePillar }) {
  if (!nearFencePillar) return { pipeResult: null }
}


function getXDiffFromBallCenter({ closestFenceX, ballXPos }) {
  return { xFromBallCenter: closestFenceX - ballXPos }
}


function getXDiffFromBallSurface({ xFromBallCenter }) {
  return {
    xFromBallSurface: (
      xFromBallCenter > 0 ?
      xFromBallCenter - ballSettings.radius :
      xFromBallCenter + ballSettings.radius
    )
  }
}

function isTouchingFence({ xFromBallSurface, xFromBallCenter }) {
  if (Math.abs(xFromBallSurface) < 0.0001) {
    return {
      isTouchingFence: (
        xFromBallCenter > 0 ?
        'from left':
        'from right'
      )
    }
  }
}

function isFlyingTowardsFence({
  isTouchingFence,
  xFromBallSurface,
  ballXVel
}) {
  if (isTouchingFence) return
  return {
    towardsFence: (
      (xFromBallSurface > 0 && ballXVel > 0) ||
      (xFromBallSurface < 0 && ballXVel < 0)
    )
  }
}


function willCollide({
  towardsFence,
  ballXVel,
  xFromBallSurface
}) {
  if (!towardsFence) return
  return { willCollide: Math.abs(ballXVel) > Math.abs(xFromBallSurface) }
}

function getBounceXVel({
  willCollide,
  isTouchingFence,
  xFromBallSurface
}) {
  if (isTouchingFence === 'from left') return {
    pipeResult: -ballSettings.reboundFromFencePillar
  }
  if (isTouchingFence === 'from right') return {
    pipeResult: ballSettings.reboundFromFencePillar
  }
    // if ball is very close, it should 'touch' the fence
  if (willCollide) return {
    pipeResult: xFromBallSurface
  }
  return { pipeResult: null }
}



