let jwt = require('jsonwebtoken')
let config = require('config')

let userServices = require('../services/user.service')
let authValidator = require('../validators/auth.validator')

module.exports.signUp = async function (ctx) {
    let reqBody = await authValidator.signUpValidation(ctx.request.body);
    if(reqBody.status) {
        let serviceRes = await userServices.saveUser(reqBody.data);
        if(serviceRes && serviceRes.error) {
            ctx.body = {
                status: 500,
                message: 'Internal server error'
            }
        } else {
            ctx.body = {
                status: 200,
                message: 'User successfully created'
            }
        }
    } else {
        ctx.body = {
            status: 500,
            meesage: 'Validation failed'
        }
    }
}

module.exports.signIn = async function (ctx) {
    let reqBody = await authValidator.signInValidation(ctx.request.body)
    if(reqBody.status) {
        let serviceRes = await userServices.getUser({ "username": reqBody.data.username })
        if(serviceRes && serviceRes.error) {
            ctx.body = {
                status: 500,
                message: 'Internal server error'
            }
        } else {
            let status = 200, message, data
            if(serviceRes === null) {
                message = 'Invalid Username'
            } else if(serviceRes.password !== reqBody.data.password) {
                message = 'Invalid Password'
            } else {
                let authToken = await jwt.sign(serviceRes.toJSON(), config.auth.secretKey, {expiresIn: config.auth.expiryTime})
                message = "Successfully signIn"
                data = {
                    username: serviceRes.username,
                    authToken: authToken
                }
            }
            ctx.body = {
                status: 200,
                message: message,
                data: data
            }
        }
    } else {
        ctx.body = {
            status: 500,
            message: reqBody.message || 'Validation error'
        }
    }
}