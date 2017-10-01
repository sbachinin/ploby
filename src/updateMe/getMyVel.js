import getMyXVel from './getMyXVel'
import getMyYVel from './getMyYVel'

export default function(state) {
  return [
    getMyXVel(state),
    getMyYVel(state)
  ]
}





    // else {
    //   // if not moving right, but have inertia to right - damp it
    //   if (velocity[0] > 0.03) { // avoid reverse to left
    //     velocity[0] -= 0.03
    //   } else {
    //     velocity[0] = 0
    //   }
    // }
    // if (state.movingLeft) {
    //   velocity[0] -= 0.1
    // }

