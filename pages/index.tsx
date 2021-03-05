import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Canvas, { CanvasEvent, CanvasRef } from '@components/Canvas'

const TIMEOUT = 100

const IndexPage = () => {
  const [socket, setSocket] = useState<typeof Socket>()
  const bufferTimerRef = useRef<any>(null)
  const bufferRef = useRef<CanvasEvent[]>([])
  const canvasRef = useRef<CanvasRef>(null)

  useEffect(() => {
    // FIXME: Replace with constants (next.js runtime dotenv)
    const canvas = canvasRef.current
    if (!canvas) return

    const s = io('http://localhost:3001/')
    s.on('connect', () => {
      console.log(`socket connected: ${s.id}`)
      setSocket(s)
    })
    s.on('draws', canvas.draw)
    s.open()
  }, [setSocket])

  const clearBuffer = () => {
    if (!socket) return
    const buffer = bufferRef.current
    const merged = buffer.reduce(
      (merged, item) => {
        merged.points.push(...item.points)
        return merged
      },
      { lineWidth: buffer[0].lineWidth, points: [] }
    )
    socket.emit('draws', merged)
    bufferRef.current = []
  }

  const handleDraw = (e: CanvasEvent) => {
    bufferRef.current.push(e)
    if (bufferTimerRef.current) {
      clearTimeout(bufferTimerRef.current!)
    }
    bufferTimerRef.current = setTimeout(() => {
      clearBuffer()
      bufferTimerRef.current = null
    }, TIMEOUT)
  }

  return (
    <main>
      <h1>{socket ? `socket.id: ${socket.id}` : 'socket disconnected'}</h1>
      <Canvas width={350} height={250} onDraw={handleDraw} ref={canvasRef} />
    </main>
  )
}

export default IndexPage
