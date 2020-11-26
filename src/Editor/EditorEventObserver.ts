import { NextObserver } from 'rxjs'
import EditorEvent from './EditorEvent'
import EditorEventType from './EditorEventType'

export default class EditorEventObserver implements NextObserver<EditorEvent> {
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  next = (e: EditorEvent) => {
    const context = this.canvas.getContext('2d')
    if (!context) return

    switch (e.type) {
      case EditorEventType.Draw: {
        const path = new Path2D(e.path)
        context.beginPath()
        context.strokeStyle = e.stroke
        context.stroke(path)
        break
      }

      default:
        break
    }
  }
}
