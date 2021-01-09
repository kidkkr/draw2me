export const __DEV__ = process.env.NODE_ENV !== 'production'

if (__DEV__) {
  require('dotenv').config()
}

// Koa environment variables
export const PORT = process.env.PORT

// socket.io environment variables
export const PORT_WS = process.env.PORT_WS

// Database environment variables
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = Number(process.env.DB_PORT)
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
