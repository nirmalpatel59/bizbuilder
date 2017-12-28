let jwt = require('jsonwebtoken')
let config = require('config')

let userService = require('../services/user.service')
let authValidator = require('../validators/auth.validator')

module.exports.signUp = async function (ctx) {
  let reqBody = await authValidator.signUpValidation(ctx.request.body)
  if (reqBody.status) {
    let isUserExist = await userService.getUser({ 'email': reqBody.data.email })
    if (isUserExist != null) {
      ctx.body = {
        status: 200,
        message: 'User already exist'
      }
    } else {
      let serviceRes = await userService.saveUser(reqBody.data)
      ctx.body = {
        status: 200,
        message: 'User successfully created',
        username: serviceRes
      }
    }
  } else {
    ctx.body = {
      status: 900,
      meesage: reqBody.message || 'Validation error'
    }
  }
}

module.exports.signIn = async function (ctx) {
  let reqBody = await authValidator.signInValidation(ctx.request.body)
  if (reqBody.status) {
    let serviceRes = await userService.getUser({ 'username': reqBody.data.username })
    let status = 200
    let message
    let data
    if (serviceRes === null) {
      message = 'Invalid Username'
    } else if (serviceRes.password !== reqBody.data.password) {
      message = 'Invalid Password'
    } else {
      let authToken = await jwt.sign(serviceRes.toJSON(), config.auth.secretKey, {expiresIn: config.auth.expiryTime})
      message = 'Successfully signIn'
      data = {
        username: serviceRes.username,
        authToken: authToken
      }
    }
    ctx.body = {
      status: status,
      message: message,
      data: data
    }
  } else {
    ctx.body = {
      status: 900,
      message: reqBody.message || 'Validation error'
    }
  }
}
