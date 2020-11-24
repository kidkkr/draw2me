import CanvasEvent from './CanvasEvent'

export const getEventToCanvasEvent = (offsetX: number, offsetY: number) =>
  (e: MouseEvent): CanvasEvent => ({
    type: e.type,
    x: e.pageX - offsetX,
    y: e.pageY - offsetY,
  })

export const pointsToLinePath = ([e0, e1]: [CanvasEvent, CanvasEvent]) =>
  new Path2D(`M ${e0.x} ${e0.y} L ${e1.x} ${e1.y}`)
