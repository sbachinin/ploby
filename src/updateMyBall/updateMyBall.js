import getBouncingVel from './collisions/'
import getRoutineVel from './freeFlight/getBallsRoutineVel'
import getNewBall from './getNewBall'

export default function(state) {

  // if (!state.ball || state.ball.position[1] < -500) {
  //   return getNewBall()
  // }
  const velocity = (
    getBouncingVel(state) ||
    getRoutineVel(state)
  )

  const position = [
    state.ball.position[0] + (velocity[0] || 0),
    state.ball.position[1] + (velocity[1] || 0)
  ]

  return {
    ...state.ball,
    velocity,
    position
  }
}