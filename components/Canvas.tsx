import React, { forwardRef, useImperativeHandle, useRef } from 'react'

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>

export interface CanvasEvent {
  lineWidth: number
  path: string
}

export interface CanvasRef {
  draw: (e: CanvasEvent) => void
}

interface CanvasProps {
  width: number
  height: number
  onDraw: (e: CanvasEvent) => void
}

interface CanvasState {
  isDrawing: boolean
  prev?: CanvasMouseEvent
}

const getXY = (surface: HTMLElement, e: CanvasMouseEvent) => [
  e.clientX - surface.offsetLeft,
  e.clientY - surface.offsetTop,
]

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ onDraw }, ref) => {
  const targetRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<CanvasState>({
    isDrawing: false,
  })

  useImperativeHandle(
    ref,
    () => ({
      draw(e) {
        const target = targetRef.current
        if (!target) return

        const ctx = target.getContext('2d')
        if (!ctx) return
        ctx.lineWidth = e.lineWidth
        ctx.stroke(new Path2D(e.path))
      },
    }),
    []
  )

  const handleMouseEvent = (e: CanvasMouseEvent) => {
    const target = targetRef.current
    if (!target) return

    const state = stateRef.current

    switch (e.type) {
      case 'mousedown':
        state.isDrawing = true
        break

      case 'mouseup':
        state.isDrawing = false
        break

      case 'mousemove':
        if (state.isDrawing && state.prev) {
          const [x1, y1] = getXY(target, state.prev)
          const [x2, y2] = getXY(target, e)
          const path = `M ${x1} ${y1} L ${x2} ${y2} Z`
          onDraw({
            lineWidth: 2,
            path,
          })
        }
        break

      default:
        break
    }
    state.prev = e
  }

  return (
    <canvas
      onMouseDown={handleMouseEvent}
      onMouseUp={handleMouseEvent}
      onMouseMove={handleMouseEvent}
      ref={targetRef}
    />
  )
})

export default Canvas
