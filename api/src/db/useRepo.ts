import { createConnection, EntityTarget, Repository } from 'typeorm'
import connectionOptions from './connectionOptions'

type Executor<TEntity, TResult> = (respository: Repository<TEntity>) => TResult

const useRepo = async <TEntity, TResult>(
  clazz: EntityTarget<TEntity>,
  executor: Executor<TEntity, TResult>,
): Promise<TResult | undefined> => {
    const connection = await createConnection(connectionOptions)
    const repo = connection.getRepository(clazz)
    const result = await executor(repo)
    connection.close()
    return result
  }

export default useRepo
