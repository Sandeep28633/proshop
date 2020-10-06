const Product = require('../models/ProductModel')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (error) {
    res.status(400).send({ message: 'Some error occured' })
  }
}


const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      if (product) {
        return res.send(product)
      }
      throw new Error('Product not found')
    } catch (error) {
      res.status(400).send({message:'Product not found'})
     }
  }

  module.exports = {getProducts,getProductById}