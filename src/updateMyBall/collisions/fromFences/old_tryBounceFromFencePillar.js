import fns from './pillarPipedFunctions';
import pipe from '../../../utils/pipe';

export default ({
  ball: {
    position: [ballXPos],
    velocity: [ballXVel, ballYVel]
  },
  nearFencePillar,
  fencesClosestX
}) => {
  const bounceXVel = pipe(
    fns,
    { ballXPos, ballXVel, fencesClosestX, nearFencePillar }
  )
  return bounceXVel && {
    bounceVel: [ bounceXVel, ballYVel ]
  }
};
