let Router = require('koa-router')
let compose = require('koa-compose')

let auth = require('./middlewares/auth')
let userController = require('./controllers').userController

module.exports = function () {
  let pubRouter = new Router()
  let priRouter = new Router()
  
  pubRouter.pst = pubRouter.post
  priRouter.pst = priRouter.post
  
  pubRouter.get('/alive', ctx => { ctx.body = 'Hello alive!!!' })
  priRouter.get('/users', userController.getUser)
  pubRouter.pst('/users', userController.saveUser)

  return compose([
    pubRouter.routes(),
    pubRouter.allowedMethods(),
    auth(),
    priRouter.routes(),
    priRouter.allowedMethods()
  ])
}
