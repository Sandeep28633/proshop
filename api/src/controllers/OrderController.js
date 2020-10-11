const Order = require('../models/OrderModel')

const createOrder = async (req, res) => {
  console.log(req.body)
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    ItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body
  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No Order items')
    }else{
        const order = new Order({
            orderItems,
            User:req.user._id,
            shippingAddress,
            paymentMethod,
            ItemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).send(createdOrder)
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('User','name email')
    if (order) {
      return res.send(order)
    }
    throw new Error('Order not found')
  } catch (error) {
    res.status(400).send({message:'Order not found'})
   }
}

//update order to paid
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id : req.body.id,
        status : req.body.status,
        update_time : req.body.update_time,
        email_address : req.body.payer.email_address
      }

      const updatedOrder = await order.save()
      res.send(updatedOrder)
    }
    throw new Error('Order not found')
  } catch (error) {
    res.status(400).send({message:'Order not found'})
   }
}


const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({User:req.user._id})
    if (orders) {
      return res.send(orders)
    }
    throw new Error('No orders found')
  } catch (error) {
    res.status(400).send({message:'Order not found'})
   }
}

const getMyOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('User','id name')
    if (orders) {
      return res.send(orders)
    }
    throw new Error('No orders found')
  } catch (error) {
    res.status(400).send({message:'Orders not found'})
   }
}

const markAsDeliver = async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      return res.send(updatedOrder)
    }
    throw new Error('Order not found')
  } catch (error) {
    res.status(400).send({message:'Order not found'})
  }
}
module.exports = {createOrder,getOrderById,updateOrderToPaid ,getMyOrders, getMyOrdersForAdmin,markAsDeliver}