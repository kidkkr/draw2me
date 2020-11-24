import { Subject } from 'rxjs'
import CanvasEvent from './CanvasEvent'

export default class CanvasState extends Subject<CanvasEvent> {
  isDrawing = false

  next(e: CanvasEvent) {
    switch (e.type) {
      case 'mousedown': {
        this.isDrawing = true
        break
      }

      case 'mouseup':
      case 'mouseout': {
        this.isDrawing = false
        break
      }

      case 'mousemove':
      default: {
        break
      }
    }
  }
}
