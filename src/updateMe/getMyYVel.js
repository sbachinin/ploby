import {
  player
} from '../gameSettings'
import pipe from '../utils/pipe';

export default function({myself, jumpKeyPressed}) {
  return pipe(
    [
      shouldJump,
      isFlyingUp,
      isFlyingDown,
      didFinallyRecoverFromFall,
      willFinallyRecoverFromFall,
      getYBeforeBottom,
      isHittingTheGround,
      willHitTheGround,
      getNewYVel
    ],
    {
      yVel: myself.velocity[1],
      yPos: myself.position[1],
      jumpKeyPressed
    }
  )
  .yVel
}


function shouldJump({ jumpKeyPressed, yPos }) {
  return { shouldJump: yPos <= player.radius && jumpKeyPressed } }
function isFlyingUp({ yVel, yPos }) {
  return { isFlyingUp: yPos > player.radius && yVel > 0 } }
function isFlyingDown({ yVel, yPos }) {
  return { isFlyingDown: yPos > player.radius && yVel < 0 } }
function didFinallyRecoverFromFall ({ yPos, yVel }) {
  return { didFinallyRecoverFromFall: Math.abs(yPos - player.radius) < 0.0001 && yVel > 0 } }
function willFinallyRecoverFromFall({ yPos, yVel }) {
  return { willFinallyRecoverFromFall: yPos < player.radius && (yPos + yVel) > player.radius } }
function getYBeforeBottom({ yPos }) {
  return { yBeforeBottom: yPos - player.radius + player.flatteningDepth } }
function isHittingTheGround({ yBeforeBottom }) {
  return { isHittingTheGround: Math.abs(yBeforeBottom) < 0.0001 } }
function willHitTheGround({ yBeforeBottom, yPos, yVel }) {
  return { willHitTheGround: Math.abs(yVel) > yBeforeBottom } }

function getNewYVel({
  yVel, yPos, jumpKeyPressed,
  shouldJump, isFlyingUp, isFlyingDown,
  didFinallyRecoverFromFall,
  willFinallyRecoverFromFall,
  isHittingTheGround, willHitTheGround,
  yBeforeBottom
}) {
  if (shouldJump) return { yVel: player.jumpingImpulse }
  if (isFlyingUp && jumpKeyPressed) return {
    yVel: (yVel - player.gravity) * player.yDampingOnRaise
  }
  if (isFlyingUp) return {
    yVel: (yVel - player.gravity * 3) * player.yDampingOnRaise
  }
  if (isFlyingDown) return {
    yVel: (yVel - player.gravity) * player.yAccelerationOnFall
  }
  if (willFinallyRecoverFromFall) return { yVel: player.radius - yPos }
  if (didFinallyRecoverFromFall) return { yVel: 0 }
  if (isHittingTheGround) return { yVel: 2 }
  if (willHitTheGround) return { yVel: -yBeforeBottom }
}

