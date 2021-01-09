import { createServer } from 'http'
import Koa from 'koa'
import { createConnection } from 'typeorm'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import { Server, Socket } from 'socket.io'
import 'reflect-metadata'
import next from 'next'

import { PORT, PORT_WS, __DEV__ } from './server/constants'
import ormConfig from './server/ormConfig'
import router from './server/router'

async function runServer() {
  // Setup TypeORM
  try {
    const connection = await createConnection(ormConfig)
    console.log(`TypeORM initialized: ${connection.name}`)
  } catch(error) {
    console.log(`TypeORM connection error: ${error}`)
  }

  // Setup Next.js
  const app = await next({ dev: __DEV__ })
  const handle = app.getRequestHandler()
  await app.prepare()
  const nextRouter = new Router()
  nextRouter.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // Setup Koa.js
  const server = new Koa()
  server.use(bodyParser())
  server.use(router.routes())
  server.use(router.allowedMethods())
  server.use(nextRouter.routes())
  server.listen(PORT)
  console.log(`Koa app is up and running on port ${PORT}`)

  // Setup socket.io
  const socketServer = createServer(server.callback())
  const io = new Server(socketServer, {
    maxHttpBufferSize: 1e8
  })
  io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} has connected`)
  })
  socketServer.listen(PORT_WS)
  console.log(`Socket.io is up and running on port ${PORT_WS}`)

}

runServer()
