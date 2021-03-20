import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

type CanvasMouseEvent = React.MouseEvent<HTMLElement, MouseEvent>

export type Point = [number, number]

export interface CanvasEvent {
  lineWidth: number
  points: Point[]
}

export interface CanvasRef {
  draw: (e: CanvasEvent) => void
}

interface CanvasProps {
  width: number
  height: number
  onDraw?: (e: CanvasEvent) => void
}

interface CanvasState {
  isDrawing: boolean
  prev?: Point
}

const baseCanvasStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
}

const canvasStyle: CSSProperties = {
  ...baseCanvasStyle,
  zIndex: 1,
}

const tempCanvasStyle: CSSProperties = {
  ...baseCanvasStyle,
  zIndex: 2,
}

const getPoint = (container: HTMLElement, e: CanvasMouseEvent): Point => [
  e.clientX - container.offsetLeft,
  e.clientY - container.offsetTop,
]

const drawCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  e: CanvasEvent
) => {
  const target = canvasRef.current
  if (!target) return

  const ctx = target.getContext('2d')
  if (!ctx) return
  ctx.lineWidth = e.lineWidth
  const [sx, sy] = e.points[0]
  const moves = e.points
    .slice(1)
    .map(([x, y]) => `L ${x} ${y}`)
    .join('')
  const path = `M ${sx} ${sy} ${moves}`
  ctx.stroke(new Path2D(path))
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ width, height, onDraw }, ref) => {
    const containerStyle: CSSProperties = {
      width,
      height,
      position: 'relative',
      isolation: 'isolate',
    }
    const commonProps = { width, height }
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tempCanvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef<CanvasState>({
      isDrawing: false,
      prev: null,
    })

    const draw = drawCanvas.bind(null, canvasRef)
    const drawTempCanvas = drawCanvas.bind(null, tempCanvasRef)
    const clearTempCanvas = () => {
      if (!tempCanvasRef.current) return

      const ctx = tempCanvasRef.current.getContext('2d')
      ctx?.clearRect(0, 0, width, height)
    }

    useImperativeHandle(
      ref,
      () => ({
        draw(e) {
          clearTempCanvas()
          draw(e)
        },
      }),
      []
    )

    const handleCanvasEvent = onDraw
      ? (e: CanvasMouseEvent) => {
          const target = canvasRef.current
          const container = containerRef.current
          if (!target || !container) return

          const state = stateRef.current

          const p = getPoint(container, e)

          switch (e.type) {
            case 'mouseenter':
            case 'mousedown':
              if (e.buttons === 0 || e.button !== 0) break
              // else: only main button is pressed
              state.isDrawing = true
              onDraw({
                lineWidth: 2,
                points: [p],
              })
              break

            case 'mouseup':
              state.isDrawing = false
              break

            case 'mousemove':
              if (state.isDrawing) {
                onDraw({
                  lineWidth: 2,
                  points: [p],
                })
                if (state.prev) {
                  drawTempCanvas({
                    lineWidth: 2,
                    points: [state.prev, p],
                  })
                }
              }
              break

            case 'mouseout':
              state.isDrawing = false
              state.prev = null
              break

            default:
              break
          }

          state.prev = p
        }
      : undefined

    return (
      <div
        style={containerStyle}
        onMouseEnter={handleCanvasEvent}
        onMouseDown={handleCanvasEvent}
        onMouseUp={handleCanvasEvent}
        onMouseMove={handleCanvasEvent}
        onMouseOut={handleCanvasEvent}
        ref={containerRef}
      >
        <canvas {...commonProps} style={canvasStyle} ref={canvasRef} />
        <canvas {...commonProps} style={tempCanvasStyle} ref={tempCanvasRef} />
      </div>
    )
  }
)

export default Canvas
