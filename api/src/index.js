const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')
const OrderRoute = require('./routes/orderRoute')

const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/users',UserRoute)
app.use('/products', ProductRoute)
app.use('/orders',OrderRoute)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server is running on port ', port)
})
