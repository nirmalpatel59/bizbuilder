let validator = require('validator')

module.exports.userValidator = function(reqBody) {
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
        data = requestParser("getUser", reqBody);
    }
    return {
        status: status,
        message:message,
        data: data
    }
}

module.exports.getUserValidation = function (reqBody) {
    let status, message, data
    if(validator.isEmpty(reqBody.username)) {
        status = false,
        message = "Username can not be empty."
    } else {
        status = true,
        message = "",
        data = reqBody
    }
    return {
        status: status,
        message: message,
        data: data
    }
}


let requestParser = function (reqType, reqBody) {
    let tempReqBody = JSON.parse(JSON.stringify(reqBody))
    switch(reqType) {
        case "getUser":
            tempReqBody.username = tempReqBody.email
        break
    }
    return tempReqBody
}