import { ball as ballSettings } from '../../../gameSettings';

export default [
  getXDiffFromBallCenter,
  getXDiffFromBallSurface,
  isTouchingFence,
  isFlyingTowardsFence,
  willCollide,
  getBounceXVel,
]


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
  let bounceXVel
      // if it is already touching, it should bounce
  if (isTouchingFence === 'from left') bounceXVel = -ballSettings.reboundFromFencePillar
  if (isTouchingFence === 'from right') bounceXVel = ballSettings.reboundFromFencePillar
      // if ball is very close, it should 'touch' the fence
  if (willCollide) bounceXVel = xFromBallSurface
  return { bounceXVel }
}



