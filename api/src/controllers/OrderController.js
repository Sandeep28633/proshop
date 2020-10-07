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

module.exports = {createOrder}