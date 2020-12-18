import { User } from '../entities/User'
import useRepo from '../useRepo'

export const getUserById = (id: number) => 
  useRepo(User, (repo) => {
    return repo.findOne({ id })
  },
)
