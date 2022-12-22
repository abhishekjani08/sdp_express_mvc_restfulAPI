const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const authRouter = require('./routes/authentication')
const app = express()
dotenv.config()

app.use(logger)

app.get('/greetings', (req, res) => {
  return res.status(200).json({
    message: 'Hello from Express Todo Project'
  })
})

app.use('/api/auth', authRouter)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('error', error)
  }
  console.log('Server is running on port no ' + process.env.PORT)
})
