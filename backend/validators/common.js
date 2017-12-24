let validator = require('validator')

module.exports.UserDataValidation = function (reqBody) {
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
        data = requestParser("saveUser", reqBody);
    }
    console.log(data)
    return {
        status: status,
        message:message,
        data: data
    }
}


let requestParser = function (reqType, reqBody) {
    let tempReqBody = JSON.parse(JSON.stringify(reqBody))
    switch(reqType) {
        case "saveUser":
            tempReqBody.username = tempReqBody.email
        break
    }
    return tempReqBody
}