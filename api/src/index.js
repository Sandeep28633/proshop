const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')
const OrderRoute = require('./routes/orderRoute')
const uploadRoute = require('./routes/uploadRoute')

const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/users',UserRoute)
app.use('/products', ProductRoute)
app.use('/orders',OrderRoute)
app.use('/upload',uploadRoute)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//route for sending paypal client id
app.use('/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server is running on port ', port)
})
