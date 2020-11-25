/**
 *  Canvas will draw ImageData on CanvasRenderingContext2D.
 *  (@see https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData)
 */

interface CanvasData {
  data: Uint8ClampedArray
  width: number
  height: number
  dx: number
  dy: number
}

export  default CanvasData
CanvasRenderingContext2D