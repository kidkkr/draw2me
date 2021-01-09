import Router from '@koa/router'
import { User } from '../entity/User'

const auth = new Router()

auth.post('/signup', async function signUp(ctx) {
  const { email, name, password } = ctx.request.body ?? {}
  if (!name || !password) {
    ctx.status = 500
    return
  }

  const user = await User.create({
    name, email, password
  }).save()

  ctx.body = { user }
})

auth.post('/signin', async function signIn(ctx) {
  const { email, password } = ctx.request.body ?? {}
  if (!email || !password) {
    ctx.status = 400
    return
  }

  const user = await User.findOne({ email, password })
  if (!user) {
    ctx.status = 404
    return
  }

  ctx.body = { user }
})

export default auth
