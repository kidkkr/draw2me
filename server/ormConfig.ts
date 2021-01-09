import { ConnectionOptions } from 'typeorm'

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './constants'

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  synchronize: true,
  entities: ['dist/entity/*.js']
}

export default ormConfig
