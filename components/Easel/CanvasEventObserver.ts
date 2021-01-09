import { Observer } from 'rxjs'
import CanvasEvent from './CanvasEvent'
import EaselActionType from './EaselActionType'
import EaselController from './EaselController'

/**
 * Observe CanvasEvent and dispatch converted EaselEvent to EaselController
 */
export default class CanvasEventObserver implements Observer<CanvasEvent> {
  controller: EaselController

  constructor(controller: EaselController) {
    this.controller = controller
  }

  next = (e: CanvasEvent) => {
    const type = (() => {
      switch (e.type) {
        case 'mousemove': return EaselActionType.MouseMove
        case 'mouseup': return EaselActionType.MouseUp
        case 'mousedown': return EaselActionType.MouseDown
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
