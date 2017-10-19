// @flow
import { getSetting, getAllSettings } from '../settings'
import { canvasSize } from './canvasSize';
const canvas = document.getElementById('root')
const abyss = document.getElementById('abyss')

export const createCanvas = () => {
  if (!canvas || !abyss) return
  const { width, height } = canvasSize.set()
  if (!width || !height) return
  abyss.style.width = width / 100 * getSetting('abyssWidth') + 'px'
  abyss.style.height = width / 100 * getSetting('fences.height') + 'px'

  canvas.classList.remove('hidden')
  canvas.setAttribute('width', width.toString())
  canvas.setAttribute('height', height.toString())
}
