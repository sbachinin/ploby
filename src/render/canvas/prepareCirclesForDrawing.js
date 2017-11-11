// @flow
import { getSetting } from '../../settings';
import type { CanvasState } from '../../types';

export type CircleToDraw = {
  positionPx: Array<number>,
  radiusPx: number,
  fillStyle: string
}

export default ( state: CanvasState,
  canvasSize: { width: number, height: number }
) : Array<CircleToDraw> =>  {

  const { width: cw, height: ch } = canvasSize

  return Object.keys(state)
  .filter(key => {
    return (
      key.match(/myself|enemy|ball/) &&
      state[key] &&
      state[key].position
    )
  })
  .map((key) : CircleToDraw => {
    return {
      positionPx: [
        toPx(cw, state[key].position[0]),
        ch - (toPx(cw, state[key].position[1]))
      ],
      radiusPx: (
        key === 'ball' ?
        toPx(cw, getSetting('ball.radius')) :
        toPx(cw, getSetting('player.radius'))
      ),
      fillStyle: (() => {
        if (key === 'ball')  {
          if (
            state[key].collisionsWithMeCount > getSetting('kicksLimit') ||
            state[key].landed
          ) return '#ccc'
          return '#a77a26'
        }
        if (key === 'enemy' && !state[key].absent) return '#38759b'
        if (key === 'enemy' && state[key].absent) return 'white'
        return '#8f5044'
      })()
    }
  })
};

function toPx(width, n) {
  return width / 100 * n
}