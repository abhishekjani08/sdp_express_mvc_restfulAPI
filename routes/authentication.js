const {Router} = require('express')

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  return res.status(200).json({
    message: 'Login successful'
  })
})

authRouter.post('/register', (req, res) => {
  return res.status(200).json({
    message: 'Registered successful'
  })
})

authRouter.post('/verify_email', (req, res) => {
  return res.status(200).json({
    message: 'Email Verified Successfully'
  })
})
module.exports = authRouter
