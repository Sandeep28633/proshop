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

  const deleteProduct = async(req,res)=>{
    try {
      const product = await Product.findById(req.params.id)
      if (product) {
        await product.remove()
        res.json({message:'Product Removed'})
      }else{
        throw new Error('Product not found')
      }
    } catch (error) {
      res.status(400).send({message:error.message})
     }
  }

  const createProduct = async(req,res)=>{
    const product = new Product({
      name : 'Sample name',
      price :0 ,
      owner : req.user._id,
      image: '/images/sample.jpg',
      brand:'sample brand',
      category :'sample category',
      countInStock : 0,
      numReviews : 0,
      description : 'sample description',
    })

    try {
      const createdProduct =await product.save()
      res.status(201).send(createdProduct)
    } catch (error) {
      res.status(500).send({message:error.message})
    }
  }


  const updateProduct = async(req,res)=>{
   const {name , price, description ,image, brand ,category, countInStock} = req.body
  
    try {
      const product =await Product.findById(req.params.id)
      if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).send(updatedProduct)
      }else{
        res.status(401)
        throw new Error('Product not found')
      }
    } catch (error) {
      res.status(500).send({message:error.message})
    }
  }

  module.exports = {getProducts,getProductById,deleteProduct,createProduct,updateProduct}