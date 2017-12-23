let UserModel = require('../models').userModel

module.exports.saveUser = async function(userInstance) {
    let userSchema = new UserModel(userInstance)
    let userData
    try{
        userData = await userSchema.save()
    } catch(exception) {
        userData = {
            "error": true
        }
    }
    return userData
}

module.exports.getUser = async function(username) {
    let userData
    try {
        userData = await UserModel.findOne({"username": username})
    } catch(exception) {
        userData = {
            "error": true
        }
    }
    return userData
}