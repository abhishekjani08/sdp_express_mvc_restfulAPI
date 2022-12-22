/* eslint-disable handle-callback-err */
const { Router } = require('express')
const users = require('../models/users')
const { encrypt, compare,createAccessToken } = require('../utils')

const authRouter = Router()

authRouter.post('/login', (req, res) => {

  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.password)) {
        throw Error('email or password not found')
      }
      return users.findOne({ email: req.body.email })
    })
    .then((data) => {
      if(!data) {
        throw Error('user not found')
      }
      return compare(req.body.password, data.password)
    })

    .then((match) => {
      if (!match) {
        throw Error('match not found')
      }
      return res.status(200).json({
        message: 'Login successful',
        access_token:createAccessToken(req.body.email)
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'login failed',
        error: error.message
      })
    })
})

authRouter.post('/register', (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.userName && req.body.password)) {
        throw Error('email,username,password not found')
      }
      return encrypt(req.body.password)
    })
    .then((hash) => {
      req.body.password = hash
      return users.create(req.body)
    })
    .then(data => {
      data = data.toJSON()
      delete data.password

      data.access_token = createAccessToken(req.body.email)
      
      return res.status(200).json({
        message: 'Registered Successfully',
        data: data
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'register failed',
        error: error.message
      })
    })
})

//   return res.status(200).json({
//     message: 'Registered successful'
//   })
// })

authRouter.post('/verify_email', (req, res) => {
  return res.status(200).json({
    message: 'Email Verified Successfully'
  })
})
module.exports = authRouter
