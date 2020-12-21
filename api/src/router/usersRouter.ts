import Router from '@koa/router'
import { User } from '../entity/User'

export const usersRouter = new Router()

usersRouter.get('/:id', async (context) => {
  const userId = context.params['id']
  if (!userId) {
    context.status = 400
    return
  }

  const user = await User.find({ id: userId })
  if (!user) {
    context.status = 404
    return
  }

  context.body = { user }
})
