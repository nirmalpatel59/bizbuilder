let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true }
}, { minimize: true, timestamps: true })

module.exports = mongoose.model(config.collection.USERS, userSchema)
