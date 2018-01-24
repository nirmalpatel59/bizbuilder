let jwt = require('jsonwebtoken')
let config = require('config')
let google = require('googleapis')
let plus = google.plus('v1')
let OAuth2 = google.auth.OAuth2
let oauth2Client = new OAuth2(
  '900554218439-icd2bun2md8e1rtm1n3qp70mfl4oegfc.apps.googleusercontent.com',
  '2hyaCMA_5zdgSXzs7ZDTXnNx',
  'http://localhost:2123/getGoogleSignupCode'
)
let userService = require('../services/user.service')
let authValidator = require('../validators/auth.validator')

module.exports.getGoogleSignupCode = function (ctx) {
  ctx.body = {
    code: ctx.request.query.code
  }
}

module.exports.generateGoogleSignupCode = async function (ctx) {
  let scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]

  let url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })

  ctx.body = {
    url: url
  }
}

module.exports.getOAuthToken = async function (ctx) {
  let code = ctx.request.body.code
  let tokens = await getTokensFromAuthorizeCode(code)
  oauth2Client.credentials = tokens
  let profile = await getProfileFromAccessToken(tokens)

  let profileObj = {
    username: profile.emails[0].value,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
    accountType: 'Google'
  }

  let serviceRes = await userService.saveUser(profileObj)

  let authToken = await jwt.sign(serviceRes.toJSON(), config.auth.secretKey, { expiresIn: config.auth.expiryTime })
  ctx.body = {
    status: 200,
    message: 'Successfully signIn',
    data: {
      username: serviceRes.username,
      authToken: authToken
    }
  }
}

function getTokensFromAuthorizeCode (code) {
  return new Promise(function (resolve, reject) {
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

function getProfileFromAccessToken (tokens) {
  return new Promise(function (resolve, reject) {
    plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
      if (err) {
        console.log('An error occured', err)
        reject(err)
      } else {
        resolve(profile)
      }
    })
  })
}

module.exports.signUp = async function (ctx) {
  let reqBody = await authValidator.signUpValidation(ctx.request.body)
  if (reqBody.status) {
    let isUserExist = await userService.getUser({ 'email': reqBody.data.email })
    if (isUserExist != null) {
      ctx.body = {
        status: 200,
        message: 'User already exist'
      }
    } else {
      let serviceRes = await userService.saveUser(reqBody.data)
      ctx.body = {
        status: 200,
        message: 'User successfully created',
        username: serviceRes
      }
    }
  } else {
    ctx.body = {
      status: 900,
      meesage: reqBody.message || 'Validation error'
    }
  }
}

module.exports.signIn = async function (ctx) {
  let reqBody = await authValidator.signInValidation(ctx.request.body)
  if (reqBody.status) {
    let serviceRes = await userService.getUser({ 'username': reqBody.data.username })
    let status = 200
    let message
    let data
    if (serviceRes === null) {
      message = 'Invalid Username'
    } else if (serviceRes.password !== reqBody.data.password) {
      message = 'Invalid Password'
    } else {
      let authToken = await jwt.sign(serviceRes.toJSON(), config.auth.secretKey, { expiresIn: config.auth.expiryTime })
      message = 'Successfully signIn'
      data = {
        username: serviceRes.username,
        authToken: authToken
      }
    }
    ctx.body = {
      status: status,
      message: message,
      data: data
    }
  } else {
    ctx.body = {
      status: 900,
      message: reqBody.message || 'Validation error'
    }
  }
}
