let Koa = require('koa')
let app = new Koa()
let koaBody = require('koa-body')
let config = require('config')
let router = require('./router')
require('./connection')
app.use(koaBody({
  multipart: true,
  formidable: {}
}))

app.use(router())
app.server = app.listen(config.api.port, function () {
  console.log('server is listening on port %s ', config.api.port)
})
