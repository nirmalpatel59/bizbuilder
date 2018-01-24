let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String },
  accountType: { type: String, default: 'BizB' }
}, { minimize: true, timestamps: true })

module.exports = mongoose.model(config.collection.USERS, userSchema)
