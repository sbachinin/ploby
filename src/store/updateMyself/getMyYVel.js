// @flow
import { getSetting } from '../../settings'
import pipe from 'pipeduce';
import type { State } from '../../types';

export default function(state: State): number {

  const { jumpKeyPressed } = state.keysState
  const { myself } = state.canvasState

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
      jumpKeyPressed,
      player: getSetting('player')
    }
  )
}


function shouldJump({ jumpKeyPressed, yPos, player }) {
  return { shouldJump: yPos <= player.radius && jumpKeyPressed } }
function isFlyingUp({ yVel, yPos, player }) {
  return { isFlyingUp: yPos > player.radius && yVel > 0 } }
function isFlyingDown({ yVel, yPos, player }) {
  return { isFlyingDown: yPos > player.radius && yVel < 0 } }
function didFinallyRecoverFromFall ({ yPos, yVel, player }) {
  return { didFinallyRecoverFromFall: Math.abs(yPos - player.radius) < 0.0001 && yVel > 0 } }
function willFinallyRecoverFromFall({ yPos, yVel, player }) {
  return { willFinallyRecoverFromFall: yPos < player.radius && (yPos + yVel) > player.radius } }
function getYBeforeBottom({ yPos, player }) {
  return { yBeforeBottom: yPos - player.radius + player.maxDepth } }
function isHittingTheGround({ yBeforeBottom }) {
  return { isHittingTheGround: Math.abs(yBeforeBottom) < 0.0001 } }
function willHitTheGround({ yBeforeBottom, yPos, yVel }) {
  return { willHitTheGround: (yVel < 0) && Math.abs(yVel) > yBeforeBottom } }

function getNewYVel({
  yVel, yPos, jumpKeyPressed,
  shouldJump, isFlyingUp, isFlyingDown,
  didFinallyRecoverFromFall,
  willFinallyRecoverFromFall,
  isHittingTheGround, willHitTheGround,
  yBeforeBottom, player
}) {
  if (shouldJump) return { pipeResult: player.jumpingImpulse }
  if (isFlyingUp && jumpKeyPressed) return {
    pipeResult: (yVel - player.gravity) * player.yDampingOnRaise
  }
  if (isFlyingUp) return {
    pipeResult: (yVel - player.gravity * 3) * player.yDampingOnRaise
  }
  if (isFlyingDown) return {
    pipeResult: (yVel - player.gravity) * player.yAccelerationOnFall
  }
  if (willFinallyRecoverFromFall) return { pipeResult: player.radius - yPos }
  if (didFinallyRecoverFromFall) return { pipeResult: 0 }
  if (isHittingTheGround) return { pipeResult: player.reboundFromGround }
  if (willHitTheGround) return { pipeResult: -yBeforeBottom }
  return { pipeResult: yVel }
}

