let validate = require('../validators')
let userService = require('../services').userService

let saveUser = async function (ctx) {
  let reqBody = await validate.userValidator(ctx.request.body, 'saveUser')
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
        data: serviceRes,
        status: 200,
        message: 'User successfully created'
      }
    }
  } else {
    ctx.body = {
      status: 900,
      meesage: reqBody.message || 'Validation failed'
    }
  }
}

let getUser = async function (ctx) {
  let reqBody = validate.getUserValidation(ctx.request.query)
  if (reqBody.status) {
    let serviceRes = await userService.getUser({ 'username': reqBody.data.username })
    let message = ''
    if (serviceRes === null) message = 'No user found'
    ctx.body = {
      data: serviceRes,
      status: 200,
      message: message
    }
  } else {
    ctx.body = {
      status: 900,
      message: 'Validation failed'
    }
  }
}

let updateUser = async function (ctx) {
  let reqBody = await validate.updateUserValidator(ctx.request.body, 'updateUser')
  if (reqBody.status) {
    let serviceRes = await userService.updateUser({ 'username': ctx.auth.username }, reqBody.data)
    ctx.body = {
      data: serviceRes,
      status: 200,
      message: 'User successfully updated'
    }
  } else {
    ctx.body = {
      status: 900,
      meesage: reqBody.message || 'Validation failed'
    }
  }
}

let deleteUser = async function (ctx) {
  let username
  if (ctx.query.username) username = ctx.query.username
  else username = ctx.auth.username

  if (username) {
    let serviceRes = await userService.deleteUser({ 'username': username })
    ctx.body = {
      data: serviceRes,
      status: 200,
      message: 'User successfully deleted'
    }
  } else {
    ctx.body = {
      status: 900,
      message: 'User not found'
    }
  }
}

module.exports = {
  saveUser: saveUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
