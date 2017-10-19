// @flow
import { getSetting } from '../settings';

export type CircleToDraw = {
  positionPx: Array<number>,
  radiusPx: number,
  color: string
}

export default (
  state : {
    myself: { position: Array<number> },
    enemy: { position: Array<number> },
    ball: { position: Array<number> }
  },
  canvasSize: { width: number, height: number }
) : Array<CircleToDraw> =>  {

  const { width: cw, height: ch } = canvasSize

  return Object.keys(state)
  .filter(key => key.match(/myself|enemy|ball/) && state[key])
  .map((key) : CircleToDraw => {
    return {
      positionPx: [
        toPx(cw, state[key].position[0]),
        canvasSize.height - (toPx(cw, state[key].position[1]))
      ],
      radiusPx: (
        key === 'ball' ?
        toPx(cw, getSetting('ball.radius')) :
        toPx(cw, getSetting('player.radius'))
      ),
      color: key === 'ball' ? getSetting('ball.color') : getSetting('player.color')
    }
  })
};

function toPx(width, n) {
  return width / 100 * n
}