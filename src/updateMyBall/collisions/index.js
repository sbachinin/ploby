import bounceFromMe from './bounceFromMe'
import bounceFromFences from './fromFences/'
import bounceFromWalls from './bounceFromWalls'

export default function(state) {

  const { ball, myself } = state

  return (
    bounceFromWalls(ball) ||
    bounceFromMe(myself.position, ball.position) ||
    bounceFromFences(ball)
  )
}
