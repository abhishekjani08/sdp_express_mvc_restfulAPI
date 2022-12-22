/* eslint-disable handle-callback-err */
const { Router } = require('express')
const users = require('../models/users')

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  return res.status(200).json({
    message: 'Login successful'
  })
})

authRouter.post('/register', (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.userName && req.body.password)) {
        throw Error('email,username,password not found')
      }
      return users.create(req.body)
    })
    .then(data => {
      data = data.toJSON()
      delete data.password

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
