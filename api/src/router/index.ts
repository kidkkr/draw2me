import Router from '@koa/router'
import users from './users'
import auth from './auth'

const router = new Router()
router.use('/users', users.routes(), users.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())

export default router
