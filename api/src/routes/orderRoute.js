const express = require('express')
const router = express.Router()
const {createOrder} = require('../controllers/OrderController')
const auth = require('../middlewares/authMiddleware')

router.post('/createOrder',auth,createOrder)

module.exports = router