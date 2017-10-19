// @flow
import { getSetting } from '../settings';
import { canvasSize } from './canvasSize';
import prepareCircles from './prepareCirclesForDrawing';
import type {CircleToDraw} from './prepareCirclesForDrawing'
const c = document.getElementById('root').getContext('2d');

export const draw = (
  state: {
    myself: { position: Array<number> },
    enemy: { position: Array<number> },
    ball: { position: Array<number> }
  }
) => {

  const cSize = canvasSize.get()
  if (!cSize.height || !cSize.width) return
  c.clearRect(0, 0, cSize.width, cSize.height)

  const circles : Array<CircleToDraw> = prepareCircles(state, cSize)
  drawCircles(circles)
  c.closePath()
}


function drawCircles(circles) {
  circles.forEach(ci => {
    c.beginPath()
    c.arc(
      ci.positionPx[0],
      ci.positionPx[1],
      ci.radiusPx, 0, 2 * Math.PI)
    c.fillStyle = ci.color
    c.fill()
  })
}

