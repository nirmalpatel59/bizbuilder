let validator = require('validator')

let userValidator = function(reqBody) {
    let status, message, data;
    if(!validator.isEmail(reqBody.email)) {
        status = false
        message = 'Invalid Email Address'
    } else if(!validator.isMobilePhone(reqBody.phoneNo, 'en-IN')) {
        status = false
        message = 'Invalid Phone Number'
    } else if(validator.isEmpty(reqBody.firstName)) {
        status = false
        message = 'First Name can not be empty'
    } else if(validator.isEmpty(reqBody.lastName)) {
        status = false
        message = 'Last Name can not be empty'
    } else {
        status = true,
        message = '',
        data = reqBody
    }
    return {
        status: status,
        message:message,
        data: data
    }
}

module.exports = {
    userValidator: userValidator
}