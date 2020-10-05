const express = require('express')
const router = express.Router()
const Product = require('../models/ProductModel')

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (error) {
    res.status(400).send()
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      return res.send(product)
    }
    res.status(400).send({ message: 'Product not found' })
  } catch (error) {
    res.status(400).send({ message: 'Product not found' })
  }
})

module.exports = router
