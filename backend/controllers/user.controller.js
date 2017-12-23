let validate = require('../validators')
let userService = require('../services').userService

let saveUser = async function(ctx) {
    let reqBody = await validate.userValidator(ctx.request.body)
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
    let reqBody = validate.getUserValidation(ctx.request.query);
    if(reqBody.status) {
        let serviceRes = await userService.getUser(reqBody.data.username)
        if(serviceRes && serviceRes.error) {
            ctx.body = {
                status: 500,
                message: "Internal server error"
            }
        } else {
            let message = ""
            if(serviceRes === null) message = "No user found"
            ctx.body = {
                data: serviceRes,
                status: 200,
                message: message
            }
        }
    } else {
        ctx.body = {
            status: 500,
            message: "Validation failed"
        }
    }
}

module.exports = {
    saveUser: saveUser,
    getUser: getUser
}