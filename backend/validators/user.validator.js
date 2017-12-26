let validator = require('validator')
let commonValidator = require('./common')
module.exports.userValidator = function (reqBody) {
  return commonValidator.UserDataValidation(reqBody)
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
