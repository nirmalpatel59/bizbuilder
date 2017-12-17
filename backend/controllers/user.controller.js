let userValidator = require('../validators').userValidator
let userService = require('../services').userService

let saveUser = async function(ctx) {
    let reqBody = await userValidator(ctx.request.body)
    if (reqBody.status) {
        let serviceRes = await userService.saveUser(reqBody.data)
        if(serviceRes.error) {
            ctx.body = {
                status: 500,
                meesage: "Internal server error"
            }    
        } else {
            ctx.body = {
                data: serviceRes,
                status: 200,
                message: 'User successfully created'
            }
        }
    } else {
        ctx.body = {
            status: 500,
            meesage: "Validation failed"
        }
    }
}

let getUser = async function(ctx) {
    
    let username = body.username
}

module.exports = {
    saveUser: saveUser
}