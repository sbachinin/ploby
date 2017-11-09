// @flow
import canvasSize from './canvasSize';
import prepareCircles from './prepareCirclesForDrawing';
import type {CircleToDraw} from './prepareCirclesForDrawing'
import type { CanvasState } from '../../types';
const c = document.querySelector('canvas').getContext('2d');
const circle = document.getElementById('ballImg')

export const draw = (state: CanvasState) => {

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
    c.fillStyle = ci.fillStyle
    c.fill()
    c.globalAlpha = 0.5;
    c.drawImage(circle, ci.positionPx[0] - ci.radiusPx, ci.positionPx[1] - ci.radiusPx, ci.radiusPx*2, ci.radiusPx*2)
    c.globalAlpha = 1.0;
  })
}

