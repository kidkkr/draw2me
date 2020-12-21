import Koa from 'koa'
import { ConnectionOptions, createConnection } from 'typeorm'
import 'reflect-metadata'
import { router } from './router'

const PORT = process.env.PORT ?? 3001

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  entities: ['dist/entity/*.js']
}

createConnection(typeOrmConfig)
  .then((connection) => {
    const app = new Koa()
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(PORT)
    console.log(`Koa app is up and running on port ${PORT}`)
    console.log(connection.entityMetadatas)
  })
  .catch((error) => {
    console.log(`TypeORM connection error: ${error}`)
  })