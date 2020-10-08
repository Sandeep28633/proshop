import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Message, CheckoutSteps } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {createOrder} from '../actions'

const PlaceOrder = ({history}) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  //calculate price
  cart.ItemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = cart.ItemsPrice > 100 ? 100 : 0
  cart.taxPrice = Number(0.15 * cart.ItemsPrice).toFixed(2)

  cart.totalPrice = (Number(cart.ItemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  const orderCreate = useSelector(state=>state.orderCreate)
  const {order,success,error} = orderCreate

  useEffect(() => {
    if(success){
      history.push(`/order/${order._id}`)
    }
  }, [history,success])

  const placOrderHandler = () => {
    dispatch(createOrder({
      orderItems : cartItems,
      shippingAddress,
      paymentMethod,
      ItemsPrice:cart.ItemsPrice,
      shippingPrice:cart.shippingPrice,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice,

    }))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address} , {shippingAddress.city} ,
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} * <i className="fas fa-rupee-sign"></i>{item.price} = 
                        <i className="fas fa-rupee-sign"></i>{(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col><i className="fas fa-rupee-sign"></i>{cart.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col><i className="fas fa-rupee-sign"></i>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col><i className="fas fa-rupee-sign"></i>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col><i className="fas fa-rupee-sign"></i>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder
