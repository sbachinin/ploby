// @flow
import type { Myself } from '../../types';
import { definePlayerLimits, getPlayerInitialPos } from '../../settings';

export default function getInitialPlayer(mySide: string) : Myself {
  const limits = definePlayerLimits(mySide)
  return {
    velocity: [0, 0],
    position: getPlayerInitialPos(mySide),
    leftLimit: limits.leftLimit,
    rightLimit: limits.rightLimit
  }
}
