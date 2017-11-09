// @flow
import canvasSize from './canvasSize'
import type { Settings } from '../../settings'
import { saveSizes } from '../../store/actions'
const canvas = document.querySelector('canvas')

export default function initCanvas(gameSettings: Settings) {
  // fix the size of the canvas & canvasOverlay, using settings received from server (max canvas size & height to width ratio)

  const { width, height } = canvasSize.set(gameSettings)

  saveSizes({
    canvasWidth: width,
    canvasHeight: height,
    abyssWidth: width / 100 * (gameSettings.abyssWidth + 1),
    abyssHeight: width / 100 * (gameSettings.fences.height)
  })

  canvas && canvas.classList.remove('hidden')
  canvas && canvas.setAttribute('width', width.toString())
  canvas && canvas.setAttribute('height', height.toString())
}
