let Router = require('koa-router')
let compose = require('koa-compose')

let auth = require('./middlewares/auth')
let error = require('./middlewares/error')
let userController = require('./controllers').userController
let authController = require('./controllers').authController

module.exports = function () {
  let pubRouter = new Router()
  let priRouter = new Router()

  pubRouter.pst = pubRouter.post
  priRouter.pst = priRouter.post

  pubRouter.get('/alive', ctx => { ctx.body = 'Hello alive!!!' })

  pubRouter.pst('/signUp', authController.signUp)
  pubRouter.pst('/signIn', authController.signIn)

  priRouter.get('/users', userController.getUser)
  priRouter.pst('/users', userController.saveUser)
  priRouter.put('/users', userController.updateUser)
  priRouter.del('/users', userController.deleteUser)

  return compose([
    error(),
    pubRouter.routes(),
    pubRouter.allowedMethods(),
    auth(),
    priRouter.routes(),
    priRouter.allowedMethods()
  ])
}
