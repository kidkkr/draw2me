import { ConnectionOptions, createConnection } from 'typeorm'
import { filename } from './sqlite'

const options: ConnectionOptions = {
  type: 'sqlite',
  database: filename,
  logging: true,
}

const initializeDatabase = async () => {
  const connection = await createConnection(options)
}

export default initializeDatabase
