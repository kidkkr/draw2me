import Sqlite3 from 'sqlite3'
import path from 'path'

const Sqlite = Sqlite3.verbose()
export const filename = `${path.resolve(__dirname, '../')}/sqlite.local`
export const db = new Sqlite.Database(filename)
