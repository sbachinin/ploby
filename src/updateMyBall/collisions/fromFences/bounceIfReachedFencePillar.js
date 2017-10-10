// collision is found
function bounceIfReachedFencePillar({
  fencesClosestY, settings, ball
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
