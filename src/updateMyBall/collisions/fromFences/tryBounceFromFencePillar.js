import fns from './pillarPipedFunctions';
import pipe from '../../../utils/pipe';

export default (
  {
    position: [ballXPos],
    velocity: [ballXVel, ballYVel]
  },
  closestFenceX
) => {
  const bounceXVel = pipe(
    fns,
    { ballXPos, ballXVel, closestFenceX }
  ).bounceXVel
  if (!bounceXVel) return
  return [
    bounceXVel,
    ballYVel
  ]
};
