import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Easel from '@components/Easel'

const IndexPage = () => {
  const [socket, setSocket] = useState<typeof Socket>()
  useEffect(() => {
    // FIXME: Replace with constants (next.js runtime dotenv)
    const s = io('http://localhost:3001/')
    s.on('connect', () => {
      console.log(`socket connected: ${s.id}`)
      setSocket(s)
    })
    s.open()
  }, [setSocket])

  return (
    <>
      <Easel
        canvasWidth={350}
        canvasHeight={250}
      />
      { socket ? `socket.id: ${socket.id}` : 'socket disconnected' }
    </>
  )
}

export default IndexPage
