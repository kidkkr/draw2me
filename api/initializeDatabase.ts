import path from 'path'
import { ConnectionOptions, createConnection } from 'typeorm'
import { filename } from './sqlite'

const options: ConnectionOptions = {
  type: 'sqlite',
  database: filename,
  logging: 'all',
  entities: [path.resolve(__dirname, './entity/*.ts')],
}

const initializeDatabase = async () => {
  const connection = await createConnection(options)
  console.debug(connection.entityMetadatas)
}

export default initializeDatabase
