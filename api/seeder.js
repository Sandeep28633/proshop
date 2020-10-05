const mongoose = require('mongoose')
const dotenv = require('dotenv')

const users = require('./data/user')
const products = require('./data/products')

const User = require('./src/models/UserModel')
const Product = require('./src/models/ProductModel')
const Order = require('./src/models/OrderModel')

const connectDB = require('./src/config/db')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, owner: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data imported')
    process.exit()
  } catch (error) {
      console.log(`Error ${error}`)
      process.exit(1)
  }
}

const destroyData = async () => {
    try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()

      console.log('Data Deleted')
      process.exit()
    } catch (error) {
        console.log(`Error ${error}`)
        process.exit(1)
    }
  }


if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}