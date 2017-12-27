let validator = require('validator')
let commonValidator = require('./common')
module.exports.userValidator = function (reqBody, reqType) {
  return commonValidator.UserDataValidation(reqBody, reqType)
}

module.exports.getUserValidation = function (reqBody) {
  let status, message, data
  if (validator.isEmpty(reqBody.username)) {
    status = false
    message = 'Username can not be empty.'
  } else {
    status = true
    message = ''
    data = reqBody
  }
  return {
    status: status,
    message: message,
    data: data
  }
}

module.exports.updateUserValidator = function (reqBody) {
  let status = true
  let message = ''
  let data = reqBody
  for (var key in reqBody) {
    if (validator.isEmpty(reqBody[key])) {
      status = false
      message = key + ' can not be empty'
      data = ''
      break
    }
  }

  return {
    status: status,
    message: message,
    data: data
  }
}
