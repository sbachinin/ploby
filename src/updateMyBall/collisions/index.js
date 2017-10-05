import bounceFromMe from './bounceFromMe'
import bounceFromFences from './fromFences/'
import bounceFromWalls from './bounceFromWalls'

export default function(state) {

  const { ball, myself } = state

  // Return new ball's vel ([x,y])
  // if collision is found in one of this cases.
  // Otherwise, return nothing
  return (
    bounceFromWalls(ball) ||
    bounceFromMe(ball, myself) ||
    bounceFromFences(ball)
  )
}
