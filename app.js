const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const verifyAuth = require('./middleware/verifyAuth')
const authRouter = require('./routes/authentication')
const profileRouter = require('./routes/profile')
const connectdb = require('./config/db')
const app = express()
dotenv.config()
connectdb()

app.use(express.urlencoded())
app.use(express.json())
app.use(logger)
app.get('/greetings', (req, res) => {
  return res.status(200).json({
    message: 'Hello from Express Todo Project'
  })
})

app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('error', error)
  }
  console.log('Server is running on port no ' + process.env.PORT)
})
