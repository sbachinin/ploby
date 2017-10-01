import getBallsXVel from './getBallsXVel'
import getBallsYVel from './getBallsYVel'

// return ball's vel considering just normal 'physics'
export default function(state, collisions) {
  return [
    getBallsXVel(state),
    getBallsYVel(state)
  ]
}

