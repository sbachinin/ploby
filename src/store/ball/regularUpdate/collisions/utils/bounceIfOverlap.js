// @flow

// check if ball overlaps with SOME OTHER circle (e.g., player, fenceTip).
// If overlaps, get new ball's vel considering
// 1) angle of collision,
// 2) sum bounce vel for this type of collision
import pipe from 'pipeduce';
import { getSetting } from '../../../../../settings';
import findCirclesOverlap from './findCirclesOverlap';
import getBounceFromCircle from './getBounceFromCircle';

export default function bounceIfOverlap({
  ball, circle2, sumBounceVel
} : {
  ball: {}, circle2: {}, sumBounceVel: number
}) {
  return pipe(
    [
      findCirclesOverlap, // -> { xDiff, yDiff, circlesOverlap }
      s => ( !s.circlesOverlap ? { pipeResult: null } : '' ),
      getBounceFromCircle,
      ({ bounceVel }) => ( { pipeResult: { bounceVel: bounceVel } } )
    ],
    {
      ball,
      circle2,
      sumBounceVel,
      ballRadius: getSetting('ball.radius')
    }
  )
};
