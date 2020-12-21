import Router from '@koa/router'
import { usersRouter } from './usersRouter'

export const router = new Router()

router.use('/users', usersRouter.routes(), usersRouter.allowedMethods())
