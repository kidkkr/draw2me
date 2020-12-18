import path from 'path'
import { ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  password: 'password',
  database: 'draw2me',
  logging: 'all',
  entities: [path.resolve(__dirname, './entity/*.ts')],
}

export default connectionOptions
