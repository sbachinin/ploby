import xVelFns from './xVelFns';
import pipe from '../utils/pipe';
import {
  player as playerSettings,
  fences as fencesSettings,
  canvasSize
} from '../gameSettings';
let leftLimit
let rightLimit

export default ({
  leftKeyPressed,
  rightKeyPressed,
  myself: {
    velocity: [myXVel],
    position: [myXPos]
  }
}) => {

  return pipe(
    xVelFns,
    {
      leftKeyPressed,
      rightKeyPressed,
      myXVel,
      myXPos,
      leftLimit,
      rightLimit
    }
  ).newXVel

};

export const defineMyXLimits = (sideToPlay) =>  {
  leftLimit = sideToPlay === 'left' ?
    playerSettings.radius :
    (fencesSettings.rightX + fencesSettings.width / 2 + playerSettings.radius)
  rightLimit = sideToPlay === 'left' ?
    (fencesSettings.leftX - fencesSettings.width / 2 - playerSettings.radius) :
    (canvasSize.width - playerSettings.radius)
};
