let Router = require('koa-router')
let compose = require('koa-compose')

module.exports = function () {
  let pubRouter = new Router()

  pubRouter.get('/alive', ctx => { ctx.body = 'Hello alive!!!' })
  return compose([pubRouter.routes(), pubRouter.allowedMethods()])
}
