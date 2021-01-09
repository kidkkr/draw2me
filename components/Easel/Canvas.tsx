import React, { CSSProperties, useEffect, useMemo, useRef } from 'react'
import { Observable, Observer } from 'rxjs'
import CanvasEvent from './CanvasEvent'
import CanvasEventObservable from './CanvasEventObservable'
import EaselEvent from './EaselEvent'
import CanvasController from './CanvasController'

interface CanvasProps {
  width: number
  height: number
  canvasEventObserver?: Observer<CanvasEvent>
  easelEvent$?: Observable<EaselEvent>
}

const baseContainerStyle: CSSProperties = {
  display: 'inline-block',
  position: 'relative',
  background: '#fff',
  borderRadius: '20px',
  border: '3px solid black',
}

const canvasStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const Canvas = ({ width, height, canvasEventObserver, easelEvent$ }: CanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // Canvas that draws only after drawing
  const localCanvasRef = useRef<HTMLCanvasElement>(null)
  // Canvas that draws temporary while drawing(mouse move)
  const stageCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (
      !containerRef.current ||
      !localCanvasRef.current ||
      !stageCanvasRef.current
    ) return
    const container = containerRef.current
    const localCanvas = localCanvasRef.current
    const stageCanvas = stageCanvasRef.current

    // Push mouse events to mouseEventObserver
    const canvasEventSubscription = (() => {
      if (!canvasEventObserver) return
      const canvasEvent$ = new CanvasEventObservable(container)
      return canvasEvent$.subscribe(canvasEventObserver)
    })()

    // Subscribe events from easelEvent$ and draw or do something
    const easelEventSubscription = (() => {
      if (!easelEvent$) return
      const controller = new CanvasController(localCanvas, stageCanvas)
      return easelEvent$.subscribe(controller)
    })()

    return () => {
      canvasEventSubscription?.unsubscribe()
      easelEventSubscription?.unsubscribe()
    }
  }, [])

  const containerStyle = useMemo(() => ({ 
    ...baseContainerStyle,
    width,
    height,
  }), [width, height])

  const commonProps = useMemo(() => ({
    width,
    height,
    style: canvasStyle,
  }), [width, height])

  return (
    <div style={containerStyle} ref={containerRef}>
      <canvas {...commonProps} ref={localCanvasRef} />
      <canvas {...commonProps} ref={stageCanvasRef} />
    </div>
  )
}

export default Canvas
