import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { SOCKET_IO } from '../env'
import Canvas, { CanvasEvent, CanvasRef } from '../components/Canvas'

const TIMEOUT = 100

const canvasContainerStyle = {
  width: 'max-content',
  border: 'solid 2px grey',
}

const DemoPage = () => {
  const [socket, setSocket] = useState<typeof Socket>()
  const bufferTimerRef = useRef<any>(null)
  const bufferRef = useRef<CanvasEvent[]>([])
  const canvasRef = useRef<CanvasRef>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const socket = io(SOCKET_IO, {
      secure: true,
    })
    socket.on('connect', () => {
      setSocket(socket)
    })
    socket.on('draws', canvas.draw)
    socket.open()
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
      <h1>imgf.ly demo</h1>
      <p>{socket ? `socket.id: ${socket.id}` : 'socket disconnected'}</p>
      <div style={canvasContainerStyle}>
        <Canvas width={350} height={250} onDraw={handleDraw} ref={canvasRef} />
      </div>
    </main>
  )
}

export default DemoPage
