import { NextObserver } from 'rxjs'
import EaselEvent from './EaselEvent'
import EaselEventType from './EaselEventType'

export default class CanvasController implements NextObserver<EaselEvent> {
  localCanvas: HTMLCanvasElement
  stageCanvas: HTMLCanvasElement
  pathBuffer: string
  undoStack: Blob[]
  redoStack: Blob[]

  constructor(localCanvas: HTMLCanvasElement, stageCanvas: HTMLCanvasElement) {
    this.localCanvas = localCanvas
    this.stageCanvas = stageCanvas
    this.pathBuffer = ''
    this.undoStack = []
    this.redoStack = []
  }

  private drawBlob(blob: Blob, context: CanvasRenderingContext2D) {
    const imageUrl = URL.createObjectURL(blob)
    const image = new Image()
    image.onload = () => {
      context.clearRect(0, 0, this.localCanvas.width, this.localCanvas.height)
      context.drawImage(image, 0, 0)
      URL.revokeObjectURL(imageUrl)
    }
    image.src = imageUrl
  }

  private clearContext(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.localCanvas.width, this.localCanvas.height)
  }

  private reinvalidateCanvas() {
    const localContext = this.localCanvas.getContext('2d')
    if (!localContext) return

    if (this.undoStack.length > 0) {
      const blob = this.undoStack[this.undoStack.length - 1]
      this.drawBlob(blob, localContext)
    } else {
      this.clearContext(localContext)
    }
  }

  next = (e: EaselEvent) => {
    const localContext = this.localCanvas.getContext('2d')
    const stageContext = this.stageCanvas.getContext('2d')
    if (!localContext || !stageContext) return

    switch (e.type) {
      case EaselEventType.DrawStart: {
        this.pathBuffer += e.subPath
        return
      }

      case EaselEventType.Draw: {
        this.pathBuffer += e.subPath
        const path = new Path2D(this.pathBuffer)
        stageContext.save()
        this.clearContext(stageContext)
        stageContext.strokeStyle = e.stroke
        stageContext.lineWidth = e.strokeWidth
        stageContext.stroke(path)
        stageContext.restore()
        return
      }

      // FIXME
      case EaselEventType.Erase: {
        this.pathBuffer += e.subPath
        const path = new Path2D(this.pathBuffer)
        localContext.save()
        localContext.globalCompositeOperation = 'destination-out'
        localContext.beginPath()
        localContext.lineWidth = e.strokeWidth
        localContext.stroke(path)
        localContext.restore()
        return
      }

      case EaselEventType.DrawEnd: {
        // Draw to local context
        this.pathBuffer += e.subPath
        const path = new Path2D(this.pathBuffer)
        localContext.save()
        localContext.globalCompositeOperation = 'source-over'
        localContext.beginPath()
        localContext.strokeStyle = e.stroke
        localContext.lineWidth = e.strokeWidth
        localContext.stroke(path)
        localContext.restore()

        // Clear buffer and staged
        this.clearContext(stageContext)
        this.pathBuffer = ''

        // Save History
        this.localCanvas.toBlob((blob) => {
          if (!blob) return
          this.undoStack.push(blob)
          this.redoStack = []
        })
        return
      }

      case EaselEventType.Undo: {
        const undo = this.undoStack.pop()
        if (undo) {
          this.redoStack.push(undo)
        }
        this.reinvalidateCanvas()
        return
      }

      case EaselEventType.Redo: {
        const redo = this.redoStack.pop()
        if (redo) {
          this.undoStack.push(redo)
        }
        this.reinvalidateCanvas()
        return
      }

      default:
        return
    }
  }
}
