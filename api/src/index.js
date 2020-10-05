const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

//app.use(UserRoute)
app.use('/products',ProductRoute)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server is running on port ', port)
})
