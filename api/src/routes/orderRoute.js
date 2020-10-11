const express = require('express')
const router = express.Router()
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getMyOrdersForAdmin,
  markAsDeliver
} = require('../controllers/OrderController')

const {auth, isAdmin} = require('../middlewares/authMiddleware')

router.get('/',auth,isAdmin,getMyOrdersForAdmin)
router.post('/createOrder', auth, createOrder)
router.put('/:id/deliver',auth,isAdmin,markAsDeliver)
router.get('/myorders',auth,getMyOrders)
router.get('/:id', auth, getOrderById)
router.put('/:id/pay', auth, updateOrderToPaid)

module.exports = router
