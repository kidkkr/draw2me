import Router from '@koa/router'
import users from './users'
import auth from './auth'

const router = new Router()
router.use('/api/users', users.routes(), users.allowedMethods())
router.use('/api/auth', auth.routes(), auth.allowedMethods())


export default router
