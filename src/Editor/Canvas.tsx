import React, { useEffect, useRef } from 'react'
import { NextObserver, Observable, Observer } from 'rxjs'
import CanvasObservable from './CanvasObservable'
import CanvasEvent from './CanvasEvent'
import CanvasData from './CanvasData'

interface CanvasProps {
  width: number
  height: number
  observer?: Observer<CanvasEvent> 
  data$?: Observable<CanvasData>
}

const createDataObserver = (canvas: HTMLCanvasElement): NextObserver<CanvasData> => {
  const context = canvas.getContext('2d')
  if (!context) return {
    next: () => {}
  }

  return {
    next: e => {
      const imagedata = new ImageData(e.data, e.width, e.height)
      context?.putImageData(imagedata, e.dx, e.dy)
    }
  }
}

const Canvas = ({ width, height, observer, data$ }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    console.log({ observer, data$ })
    const canvas = canvasRef.current

    const canvasSubscription = (() => {
      if (!observer) return
      const canvas$ = new CanvasObservable(canvas)
      return canvas$.subscribe(observer)
    })()

    // The canvas element will draw from data subscribed
    const dataSubscription = (() => {
      if (!data$) return
      const dataObserver = createDataObserver(canvas)
      return data$.subscribe(dataObserver)
    })()

    return () => {
      canvasSubscription?.unsubscribe()
      dataSubscription?.unsubscribe()
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
