const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} = require('../controllers/productController')
const { auth, isAdmin } = require('../middlewares/authMiddleware')

router.get('/', getProducts)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
router.post('/:id/reviews', auth, createProductReview)
router.delete('/:id', auth, isAdmin, deleteProduct)
router.post('/', auth, isAdmin, createProduct)
router.put('/:id', auth, isAdmin, updateProduct)

module.exports = router
