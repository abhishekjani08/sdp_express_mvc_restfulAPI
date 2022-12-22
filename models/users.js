/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('user', schema)
