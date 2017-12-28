let UserModel = require('../models').userModel

module.exports.saveUser = async function (userInstance) {
  let userSchema = new UserModel(userInstance)
  let userData = await userSchema.save()
  return userData
}

module.exports.getUser = async function (query) {
  let userData = await UserModel.findOne(query)
  return userData
}

module.exports.updateUser = async function (selector, userInstance) {
  let userData = await UserModel.findOneAndUpdate(selector, userInstance, { new: true })
  return userData
}

module.exports.deleteUser = async function (selector) {
  let userData = await UserModel.findOneAndRemove(selector)
  return userData
}
