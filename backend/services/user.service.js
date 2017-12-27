let UserModel = require('../models').userModel

module.exports.saveUser = async function (userInstance) {
  let userSchema = new UserModel(userInstance)
  let userData
  try {
    userData = await userSchema.save()
  } catch (exception) {
    console.log(exception)
    userData = {
      'error': true,
      'errorData': exception
    }
  }
  return userData
}

module.exports.getUser = async function (query) {
  let userData
  try {
    userData = await UserModel.findOne(query)
  } catch (exception) {
    userData = {
      'error': true
    }
  }
  return userData
}

module.exports.updateUser = async function (selector, userInstance) {
  let userData
  try {
    userData = await UserModel.findOneAndUpdate(selector, userInstance, { new: true })
  } catch (exception) {
    userData = {
      'error': true
    }
  }
  return userData
}
