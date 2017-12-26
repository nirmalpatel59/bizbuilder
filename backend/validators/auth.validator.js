let commonValidator = require('./common')
let validator = require('validator')

module.exports.signUpValidation = function (reqBody) {
  return commonValidator.UserDataValidation(reqBody)
}

module.exports.signInValidation = function (reqBody) {
  let status, message, data
  if (validator.isEmpty(reqBody.username)) {
    status = false
    message = 'Username can not be empty'
  } else if (validator.isEmpty(reqBody.password)) {
    status = false
    message = 'Passowrd can not be empty'
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
