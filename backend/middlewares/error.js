module.exports = function (app) {
  return async function error (ctx, next) {
    try {
      await next()
    } catch (err) {
      err.status = err.status || 500

      ctx.err = err
      ctx.stack = err.stack && err.stack.split('\n')
      ctx.errors = err.errors
      ctx.status = err.status

      ctx.body = {
        status: 500,
        error: ctx.err.message || 'Internal server error',
        errors: ctx.errors && Object.keys(err.errors).map(function (key) {
          return key + ': ' + err.errors[key].message
        })
      }
    }
  }
}
