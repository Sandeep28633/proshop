const express = require('express')
const router = express.Router()
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
} = require('../controllers/OrderController')

const {auth} = require('../middlewares/authMiddleware')

router.post('/createOrder', auth, createOrder)
router.get('/myorders',auth,getMyOrders)
router.get('/:id', auth, getOrderById)
router.put('/:id/pay', auth, updateOrderToPaid)

module.exports = router
