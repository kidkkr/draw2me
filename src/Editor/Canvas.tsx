import React, { useEffect, useRef } from 'react'
import { Observable, Observer } from 'rxjs'
import CanvasEvent from './CanvasEvent'
import CanvasEventObservable from './CanvasEventObservable'
import EditorEvent from './EditorEvent'
import EditorEventObserver from './EditorEventObserver'

interface CanvasProps {
  width: number
  height: number
  canvasEventObserver?: Observer<CanvasEvent> 
  editorEvent$?: Observable<EditorEvent>
}

const Canvas = ({ width, height, canvasEventObserver, editorEvent$ }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    // Push mouse events to mouseEventObserver
    const canvasEventSubscription = (() => {
      if (!canvasEventObserver) return
      const canvasEvent$ = new CanvasEventObservable(canvas)
      return canvasEvent$.subscribe(canvasEventObserver)
    })()

    // Subscribe events from editorEvent$ and draw or do something
    const editorEventSubscription = (() => {
      if (!editorEvent$) return
      const editorEventObserver = new EditorEventObserver(canvas)
      return editorEvent$.subscribe(editorEventObserver)
    })()

    return () => {
      canvasEventSubscription?.unsubscribe()
      editorEventSubscription?.unsubscribe()
    }
  }, [])

  return (
    <canvas
      width={width}
      height={height}
      style={{ background: '#fff', borderRadius: '20px' }}
      ref={canvasRef}
    />
  )
}

export default Canvas
