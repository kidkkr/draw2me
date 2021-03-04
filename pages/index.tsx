import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Canvas, { CanvasEvent, CanvasRef } from '@components/Canvas'

const IndexPage = () => {
  const [socket, setSocket] = useState<typeof Socket>()
  const bufferRef = useRef<CanvasEvent[]>([])
  const canvasRef = useRef<CanvasRef>(null)

  useEffect(() => {
    // FIXME: Replace with constants (next.js runtime dotenv)
    const s = io('http://localhost:3001/')
    s.on('connect', () => {
      console.log(`socket connected: ${s.id}`)
      setSocket(s)
    })
    s.on('draws', (draws: any) => {
      draws.forEach((draw: any) => {
        canvasRef.current?.draw(draw)
      })
    })
    s.open()
  }, [setSocket])

  const handleDraw = (e: CanvasEvent) => {
    bufferRef.current.push(e)
    if (!socket) return
    if (bufferRef.current.length > 10) {
      socket.emit('draws', bufferRef.current)
      bufferRef.current = []
    }
  }

  return (
    <main>
      <h1>{socket ? `socket.id: ${socket.id}` : 'socket disconnected'}</h1>
      <Canvas width={350} height={250} onDraw={handleDraw} ref={canvasRef} />
    </main>
  )
}

export default IndexPage
