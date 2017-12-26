let config = require('config')
let jwt = require('jsonwebtoken')

module.exports = function () {
  return async function authorize (ctx, next) {
    if (ctx.method === 'OPTIONS') return await next()
    let token = ctx.get('x-auth-token')
    if (!token) {
      ctx.throw('Authentication required', 401)
    }
    let jwtDecode
    try {
      jwtDecode = jwt.verify(token, config.auth.secretKey)
    } catch (exception) {
      ctx.throw('Authentication failed', 401)
    }
    ctx.auth = jwtDecode
    await next()
  }
}
