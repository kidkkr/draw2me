import { Observer } from 'rxjs'
import CanvasEvent from './CanvasEvent'
import EditorActionType from './EditorActionType'
import EditorController from './EditorController'

/**
 * Observe CanvasEvent and dispatch converted EditorEvent to EditorController
 */
export default class CanvasEventObserver implements Observer<CanvasEvent> {
  controller: EditorController

  constructor(controller: EditorController) {
    this.controller = controller
  }

  next = (e: CanvasEvent) => {
    const type = (() => {
      switch (e.type) {
        case 'mousemove': return EditorActionType.MouseMove
        case 'mouseup': return EditorActionType.MouseUp
        case 'mousedown': return EditorActionType.MouseDown
        default: return
      }
    })()
    if (!type) return

    this.controller.dispatch({
      type,
      x: e.x,
      y: e.y,
      dx: e.dx,
      dy: e.dy,
    })
  }

  error = () => {}

  complete = () => {}
}
