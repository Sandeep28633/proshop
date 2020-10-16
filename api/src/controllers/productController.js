const Product = require('../models/ProductModel')

const getProducts = async (req, res) => {
  try {
    const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
  
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
    res.status(400).send({ message: 'Product not found' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.remove()
      res.json({ message: 'Product Removed' })
    } else {
      throw new Error('Product not found')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    owner: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })

  try {
    const createdProduct = await product.save()
    res.status(201).send(createdProduct)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.status(201).send(updatedProduct)
    } else {
      res.status(401)
      throw new Error('Product not found')
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

//update review and rating by giving comment and rating

const createProductReview = async (req, res) => {
  const { rating, comment } = req.body

  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() == req.user._id.toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
      product.reviews = [...product.reviews, review]
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      await product.save()
      res.status(201).send({ message: 'Review added' })
    } else {
      res.status(401)
      throw new Error('Product not found')
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.send(products)
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
}
