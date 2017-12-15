let Router = require('koa-router')
let compose = require('koa-compose')
let userController = require('./controllers').userController

module.exports = function () {
  let pubRouter = new Router()
  pubRouter.pst = pubRouter.post
  pubRouter.get('/alive', ctx => { ctx.body = 'Hello alive!!!' })
  pubRouter.pst('/users', userController.saveUser)

  return compose([pubRouter.routes(), pubRouter.allowedMethods()])
}
