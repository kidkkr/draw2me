import Koa from 'koa'
import { createConnection } from 'typeorm'
import bodyParser from 'koa-bodyparser'
import 'reflect-metadata'
import { PORT } from './constants'
import ormConfig from './ormConfig'
import router from './router'

async function run() {
  // Connect DB with TypeORM
  const connection = await createConnection(ormConfig)
    .catch((error) => console.log(`TypeORM connection error: ${error}`))
  if (!connection) { return }
 
  // Create Koa application
  const app = new Koa()
  
  // Koa middlewares
  app.use(bodyParser())

  // Use koa-router
  app.use(router.routes())
  app.use(router.allowedMethods())
  
  app.listen(PORT)

  console.log(`Koa app is up and running on port ${PORT}`)
  console.log(connection.entityMetadatas)
}

run()
