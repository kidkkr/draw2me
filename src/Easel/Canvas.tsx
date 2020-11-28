import React, { useEffect, useRef } from 'react'
import { Observable, Observer } from 'rxjs'
import CanvasEvent from './CanvasEvent'
import CanvasEventObservable from './CanvasEventObservable'
import EaselEvent from './EaselEvent'
import EaselEventObserver from './EaselEventObserver'

interface CanvasProps {
  width: number
  height: number
  canvasEventObserver?: Observer<CanvasEvent> 
  easelEvent$?: Observable<EaselEvent>
}

const Canvas = ({ width, height, canvasEventObserver, easelEvent$ }: CanvasProps) => {
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

    // Subscribe events from easelEvent$ and draw or do something
    const easelEventSubscription = (() => {
      if (!easelEvent$) return
      const easelEventObserver = new EaselEventObserver(canvas)
      return easelEvent$.subscribe(easelEventObserver)
    })()

    return () => {
      canvasEventSubscription?.unsubscribe()
      easelEventSubscription?.unsubscribe()
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
