import Router from '@koa/router'
import users from './users'
import auth from './auth'
import BoardStorage from 'server/services/BoardStorage'

const router = new Router()
router.use('/api/users', users.routes(), users.allowedMethods())
router.use('/api/auth', auth.routes(), auth.allowedMethods())

router.get('/board', async function getBoardImage(ctx) {
  const data = await BoardStorage.get()
  if (data) {
    ctx.response.set('content-type', 'image/png')
    ctx.status = 200
    ctx.body = data
    return
  }
  ctx.status = 500
})

export default router
