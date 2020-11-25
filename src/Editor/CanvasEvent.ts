import CanvasEventType from './CanvasEventType'

export default interface CanvasEvent {
  type: string
  x: number
  y: number
  dx: number
  dy: number
}
