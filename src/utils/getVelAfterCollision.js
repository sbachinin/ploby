// Knowing how did circles collide,
// kick the circle
// 1) to a direction opposite to the position of another circle
// 2) with a given vel (e.g., ball's hardcoded vel for collisions with player)

// this is true for situation where diff was calculated
// by subracting this (kicked) circle's pos to another circle's pos

export default function(xDiff, yDiff, distance, sumBounceVel) {
  const angle = Math.asin(xDiff / distance)
  const shouldGoUp = yDiff >= 0
  return [
    sumBounceVel * Math.sin(angle),
    sumBounceVel * Math.cos(angle) * (
      shouldGoUp ? 1 : -1
    ),
  ]
}