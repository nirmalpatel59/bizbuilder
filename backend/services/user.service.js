let UserModel = require('../models').userModel

let saveUser = async function(userInstance) {
    let userSchema = new UserModel(userInstance)
    let userData
    try{
        userData = await userSchema.save()
    } catch(exception) {
        userData.error = true
    }
    return userData
}

module.exports = {
    saveUser: saveUser
}