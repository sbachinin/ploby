import fns from './pillarPipedFunctions';
import pipe from '../../../utils/pipe';

export default ({
  ball: {
    position: [ballXPos],
    velocity: [ballXVel, ballYVel]
  },
  nearFencePillar,
  closestFenceX
}) => {
  const bounceXVel = pipe(
    fns,
    { ballXPos, ballXVel, closestFenceX, nearFencePillar }
  )
  return bounceXVel && {
    bounceVel: [ bounceXVel, ballYVel ]
  }
};
