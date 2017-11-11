// @flow

import type { Settings } from '../../../../../settings';
import type { Ball } from '../../../../../types';

// collision is found
function bounceIfReachedFencePillar({
  fencesClosestY, settings, ball
}: {
  fencesClosestY: number, settings: Settings, ball: Ball
}) {
  if (fencesClosestY >= settings.fences.height) return
  return { bounceVel: [-ball.velocity[0] / 3, ball.velocity[1]] }
}


bounceIfReachedFencePillar.requiredProps = {
  fencesClosestY: 'number',
  settings: 'object',
  ball: 'object',
}

export default bounceIfReachedFencePillar
