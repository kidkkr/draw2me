/**
 * The position values of HTMLMouseEvent is based on a screen or page,
 * So Canvas and Editor use this abstract type instead.
 */
export default interface CanvasEvent {
  type: MouseEvent['type']
  x: number
  y: number
  dx: number
  dy: number
}
