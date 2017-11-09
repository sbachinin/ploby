// @flow
import type { Settings } from '../../settings';
type Size = { height: number, width: number }
let size : Size = { height: 400, width: 800 }

export default {

  get() : Size { return size },
  set({ maxCanvasHeight, maxCanvasWidth, heightToWidthRatio } : Settings) : Size {

    if (!maxCanvasWidth || !maxCanvasHeight || !heightToWidthRatio) {
      return size
    }

    const { innerWidth: winWidth, innerHeight: winHeight } = window
    
    if (winHeight / winWidth < heightToWidthRatio) { // window too horizontal?
      size.height = (winHeight > (maxCanvasHeight * 1.1)) ?
        maxCanvasHeight :
        winHeight / 10 * 9
      size.width = size.height / heightToWidthRatio
    } else {
      size.width = (winWidth > (maxCanvasWidth * 1.1)) ?
        maxCanvasWidth :
        winWidth / 10 * 9
      size.height = size.width * heightToWidthRatio
    }
    
    return size

  }
}