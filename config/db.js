const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.set('strictQuery', false)
module.exports = () => {
  mongoose.connect(process.env.MONGO_URL, (error) => {
    if (error) { console.log('Connection error', error) } else { console.log('Database Connected Successfully') }
  })
}
