import Router from '@koa/router'
import { User } from '../entity/User'

const users = new Router()

users.get('/:id', async function getUser(ctx) {
  const userId = ctx.params['id']
  if (!userId) {
    ctx.status = 400
    return
  }

  const user = await User.findOne({ id: userId })
  if (!user) {
    ctx.status = 404
    return
  }

  ctx.body = { user: user }
})

export default users
