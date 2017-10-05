import { ball } from '../gameSettings'

export default function(side) {
  return {
    velocity: [ 0, 0 ],
    position: side === 'right' ? ball.rightInitialPos : ball.leftInitialPos,
  }
}
