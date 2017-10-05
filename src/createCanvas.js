import { canvasSize, abyssWidth, fences } from './gameSettings'
const canvas = document.getElementById('root')
const abyss = document.getElementById('abyss')

export default function() {
  abyss.style.width = abyssWidth + fences.width + 'px'
  abyss.style.height = fences.height + 'px'
  // abyss.style.borderWidth = fences.width + 'px'
  canvas.classList.remove('hidden')
  canvas.setAttribute('width', canvasSize.width)
  canvas.setAttribute('height', canvasSize.height)
}
